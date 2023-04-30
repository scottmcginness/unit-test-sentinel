import { deepEqual } from '@sinonjs/samsam';
import chai, { expect } from 'chai';
import { inspect } from 'util';

import sentinel from '../src';

chai.should();

describe('sentinel', () => {
  describe('create', () => {
    /** @type {Sentinel.Objects} */
    let ф;

    beforeEach(() => {
      ф = sentinel.create();
    });

    it('makes an object that is reference equal to a copy of itself', () => {
      const first = ф.o1;
      const copy = ф.o1;

      (first === copy).should.be.true;
    });

    it('makes an object that is not reference-equal to a different one', () => {
      const first = ф.o1;
      const second = ф.o2;

      (first === second).should.be.false;
    });

    it('makes an object that is chai-equal to a copy of itself', () => {
      const first = ф.o1;
      const copy = ф.o1;

      first.should.equal(copy);
    });

    it('makes an object that is not chai-equal to a different one', () => {
      const first = ф.o1;
      const second = ф.o2;

      first.should.not.equal(second);
    });

    it('makes an object that is chai-eql to a copy of itself', () => {
      const first = ф.o1;
      const copy = ф.o1;

      first.should.eql(copy);
    });

    it('makes an object that is not chai-eql to a different one', () => {
      const first = ф.o1;
      const second = ф.o2;

      first.should.not.eql(second);
    });

    it('makes an object that is deep-equal to a copy of itself', () => {
      const first = ф.o1;
      const copy = ф.o1;

      deepEqual(first, copy).should.be.true;
    });

    it('makes an object that is not deep-equal to a different one', () => {
      const first = ф.o1;
      const second = ф.o2;

      deepEqual(first, second).should.be.false;
    });

    it('has a constructor name', () => {
      const obj = ф.o1;

      obj.constructor.name.should.equal('¦ф.o1¦');
    });

    it('converts to a string', () => {
      const obj = ф.o1;

      obj.toString().should.equal('¦ф.o1¦');
    });

    it('has an inspect method for string representation', () => {
      const obj = ф.o1;

      obj.inspect().should.equal('¦ф.o1¦');
    });

    it('has a custom inspect method for string representation used by the inspect module', () => {
      const obj = ф.o1;

      inspect(obj).should.equal('¦ф.o1¦');
      obj[inspect.custom].should.be.a('function');
      obj[inspect.custom]().should.equal('¦ф.o1¦');
    });

    it('retains custom set values', () => {
      const local = {};
      ф.obj = local;

      ф.obj.should.equal(local);
    });

    it('returns a static error object when given the error constructor function', () => {
      const error = ф[Error];
      error.should.equal(ф[Error]);
      error.should.be.an('Error');
      error.message.should.equal('¦ф.Error¦');
      error.toString().should.equal('Error: ¦ф.Error¦');
      expect(error.stack).to.be.null;
    });

    it('does not return an error object when given the name "Error".', () => {
      const error = ф.Error;
      error.should.not.equal(ф[Error]);
    });
  });

  describe('random', () => {
    /** @type {Sentinel.Strings} */
    let ф;

    beforeEach(() => {
      ф = sentinel.random();
    });

    it('makes a string starting with the property name', () => {
      const r1 = ф.random1;
      const r2 = ф.random2;

      r1.should.match(/^random1-/);
      r2.should.match(/^random2-/);
    });

    it('makes a string ending with a standard number of suffix characters', () => {
      const first = ф.firstObj;
      const second = ф.secondObj;

      first.should.have.length(21);
      second.should.have.length(22);
    });

    it('makes a string consisting of random suffix characters', () => {
      const objs = [...Array(10_000).keys()].map((i) => ф[`r${i}`]);

      objs.should.all.match(/-[!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_`a-z{|}~]{12}$/);
    });

    it('retains the random string once requested', () => {
      const first = ф.o1;
      const copy = ф.o1;

      (first === copy).should.be.true;
    });

    it('retains custom set values', () => {
      const local = 'my random string';
      ф.obj = local;

      ф.obj.should.equal(local);
    });
  });
});
