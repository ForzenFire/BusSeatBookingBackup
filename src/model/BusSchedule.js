const { default: mongoose } = require("mongoose");

const BusScheduleSchema = new mongoose.Schema({
    scheduleId: {type: String, required: true, unique: true},
    routeId: {type: String, ref: 'Route', required: true},
    busId: {type: String, ref: 'Bus', required: true},
    routeDate: {type: Date, required: true},
    startingTime: {type: String, required: true},
    closingTime: {type: String, required: true},
    status: {type: String, enum: ['Scheduled', 'Canceled'], default: 'Scheduled'},
}, {timestamps: true});

module.exports = mongoose.model('BusSchedule', BusScheduleSchema);