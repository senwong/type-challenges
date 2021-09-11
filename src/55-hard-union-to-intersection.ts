/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `UnionToIntersection<U>`
  
  For example
  
  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```
  
  > View on GitHub: https://tsch.js.org/55
*/


/* _____________ Your Code Here _____________ */
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type UnionToIntersection<U> = (U extends unknown ? ((arg: U) => void) : never) extends ((arg: infer A) => void) ? A : never ;


type Test<T> = T extends { a: infer U, b: infer U} ? U : never;

type r1 = Test<{a: string, b: string}>;
type r2 = Test<{a: string, b: number}>;


type Result = UnionToIntersection<(() => 'foo') | ((i: 42) => true)>;

type Animal = { eat: () => void };
type Dog = { eat: () => void, bark: () => void };
type FuncAnimal = (arg: Animal) => void;
type FuncDog = (arg: Dog) => void;
let funcAnimal: FuncAnimal = (animal: Animal) => animal.eat();
let funcDog: FuncDog = (dog: Dog) => {
  dog.eat();
  dog.bark();
}
funcAnimal = funcDog; // Error

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
    Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
    Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/

