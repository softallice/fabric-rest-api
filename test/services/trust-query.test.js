const assert = require('assert');
const app = require('../../src/app');

describe('\'trustQuery\' service', () => {
  it('registered the service', () => {
    const service = app.service('trust-query');

    assert.ok(service, 'Registered the service');
  });
});
