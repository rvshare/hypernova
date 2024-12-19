/* eslint func-names:0 no-extra-parens:0  */

import 'airbnb-js-shims';
import Promise from 'bluebird';
import { envIsTrue } from './utils/utils';

const promiseShimsEnvKey = 'HYPERNOVA_PROMISE_SHIMS';
const shouldShimPromise = envIsTrue(process.env[promiseShimsEnvKey]);

const es6methods = ['then', 'catch', 'constructor', 'finally'];
const es6StaticMethods = ['all', 'allSettled', 'any', 'race', 'resolve', 'reject', 'cast', 'try', 'withResolvers', 'isRejected'];

function isNotMethod(name) {
  return !(es6methods.includes(name) || es6StaticMethods.includes(name) || name.charAt(0) === '_');
}

function del(obj) {
  /* eslint no-param-reassign: 0 */
  return (key) => { delete obj[key]; };
}

function toFastProperties(obj) {
  (function () {}).prototype = obj;
}

if (shouldShimPromise) {
  Object.keys(Promise.prototype).filter(isNotMethod).forEach(del(Promise.prototype));
  Object.keys(Promise).filter(isNotMethod).forEach(del(Promise));
  toFastProperties(Promise);
  toFastProperties(Promise.prototype);

  global.Promise = Promise;
}

export { promiseShimsEnvKey, shouldShimPromise as didShimPromise };
