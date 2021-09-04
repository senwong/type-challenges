const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, number, string]>`
const p = Promise.all([promise1, promise2, promise3] as const)

// type PromiseAll<T extends any[]> = {[Key in number]: keyof T[Key] extends Promise<infer P> ? P : 1 }
type PromiseAll<T extends any[]> = {[Key in number]: T[number] extends Promise<infer P> ? P : T[number] }

type ret = PromiseAll<[typeof promise1, typeof promise2, ]>;
type ret2 = [typeof promise1, typeof promise2, ][number];