# Unit test sentinel

Provides unique objects for unit tests in JavaScript. Inspired by the [sentinel object](https://docs.python.org/3/library/unittest.mock.html#sentinel) in Python.

It's useful for creating a value that is passed into a function call, but you don't want to keep track of this value in a local variable. Instead, you can ask the sentinel to give you a unique named property that will persist through your test.

## Installation

`npm install --save-dev unit-test-sentinel`

## Usage

Import the module `sentinel` and then create a sentinel object for each test. This example uses Mocha and calls the sentinel object `ф` (which is `U+0444`).

```javascript
import sentinel from 'unit-test-sentinel'

// We'll test this function.
const logAndReturn = (input) => {
  console.log(input);
  return input;
};

describe('logAndReturn', () => {
  let ф;

  beforeEach(() => {
    // Create a sentinel object, which can contain arbirary properties.
    ф = sentinel.create();
  })

  it('returns its input', () => {
    // Pass in a custom input, as a named property.
    const result = logAndReturn(ф.customInput);

    // Expect that the output is the exact same object that was passed in.
    expect(result).to.equal(ф.customInput);
  })
});
```

This example `require()`s the `sentinel` module, uses `assert` for testing, and calls the sentinel object `s`. It also uses the `random` method, calling its object `r`.

```javascript
const sentinel = require('unit-test-sentinel');
const s = sentinel.create();
const r = sentinel.random();

const first = s.hello; // => ¦ф.hello¦
const second = s.hello; // => ¦ф.hello¦
assert(first === second); // ✓

const r1 = s.randomized; // e.g. => randomized-WfQ8S;0{|+)t
const r2 = s.randomized; // => randomized-WfQ8S;0{|+)t
assert(r1 === r2); // ✓

```