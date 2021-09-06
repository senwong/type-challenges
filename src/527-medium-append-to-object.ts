type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }


type AppendToObject<T, Key extends string, value> = {[P in Key]: value} & T;

const val: Result = {
    id: '1',
    value: 4
}