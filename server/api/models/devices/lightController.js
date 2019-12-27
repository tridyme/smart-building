const mongoose = require('mongoose');

let LightControllerSchema = new mongoose.Schema({
		lightOn: Boolean,
	},
	{ _id: true},
	{timestamps: true}
);

module.exports = mongoose.model('LightController', LightControllerSchema);