const express = require('express');
const { createBus, getBuses, updateBus, getBusById,} = require('../api/busController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/buses:
 *   post:
 *     summary: Create a new bus
 *     description: Allows an admin to create a new bus in the system.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: "XYZ-1234"
 *               capacity:
 *                 type: integer
 *                 example: 40
 *               model:
 *                 type: string
 *                 example: "Volvo 7700"
 *     responses:
 *       201:
 *         description: Bus created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 */
router.post('/', authenticate, authorize('admin'), createBus);

/**
 * @swagger
 * /api/buses:
 *   get:
 *     summary: Get all buses
 *     description: Fetches a list of all buses. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of buses
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
 *                   licensePlate:
 *                     type: string
 *                     example: "XYZ-1234"
 *                   capacity:
 *                     type: integer
 *                     example: 40
 *                   model:
 *                     type: string
 *                     example: "Volvo 7700"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getBuses);

/**
 * @swagger
 * /api/buses/{id}:
 *   get:
 *     summary: Get bus details by ID
 *     description: Fetches details of a specific bus by its ID. Requires admin or operator authorization.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bus details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64d3f4f1e39a1b00123abcde"
 *                 licensePlate:
 *                   type: string
 *                   example: "XYZ-1234"
 *                 capacity:
 *                   type: integer
 *                   example: 40
 *                 model:
 *                   type: string
 *                   example: "Volvo 7700"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Bus not found
 */
router.get('/:id',authenticate, authorize('admin', 'operator'), getBusById);

/**
 * @swagger
 * /api/buses/{id}:
 *   put:
 *     summary: Update bus details
 *     description: Allows an admin to update the details of a specific bus by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               licensePlate:
 *                 type: string
 *                 example: "XYZ-5678"
 *               capacity:
 *                 type: integer
 *                 example: 50
 *               model:
 *                 type: string
 *                 example: "Mercedes-Benz Citaro"
 *     responses:
 *       200:
 *         description: Bus updated successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Bus not found
 */
router.get('/:id', authenticate, authorize('admin'), updateBus);

module.exports = router;