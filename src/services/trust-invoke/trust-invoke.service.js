// Initializes the `trustInvoke` service on path `/trust-invoke`
const { TrustInvoke } = require('./trust-invoke.class');
const createModel = require('../../models/trust-invoke.model');
const hooks = require('./trust-invoke.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trust-invoke', new TrustInvoke(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trust-invoke');

  service.hooks(hooks);
};
