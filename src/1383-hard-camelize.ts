/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion
  
  ### Question
  
  Implement Camelize which converts object from snake_case to to camelCase
  
  ```ts
  Camelize<{
    some_prop: string, 
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>
  
  // expected to be
  // {
  //   someProp: string, 
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```
  
  > View on GitHub: https://tsch.js.org/1383
*/


/* _____________ Your Code Here _____________ */

type CamelizeKey<T extends string> = T extends `${infer F}_${infer O}` ? `${Capitalize<F>}${CamelizeKey<O>}` : Capitalize<T>;

type Camelize<T extends Record<string, any>> = {
  [P in keyof T as P extends string ? Uncapitalize<CamelizeKey<P>> : never]: T[P] extends Record<string, any>[] ? CamelizeArray<T[P]>
    : T[P] extends Record<string, any> ? Camelize<T[P]> : T[P]
}

type CamelizeArray<T extends Record<string, any>[]> = T extends [infer F, ...infer O] ? [Camelize<F>, ...CamelizeArray<O>] : [];

type r2 = [{ snake_case: string }] extends Record<string, any> ? 1 : 2;

type r1 = Camelize<{
  some_prop: string, 
  prop: { another_prop: string },
  array: [{ snake_case: string }]
}>

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<
  Camelize<{
    some_prop: string, 
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>,
  {
    someProp: string, 
    prop: { anotherProp: string },
    array: [{ snakeCase: string }]
  }
  >>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/

