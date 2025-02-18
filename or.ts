// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { PH } from './utils/types.ts';

// @types
type Or_2 = (b: unknown) => boolean;

type Or_1 = (a: unknown) => boolean;

type Or =
  & ((a: unknown) => Or_2)
  & ((a: PH, b: unknown) => Or_1)
  & ((a: unknown, b: unknown) => boolean);

function _or(a: unknown, b: unknown) {
  return Boolean(a || b);
}

/**
 * Returns `true` if one or both of its arguments are `true`. Returns `false`
 * if both arguments are `false`.
 *
 *      Fae.or(true, true)    //=> true
 *      Fae.or(true, false)   //=> true
 *      Fae.or(false, true)   //=> true
 *      Fae.or(false, false)  //=> false
 */
export const or: Or = curryN(2, _or);
