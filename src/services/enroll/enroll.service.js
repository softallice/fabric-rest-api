// Initializes the `enroll` service on path `/enroll`
const { Enroll } = require('./enroll.class');
const createModel = require('../../models/enroll.model');
const hooks = require('./enroll.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/enroll', new Enroll(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('enroll');

  service.hooks(hooks);
};
