const users = require('./users/users.service.js');
const enroll = require('./enroll/enroll.service.js');
const register = require('./register/register.service.js');
const invoke = require('./invoke/invoke.service.js');
const query = require('./query/query.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(enroll);
  app.configure(register);
  app.configure(invoke);
  app.configure(query);
};
