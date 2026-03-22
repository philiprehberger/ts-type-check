import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  isString,
  isNumber,
  isBoolean,
  isBigInt,
  isSymbol,
  isFunction,
  isUndefined,
  isNull,
  isNullish,
  isPlainObject,
  isArray,
  isTypedArray,
  isDate,
  isRegExp,
  isError,
  isMap,
  isSet,
  isPromise,
  isIterable,
  isAsyncIterable,
  isEmpty,
} from '../../dist/index.js';

describe('isString', () => {
  it('returns true for strings', () => {
    assert.equal(isString('hello'), true);
    assert.equal(isString(''), true);
  });

  it('returns false for non-strings', () => {
    assert.equal(isString(123), false);
    assert.equal(isString(null), false);
  });
});

describe('isNumber', () => {
  it('returns true for valid numbers', () => {
    assert.equal(isNumber(42), true);
    assert.equal(isNumber(0), true);
    assert.equal(isNumber(Infinity), true);
    assert.equal(isNumber(-3.14), true);
  });

  it('returns false for NaN and non-numbers', () => {
    assert.equal(isNumber(NaN), false);
    assert.equal(isNumber('5'), false);
  });
});

describe('isBoolean', () => {
  it('returns true for booleans', () => {
    assert.equal(isBoolean(true), true);
    assert.equal(isBoolean(false), true);
  });

  it('returns false for non-booleans', () => {
    assert.equal(isBoolean(0), false);
    assert.equal(isBoolean(''), false);
  });
});

describe('isBigInt', () => {
  it('returns true for bigints', () => {
    assert.equal(isBigInt(BigInt(1)), true);
    assert.equal(isBigInt(BigInt(0)), true);
  });

  it('returns false for non-bigints', () => {
    assert.equal(isBigInt(1), false);
  });
});

describe('isSymbol', () => {
  it('returns true for symbols', () => {
    assert.equal(isSymbol(Symbol()), true);
    assert.equal(isSymbol(Symbol('test')), true);
  });

  it('returns false for non-symbols', () => {
    assert.equal(isSymbol('symbol'), false);
  });
});

describe('isFunction', () => {
  it('returns true for functions', () => {
    assert.equal(isFunction(() => {}), true);
    assert.equal(isFunction(function () {}), true);
    assert.equal(isFunction(Math.max), true);
  });

  it('returns false for non-functions', () => {
    assert.equal(isFunction({}), false);
  });
});

describe('isUndefined', () => {
  it('returns true for undefined', () => {
    assert.equal(isUndefined(undefined), true);
  });

  it('returns false for non-undefined', () => {
    assert.equal(isUndefined(null), false);
  });
});

describe('isNull', () => {
  it('returns true for null', () => {
    assert.equal(isNull(null), true);
  });

  it('returns false for non-null', () => {
    assert.equal(isNull(undefined), false);
  });
});

describe('isNullish', () => {
  it('returns true for null and undefined', () => {
    assert.equal(isNullish(null), true);
    assert.equal(isNullish(undefined), true);
  });

  it('returns false for falsy non-nullish values', () => {
    assert.equal(isNullish(0), false);
    assert.equal(isNullish(''), false);
  });
});

describe('isPlainObject', () => {
  it('returns true for plain objects', () => {
    assert.equal(isPlainObject({}), true);
    assert.equal(isPlainObject({ a: 1 }), true);
    assert.equal(isPlainObject(Object.create(null)), true);
  });

  it('returns false for non-plain objects', () => {
    assert.equal(isPlainObject([]), false);
    assert.equal(isPlainObject(null), false);
    assert.equal(isPlainObject(new Date()), false);

    class Foo {}
    assert.equal(isPlainObject(new Foo()), false);
  });
});

describe('isArray', () => {
  it('returns true for arrays', () => {
    assert.equal(isArray([]), true);
    assert.equal(isArray([1, 2, 3]), true);
  });

  it('returns false for non-arrays', () => {
    assert.equal(isArray({}), false);
    assert.equal(isArray('abc'), false);
  });
});

