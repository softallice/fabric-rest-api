// Initializes the `sign` service on path `/sign`
const { Sign } = require('./sign.class');
const createModel = require('../../models/sign.model');
const hooks = require('./sign.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sign', new Sign(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sign');

  service.hooks(hooks);
};
