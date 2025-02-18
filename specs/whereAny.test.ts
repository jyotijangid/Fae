import { describe, it } from './_describe.ts';
import { _, curry, whereAny } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('whereAny', () => {
  const equals = curry(2, (x: number, y: number) => x === y);
  const specP = {
    name: { firstName: equals('Bob'), lastname: equals('Hanks') },
    address: { city: equals('LA'), state: equals('California') },
  };

  const person1 = {
    name: { firstName: 'Bob', lastname: 'South' },
    address: { city: 'LA', state: 'California' },
  };

  const person2 = {
    name: { firstName: 'Tom', lastname: 'Root' },
    address: { city: 'New York City', state: 'New York' },
  };

  it('should return true if the test object satisfies the spec', () => {
    const spec = { x: equals(0), y: equals(2) };
    const test1 = { x: 0, y: 200 };
    const test2 = { x: 0, y: 10 };
    const test3 = { x: 1, y: 101 };
    const test4 = { x: 1, y: 2 };

    eq(whereAny(spec, test1), true);
    eq(whereAny(spec, test2), true);
    eq(whereAny(spec, test3), false);
    eq(whereAny(spec, test4), true);
    eq(whereAny(specP.name, person1.name), true);
    eq(whereAny(specP.name, person2.name), false);
  });

  it('should not need the spec and the test object to have the same interface (the test object will have a superset of the specs properties)', () => {
    const spec = { x: equals(100) };
    const test1 = { x: 20, y: 100, z: 100 };
    const test2 = { w: 1, x: 100, y: 100, z: 100 };

    eq(whereAny(spec, test1), false);
    eq(whereAny(spec, test2), true);
  });

  it('should match specs that have undefined properties', () => {
    const spec = { x: equals(undefined) };
    const test1 = {};
    const test2 = { x: null };
    const test3 = { x: undefined };
    const test4 = { x: 1 };

    eq(whereAny(spec, test1), true);
    eq(whereAny(spec, test2), false);
    eq(whereAny(spec, test3), true);
    eq(whereAny(spec, test4), false);
  });

  it('should return false for an empty spec', () => {
    eq(whereAny({}, { a: 1 }), false);
  });

  it('should match inherited properties', () => {
    const spec = {
      toString: equals(Object.prototype.toString),
      valueOf: equals(null),
    };

    eq(whereAny(spec, {}), true);
  });

  it('should test curried versions too', () => {
    const spec = { x: equals(20), z: equals('foo') };
    const test1 = { x: 200, y: 100, z: 100 };
    const test2 = { x: 10, z: 'foo' };

    eq(whereAny(spec)(test1), false);
    eq(whereAny(_, test2)(spec), true);
    eq(whereAny(spec, test2), true);
  });
});
