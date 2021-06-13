const sensors = require('./sensors');
const spaces = require('./spaces');

module.exports = (router) => (
	sensors(router),
	spaces(router)
);