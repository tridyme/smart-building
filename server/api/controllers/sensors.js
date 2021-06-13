const SensorsService = require('../services/sensors');

module.exports = {
  getAll: async ({ res }) => {
    try {
      const listSensors = await SensorsService.getSensors();
      res.status(200).send(listSensors);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  create: async (req, res) => {
    try {
      const newSensor = req.body;
      const savedSensor = await SensorsService.createSensor(newSensor);
      res.status(200).send(savedSensor);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.params;
      const sensor = await SensorsService.getSensor(id);
      console.log('SENSOR', sensor)
      res.status(200).send(sensor);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;
      const sensor = await SensorsService.updateSensor(id, newData);
      res.status(200).send(sensor);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const sensor = await SensorsService.deleteSensor(id);
      res.status(200).send(sensor);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  getData: async (req, res) => {
    try {
      const { type, id } = req.params;
      console.log('QUERY', req.query)
      const sensor = await SensorsService.getDataSensor(id, type, req.query);
      res.status(200).send(sensor);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  },
  postData: async (req, res) => {
    try {
      const { id } = req.params;
      const sensor = await SensorsService.postDataSensor(id, req.body);
      res.status(200).send(sensor);
    } catch (err) {
      return res.send(500).send({ error: err });
    }
  }
}