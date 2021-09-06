type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// expected be (a: number, b: string, x: boolean) => number


// solution 1
// type AppendArgument<T extends (...args: any) => any, Arg> = (...args: [...Parameters<T>, Arg]) => ReturnType<Fn>;


// solution 2
type AppendArgument<Fn, A> = Fn extends (...arg: infer P) => infer R ? (...arg:[...P, A]) => R : never
