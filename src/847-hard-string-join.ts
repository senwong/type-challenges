/*
  847 - String Join
  -------
  by Matt Davis (@tl-matt-davis) #hard 
  
  ### Question
  
  Create a type-safe string join utility which can be used like so:
  
  ```ts
  const hyphenJoiner = join('-')
  const result = hyphenJoiner('a', 'b', 'c'); // = 'a-b-c'
  ```
  
  Or alternatively:
  ```ts
  join('#')('a', 'b', 'c') // = 'a#b#c'
  ```
  
  When we pass an empty delimiter (i.e '') to join, we should concat the strings as they are, i.e: 
  ```ts
  join('')('a', 'b', 'c') // = 'abc'
  ```
  
  When only one item is passed, we should get back the original item (without any delimiter added):
  ```ts
  join('-')('a') // = 'a'
  ```
  
  > View on GitHub: https://tsch.js.org/847
*/


/* _____________ Your Code Here _____________ */

type JoinType<T extends string, S extends string[], R extends string = ''> = S extends [infer F, ...infer O] ? F extends string ? O extends string[] ? JoinType<T, O, `${R}${F}${O extends [] ? '' : T}`> : never : never : R;
// type JoinType<T extends string, S extends string[], R extends string = ''> = R;

declare function join<T extends string>(delimiter: T):  <S extends string[]>(...parts: S) => JoinType<T, S>;

type r1 = JoinType<'-', ['a', 'b', 'c']>;
type r2 = typeof hyphenOutput;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

// Edge cases
const noCharsOutput = join('-')();
const oneCharOutput = join('-')('a');
const noDelimiterOutput = join('')('a', 'b', 'c');

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c');
const hashOutput = join('#')('a', 'b', 'c');
const twoCharOutput = join('-')('a', 'b');
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');

type cases = [
    Expect<Equal<typeof noCharsOutput, ''>>,
    Expect<Equal<typeof oneCharOutput, 'a'>>,
    Expect<Equal<typeof noDelimiterOutput, 'abc'>>,
    Expect<Equal<typeof twoCharOutput, 'a-b'>>,
    Expect<Equal<typeof hyphenOutput, 'a-b-c'>>,
    Expect<Equal<typeof hashOutput, 'a#b#c'>>,
    Expect<Equal<typeof longOutput, 'a-b-c-d-e-f-g-h'>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/847/answer
  > View solutions: https://tsch.js.org/847/solutions
  > More Challenges: https://tsch.js.org
*/

