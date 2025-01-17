const Route = require('../../model/Routes');

exports.createRoute = async (req, res) =>   {
    try {
        const {routeId, origin, destination, distance} = req.body;
        const route = new Route({routeId, origin, destination, distance });
        await route.save();
        res.status(201).json({ message: 'Route created successfully', route});
    } catch (error) {
        res.status(500).json({ error: 'Failed to create route', details: error.message});
    }
};

exports.getRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch routes', details: error.message });
    }
};

exports.getRouteById = async (req, res) => {
    try {
        const [ routeId ] = req.params;
        if(!mongoose.Types.ObjectId.isValid(routeId)) {
            return res.status(400).json({message: 'Invalid Route Id'});
        }
        const route = await Route.findOne({routeId});
        
        if(!route) return res.status(404).json({message: 'Route not Found'})
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch rotue', details: error.message});
    }
};

exports.updateRoute = async (req, res) => {
    try {
        const { origin, destination, distance } = req.body;
        const route = await Route.findOneAndUpdate(
            { routeId: req.params.routeId },
            { origin, destination, distance },
            { new: true }
        );
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route updated successfully', route });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update route', details: error.message });
    }
};

exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findOneAndDelete({ routeId: req.params.routeId });
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete route', details: error.message });
    }
};