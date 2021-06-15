const assert = require('assert');
const app = require('../../src/app');

describe('\'trust\' service', () => {
  it('registered the service', () => {
    const service = app.service('trust');

    assert.ok(service, 'Registered the service');
  });
});
