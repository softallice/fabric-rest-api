// Initializes the `serviceinfo` service on path `/serviceinfo`
const { Serviceinfo } = require('./serviceinfo.class');
const createModel = require('../../models/serviceinfo.model');
const hooks = require('./serviceinfo.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/serviceinfo', new Serviceinfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('serviceinfo');

  service.hooks(hooks);
};
