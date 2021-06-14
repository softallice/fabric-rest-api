// Initializes the `invoke` service on path `/invoke`
const { Invoke } = require('./invoke.class');
const createModel = require('../../models/invoke.model');
const hooks = require('./invoke.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/invoke', new Invoke(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('invoke');

  service.hooks(hooks);
};
