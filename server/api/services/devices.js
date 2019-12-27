const { fromJS } = require('immutable');
const update = require('immutability-helper');
const DeviceSchema = require('../models/devices/device');
const TemperatureSchema = require('../models/devices/device');

module.exports = {
  getDevices: () => {
    return DeviceSchema.find({});
  },
  createDevice: (newDevice) => {
    return new DeviceSchema(newDevice).save();
  },
  getDevice: (_id) => {
    return DeviceSchema.findById(_id);
  },
  updateDevice: (_id, newData) => {
    return DeviceSchema.findByIdAndUpdate(_id, newData);
  },
  deleteDevice: (_id) => {
    return DeviceSchema.findByIdAndRemove(_id);
  },
  getDataDevice: async (id, type, query) => {
    try {
      const device = await DeviceSchema.findById(id);
      if(id && device) {
        if (type === "temperatureAndHumidity") {
          const {
            t,
            h
          } = query;
  
          const newDevice = update(device, {
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
          return DeviceSchema.findByIdAndUpdate(id, newDevice);
        }
        // if()
      }
      return DeviceSchema.find({});
    } catch (err) {
      console.log('Get Data Devices: ', err)
    }
  },
};