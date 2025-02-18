// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { Obj, PH, Tests } from './utils/types.ts';
import curryN from './utils/curry_n.ts';

// @types
type WhereAny_2<T> = (testObj: Obj<T>) => boolean;

type WhereAny_1<T> = (specs: Tests<T>) => boolean;

type WhereAny =
  & (<T>(specs: Tests<T>) => WhereAny_2<T>)
  & (<T>(specs: PH, testObj: Obj<T>) => WhereAny_1<T>)
  & (<T>(specs: Tests<T>, testObj: Obj<T>) => boolean);

function _whereAny<T>(specs: Tests<T>, testObj: Obj<T>) {
  for (const key in specs) {
    const pred = specs[key];
    const value = testObj[key];
    if (pred(value)) return true;
  }
  return false;
}

/**
 * Takes a specs objects whose property is a predicate function
 * Each predicate is applied to the value of the corresponding property of the
 * test object. Returns `true` if any of the predicates is satisfied, `false` otherwise.
 * **NOTE** returns `false` if there is no predicated functions
 *
 *      const equals = curry(2, (x: number, y: number) => x === y)
 *      const spec = {x: equals(0), y: equals(20)}
 *      Fae.whereAny(spec, {x: 0, y: 200}) // true
 *      Fae.whereAny(spec, {x: 0, y: 10}) // true
 *      Fae.whereAny(spec, {x: 1, y: 101}) // false
 *      Fae.whereAny(spec, {x: 1, y: 2}) // true
 */
export const whereAny: WhereAny = curryN(2, _whereAny);
