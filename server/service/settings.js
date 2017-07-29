const ObjectID = require('mongodb').ObjectID;
const parse = require('../lib/parse');
const mongo = require('../lib/mongo');

const getSettings = async (account) => {
  const accountObjectID = new ObjectID(account);
  const docsCount = await mongo.db.collection('settings').find({ account_id: accountObjectID }).count();
  const docExists = docsCount > 0;

  if(docExists){
    const projection = { _id: 0, date_updated: 0, account_id: 0 };
    return mongo.db.collection('settings').findOne({ account_id: accountObjectID }, projection).then(data => changeProperties(data));
  } else {
    return createSettingsObject();
  }
}

const updateSettings = async (account, data) => {
  const accountObjectID = new ObjectID(account);
  const settings = getValidDocumentForUpdate(accountObjectID, data);
  const updateResult = await mongo.db.collection('settings').update(
    { account_id: accountObjectID },
    { $set: settings },
    { upsert: true }
  );
}

const getValidDocumentForUpdate = (accountObjectID, data) => {
  let settings = {
    account_id: accountObjectID,
    api_url: parse.getString(data.api_url),
    token: parse.getString(data.token),
    name: parse.getString(data.name),
    draft: parse.getBooleanIfValid(data.draft, false),
    price: parse.getNumberIfValid(data.price),
    date_updated: new Date()
  };

  return settings;
}

const createSettingsObject = settings => {
  const emptySettings = {
    api_url: '',
    token: '',
    name: 'New product name',
    draft: 0,
    price: 0
  };

  return Object.assign({}, emptySettings, settings);
}

const changeProperties = settings => {
  if (settings) {
    //delete or rename properties
  }
  return createSettingsObject(settings);
}

module.exports = {
  getSettings: getSettings,
  updateSettings: updateSettings
}
