const express = require('express');
const app = express();
const helmet = require('helmet')
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./server/config');
const mongo = require('./server/lib/mongo');
const security = require('./server/lib/security');
const controller = require('./server/controller');

const logErrors = (err, req, res, next) => {
  if(err && err.name === 'UnauthorizedError') {
    res.status(401).send({'error': true, 'message': err.message.toString()});
  } else if(err) {
    console.log('API error', err);
    res.status(500).send({'error': true, 'message': err.toString()});
  } else {
    next();
  }
}

const setCORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Key, Authorization');
  next();
}

app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.all('*', setCORS);
app.use(expressJwt({secret: config.jwtSecretKey}).unless({path: ['/']}));
app.use(security.allowOrDenyRequest);
controller(app);
app.use(logErrors);

const server = app.listen(config.listenPort, () => {
  const serverAddress = server.address();
  console.log(`Server start at ${serverAddress.port} port`)
});
