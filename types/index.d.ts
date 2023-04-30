type ф = {};

/**
 * Contains all the types for the `unit-test-sentinel` module.
 */
declare namespace Sentinel {
  /**
   * Represents the arbitrary named properties, which will have a unique object type at runtime.
   * We name it explicitly here so that IntelliSense will call them `ф`.
   */
  export type Property = ф;

  /**
   * Represents the created sentinel object, which provides arbitrary unique named properties.
   */
  export type Objects = { [_: string]: Property };

  /**
   * Represents the created sentinel object, which provides random unique named string properties.
   */
  export type Strings = { [_: string]: string }

  /**
   * Represents the exported sentinel object, which produces a creator for objects containing unique named properties.
   */
  export interface Factory {
    /**
     * Creates an object whose purpose is to create uniquely referenced objects as its properties.
     * Useful when you want to compare stubbed values in a function call, but don't care to create any objects as locals.
     * @example
     * const ф = sentinel.create();
     * const prop1 = ф.prop;
     * const prop2 = ф.prop;
     * prop1 === prop2; // true - these will be the exact same object.
     * @returns {Objects}
     */
    create: () => Objects;

    /**
     * Creates an object whose purpose is to create unique random strings.
     * @example
     * const ф = sentinel.random();
     * const s1 = ф.prop;
     * const s2 = ф.prop;
     * s1 === s2; // true - these will be the exact same 12-character string.
     * @returns {Strings}
     */
    random: () => Strings;
  }
}

/**
 * Provides factory methods for creating sentinel objects.
 */
declare const sentinel: Sentinel.Factory;

declare module "unit-test-sentinel" {
  export = sentinel;
}