describe('isTypedArray', () => {
  it('returns true for typed arrays', () => {
    assert.equal(isTypedArray(new Uint8Array()), true);
    assert.equal(isTypedArray(new Float64Array()), true);
    assert.equal(isTypedArray(new Int32Array()), true);
  });

  it('returns false for non-typed arrays', () => {
    assert.equal(isTypedArray([]), false);
    assert.equal(isTypedArray(new DataView(new ArrayBuffer(1))), false);
  });
});

describe('isDate', () => {
  it('returns true for valid dates', () => {
    assert.equal(isDate(new Date()), true);
    assert.equal(isDate(new Date('2024-01-01')), true);
  });

  it('returns false for invalid dates and non-dates', () => {
    assert.equal(isDate(new Date('invalid')), false);
    assert.equal(isDate('2024-01-01'), false);
  });
});

describe('isRegExp', () => {
  it('returns true for regexps', () => {
    assert.equal(isRegExp(/test/), true);
    assert.equal(isRegExp(new RegExp('test')), true);
  });

  it('returns false for non-regexps', () => {
    assert.equal(isRegExp('regex'), false);
  });
});

describe('isError', () => {
  it('returns true for errors', () => {
    assert.equal(isError(new Error()), true);
    assert.equal(isError(new TypeError()), true);
    assert.equal(isError(new RangeError('out')), true);
  });

  it('returns false for non-errors', () => {
    assert.equal(isError({ message: 'err' }), false);
  });
});

describe('isMap', () => {
  it('returns true for maps', () => {
    assert.equal(isMap(new Map()), true);
  });

  it('returns false for non-maps', () => {
    assert.equal(isMap({}), false);
  });
});

describe('isSet', () => {
  it('returns true for sets', () => {
    assert.equal(isSet(new Set()), true);
  });

  it('returns false for non-sets', () => {
    assert.equal(isSet([]), false);
  });
});

describe('isPromise', () => {
  it('returns true for native promises', () => {
    assert.equal(isPromise(Promise.resolve()), true);
  });

  it('returns true for thenable objects with catch', () => {
    const thenable = { then: () => {}, catch: () => {} };
    assert.equal(isPromise(thenable), true);
  });

  it('returns false for thenable objects without catch', () => {
    const thenable = { then: () => {} };
    assert.equal(isPromise(thenable), false);
  });

  it('returns false for regular objects', () => {
    assert.equal(isPromise({}), false);
    assert.equal(isPromise(42), false);
  });
});

describe('isIterable', () => {
  it('returns true for iterables', () => {
    assert.equal(isIterable([]), true);
    assert.equal(isIterable('abc'), true);
    assert.equal(isIterable(new Map()), true);
    assert.equal(isIterable(new Set()), true);
  });

  it('returns false for non-iterables', () => {
    assert.equal(isIterable({}), false);
    assert.equal(isIterable(42), false);
    assert.equal(isIterable(null), false);
  });
});

describe('isAsyncIterable', () => {
  it('returns true for async iterables', () => {
    async function* gen() {
      yield 1;
    }
    assert.equal(isAsyncIterable(gen()), true);
  });

  it('returns false for non-async iterables', () => {
    assert.equal(isAsyncIterable([]), false);
    assert.equal(isAsyncIterable({}), false);
  });
});

describe('isEmpty', () => {
  it('returns true for empty values', () => {
    assert.equal(isEmpty(''), true);
    assert.equal(isEmpty([]), true);
    assert.equal(isEmpty({}), true);
    assert.equal(isEmpty(new Map()), true);
    assert.equal(isEmpty(new Set()), true);
    assert.equal(isEmpty(null), true);
    assert.equal(isEmpty(undefined), true);
  });

  it('returns false for non-empty values', () => {
    assert.equal(isEmpty('a'), false);
    assert.equal(isEmpty([1]), false);
    assert.equal(isEmpty({ a: 1 }), false);
    assert.equal(isEmpty(new Map([['a', 1]])), false);
    assert.equal(isEmpty(new Set([1])), false);
  });
});
