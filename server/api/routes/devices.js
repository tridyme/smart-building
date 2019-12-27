const devicesController = require('../controllers/devices');

module.exports = (router) => {
	router.get('/devices', devicesController.getAll),
	router.post('/devices', devicesController.create),
	router.get('/devices/:id', devicesController.get),
	router.put('/devices/:id', devicesController.update),
	router.delete('/devices/:id', devicesController.delete),
	router.get('/devices/:type/:id', devicesController.getData)
}