const DevicesService = require('../services/devices');

module.exports =  {
	getAll: async ({ res }) => {
    try {
      const listDevices = await DevicesService.getDevices();
      res.status(200).send(listDevices);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },
  create: async (req, res) => {
    try {
      const newDevice = req.body;
      const savedDevice = await DevicesService.createDevice(newDevice);
      res.status(200).send(savedDevice);
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await DevicesService.getDevice(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const device = await DevicesService.updateDevice(id, newData);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await DevicesService.deleteDevice(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
  getData: async (req, res) => {
    try {
      const { type, id } = req.params;
      const device = await DevicesService.getDataDevice(id, type, req.query);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({error: err});
    }
  },
}