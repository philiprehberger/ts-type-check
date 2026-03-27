# @philiprehberger/type-check

[![CI](https://github.com/philiprehberger/ts-type-check/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-type-check/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/type-check)](https://www.npmjs.com/package/@philiprehberger/type-check)
[![License](https://img.shields.io/github/license/philiprehberger/ts-type-check)](LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-GitHub%20Sponsors-ec6cb9)](https://github.com/sponsors/philiprehberger)

Runtime type checking utilities with TypeScript type guards — typeof on steroids

## Installation

```bash
npm install @philiprehberger/type-check
```

## Usage

### Basic Guards

```ts
import { isString, isNumber, isPlainObject } from '@philiprehberger/type-check';

isString('hello'); // true
isString(42);      // false

isNumber(3.14);    // true
isNumber(NaN);     // false

isPlainObject({ a: 1 }); // true
isPlainObject([]);        // false
```

### Type Narrowing

```ts
import { isString, isNumber } from '@philiprehberger/type-check';

function format(value: unknown): string {
  if (isString(value)) {
    return value.toUpperCase(); // TypeScript knows value is string
  }
  if (isNumber(value)) {
    return value.toFixed(2); // TypeScript knows value is number
  }
  return String(value);
}
```

### isEmpty

```ts
import { isEmpty } from '@philiprehberger/type-check';

isEmpty('');          // true
isEmpty([]);          // true
isEmpty({});          // true
isEmpty(new Map());   // true
isEmpty(null);        // true

isEmpty('hello');     // false
isEmpty([1, 2]);      // false
isEmpty({ a: 1 });   // false
```

## API

| Function | Returns `true` for |
| --- | --- |
| `isString(value)` | `string` values |
| `isNumber(value)` | `number` values (excludes `NaN`) |
| `isBoolean(value)` | `boolean` values |
| `isBigInt(value)` | `bigint` values |
| `isSymbol(value)` | `symbol` values |
| `isFunction(value)` | Functions |
| `isUndefined(value)` | `undefined` |
| `isNull(value)` | `null` |
| `isNullish(value)` | `null` or `undefined` |
| `isPlainObject(value)` | Plain objects (`{}`, `Object.create(null)`) |
| `isArray(value)` | Arrays |
| `isTypedArray(value)` | Typed arrays (`Uint8Array`, `Float64Array`, etc.) |
| `isDate(value)` | Valid `Date` instances |
| `isRegExp(value)` | `RegExp` instances |
| `isError(value)` | `Error` instances (including subclasses) |
| `isMap(value)` | `Map` instances |
| `isSet(value)` | `Set` instances |
| `isPromise(value)` | `Promise` instances or thenables with `catch` |
| `isIterable(value)` | Objects with `Symbol.iterator` |
| `isAsyncIterable(value)` | Objects with `Symbol.asyncIterator` |
| `isEmpty(value)` | Empty strings, arrays, objects, maps, sets, or nullish |

## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
