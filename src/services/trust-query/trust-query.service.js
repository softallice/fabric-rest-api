// Initializes the `trustQuery` service on path `/trust-query`
const { TrustQuery } = require('./trust-query.class');
const createModel = require('../../models/trust-query.model');
const hooks = require('./trust-query.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trust-query', new TrustQuery(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trust-query');

  service.hooks(hooks);
};
