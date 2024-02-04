const mongoose = require('mongoose');

const alertchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    location: {
        latitude: Number,
        longitude: Number,
    },
    alertType: String,
}, { timestamps: true });

const Alert = mongoose.model('alerts', alertchema);

exports.Alert = Alert;