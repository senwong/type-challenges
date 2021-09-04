interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};

type MyOmit<T, OmittedKeys> = {
  [key in Exclude<keyof T, OmittedKeys>]: T[key];
};
