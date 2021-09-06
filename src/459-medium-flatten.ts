type Flatten<T> = T extends [infer F, ...infer R] ? F extends any[] ? [...Flatten<F>, ...Flatten<R>] : [F, ...Flatten<R>] : []; 

type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]