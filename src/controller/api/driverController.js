const Driver = require('../../model/Driver');

exports.createDriver = async (req, res) => {
    try {
        const { nic, name, contact, address, licenseNumber } = req.body;
        const driver = new Driver({ nic, name, contact, address, licenseNumber });
        await driver.save();
        res.status(201).json({ message: 'Driver created successfully', driver });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create driver', details: error.message });
    }
};

exports.getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch drivers', details: error.message});
    }
};

exports.getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await Driver.findById(id);
        if(!driver) return res.status(404).json({message: 'Driver not found'});
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch the driver', details: error.message});
    }
};

exports.updateDriver = async (req, res) =>  {
    try {
        const { name, contact, address, licenseNumber } = req.body;
        const driver = await Driver.findOneAndUpdate(
            {nic: req.params.nic},
            {name, contact, address,licenseNumber },
            {new: true}
        );
        if(!driver) return res.status(404).json({message: 'Driver not found'});
        res.status(200).json({message: 'Driver updated Successfully', driver});
    } catch (error) {
        res.status(500).json({error: 'Failed to update Driver', details: error.message});
    }
};