const mongoose = require('mongoose');

let RoomSchema = new mongoose.Schema({
		name: String,
		// location: String,
		// devices: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Device'
		// }
	},
	{ _id: true},
	{timestamps: true}
);

module.exports = mongoose.model('RoomSchema', RoomSchema);