import { describe, it } from './_describe.ts';
import { anyPass } from '../mod.ts';
import { eq } from './utils/utils.ts';

describe('anyPass', () => {
  const odd = (n: number) => (n & 1) == 1;
  const gt20 = (n: number) => n > 20;
  const lt5 = (n: number) => n < 5;
  const plusEq = (w: number, x: number, y: number, z: number) =>
    w + x === y + z;

  it('should report whether any predicates are satisfied by a given value', () => {
    const ok = anyPass([odd, gt20, lt5]);
    eq(ok(7), true);
    eq(ok(9), true);
    eq(ok(10), false);
    eq(ok(18), false);
    eq(ok(3), true);
    eq(ok(22), true);
    eq(anyPass([odd, lt5, plusEq])(6, 7, 8, 9), false);
    eq(anyPass([odd, lt5, plusEq])(6)(7)(8)(9), false);
  });

  it('should return false for an empty predicate list', () => {
    eq(anyPass([])(3), false);
  });
});
