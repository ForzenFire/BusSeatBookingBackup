const express = require('express');
const { createConductor, getConductors, getConductorById, updateConductor, deleteConductor, } = require('../api/conductorController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/conductor:
 *   post:
 *     summary: Create a new conductor
 *     description: Allows an admin to create a new conductor.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Conductor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nic:
 *                 type: string
 *                 example: "123456789V"
 *               conductorId:
 *                 type: string
 *                 example: "COND-001"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               contact:
 *                 type: string
 *                 example: "123-456-7890"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *     responses:
 *       201:
 *         description: Conductor created successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 */
router.post('/', authenticate, authorize('admin'), createConductor);

/**
 * @swagger
 * /api/conductor:
 *   get:
 *     summary: Get all conductors
 *     description: Fetches a list of all conductors. Requires authentication.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Conductor
 *     responses:
 *       200:
 *         description: List of conductors
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
 *                   nic:
 *                     type: string
 *                     example: "123456789V"
 *                   conductorId:
 *                     type: string
 *                     example: "C001"
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *                   contact:
 *                     type: string
 *                     example: "123-456-7890"
 *                   address:
 *                     type: string
 *                     example: "123 Main Street"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getConductors);

/**
 * @swagger
 * /api/conductor/{id}:
 *   get:
 *     summary: Get conductor details by ID
 *     description: Fetches details of a specific conductor by their ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the conductor to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conductor details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "64d3f4f1e39a1b00123abcde"
 *                 nic:
 *                   type: string
 *                   example: "123456789V"
 *                 conductorId:
 *                   type: string
 *                   example: "COND-001"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 contact:
 *                   type: string
 *                   example: "123-456-7890"
 *                 address:
 *                   type: string
 *                   example: "123 Main Street"
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       404:
 *         description: Conductor not found
 */
router.get('/:id', authenticate, getConductorById);

/**
 * @swagger
 * /api/conductor/{id}:
 *   put:
 *     summary: Update conductor details
 *     description: Allows an admin to update the details of a specific conductor.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the conductor to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nic:
 *                 type: string
 *                 example: "987654321V"
 *               conductorId:
 *                 type: string
 *                 example: "COND-002"
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               contact:
 *                 type: string
 *                 example: "321-654-0987"
 *               address:
 *                 type: string
 *                 example: "456 Elm Street"
 *     responses:
 *       200:
 *         description: Conductor updated successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Conductor not found
 */
router.get('/:id', authenticate, authorize('admin'), updateConductor);

/**
 * @swagger
 * /api/conductor/{id}:
 *   delete:
 *     summary: Delete a conductor
 *     description: Allows an admin to delete a specific conductor.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Conductor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the conductor to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conductor deleted successfully
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Conductor not found
 */
router.delete('/:id', authenticate, authorize('admin'), deleteConductor);

module.exports = router;