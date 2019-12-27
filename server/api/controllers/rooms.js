const RoomsService = require('../services/rooms');

module.exports =  {
	getAll: async ({ res }) => {
    try {
			const listRooms = await RoomsService.getRooms();
      res.status(200).send(listRooms);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },
  create: async (req, res) => {
    try {
      const newRoom = req.body;
      const savedRoom = await RoomsService.createRoom(newRoom);
      res.status(200).send(savedRoom);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await RoomsService.getRoom(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const device = await RoomsService.updateRoom(id, newData);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await RoomsService.deleteRoom(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  getAllDevices: async (req, res) => {
    try {
      const { id } = req.params;
      const listRoomDevices = await RoomsService.getListRoomDevices(id);
      res.status(200).send(listRoomDevices);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },
}