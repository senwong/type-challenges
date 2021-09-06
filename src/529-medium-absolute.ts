type Test = 9007199254740991n;
type Result = Absolute<Test>; // expected to be "100"

// type Absolute<T extends string | number | bigint> = T extends string
//     ? T extends `-${infer N}`? N : T
//     : T extends number | bigint ? Absolute<`${T}`> : T

type Absolute<T extends string | number | bigint> =`${T}` extends `-${infer N}` ? N : `${T}`;

