declare const config: Chainable

const result: Result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}


interface Chainable<R extends {} = {}> {
    option<K extends string, V>(k: K, val: V): Chainable<{[k in K]: V} & R>;
    get(): R;
}

// type Chainable = {
//     option:()
//     get: () => Chainable,
// }