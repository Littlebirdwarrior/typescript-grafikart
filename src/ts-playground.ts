/**Typescript Doc challenge */

//*!1- Any
// Any est la clause d'échappement de TypeScript. Vous pouvez utiliser any pour
// déclarer une section de votre code comme étant dynamique et
// dynamique et similaire à JavaScript, soit pour contourner les limitations du
// système de types.

// Un bon exemple, le JSON parsing:

const myObject = JSON.parse("{}");

// Any déclare à TypeScript que votre code est sûr parce que vous en savez plus sur lui.
// comme étant sûr parce que vous en savez plus à son sujet. Même si ce n'est
// n'est pas tout à fait vrai. Par exemple, ce code se planterait :

myObject.x.y.z; 

// L'utilisation d'un any permet d'écrire un code plus proche du JavaScript
// plus proche du JavaScript original, avec pour contrepartie la sécurité des types.

// Le any est un peu comme un "joker de type" que vous pouvez remplacer
// par n'importe quel type (sauf never) pour rendre un type assignable à l'autre.

declare function debug(value: any): void;

debug("a string");
debug(23);
debug({ color: "blue" });

/// Chaque appel à debug est autorisé parce que vous pourriez remplacer le mot
// any par le type de l'argument à faire correspondre.

// TypeScript prendra en compte la position des
// anys dans les différentes formes, par exemple avec ces tuples
// pour l'argument de la fonction.

declare function swap(x: [number, string]): [string, number];

declare const pair: [any, any];
swap(pair);

// L'appel à swap est autorisé parce que l'argument peut être // apparié en remplaçant la première paire de
// en remplaçant le premier "any" de la paire par un nombre
// et le second `any` par une chaîne de caractères.

// Si vous ne connaissez pas les tuples, voyez : example:tuples

// Inconnu est un type frère de any, si any a pour but de dire
// Je sais ce qui est le mieux ", alors unknown est une façon de dire " Je ne suis pas sûr de ce qui est le mieux, donc je ne suis pas sûr de ce qui est le mieux ".
// Je ne suis pas sûr de ce qui est le mieux, donc vous devez dire à TS le type"
// exemple:inconnu-et-jamais

//*!2- Litterals

// TypeScript propose des cas spéciaux amusants pour les littéraux dans le code source.
// dans le code source.

//En partie, une grande partie du support est couverte par le widering (élargissement)
// et le narrowing. Il vaut la peine de s'y intéresser en premier lieu.

// Un littéral est un sous-type plus concret d'un type collectif.
// Ce que cela signifie, c'est que "Hello World" est une chaîne de caractères, mais qu'une
// chaîne n'est pas "Hello World" à l'intérieur du système de types.

//A partir de maintenant, je laisse les explications que je comprends en anglais

type helloWorld =  {
    helloWorld: string
}

type hiWorld =  {
    hiWorld: string
}

const helloWorld = "Hello World";
let hiWorld = "Hi World"; // this is a string because it is let


// This function takes all strings
declare function allowsAnyString(arg: string): string;
allowsAnyString(helloWorld);
allowsAnyString(hiWorld);

// This function only accepts the string literal "Hello World"
declare function allowsOnlyHello(arg: "Hello World"): helloWorld;
allowsOnlyHello(helloWorld);
allowsOnlyHello(hiWorld);

// This lets you declare APIs which use unions to say it
// only accepts a particular literal:

declare function allowsFirstFiveNumbers(arg: 1 | 2 | 3 | 4 | 5) : number;
allowsFirstFiveNumbers(1);
allowsFirstFiveNumbers(10);

let potentiallyAnyNumber : number = 3;
allowsFirstFiveNumbers(potentiallyAnyNumber);

// At first glance, this rule isn't applied to complex objects.
// (Or, how to declare a constant in TS)

const myUser = {
  name: "Sabrina",
};

// See how it transforms `name: "Sabrina"` to `name: string`
// even though it is defined as a constant. This is because
// the name can still change any time:

myUser.name = "Cynthia";

// Because myUser's name property can change, TypeScript
// cannot use the literal version in the type system. There
// is a feature which will allow you to do this however.

const myUnchangingUser = {
  name: "Fatma",
} as const;

// When "as const" is applied to the object, then it becomes
// a object literal which doesn't change instead of a
// mutable object which can.

myUnchangingUser.name = "Raîssa";

// "as const" is a great tool for fixtured data, and places
// where you treat code as literals inline. "as const" also
// works with arrays:

const exampleUsers = [{ name: "Brian" }, { name: "Fahrooq" }] as const;

//*!3- Union and intersection
// Type unions are a way of declaring that an object
// could be more than one type.

