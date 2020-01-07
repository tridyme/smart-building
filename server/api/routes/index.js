const devices = require('./devices');
const rooms = require('./rooms');
const archicadPlugin = require('./archicadPlugin');

module.exports = (router) => (
	devices(router),
	rooms(router),
	archicadPlugin(router)
);