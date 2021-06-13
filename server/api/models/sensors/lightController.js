const mongoose = require('mongoose')
const Sensor = require('../sensor');

let LightControllerSchema = new mongoose.Schema(
  {
    type: String,
    status: [{ type: Boolean, default: false }],
    date: [{ type: Date, default: Date.now() }]
  }
);

module.exports = Sensor.discriminator('LightController', LightControllerSchema);