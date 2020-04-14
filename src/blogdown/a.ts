interface A {
  foo: number;
}

interface B extends A {
  bar: number;
}

let x: B = { foo: 3, bar: 4 };

interface Handler<T extends A> {
  handle: (obj: T) => any;
}

let handler: Handler<B> = {
  handle: (obj: B) => obj.bar,
};
