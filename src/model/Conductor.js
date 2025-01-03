const mongoose = require('mongoose');

const ConductorSchema = new mongoose.Schema({
    nic: {type: String, required: true, unique: true},
    conductorId: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    contact: {type: String, required: true},
    address: {type: String, required: true},
}, {timestamps: true });

module.exports = mongoose.model('Conductor', ConductorSchema);