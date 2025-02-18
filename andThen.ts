// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import curryN from './utils/curry_n.ts';
import type { Func, PH } from './utils/types.ts';
import { assertPromise } from './utils/assert.ts';

// @types
type AndThen_2 = (p: any) => PromiseLike<any>;

type AndThen_1 = (f: Func) => PromiseLike<any>;

type AndThen =
  & ((f: Func) => AndThen_2)
  & ((a: PH, p: any) => AndThen_1)
  & ((f: Func, p: any) => PromiseLike<any>);

function _andThen(f: Func, p: any) {
  assertPromise('andThen', p);
  return p.then(f);
}

/**
 * Returns the result of applying the onSuccess function to the value inside
 * a successfully resolved promise. This is useful for working with promises
 * inside function compositions.
 */
export const andThen: AndThen = curryN(2, _andThen);
