const mongoose = require('mongoose');

let TemperatureAndHumiditySchema = new mongoose.Schema({
		temperature: Number,
		humidity: Number,
	},
	{ _id: true},
	{timestamps: true}
);

module.exports = mongoose.model('TemperatureAndHumidity', TemperatureAndHumiditySchema);