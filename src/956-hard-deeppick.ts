/*
  956 - DeepPick
  -------
  by hiroya iizuka (@hiroyaiizuka) #hard #deep
  
  ### Question
  
  Implement a type DeepPick, that extends Utility types `Pick`.
  A type takes two arguments.
  
  
  For example:
  
  ```
  
  type obj = {
    name: 'hoge', 
    age: 20,
    friend: {
      name: 'fuga',
      age: 30,
      family: {
        name: 'baz',  
        age: 1 
      }
    }
  }
  
  type T1 = DeepPick<obj, 'name'>   // { name : 'hoge' }
  type T2 = DeepPick<obj, 'name' | 'friend.name'>  // { name : 'hoge' } & { friend: { name: 'fuga' }}
  type T3 = DeepPick<obj, 'name' | 'friend.name' |  'friend.family.name'>  // { name : 'hoge' } &  { friend: { name: 'fuga' }} & { friend: { family: { name: 'baz' }}}
  
  ```
  
  > View on GitHub: https://tsch.js.org/956
*/


/* _____________ Your Code Here _____________ */

type UnionToIntersection<K> = (K extends any ? (arg: K) => void : never) extends (arg: infer U) => void ? U : never;;

type Get<Target extends Record<string, any>, K extends string> = K extends ''
  ? unknown
  : K extends `${infer F}.${infer O}`
    ? {[P in F]: Get<Target[F], O>}
    : {[P in K]: Target[K]};

type DeepPick<T, K extends string> = UnionToIntersection<K extends string ? Get<T, K> : never>;

type r1 = DeepPick<Obj, 'a' | 'obj.e'>;


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type Obj = {
  a: number,
  b: string,
  c:  boolean,
  obj: {
    d: number,
    e: string,
    f:  boolean,
    obj2: {
      g: number,
      h: string,
      i: boolean,
    }
  },
  obj3: {
    j: number,
    k: string,
    l: boolean,
  }
}

type cases = [
  Expect<Equal<DeepPick<Obj, ''>, unknown >>,
  Expect<Equal<DeepPick<Obj, 'a'>, { a: number }>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e'>, { a: number } & { obj: { e: string }}>>,
  Expect<Equal<DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'>, { a: number } & { obj: { e: string }} & { obj: { obj2: { i: boolean } }}>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/956/answer
  > View solutions: https://tsch.js.org/956/solutions
  > More Challenges: https://tsch.js.org
*/

