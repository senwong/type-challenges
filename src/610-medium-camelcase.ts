// for-bar-baz -> forBarBaz

import { Equal, Expect } from '@type-challenges/utils'


// foo-bar-baz  => FooBarBaz
type CapitalizeAll<T extends string> = T extends `${infer F}-${infer R}` ? `${Capitalize<F>}${CapitalizeAll<R>}` : Capitalize<T>;

type CamelCase<T extends string> = 
    T extends `-${infer R}` ? CamelCase<R>
    : T extends `${infer F}-${infer R}` ? `${F}${CapitalizeAll<R>}` : T;

type name = 'for---bar-baz';

type Result = CamelCase<name>;



type cases = [
    Expect<Equal<CamelCase<'foo-bar-baz'>, 'fooBarBaz'>>,
    Expect<Equal<CamelCase<'foo-Bar-Baz'>, 'foo-Bar-Baz'>>,
    Expect<Equal<CamelCase<'foo-bar'>, 'fooBar'>>,
    Expect<Equal<CamelCase<'foo_bar'>, 'foo_bar'>>,
    Expect<Equal<CamelCase<'foo--bar----baz'>, 'foo-Bar---Baz'>>,
    Expect<Equal<CamelCase<'a-b-c'>, 'aBC'>>,
    Expect<Equal<CamelCase<'a-b-c-'>, 'aBC-'>>,
    Expect<Equal<CamelCase<'ABC'>, 'ABC'>>,
    Expect<Equal<CamelCase<'-'>, '-'>>,
    Expect<Equal<CamelCase<''>, ''>>,
    Expect<Equal<CamelCase<'😎'>, '😎'>>,
  ]
  