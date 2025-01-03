const mongoose = require('mongoose');

const RouteShema = new mongoose.Schema({
    routeId: {type: String, required: true, unique: true},
    origin: {type: String, required: true},
    destination: {type: String, required: true},
    distance: {type: Number, required: true},
},   {timestamps: true});

module.exports = mongoose.model('Route', RouteShema);