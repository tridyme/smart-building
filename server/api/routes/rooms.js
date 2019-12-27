const roomsController = require('../controllers/rooms');

module.exports = (router) => {
	router.get('/rooms', roomsController.getAll),
	router.post('/rooms', roomsController.create),
	router.get('/rooms/:id', roomsController.get),
	router.put('/rooms/:id', roomsController.update),
	router.delete('/rooms/:id', roomsController.delete),
	router.get('/rooms/:id/devices', roomsController.getAllDevices)
}