const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
    busNumber: {type: String, required: true, unique: true},
    seatingCapacity: {type: Number, required: true},
    type: {type: String, enum: ['AC', 'Non-AC'], required:true},
    driverNic: {type: String, ref: 'Driver', required: true},
    conductorId: {type:String, ref: 'Conductor', required: true},
}, {timestamps: true });

module.exports = mongoose.model('Bus', BusSchema);