interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }
  
  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type LookUp<T, Filter> = T extends {type: Filter} ? T : never;
  
  type MyDogType = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  