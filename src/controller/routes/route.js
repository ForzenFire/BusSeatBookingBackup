const express = require('express');
const { createRoute, getRoutes, getRouteById, updateRoute, deleteRoute, } =require('../api/routeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/routes:
 *   post:
 *     summary: Create a new route
 *     description: Allows an admin to create a new route.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Routes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeId:
 *                 type: string
 *                 example: "R001"
 *               origin:
 *                 type: string
 *                 example: "Colombo"
 *               destination:
 *                 type: string
 *                 example: "Kandy"
 *               distance:
 *                 type: number
 *                 example: 115.5
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Bad request (e.g., missing or invalid fields)
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 */
router.post('/', authenticate, authorize('admin'), createRoute);

/**
 * @swagger
 * /api/routes:
 *   get:
 *     summary: Get all routes
 *     description: Fetches a list of all routes.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Routes
 *     responses:
 *       200:
 *         description: List of routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   routeId:
 *                     type: string
 *                     example: "R001"
 *                   origin:
 *                     type: string
 *                     example: "Colombo"
 *                   destination:
 *                     type: string
 *                     example: "Kandy"
 *                   distance:
 *                     type: number
 *                     example: 115.5
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 */
router.get('/', authenticate, getRoutes);

/**
 * @swagger
 * /api/routes/{id}:
 *   get:
 *     summary: Get route details by ID
 *     description: Fetches details of a specific route by its ID.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the route to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeId:
 *                   type: string
 *                   example: "R001"
 *                 origin:
 *                   type: string
 *                   example: "Colombo"
 *                 destination:
 *                   type: string
 *                   example: "Kandy"
 *                 distance:
 *                   type: number
 *                   example: 115.5
 *       401:
 *         description: Unauthorized (e.g., missing or invalid token)
 *       403:
 *         description: Forbidden (e.g., insufficient permissions)
 *       404:
 *         description: Route not found
 */
router.get('/:id', authenticate, authorize('admin', 'operator'), getRouteById);

/**
 * @swagger
 * /api/routes/{id}:
 *   put:
 *     summary: Update a route
 *     description: Allows an admin to update the details of a specific route.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the route to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *                 example: "Colombo"
 *               destination:
 *                 type: string
 *                 example: "Kandy"
 *               distance:
 *                 type: number
 *                 example: 120.0
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       400:
 *         description: Bad request (e.g., missing required fields)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Route not found
 */
router.put('/:id', authenticate, authorize('admin'), updateRoute);

/**
 * @swagger
 * /api/routes/{id}:
 *   delete:
 *     summary: Delete a route
 *     description: Allows an admin to delete a specific route.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Routes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the route to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Route not found
 */
router.delete('/:id', authenticate, authorize('admin'), deleteRoute);

module.exports = router;