const assert = require('assert');
const app = require('../../src/app');

describe('\'trustInvoke\' service', () => {
  it('registered the service', () => {
    const service = app.service('trust-invoke');

    assert.ok(service, 'Registered the service');
  });
});
