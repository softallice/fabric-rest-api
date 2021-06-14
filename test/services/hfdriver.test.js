const assert = require('assert');
const app = require('../../src/app');

describe('\'hfdriver\' service', () => {
  it('registered the service', () => {
    const service = app.service('hfdriver');

    assert.ok(service, 'Registered the service');
  });
});
