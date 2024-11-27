export const OG_PROMISE = global.Promise; // eslint-disable-line import/prefer-default-export

/* eslint-disable import/first */
import 'airbnb-js-shims';
import sinon from 'sinon';
/* eslint-enable import/first */

afterEach(() => {
  sinon.restore();
});
