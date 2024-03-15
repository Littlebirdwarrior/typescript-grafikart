/*Source
https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md*/ 

//*! Pick

/*Implement the built-in Pick<T, K> generic without using it.

Constructs a type by picking the set of properties K from T*/

interface Todo {
    title: string
    description: string
    completed: boolean
  }

  /**Mon code */
  //type MyPick<T, K> = K | T;

  /**Correction */
  //il faut que les clés soient un index de T
  type MyPick<T, K extends keyof T> = {
    [Key in K]: T[Key]
  }
  
  type TodoPreview = MyPick<Todo, 'title' | 'completed'>
  
  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  
//*! Readonly

/*Implement the built-in Readonly<T> generic without using it.

Constructs a type with all properties of T set to readonly, meaning the properties of the constructed type cannot be reassigned.

For example:*/

interface Todo2 {
  title: string
  description: string
}

/**Correction */
type MyReadonly <T> = {
    +readonly [Key in keyof T]: T[Key]
}

const todo2: MyReadonly<Todo2> = {
  title: "Hey",
  description: "foobar"
}

todo2.title = "Hello" // Error: cannot reassign a readonly property
todo2.description = "barFoo" // Error: cannot reassign a readonly property

//*!TuppleToObject

/*Given an array, transform it into an object type and the key/value must be in the provided array.

For example:*/

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

//Transformer ça en object qui aura la clé de la valeur

type result = TupleToObject<typeof tuple> // expected { 'tesla': 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}*/

//Mon code

type TupleToObject< T extends readonly PropertyKey[]> = {
    //probleme T est un tableau
    +readonly [Key in keyof T[number]]: Key
}