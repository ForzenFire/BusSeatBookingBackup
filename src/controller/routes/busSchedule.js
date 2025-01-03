const express = require('express');
const { createBusSchedule, getBusSchedules, getBusSchedulesById, updateBusSchedule, deleteBusSchedule, } = require('../api/busScheduleController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/bus-schedules:
 *   post:
 *     summary: Create a new bus schedule
 *     description: Allows an admin to create a new bus schedule.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: string
 *                 example: "64d3f4f1e39a1b00123abcde"
 *               routeId:
 *                 type: string
 *                 example: "5f47f72e5d6f1b3c2e64ef01"
 *               departureTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T08:00:00Z"
 *               arrivalTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-01T12:00:00Z"
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
 * /api/bus-schedules:
 *   get:
 *     summary: Get all bus schedules
 *     description: Fetches a list of all bus schedules. Requires authentication.
 *     security:
 *       - BearerAuth: []
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
 *                   id:
 *                     type: string
 *                     example: "64d3f4f1e39a1b00123abcde"
 *                   busId:
 *                     type: string
 *                     example: "64d3f4f1e39a1b00123abcde"
 *                   routeId:
 *                     type: string
 *                     example: "5f47f72e5d6f1b3c2e64ef01"
 *                   departureTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-01T08:00:00Z"
 *                   arrivalTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-01-01T12:00:00Z"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getBusSchedules);  

/**
 * @swagger
 * /api/bus-schedules/{id}:
 *   get:
 *     summary: Get bus schedule details by ID
 *     description: Fetches details of a specific bus schedule by its ID.
 *     security:
 *       - BearerAuth: []
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
 *                 id:
 *                   type: string
 *                   example: "64d3f4f1e39a1b00123abcde"
 *                 busId:
 *                   type: string
 *                   example: "64d3f4f1e39a1b00123abcde"
 *                 routeId:
 *                   type: string
 *                   example: "5f47f72e5d6f1b3c2e64ef01"
 *                 departureTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T08:00:00Z"
 *                 arrivalTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-01T12:00:00Z"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       404:
 *         description: Bus schedule not found
 */
router.get('/:id', authenticate, getBusSchedulesById);

/**
 * @swagger
 * /api/bus-schedules/{id}:
 *   put:
 *     summary: Update a bus schedule
 *     description: Allows an admin to update the details of a specific bus schedule.
 *     security:
 *       - BearerAuth: []
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
 *               departureTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-02T09:00:00Z"
 *               arrivalTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-01-02T13:00:00Z"
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
 * /api/bus-schedules/{id}:
 *   delete:
 *     summary: Delete a bus schedule
 *     description: Allows an admin to delete a specific bus schedule.
 *     security:
 *       - BearerAuth: []
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