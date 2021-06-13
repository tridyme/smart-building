const spacesController = require('../controllers/spaces');

module.exports = (router) => {
  router.get('/spaces', spacesController.getAll),
    router.post('/spaces', spacesController.create),
    router.get('/spaces/:id', spacesController.get),
    router.put('/spaces/:id', spacesController.update),
    router.delete('/spaces/:id', spacesController.delete),
    router.get('/spaces/:id/sensors', spacesController.getAllSensors)
}