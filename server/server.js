const express = require('express');
const routes = require('./api/routes/');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const router = express.Router();

const connectDatabase = async() => {
	const options = {
		useNewUrlParser: true,
    useUnifiedTopology: true,
	}
	const urlDatabase = "mongodb://triazur:1850AbAb$@ds161346.mlab.com:61346/iot_test"
	await mongoose.connect(urlDatabase, options);
};

connectDatabase().catch(error => console.error('Try to verify your mongodb url !', error));

/** set up routes {API Endpoints} */
routes(router);

/** set up middlewares */
server.use(cors());
server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(helmet());

server.use((req, res, next) => {
  req.setTimeout(0);
  next();
});
server.use('/', router);

const hostname = '192.168.1.20';
const port = process.env.PORT || 5000;

server.listen(port, hostname, () => {
	console.log(`Server started at http://${hostname}:${port}`)
});