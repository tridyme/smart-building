const mongoose = require('mongoose')
const Sensor = require('../sensor');

let TemperatureAndHumiditySchema = new mongoose.Schema(
  {
    type: String,
    temperature: [{ type: Number, default: 0 }],
    humidity: [{ type: Number, default: 0 }],
    date: [{ type: Date, default: Date.now() }]
  }
);

module.exports = Sensor.discriminator('TemperatureAndHumidity', TemperatureAndHumiditySchema);