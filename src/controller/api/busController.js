const Bus = require('../../model/Bus');
const Driver = require('../../model/Driver');
const Conductor = require('../../model/Conductor');

exports.createBus = async (req, res) => {
    try {
        const { busNumber, seatingCapacity, type, driverNic, conductorId} = req.body;
        const driver = await Driver.findOne({ nic: driverNic});
        if(!driver){
            return res.status(404).json({message: 'Driver not founded with Provided NIC'});
        }
        const conductor = await Conductor.findOne({ conductorId: conductorId });
        if(!conductor) {
            return res.status(404).json({ message: 'Conducotr not found with Provided ID'})
        }
        const bus = new Bus({ 
            busNumber, 
            seatingCapacity, 
            type, 
            driverNic:driver._id, 
            conductorId:conductor._id});
        await bus.save();
        res.status(201).json({ message: 'Bus created successfully', bus});
    } catch (error) {
        res.status(500).json({error: 'Failed to create a bus', details: error.message });
    }   
};

exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find()
            .populate('driverNic', 'nic name')
            .populate('conductorId', 'conductorId name');
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch buses', details: error.message });
    }
};

exports.getBusById = async (req, res) => {
    try{
        const { id } = req.params;
        const bus = await Bus.findById(id)
            .populate('driverNic', 'nic name')
            .populate('conductorId', 'conductorId name');

            if(!bus) {
                return res.status(404).json({message: 'Bus not found'});
            }
            res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch bus', details: error.message});
    }
};

exports.updateBus = async (req, res) => {
    try {
        const { seatingCapacity, type, driverNic, conductorId } = req.body;
        const bus = await Bus.findOne({ busNumber: req.params.busNumber });
        if (!bus) return res.status(404).json({ message: 'Bus not found' });

        if (driverNic) {
            const driver = await Driver.findOne({ nic: driverNic });
            if (!driver) return res.status(404).json({ message: 'Driver not found' });
            bus.driverNic = driverNic;
        }
        if (conductorId) {
            const conductor = await Conductor.findOne({ conductorId: conductorId });
            if (!conductor) return res.status(404).json({ message: 'Conductor not found' });
            bus.conductorId = conductorId;
        }

        bus.seatingCapacity = seatingCapacity || bus.seatingCapacity;
        bus.type = type || bus.type;

        await bus.save();
        res.status(200).json({ message: 'Bus updated successfully', bus });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update bus', details: error.message });
    }
};

// exports.deleteBus = async (req, res) => {
//     try {
//         const bus = await Bus.findOneAndDelete({ busNumber: req.params.busNumber });
//         if (!bus) return res.status(404).json({ message: 'Bus not found' });

//         res.status(200).json({ message: 'Bus deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete bus', details: error.message });
//     }
// };