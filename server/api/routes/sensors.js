const sensorsController = require('../controllers/sensors');

module.exports = (router) => {
	router.get('/sensors', sensorsController.getAll),
		router.post('/sensors', sensorsController.create),
		router.get('/sensors/:id', sensorsController.get),
		router.put('/sensors/:id', sensorsController.update),
		router.delete('/sensors/:id', sensorsController.delete),
		router.get('/sensors/:type/:id', sensorsController.getData),
		router.post('/sensors/:id', sensorsController.postData)
}