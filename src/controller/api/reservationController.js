const Reservation = require('../../model/Reservation');
const BusSchedule = require('../../model/BusSchedule');
const User = require('../../model/User');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

exports.reserveSeats = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { scheduleId, seatsReserved } = req.body;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({message: 'Unauthorized! Token not availble'});

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        const schedule = await BusSchedule.findOne({scheduleId}).populate('busId').session(session);
        if (!schedule) return res.status(404).json({message: 'Schedule not found'});

        const totalSeats = schedule.busId.seatingCapacity;

        const reservations = await Reservation.find({ scheduleId: schedule._id }).session(session);
        const reservedSeats = reservations
            .filter((r) => r.reservationStatus === 'Confirmed' || (r.reservationStatus === 'Hold' && r.holdExpiresAt > new Date() ))
            .reduce((total, r) => total + r.seatsReserved, 0);
        
        if (seatsReserved > totalSeats - reservedSeats) {
            return res.status(400).json({message: 'Not enough seats availble'});
        }

        const holdExpiresAt = new Date(Date.now() + 10*60*1000);
        const heldReservation = new Reservation({
            scheduleId: schedule._id,
            userId,
            seatsReserved,
            reservationStatus: 'Hold',
            holdExpiresAt,
        });
            await heldReservation.save({session});

        await session.commitTransaction();
        // session.endSession();
        res.status(200).json({message: 'Seats held successfully. Complete the reservation within 10 minutes.', heldReservation});

    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({error: 'Server Error', error: error.message});
    } finally {
        session.endSession();
    }
};

exports.confirmReservation = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).json({message: 'Unauthorized'});

        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        const { reservationId, email } = req.body;

        if(!mongoose.Types.ObjectId.isValid(reservationId)){
            return res.status(400).json({ message: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findOneAndUpdate(
            { 
                _id: reservationId, 
                userId, 
                reservationStatus: 'Hold', 
                holdExpiresAt: { $gt: new Date()},
            },
            { reservationStatus: 'Confirmed', holdExpiresAt: null },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({message: 'Reservation not found or Already expired'});
        }

        const user = await User.findById(userId);
        if(!user || !user.email) {
            return res.status(400).json({ message: 'User not found or email missing' });
        }
        console.log('User Data:', user);

        // const qrCodeData = `Reservation ID: ${reservation._id}, User ID: ${userId}`;
        // const qrCodeImage = await QRCode.toDataURL(qrCodeData);
        
        const qrCodeData = JSON.stringify({
            id: reservation._id,
            name: reservation.name,
            date: reservation.date,
        });

        const qrCodeBase64 = await QRCode.toDataURL(qrCodeData);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER, 
              pass: process.env.EMAIL_PASS, 
            },
          });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Reservation Confirmation',
            html: `
              <h3>Your Reservation is Confirmed!</h3>
              <p>Reservation Details:</p>
              <ul>
                <li>Reservation ID: ${reservation._id}</li>
                <li>Name: ${reservation.name}</li>
                <li>Date: ${reservation.date}</li>
              </ul>
              <p>Below is your QR code. Please present it at the time of service:</p>
              <img src="${qrCodeBase64}" alt="QR Code" />
            `,
        };
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Reservation confirmed and QR code sent to email', reservation});
    } catch (error) {
        res.status(500).json({error: 'Failed to confirm reservation', details: error.message});
    }
};

exports.cleanupExpiredHolds = async () => {
    const now = new Date();
    try {
        const result = await Reservation.deleteMany({ reservationStatus: 'Hold', holdExpiresAt: {$lt: now} });
        console.log(`Expired holds cleaned up: ${result.deletedCount} reservations`);
    } catch (error) {
        console.log('Erro cleaning up expired holds', error);
    }
};

exports.getSeatInfo = async (req, res) => {
    try {
        const { scheduleId } = req.params;

        const schedule = await BusSchedule.findOne({scheduleId}).populate('busId');
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found'});
        }

        const totalSeats = schedule.busId.seatingCapacity;
        const reservation = await Reservation.find({scheduleId: schedule._id});
        const heldSeats = reservation.filter(r => r.reservationStatus === 'Hold').reduce((sum, r) => sum + r.seatsReserved, 0);
        const confirmSeats = reservation.filter(r => r.reservationStatus === 'Confirmed').reduce((sum, r) => sum + r.seatsReserved, 0);
        const availableSeats = totalSeats - (heldSeats + confirmSeats);

        return res.status(200).json({
            totalSeats,
            availableSeats,
            confirmSeats,
            heldSeats,
        });
    } catch (error) {
        console.log('Error fetiching seat info', error);
        return res.status(500).json({message: 'Internal server error', default: error.message});
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('scheduleId');

        if (!reservations.length) {
            return res.status(404).json({ message: 'No reservations found' });
        }

        res.status(200).json({ message: 'All reservations retrieved', reservations });
    } catch (error) {
        console.error('Error fetching all reservations:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findById(id).populate('scheduleId');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        if (reservation.reservationStatus !== 'Confirmed') {
            return res.status(400).json({ message: 'Reservation is not confirmed' });
        }

        res.status(200).json({ message: 'Reservation details retrieved', reservation });
    } catch (error) {
        console.error('Error fetching reservation by ID:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};