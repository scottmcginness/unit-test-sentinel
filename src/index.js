import { inspect } from 'util';

const showAs = (name) => () => `¦ф.${name}¦`;

const sentinelError = new Error(showAs('Error')());
sentinelError.stack = null;

const chars = [...Array(127 - 33).keys()].map((_) => String.fromCharCode(33 + _)).join('');
const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

/**
 * Creates an object whose purpose is to create uniquely referenced objects as its properties.
 * Useful when you want to compare stubbed values in a function call, but don't care to create any objects as locals.
 * @example
 * const ф = sentinel.create();
 * const prop1 = ф.prop;
 * const prop2 = ф.prop;
 * prop1 === prop2; // true - these will be the exact same object.
 * @returns {Sentinel.Objects}
 */
const create = () => new Proxy({}, {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  get: (target, name) => target[name] ??= name === String(Error)
    ? sentinelError
    : Object.create({
      constructor: { name: showAs(name)() },
      toString: showAs(name),
      inspect: showAs(name),
      [inspect.custom]: showAs(name)
    }),
  set: (target, name, value) => {
    // eslint-disable-next-line no-param-reassign
    target[name] = value;
    return true;
  }
});

/**
 * Creates an object whose purpose is to create unique random strings.
 * @example
 * const ф = sentinel.random();
 * const s1 = ф.prop;
 * const s2 = ф.prop;
 * s1 === s2; // true - these will be the exact same 12-character string.
 * @returns {Sentinel.Strings}
 */
const random = () => new Proxy({}, {
  // eslint-disable-next-line no-return-assign, no-param-reassign
  get: (target, name) => target[name] ??= `${name}-${Array(12).fill(0).map(randomChar).join('')}`,
  set: (target, name, value) => {
    // eslint-disable-next-line no-param-reassign
    target[name] = value;
    return true;
  }
});

/**
 * Provides factory methods for creating sentinel objects.
 * @type {Sentinel.Factory}
 */
export default { create, random };
