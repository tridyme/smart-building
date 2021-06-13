const SpaceSchema = require('../models/space');
const SensorSchema = require('../models/sensor');

module.exports = {
  getSpaces: () => {
    return SpaceSchema.find({});
  },
  createSpace: (newSpace) => {
    return new SpaceSchema(newSpace).save();
  },
  getSpace: (_id) => {
    return SpaceSchema.findById(_id);
  },
  updateSpace: (_id, newData) => {
    return SpaceSchema.findByIdAndUpdate(_id, newData);
  },
  deleteSpace: (_id) => {
    return SpaceSchema.findByIdAndRemove(_id);
  },
  getListSpaceSensors: (_id) => {
    return SensorSchema.find({ space: _id });
  }
};