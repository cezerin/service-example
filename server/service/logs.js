const mongo = require('../lib/mongo');
const ObjectID = require('mongodb').ObjectID;

const getLogs = async (account) => {
  const accountObjectID = new ObjectID(account);
  return mongo.db.collection('logs')
  .find({ account_id: accountObjectID })
  .project({ date: 1, message: 1 })
  .sort({ date: -1 })
  .limit(100)
  .toArray();
}

const addLog = async (account, message) => {
  const accountObjectID = new ObjectID(account);
  await mongo.db.collection('logs').insertOne({
    account_id: accountObjectID,
    date: new Date(),
    message: message
  });
}

module.exports = {
  getLogs: getLogs,
  addLog: addLog
}
