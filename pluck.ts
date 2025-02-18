// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { FuncArr1, Obj, PH } from './utils/types.ts';
import { map } from './map.ts';
import { prop } from './prop.ts';
import type { Prop } from './prop.ts';

// @types
type Pluck_2 = <T>(list: Obj<T>[]) => T[];

type Pluck_1<T> = (p: Prop) => T[];

type Pluck =
  & ((p: Prop) => Pluck_2)
  & (<T>(p: PH, list: Obj<T>[]) => Pluck_1<T>)
  & (<T>(p: Prop, list: Obj<T>[]) => T[]);

function _pluck<T>(p: Prop, list: Obj<T>[]): T[] {
  return map(prop(p) as FuncArr1<Obj<T>, T>, list);
}

/**
 * Returns a new list by plucking the same named property off all objects in
 * the list supplied.
 *
 *      let getAges = Fae.pluck('age')
 *      getAges([{name: 'shubham', age: 22}, {name: 'shivam', age: 23}]) //=> [22, 23]
 *
 *      Fae.pluck(0, [[1, 2], [3, 4]])               //=> [1, 3]
 *      Fae.pluck('val', {a: {val: 3}, b: {val: 5}}) //=> {a: 3, b: 5}
 */
export const pluck: Pluck = curryN(2, _pluck);
