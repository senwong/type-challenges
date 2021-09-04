type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'

type Trim<T extends string> = T extends ` ${infer P}` |  `${infer P} ` ? Trim<P> : T;
