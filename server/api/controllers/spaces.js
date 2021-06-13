const SpacesService = require('../services/spaces');

module.exports = {
  getAll: async ({ res }) => {
    try {
      const listSpaces = await SpacesService.getSpaces();
      res.status(200).send(listSpaces);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    try {
      const newSpace = req.body;
      const savedSpace = await SpacesService.createSpace(newSpace);
      res.status(200).send(savedSpace);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await SpacesService.getSpace(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const device = await SpacesService.updateSpace(id, newData);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const device = await SpacesService.deleteSpace(id);
      res.status(200).send(device);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  getAllSensors: async (req, res) => {
    try {
      const { id } = req.params;
      const listSpaceSensors = await SpacesService.getListSpaceSensors(id);
      res.status(200).send(listSpaceSensors);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
}