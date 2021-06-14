const assert = require('assert');
const app = require('../../src/app');

describe('\'enroll\' service', () => {
  it('registered the service', () => {
    const service = app.service('enroll');

    assert.ok(service, 'Registered the service');
  });
});
