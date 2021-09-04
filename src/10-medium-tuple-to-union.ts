type Arr = ['1', '2', '4']

type TupleToUnion<T> = T[keyof T];

const a: TupleToUnion<Arr> = '3'; // expected to be '1' | '2' | '3'