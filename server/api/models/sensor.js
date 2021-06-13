const mongoose = require('mongoose');

let SensorSchema = new mongoose.Schema({
	name: String,
	description: String,
	space: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Space'
	},
},
	{ _id: true },
	{ timestamps: true }
);

module.exports = mongoose.model('SensorSchema', SensorSchema);