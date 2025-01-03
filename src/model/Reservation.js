const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    scheduleId: { type: String, ref: 'BusSchedule', required: true },
    userId: { type: String, ref: 'User', required: true },
    seatsReserved: {type: Number, required: true },
    reservationStatus: { type: String, enum: ['Hold', 'Confirmed'], default: 'Hold'},
    holdExpiresAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', ReservationSchema);