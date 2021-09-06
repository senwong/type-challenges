type Merge<T extends {}, K extends {}> = {
    [P in (keyof T | keyof K)]: P extends keyof K ? K[P] : P extends keyof T ? T[P] : never
}

type One = {
    name: string,
    value: number;
}

type Two = {
    name: number;
    age: number;
    value: bigint;
}

type keys = keyof One | keyof Two;

type Three = Merge<One, Two>;

