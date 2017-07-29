const serviceSettings = require('./service/settings');
const serviceLogs = require('./service/logs');
const serviceActions = require('./service/actions');

const registerRoutes = (router) => {
  router.get('/', getHome);
  router.get('/settings', getSettings);
  router.post('/settings', updateSettings);
  router.get('/logs', getLogs);
  router.post('/add', addProduct);
}

const getHome = async (req, res, next) => {
  res.send('Cezerin Service Example');
}

const getSettings = async (req, res, next) => {
  const settings = await serviceSettings.getSettings(req.user.account);
  res.send(settings);
}

const updateSettings = async (req, res, next) => {
  const settings = req.body;
  await serviceSettings.updateSettings(req.user.account, settings);
  res.end();
}

const getLogs = async (req, res, next) => {
  const logs = await serviceLogs.getLogs(req.user.account);
  res.send(logs);
}

const addProduct = async (req, res, next) => {
  await serviceActions.addProduct(req.user.account);
  res.end();
}

module.exports = registerRoutes;
