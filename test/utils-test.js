import { assert } from 'chai';

import { envIsTrue, envIsFalse } from '../src/utils/utils';

const shouldBeTrue = ['TRUE', 'true', '1', 1, true, 2];
const shouldBeFalse = ['false', 'FALSE', 'arbitrary_string', 0, '0'];

describe('envIsTrue', () => {
  shouldBeTrue.forEach((value) => {
    it(`envIsTrue(${value}) === true`, () => {
      assert(envIsTrue(value) === true);
    });
  });

  shouldBeFalse.forEach((value) => {
    it(`envIsTrue(${value}) === false`, () => {
      assert(envIsTrue(value) === false);
    });
  });
});

describe('envIsFalse', () => {
  shouldBeFalse.forEach((value) => {
    it(`envIsFalse(${value}) === true`, () => {
      assert(envIsFalse(value) === true);
    });
  });

  shouldBeTrue.forEach((value) => {
    it(`envIsFalse(${value}) === false`, () => {
      assert(envIsFalse(value) === false);
    });
  });
});
