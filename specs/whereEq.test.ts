import { describe, it } from './_describe.ts';
import { _, whereEq } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('whereEq', () => {
  const person1 = {
    name: { firstName: 'Bob', lastname: 'Hanks' },
    address: { city: 'LA', state: 'California' },
  };

  const person2 = {
    name: { firstName: 'Bob', lastname: 'South' },
    address: { city: 'LA', state: 'California' },
  };

  const person3 = {
    name: { firstName: 'Tom', lastname: 'Hanks' },
    address: { city: 'New York City', state: 'New York' },
  };

  it('should return true if the test object satisfies the spec otherwise false', () => {
    const spec = { x: 1, y: 2 };
    const test1 = { x: 0, y: 200 };
    const test2 = { x: 0, y: 10 };
    const test3 = { x: 1, y: 101 };
    const test4 = { x: 1, y: 2 };

    eq(whereEq(spec, test1), false);
    eq(whereEq(spec, test2), false);
    eq(whereEq(spec, test3), false);
    eq(whereEq(spec, test4), true);
    eq(whereEq(person1.address, person3.address), false);
    eq(whereEq(person1, person3), false);
    eq(whereEq(person1.address, person2.address), true);
  });

  it('should work if interfaces are different', () => {
    const spec = { x: 100 };
    const spec2 = { w: 1, x: 100, y: 200 };
    const test1 = { x: 20, y: 100, z: 100 };
    const test2 = { w: 1, x: 100, y: 100, z: 100 };
    const test3 = {};
    const test4 = { w: 1, x: 100 };

    eq(whereEq(spec, test1), false);
    eq(whereEq(spec, test2), true);
    eq(whereEq(spec, test3), false);
    eq(whereEq(spec2, test4), false);
  });

  it('should match specs that have undefined properties', () => {
    const spec = { x: undefined };
    const test1 = {};
    const test2 = { x: 1 };

    eq(whereEq(spec, test1), true);
    eq(whereEq(spec, test2), false);
  });

  it('should return false for an empty spec', () => {
    eq(whereEq({}, { a: 1 }), false);
  });

  it('should test curried versions too', () => {
    const spec = { x: 20, z: 'foo' };
    const test1 = { x: 125, y: 100, z: 100 };
    const test2 = { x: 20, z: 'foo' };

    eq(whereEq(spec)(test1), false);
    eq(whereEq(_, test2)(spec), true);
    eq(whereEq(spec, test2), true);
  });
});
