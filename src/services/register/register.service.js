// Initializes the `register` service on path `/register`
const { Register } = require('./register.class');
const createModel = require('../../models/register.model');
const hooks = require('./register.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/register', new Register(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('register');

  service.hooks(hooks);
};