type StringOrNumber = string | number;
type ProcessStates = "open" | "closed";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
type AMessyUnion = "hello" | 156 | { error: true };

// If the use of "open" and "closed" vs string is
// new to you, check out: example:literals

// We can mix different types into a union, and
// what we're saying is that the value is one of those types.

// TypeScript will then leave you to figure out how to
// determine which value it could be at runtime.

// Unions can sometimes be undermined by type widening,
// for example:

type WindowStates = "open" | "closed" | "minimized" | string;

// If you hover above, you can see that WindowStates
// becomes a string - not the union. This is covered in
// example:type-widening-and-narrowing

// If a union is an OR, then an intersection is an AND.
// Intersection types are when two types intersect to create
// a new type. This allows for type composition.

interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces can be composed in responses which have
// both consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

// For example:

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};

// A mix of Intersection and Union types becomes really
// useful when you have cases where an object has to
// include one of two values:

interface CreateArtistBioBase {
  artistID: string;
  thirdParty?: boolean;
}

type CreateArtistBioRequest = CreateArtistBioBase & ({ html: string } | { markdown: string });

// Now you can only create a request when you include
// artistID and either html or markdown

const workingRequest: CreateArtistBioRequest = {
  artistID: "banksy",
  markdown: "Banksy is an anonymous England-based graffiti artist...",
};

const badRequest: CreateArtistBioRequest = {
  artistID: "banksy",
};

//*!Unknown

// Unknown is one of those types that once it clicks, you
// can find quite a lot of uses for it. It acts like a sibling
// to the any type. Where any allows for ambiguity - unknown
// requires specifics.

// A good example would be in wrapping a JSON parser. JSON
// data can come in many different forms and the creator
// of the json parsing function won't know the shape of the
// data - the person calling that function should.

const jsonParser = (jsonString: string) => JSON.parse(jsonString);

const myAccount = jsonParser(`{ "name": "Dorothea" }`);

myAccount.name;
myAccount.email;

// If you hover on jsonParser, you can see that it has the
// return type of any, so then does myAccount. It's possible
// to fix this with generics - but it's also possible to fix
// this with unknown.

const jsonParserUnknown = (jsonString: string): unknown => JSON.parse(jsonString);

const myOtherAccount = jsonParserUnknown(`{ "name": "Samuel" }`);

myOtherAccount.name;

// The object myOtherAccount cannot be used until the type has
// been declared to TypeScript. This can be used to ensure
// that API consumers think about their typing up-front:

type User = { name: string };
const myUserAccount = jsonParserUnknown(`{ "name": "Samuel" }`) as User;
myUserAccount.name;

// Unknown is a great tool, to understand it more read these:
// https://mariusschulz.com/blog/the-unknown-type-in-typescript
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type

// Never

// Because TypeScript supports code flow analysis, the language
// needs to be able to represent when code logically cannot
// happen. For example, this function cannot return:

const neverReturns = () => {
  // If it throws on the first line
  throw new Error("Always throws, never returns");
};

// If you hover on the type, you see it is a () => never
// which means it should never happen. These can still be
// passed around like other values:

const myValue = neverReturns();

// Having a function never return can be useful when dealing
// with the unpredictability of the JavaScript runtime and
// API consumers that might not be using types:

const validateUser = (user: User) => {
  if (user) {
    return user.name !== "NaN";
  }

  // According to the type system, this code path can never
  // happen, which matches the return type of neverReturns.

  return neverReturns();
};

// The type definitions state that a user has to be passed in
// but there are enough escape valves in JavaScript whereby
// you can't guarantee that.

// Using a function which returns never allows you to add
// additional code in places which should not be possible.
// This is useful for presenting better error messages,
// or closing resources like files or loops.

// A very popular use for never, is to ensure that a
// switch is exhaustive. E.g., that every path is covered.

// Here's an enum and an exhaustive switch, try adding
// a new option to the enum (maybe Tulip?)

enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
}

const flowerLatinName = (flower: Flower) => {
  switch (flower) {
    case Flower.Rose:
      return "Rosa rubiginosa";
    case Flower.Rhododendron:
      return "Rhododendron ferrugineum";
    case Flower.Violet:
      return "Viola reichenbachiana";
    case Flower.Daisy:
      return "Bellis perennis";

    default:
      const _exhaustiveCheck: never = flower;
      return _exhaustiveCheck;
  }
};

// You will get a compiler error saying that your new
// flower type cannot be converted into never.

// Never in Unions

// A never is something which is automatically removed from
// a type union.

type NeverIsRemoved = string | never | number;

// If you look at the type for NeverIsRemoved, you see that
// it is string | number. This is because it should never
// happen at runtime because you cannot assign to it.

// This feature is used a lot in example:conditional-types


