const devices = require('./devices');
const rooms = require('./rooms');

module.exports = (router) => (
	devices(router),
	rooms(router)
);