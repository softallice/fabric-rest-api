// Initializes the `trust` service on path `/trust`
const { Trust } = require('./trust.class');
const createModel = require('../../models/trust.model');
const hooks = require('./trust.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/trust', new Trust(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('trust');

  service.hooks(hooks);
};
