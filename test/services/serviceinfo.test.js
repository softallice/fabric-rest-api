const assert = require('assert');
const app = require('../../src/app');

describe('\'serviceinfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('serviceinfo');

    assert.ok(service, 'Registered the service');
  });
});
