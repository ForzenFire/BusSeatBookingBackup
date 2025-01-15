const express = require('express');
const { createBusSchedule, getBusSchedules, getBusSchedulesById, updateBusSchedule, deleteBusSchedule } = require('../api/busScheduleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/schedule:
 *   post:
 *     summary: Create a new bus schedule
 *     description: Allows an admin to create a new bus schedule.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Bus Schedule
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
 *               routeId:
 *                 type: string
 *                 example: "120"
 *               busId:
 *                 type: string
 *                 example: "ND-1234"
 *               routeDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               startingTime:
 *                 type: string
 *                 example: "08:00 AM"
 *               closingTime:
 *                 type: string
 *                 example: "12:00 PM"
 *     responses:
 *       201:
 *         description: Bus schedule created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 */
router.post('/', authenticate, authorize('admin'), createBusSchedule);

/**
 * @swagger
 * /api/schedule:
 *   get:
 *     summary: Get all bus schedules
 *     description: Fetches a list of all bus schedules. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Bus Schedule
 *     responses:
 *       200:
 *         description: List of bus schedules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   scheduleId:
 *                     type: string
 *                     example: "001"
 *                   routeId:
 *                     type: string
 *                     example: "120"
 *                   busId:
 *                     type: string
 *                     example: "ND-1234"
 *                   routeDate:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-01"
 *                   startingTime:
 *                     type: string
 *                     example: "08:00 AM"
 *                   closingTime:
 *                     type: string
 *                     example: "12:00 PM"
 *                   status:
 *                     type: string
 *                     enum: ["Scheduled", "Canceled"]
 *                     example: "Scheduled"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getBusSchedules);

/**
 * @swagger
 * /api/schedule/{id}:
 *   get:
 *     summary: Get bus schedule details by ID
 *     description: Fetches details of a specific bus schedule by its ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Bus Schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus schedule to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus schedule details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 scheduleId:
 *                   type: string
 *                   example: "001"
 *                 routeId:
 *                   type: string
 *                   example: "120"
 *                 busId:
 *                   type: string
 *                   example: "ND-1234"
 *                 routeDate:
 *                   type: string
 *                   format: date
 *                   example: "2025-01-01"
 *                 startingTime:
 *                   type: string
 *                   example: "08:00 AM"
 *                 closingTime:
 *                   type: string
 *                   example: "12:00 PM"
 *                 status:
 *                   type: string
 *                   enum: ["Scheduled", "Canceled"]
 *                   example: "Scheduled"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       404:
 *         description: Bus schedule not found
 */
router.get('/:id', authenticate, getBusSchedulesById);

/**
 * @swagger
 * /api/schedule/{id}:
 *   put:
 *     summary: Update a bus schedule
 *     description: Allows an admin to update the details of a specific bus schedule.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Bus Schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus schedule to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *               startingTime:
 *                 type: string
 *                 example: "09:00 AM"
 *               closingTime:
 *                 type: string
 *                 example: "01:00 PM"
 *               status:
 *                 type: string
 *                 enum: ["Scheduled", "Canceled"]
 *                 example: "Canceled"
 *     responses:
 *       200:
 *         description: Bus schedule updated successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Bus schedule not found
 */
router.put('/:id', authenticate, authorize('admin'), updateBusSchedule);

/**
 * @swagger
 * /api/schedule/{id}:
 *   delete:
 *     summary: Delete a bus schedule
 *     description: Allows an admin to delete a specific bus schedule.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Bus Schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus schedule to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus schedule deleted successfully
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Bus schedule not found
 */
router.delete('/:id', authenticate, authorize('admin'), deleteBusSchedule);

module.exports = router;
