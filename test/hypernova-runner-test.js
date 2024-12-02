import { assert, assert as assume } from 'chai';
import sinon from 'sinon';

import hypernova from '../src/index';

describe('the runner', () => {
  it('runs server if window is not defined', () => {
    assume(typeof window === 'undefined');
    const server = sinon.spy();
    hypernova({ server });
    assert.ok(server.calledOnce);
  });

  it('runs client when window exists', () => {
    sinon.define(global, 'window', {});
    const client = sinon.spy();
    hypernova({ client });
    assert.ok(client.calledOnce);
    sinon.restore();
  });
});
