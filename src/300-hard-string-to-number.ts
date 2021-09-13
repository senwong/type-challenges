/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #hard #template-literal
  
  ### Question
  
  Convert a string literal to a number, which behaves like `Number.parseInt`.
  
  > View on GitHub: https://tsch.js.org/300
*/


/* _____________ Your Code Here _____________ */

type DigitalMap = {
  '0': [],
  '1': [1],
  '2': [1, ...DigitalMap['1']],
  '3': [1, ...DigitalMap['2']],
  '4': [1, ...DigitalMap['3']],
  '5': [1, ...DigitalMap['4']],
  '6': [1, ...DigitalMap['5']],
  '7': [1, ...DigitalMap['6']],
  '8': [1, ...DigitalMap['7']],
  '9': [1, ...DigitalMap['8']],
}

type Make10Array<T extends any[]> = [
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T,
  ...T
]

type ToNumber<S extends string, L extends any[] = []> = S extends `${infer F}${infer R}`
  ? F extends keyof DigitalMap ? ToNumber<R, [...Make10Array<L>, ...DigitalMap[F]]> : never
  : L['length']


type r = ToNumber<'12'>;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/300/answer
  > View solutions: https://tsch.js.org/300/solutions
  > More Challenges: https://tsch.js.org
*/

