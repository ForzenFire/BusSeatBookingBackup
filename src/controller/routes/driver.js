const express = require('express');
const { createDriver, getDrivers, getDriverById, updateDriver } = require('../api/driverController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/drivers:
 *   post:
 *     summary: Create a new driver
 *     description: Allows an admin to add a new driver.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               nic:
 *                 type: string
 *                 example: "123456789V"
 *               licenseNumber:
 *                 type: string
 *                 example: "B12345678"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Driver created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 */
router.post('/', authenticate, authorize('admin'), createDriver); 

/**
 * @swagger
 * /api/drivers:
 *   get:
 *     summary: Get all drivers
 *     description: Fetches a list of all drivers. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of drivers
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
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   nic:
 *                     type: string
 *                     example: "123456789V"
 *                   licenseNumber:
 *                     type: string
 *                     example: "B12345678"
 *                   phone:
 *                     type: string
 *                     example: "+1234567890"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getDrivers);  

/**
 * @swagger
 * /api/drivers/{id}:
 *   get:
 *     summary: Get driver details by ID
 *     description: Fetches details of a specific driver by their ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the driver to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64d3f4f1e39a1b00123abcde"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 nic:
 *                   type: string
 *                   example: "123456789V"
 *                 licenseNumber:
 *                   type: string
 *                   example: "B12345678"
 *                 phone:
 *                   type: string
 *                   example: "+1234567890"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       404:
 *         description: Driver not found
 */
router.get('/:id', authenticate, authorize('admin'), getDriverById);  

/**
 * @swagger
 * /api/drivers/{id}:
 *   put:
 *     summary: Update a driver
 *     description: Allows an admin to update details of a specific driver.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the driver to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               licenseNumber:
 *                 type: string
 *                 example: "C98765432"
 *               phone:
 *                 type: string
 *                 example: "+0987654321"
 *     responses:
 *       200:
 *         description: Driver updated successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Driver not found
 */
router.put('/:id', authenticate, authorize('admin'), updateDriver);         
// router.delete('/:nic', deleteDriver);     

module.exports = router;
