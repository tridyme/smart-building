const mongoose = require('mongoose');

let BuildingSchema = new mongoose.Schema({
	name: String,
	adress: String,
	location: {
		type: {
			type: String,
			enum: ['Polygon'],
			required: true
		},
		coordinates: {
			type: [[[Number]]],
			required: true
		}
	},
	spaces: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Space'
	}]
},
	{ _id: true },
	{ timestamps: true }
);

module.exports = mongoose.model('BuildingSchema', BuildingSchema);