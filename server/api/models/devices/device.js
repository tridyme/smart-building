const mongoose = require('mongoose');
const LightControllerSchema = require('./lightController');
const TemperatureAndHumiditySchema = require('./temperatureAndHumidity');


let DeviceSchema = new mongoose.Schema({
		name: String,
		type:  String,
		temperature: { type: Number, default: 0 },
		humidity: { type: Number, default: 0 },
		lightOn: { type: Boolean, default: false },
		data: [{
			temperature: { type: Number, default: 0 },
			humidity: { type: Number, default: 0 },
			lightOn: { type: Boolean, default: false },
			date: { type: Date, default: Date.now() }
		}],
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room'
		},
		date: { type: Date, default: Date.now() }
		// ligthController: [{
    //   type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'LigthController'
    // }],
    // temperatureAndHumidity: [{
    //   type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'TemperatureAndHumidity'
    // }]
	},
	{ _id: true},
	{timestamps: true}
);

DeviceSchema.pre('remove', function () {
  LightControllerSchema.remove({
    _id: { $in: this.ligthController }
	}).exec();
	TemperatureAndHumiditySchema.remove({
    _id: { $in: this.temperatureAndHumidity }
  }).exec();
});

module.exports = mongoose.model('DeviceSchema', DeviceSchema);