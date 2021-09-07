### 

### 自己没做完或者没做好，遇到有难度的题目
https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/610-medium-camelcase/README.md

https://github.com/type-challenges/type-challenges/blob/master/questions/612-medium-kebabcase/README.md


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