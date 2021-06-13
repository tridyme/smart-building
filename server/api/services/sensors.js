const { fromJS } = require('immutable');
const update = require('immutability-helper');
const SensorSchema = require('../models/sensor');
const LightControllerSchema = require('../models/sensors/lightController');
const TemperatureAndHumiditySchema = require('../models/sensors/temperatureAndHumidity');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

function createNewObjectIdIfNotExists(objectId) {
  return objectId || new ObjectId();
}

module.exports = {
  getSensors: () => {
    return SensorSchema.find({});
  },
  createSensor: (newSensor) => {
    switch (newSensor.type) {
      case 'LightController':
        return new LightControllerSchema(newSensor).save();
      case 'TemperatureAndHumidity':
        return new TemperatureAndHumiditySchema(newSensor).save();
      default:
        return new SensorSchema(newSensor).save();
    }
  },
  getSensor: (_id) => {
    return SensorSchema.findById(_id);
  },
  updateSensor: (_id, newData) => {
    return SensorSchema.findByIdAndUpdate(_id, newData);
  },
  deleteSensor: (_id) => {
    return SensorSchema.findByIdAndRemove(_id);
  },
  getDataSensor: async (id, type, query) => {
    try {
      const sensor = await SensorSchema.findById(id);
      if (id && sensor) {
        if (type === "temperatureAndHumidity") {
          const {
            t,
            h
          } = query;

          const newSensor = update(sensor, {
            temperature: {
              $set: t
            },
            humidity: {
              $set: h
            },
            date: {
              $set: Date.now()
            },
            data: {
              $push: [{
                temperature: t,
                humidity: h,
                date: Date.now()
              }]
            }
          });
          return SensorSchema.findByIdAndUpdate(id, newSensor);
        }
        // if()
      }
      return SensorSchema.find({});
    } catch (err) {
      console.log('Get Data Sensors: ', err)
    }
  },
  postDataSensor: async (id, data) => {
    try {
      const sensor = await SensorSchema.findById(id);
      if (id) {
        switch (sensor.type) {
          case 'LightController':
            return LightControllerSchema(newSensor).save();
          case 'TemperatureAndHumidity':
            const {
              temperature: t,
              humidity: h
            } = data;

            const newSensor = update(sensor, {
              temperature: { $push: [t] },
              humidity: { $push: [h] },
              date: { $push: [Date.now()] }
            });
            return TemperatureAndHumiditySchema.findByIdAndUpdate(id, newSensor);
          default:
            return SensorSchema(newSensor).save();
        }

      }
    } catch (err) {
      console.log('Post Data Sensors: ', err)
    }
  },
};