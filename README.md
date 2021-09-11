### 

### 自己没做完或者没做好，遇到有难度的题目
https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/610-medium-camelcase/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/612-medium-kebabcase/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/2257-medium-minusone/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/6-hard-simple-vue/README.md

### 好的TypeScript的文章
https://blog.logrocket.com/when-to-use-never-and-unknown-in-typescript-5e4d6c5799ad/

## 笔记

### 在做IsNever这道题的时候，要实现如下的IsNever函数
  
```ts
    type A = IsNever<never>  // expected to be true
    type B = IsNever<undefined> // expected to be false
    type C = IsNever<null> // expected to be false
    type D = IsNever<[]> // expected to be false
    type E = IsNever<number> // expected to be false
```
一开始只是简单地以为这样写就可以:
```ts
type IsNever<T> = T extends never ? true : false;
```
但是`IsNever<never>`的结果却是`never`，在github看到这段解释[link](https://github.com/microsoft/TypeScript/issues/31751#issuecomment-498526919)。

这里涉及到TypeScript的[`distributed conditional types`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)，
当条件判断在遇到泛型的时候，如果泛型的参数是一个union，条件推断的结果是union里面每一个类型的推断结果的union。

```ts
IsNever<string | number> = IsNever<string> | IsNever<number>
```
`never`是一个空的集合，去distribute一个空的集合返回的结果就是never。
官方文档也说了，如果要跳过distribute，可以使用方括号把泛型包裹起来,
所以正确的写法应该是这样
```ts
type IsNever<T> = [T] extends [never] ? true : false
```


### 协变和逆变
在做[union to intersection](https://github.com/type-challenges/type-challenges/blob/master/questions/55-hard-union-to-intersection/README.md)这道题目时。看到答案是：
```ts
type UnionToIntersection<U> = (U extends any ? (arg: U) => any : never) extends ((arg: infer I) => void) ? I : never

```

实现原理就是根据函数参数的类型推断是逆变。[infer官方文档的例子](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types)如下：
>The following example demonstrates how multiple candidates for the same type variable in co-variant positions causes a union type to be inferred:
```ts
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;
type T10 = Foo<{ a: string; b: string }>; // string
type T11 = Foo<{ a: string; b: number }>; // string | number
```
>Likewise, multiple candidates for the same type variable in contra-variant positions causes an intersection type to be inferred:
```ts
type Bar<T> = T extends { a: (x: infer U) => void; b: (x: infer U) => void }
  ? U
  : never;
type T20 = Bar<{ a: (x: string) => void; b: (x: string) => void }>; // string
type T21 = Bar<{ a: (x: string) => void; b: (x: number) => void }>; // string & number
```
协变：用子类型替换父类型，符合里氏替换原则。比如：
```ts
type Animal = { eat: () => void };
type Dog = { eat: () => void, bark: () => void };
let animal: Animal;
let dog: Dog;
animal = dog; // OK

```
逆变：当涉及到函数参数类型时，就要用参数是父类型的函数来替换参数是子类型的函数。这个替换的方向是相反的。因为如果用子类型函数替换父类型函数，子类型的函数体里用针对多余属性的操作，但是函数参数是父类型，就会引起错误。比如：
```ts
type FuncAnimal = (arg: Animal) => void;
type FuncDog = (arg: Dog) => void;
let funcAnimal: FuncAnimal = (animal: Animal) => animal.eat();
let funcDog: FuncDog = (dog: Dog) => {
  dog.eat();
  dog.bark();
}
funcAnimal = funcDog; // Error
```

参考资料
1. https://stackoverflow.com/questions/61696173/strictfunctiontypes-restricts-generic-type/61703116#61703116

2. https://github.com/Microsoft/TypeScript/pull/18654#issue-142395780
