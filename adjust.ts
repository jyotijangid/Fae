// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import type { FuncArr1, PH } from './utils/types.ts';
import curryN from './utils/curry_n.ts';

// @types
type Adjust_1<T> = (index: number) => T[];

type Adjust_2<T> = (fn: FuncArr1<T, T>) => T[];

type Adjust_3<T> = (list: T[]) => T[];

type Adjust_2_3 =
  & (<T>(fn: FuncArr1<T, T>) => Adjust_3<T>)
  & (<T>(fn: PH, list: T[]) => Adjust_2<T>)
  & (<T>(fn: FuncArr1<T, T>, list: T[]) => T[]);

type Adjust_1_3<T> =
  & ((index: number) => Adjust_3<T>)
  & ((index: PH, list: T[]) => Adjust_1<T>)
  & ((index: number, list: T[]) => T[]);

type Adjust_1_2<T> =
  & ((index: number) => Adjust_2<T>)
  & ((index: PH, fn: FuncArr1<T, T>) => Adjust_1<T>)
  & ((index: number, fn: FuncArr1<T, T>) => T[]);

type Adjust =
  & ((index: number) => Adjust_2_3)
  & (<T>(index: PH, fn: FuncArr1<T, T>) => Adjust_1_3<T>)
  & (<T>(index: PH, fn: PH, list: T[]) => Adjust_1_2<T>)
  & (<T>(index: number, fn: FuncArr1<T, T>) => Adjust_3<T>)
  & (<T>(index: number, fn: PH, list: T[]) => Adjust_2<T>)
  & (<T>(index: PH, fn: FuncArr1<T, T>, list: T[]) => Adjust_1<T>)
  & (<T>(index: number, fn: FuncArr1<T, T>, list: T[]) => T[]);

function _adjust<T>(index: number, fn: FuncArr1<T, T>, list: T[]) {
  const result = [...list];
  const len = result.length;
  if (index >= len || index < -len) return result;
  index = index < 0 ? len + index : index;
  result[index] = fn(list[index]);
  return result;
}

/**
 * Applies a given function `fn` at given `index` of `list`,
 * returning a new copy of `list` with element at `index` replaced with
 * return value of `fn`.
 *
 *      Fae.adjust(2, Fae.add(1), [0, 1, 2, 3]) // [0, 1, 3, 3]
 *      Fae.adjust(-3, Fae.add(1), [0, 1, 2, 3]) // [0, 2, 2, 3]
 */
export const adjust: Adjust = curryN(3, _adjust);
