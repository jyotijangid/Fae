import { describe, it } from './_describe.ts';
import { _, dissocPath } from '../mod.ts';
import { eq, strictEq, strictNotEq } from './utils/utils.ts';

describe('dissocPath', () => {
  it('should make a shallow clone of an object, omitting only what is necessary for the path', () => {
    const obj1 = {
      a: { b: 1, c: 2, d: { e: 3 } },
      f: [{ g: 4 }, { h: 5, i: 6, j: { k: 7, l: 8 } }],
      m: 9,
    };
    const obj2 = dissocPath(['f', 1, 'i'], obj1);
    eq(obj2, {
      a: { b: 1, c: 2, d: { e: 3 } },
      f: [{ g: 4 }, { h: 5, j: { k: 7, l: 8 } }],
      m: 9,
    });
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a);
    strictEq(obj2.m, obj1.m);
    strictEq(obj2.f[0], obj1.f[0]);
    strictEq(obj2.f[1].h, obj1.f[1].h);
    strictEq(obj2.f[1].j, obj1.f[1].j);
  });

  it('should not try to omit inner properties that do not exist', () => {
    const obj1 = { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 };
    const obj2 = dissocPath('x/0/z', obj1);
    eq(obj2, { a: 1, b: { c: 2, d: 3 }, e: 4, f: 5 });
    // Note: reference equality below!
    strictEq(obj2.a, obj1.a);
    strictEq(obj2.b, obj1.b);
    strictEq(obj2.f, obj1.f);
  });

  it('should leave an empty object when all properties omitted', () => {
    const obj1 = { a: 1, b: { c: 2 }, d: 3 };
    const obj2 = dissocPath(['b', 'c'], obj1);
    eq(obj2, { a: 1, b: {}, d: 3 });
  });

  it('should leave an empty array when all indexes are omitted', () => {
    const obj1 = { a: 1, b: [2], d: 3 };
    const obj2 = dissocPath(['b', 0], obj1);
    eq(obj2, { a: 1, b: [], d: 3 });
  });

  it('should flatten properties from prototype', () => {
    const F = function () {};
    F.prototype.a = 1;
    // fae-no-check
    // @ts-ignore
    const obj1 = new F();
    obj1.b = { c: 2, d: 3 };
    const obj2 = dissocPath(['b', 'c'], obj1);
    // fae-no-check
    // @ts-ignore
    eq(obj2, { a: 1, b: { d: 3 } });
  });

  it('should accept empty path', () => {
    eq(dissocPath([], { a: 1, b: 2 }), { a: 1, b: 2 });
  });

  it('should allow integer to be used as key for object', () => {
    eq(dissocPath([42], { a: 1, b: 2, 42: 3 }), { a: 1, b: 2 });
  });

  it('should work on curried versions too', () => {
    const a = 'b';
    const b = { a: 1, b: 2, c: 3 };
    const expected = { a: 1, c: 3 };

    eq(dissocPath(a, b), expected);
    eq(dissocPath(a)(b), expected);
    eq(dissocPath(_, b)(a), expected);
  });
  it('should make a shallow clone of an object when the path is empty', () => {
    const obj1 = { a: 1, b: 2 };
    const result = dissocPath([], obj1);
    eq(result, obj1);
    strictNotEq(result, obj1);
  });
});
