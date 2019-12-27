const RoomSchema = require('../models/room');
const DeviceSchema = require('../models/devices/device');

module.exports = {
  getRooms: () => {
    return RoomSchema.find({});
  },
  createRoom: (newRoom) => {
    return new RoomSchema(newRoom).save();
  },
  getRoom: (_id) => {
    return RoomSchema.findById(_id);
  },
  updateRoom: (_id, newData) => {
    return RoomSchema.findByIdAndUpdate(_id, newData);
  },
  deleteRoom: (_id) => {
    return RoomSchema.findByIdAndRemove(_id);
  },
  getListRoomDevices: (_id) => {
    return DeviceSchema.find({ room: _id });
  }
};