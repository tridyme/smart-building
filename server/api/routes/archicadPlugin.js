const path = require('path');

module.exports = (router) => {
	router.get('/archicadPlugin', (req, res) => {
		res.sendFile(path.join(__dirname + '/static/archicadPlugin.html'));
	})
}