const assert = require('assert');
const app = require('../../src/app');

describe('\'did\' service', () => {
  it('registered the service', () => {
    const service = app.service('did');

    assert.ok(service, 'Registered the service');
  });
});
