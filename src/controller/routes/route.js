const express = require('express');
const { createRoute, getRoutes, getRouteById, updateRoute, deleteRoute, } =require('../api/routeController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createRoute);
router.get('/', authenticate, getRoutes);
router.get('/:id', authenticate, authorize('admin', 'operator'), getRouteById);
router.put('/:id', authenticate, authorize('admin'), updateRoute);
router.delete('/:id', authenticate, authorize('admin'), deleteRoute);

module.exports = router;