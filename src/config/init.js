const http = require('http');
const express = require('express');
const httpProxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const dotenv = require("dotenv-safe");
const port = process.env.PORT || 3000;

dotenv.load();
const app = express();
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const routes = require('../app/routes/index');
const server = http.createServer(app);

routes(app);
server.listen(port, function(){
	console.log('API server started on port: ' + port);
});

module.exports = app;