const assert = require('assert');
const app = require('../../src/app');

describe('\'invoke\' service', () => {
  it('registered the service', () => {
    const service = app.service('invoke');

    assert.ok(service, 'Registered the service');
  });
});
