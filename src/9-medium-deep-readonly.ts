type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

type Deep = DeepReadonly<X>; // should be same as `Expected`

const x2: Deep = {
    x: {
        a: 1,
        b: "hi",
    },
    y: "hey"
};

x2.x = 2
  
type DeepReadonly<T> = {
  readonly  [Property in keyof T]: keyof T[Property] extends  never ? T[Property] : DeepReadonly<T[Property]>;
}
