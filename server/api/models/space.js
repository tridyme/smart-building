const mongoose = require('mongoose');

let SpaceSchema = new mongoose.Schema({
	name: String,
	// location: String,
	// devices: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'Device'
	// }
},
	{ _id: true },
	{ timestamps: true }
);

module.exports = mongoose.model('SpaceSchema', SpaceSchema);