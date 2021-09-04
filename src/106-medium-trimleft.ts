type trimed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '

// type TrimLeft<T extends string> = 

type word = `Hello World  `;

type TrimLeft<T extends string> =T extends ` ${infer P}` ? TrimLeft<P> : T;

type char = TrimLeft<word>;
