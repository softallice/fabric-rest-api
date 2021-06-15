// Initializes the `did` service on path `/did`
const { Did } = require('./did.class');
const createModel = require('../../models/did.model');
const hooks = require('./did.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/did', new Did(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('did');

  service.hooks(hooks);
};
