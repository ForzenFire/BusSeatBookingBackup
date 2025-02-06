const express = require('express');
const { reserveSeats, confirmReservation, getSeatInfo, getReservationById, getAllReservations, getActiveReservations } = require('../api/reservationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/reservations/reserve:
 *   post:
 *     summary: Reserve seats for a schedule
 *     description: Allows a user to temporarily reserve seats for a specific schedule.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scheduleId:
 *                 type: string
 *                 example: "001"
 *               seatsReserved:
 *                 type: number
 *                 example: "5"
 *     responses:
 *       200:
 *         description: Seats reserved successfully
 *       400:
 *         description: Bad request (e.g., invalid scheduleId or seatNumbers)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       409:
 *         description: Conflict (e.g., seats already reserved)
 */
router.post('/reserve', authenticate, reserveSeats);

/**
 * @swagger
 * /api/reservations/confirm:
 *   post:
 *     summary: Confirm seat reservation
 *     description: Finalizes a reservation, confirming the selected seats.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservationId:
 *                 type: string
 *                 example: "64d3f4f1e39a1b00123abcdf"
 *     responses:
 *       200:
 *         description: Reservation confirmed successfully
 *       400:
 *         description: Bad request (e.g., invalid reservationId)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       404:
 *         description: Reservation not found
 */
router.post('/confirm', authenticate, confirmReservation);

/**
 * @swagger
 * /api/reservations/seat-info/{scheduleId}:
 *   get:
 *     summary: Get seat information for a schedule
 *     description: Fetches information about available and reserved seats for a specific schedule.
 *     tags:
 *      - Reservation
 *     parameters:
 *       - in: path
 *         name: scheduleId
 *         required: true
 *         description: The ID of the schedule to get seat information for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 availableSeats:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["A1", "A2", "B1"]
 *                 reservedSeats:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["B2", "C1"]
 *       400:
 *         description: Bad request (e.g., invalid scheduleId)
 *       404:
 *         description: Schedule not found
 */
router.get('/seat-info/:scheduleId', getSeatInfo);

/**
 * @swagger
 * /api/reservations/{id}:
 *   get:
 *     summary: Get reservation by ID
 *     description: Fetch details of a specific confirmed reservation by its ID.
 *     tags:
 *      - Reservation
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the reservation to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reservation details retrieved successfully
 *       400:
 *         description: Invalid reservation ID
 *       404:
 *         description: Reservation not found
 */
router.get('/:id', getReservationById);

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Get all reservations
 *     description: Fetch all reservations including their status and schedule details.
 *     tags:
 *      - Reservation
 *     responses:
 *       200:
 *         description: All reservations retrieved successfully
 *       404:
 *         description: No reservations found
 */
router.get('/', getAllReservations);

router.get('/active-res', getActiveReservations);

module.exports = router;