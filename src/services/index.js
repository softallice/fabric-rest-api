const users = require('./users/users.service.js');
const email = require('./email/email.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const enroll = require('./enroll/enroll.service.js');
const register = require('./register/register.service.js');
const invoke = require('./invoke/invoke.service.js');
const query = require('./query/query.service.js');
const did = require('./did/did.service.js');
const serviceinfo = require('./serviceinfo/serviceinfo.service.js');
const trust = require('./trust/trust.service.js');
const sign = require('./sign/sign.service.js');
const verify = require('./verify/verify.service.js');
const trustQuery = require('./trust-query/trust-query.service.js');
const trustInvoke = require('./trust-invoke/trust-invoke.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(email);
  app.configure(authManagement);
  app.configure(enroll);
  app.configure(register);
  app.configure(invoke);
  app.configure(query);
  app.configure(did);
  app.configure(serviceinfo);
  app.configure(trust);
  app.configure(sign);
  app.configure(verify);
  app.configure(trustQuery);
  app.configure(trustInvoke);  
};
