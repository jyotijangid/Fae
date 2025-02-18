// Copyright (c) 2020 Jozty. All rights reserved. MIT license.

import { nth } from './nth.ts';
import type { InferElementType } from './utils/types.ts';

// @types
type Head = <L extends any[] | string>(functor: L) => InferElementType<L>;

/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 *      Fae.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      Fae.head([]); //=> undefined
 *
 *      Fae.head('abc'); //=> 'a'
 *      Fae.head(''); //=> ''
 */
export const head: Head = nth(0);
