import { assert } from 'chai';
import sinon from 'sinon';
import { OG_PROMISE } from './init';
import { requireFresh } from './helper';
import { promiseShimsEnvKey } from '../src/environment';

describe('global Promise modification', () => {
  [true, false].forEach((useShims) => {
    context(`when ${promiseShimsEnvKey}=${useShims}`, () => {
      before(() => {
        sinon.define(process.env, promiseShimsEnvKey, useShims);
        sinon.replace(global, 'Promise', OG_PROMISE);
      });

      after(() => {
        sinon.restore();
      });

      it(`${useShims ? 'replaces' : 'does not replace'} the global Promise object`, () => {
        requireFresh('../src/environment'); // eslint-disable-line global-require
        const replaced = global.Promise !== OG_PROMISE;
        assert(replaced === useShims);
      });
    });
  });
});
