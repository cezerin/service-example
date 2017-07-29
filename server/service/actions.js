const api = require('cezerin-client');
const ObjectID = require('mongodb').ObjectID;
const parse = require('../lib/parse');
const mongo = require('../lib/mongo');
const serviceSettings = require('./settings');
const serviceLogs = require('./logs');

const addProduct = async (account) => {
  const settings = await serviceSettings.getSettings(account);

  const newProduct = {
    name: settings.name,
    regular_price: settings.price,
    enabled: !settings.draft
  };

  api.init(settings.api_url, settings.token);
  await api.products.create(newProduct);
  await serviceLogs.addLog(account, 'Product was successfully created');
}

module.exports = {
  addProduct: addProduct
}
