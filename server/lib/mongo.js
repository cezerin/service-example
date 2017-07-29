const settings = require('../config');
const mongo = require('mongodb').MongoClient;
const mongodbConnection = settings.mongodbServerUrl;

const CONNECT_OPTIONS = {
  reconnectTries: 3600,
  reconnectInterval: 1000
}

// Initialize connection once
mongo.connect(mongodbConnection, CONNECT_OPTIONS, (err, database) => {
  if(err){
    console.log('Failed connecting to MongoDB. ' + err.message);
  } else {
    module.exports.db = database;
    console.log('Successfully connected to MongoDB')
  }
});
