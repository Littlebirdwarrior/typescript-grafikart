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

//*!Never

// TypeScript prenant en charge l'analyse du flux de code, le langage
// doit être capable de représenter quand le code ne peut logiquement pas
//  se produire. Par exemple, cette fonction ne peut pas retourner :

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

// Les définitions de type stipulent qu'un utilisateur doit être introduit dans le système.
// mais il y a suffisamment d'échappatoires en JavaScript pour que
// vous ne pouvez pas le garantir.

// L'utilisation d'une fonction qui ne renvoie jamais vous permet d'ajouter
// d'ajouter du code supplémentaire à des endroits où cela ne devrait pas être possible.

//Ceci est utile pour présenter de meilleurs messages d'erreur 
// ou pour fermer des ressources telles que des fichiers ou des boucles,
// ou pour fermer des ressources telles que des fichiers ou des boucles.

// Une utilisation très populaire de la fonction "never" est de s'assurer qu'un
// est exhaustif. Par exemple, pour s'assurer que tous les chemins sont couverts.

// Voici une énumération et un commutateur exhaustif, essayez d'ajouter
// une nouvelle option à l'énumération (peut-être Tulip ?)

enum Flower {
  Rose,
  Rhododendron,
  Violet,
  Daisy,
  Tulips,
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


//*!Truple

// Généralement, un tableau zéro à plusieurs objets d'un
// type unique. TypeScript dispose d'une syntaxe spéciale pour les
// les tableaux qui contiennent plusieurs types Dans ce cas, l'ordre
// dans lequel ces types sont indexés est important.

// These are called tuples. Think of them as a way to
// connect some data, mais avec une syntaxe moins compliqué que les objets-clés.

// You can create a tuple using JavaScript's array syntax:

const failingResponse = ["Not Found", 404];

// but you will need to declare its type as a tuple.

const passingResponse: [string, number] = ["{}", 200];

// If you hover over the two variable names you can see the
// difference between an array ( (string | number)[] ) and
// the tuple ( [string, number] ).

// Comme il s'agit d'un tableau, l'ordre n'est pas important.
// n'importe quel indice peut être une chaîne de caractères ou un nombre. 
//  In the tuple the order and length are guaranteed.

if (passingResponse[1] === 200) {
  const localInfo = JSON.parse(passingResponse[0]);
  console.log(localInfo);
}

// This means TypeScript will provide the correct types at
// the right index, and even raise an error if you try to
// access an object at an un-declared index.

passingResponse[2];

// A tuple can feel like a good pattern for short bits of
// connected data or for fixtures.

type StaffAccount = [number, string, string, string?];

const staff: StaffAccount[] = [
  [0, "Adankwo", "adankwo.e@"],
  [1, "Kanokwan", "kanokwan.s@"],
  [2, "Aneurin", "aneurin.s@", "Supervisor"],
];

// Lorsque vous avez un ensemble de types connus au début d'un tuple
// puis une longueur inconnue, vous pouvez utiliser l'opérateur 
// d'étalement (the spread operator) "..." pour indiquer qu'il peut avoir 
// n'importe quelle longueur et que les index supplémentaires
// seront d'un type particulier :

type PayStubs = [StaffAccount, ...number[]];

const payStubs: PayStubs[] = [
  [staff[0], 250],
  [staff[1], 250, 260],
  [staff[0], 300, 300, 300],
];

const monthOnePayments = payStubs[0][1] + payStubs[1][1] + payStubs[2][1];
const monthTwoPayments = payStubs[1][2] + payStubs[2][2];
const monthThreePayments = payStubs[2][2];

// You can use tuples to describe functions which take
// an undefined number of parameters with types:

declare function calculatePayForEmployee(id: number, ...args: [...number[]]): number;

calculatePayForEmployee(staff[0][0], payStubs[0][1]);
calculatePayForEmployee(staff[1][0], payStubs[1][1], payStubs[1][2]);

//*! Built-in Utility Types

// When a particular type feels like it's useful in most
// codebases, they are added into TypeScript and become
// available for anyone which means you can consistently
// rely on their availability

//**Partial<Type>

// Takes a type and converts all of its properties
// to optional ones.

interface Sticker {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  submitter: undefined | string;
}

type StickerUpdateParam = Partial<Sticker>;

//**Readonly<Type>

// Takes an object and makes its properties read-only.

type StickerFromAPI = Readonly<Sticker>;

//**Record<KeysFrom, Type>

// Crée un type qui utilise la liste des propriétés de
// KeysFrom et leur donne la valeur de Type.

// List which keys come from:
type NavigationPages = "home" | "stickers" | "about" | "contact";

// The shape of the data for which each of ^ is needed:
interface PageInfo {
  title: string;
  url: string;
  axTitle?: string;
}

const navigationInfo: Record<NavigationPages, PageInfo> = {
  home: { title: "Home", url: "/" },
  about: { title: "About", url: "/about" },
  contact: { title: "Contact", url: "/contact" },
  stickers: { title: "Stickers", url: "/stickers/all" },
};

//**Pick<Type, Keys>

// Creates a type by picking the set of properties Keys
// from Type. Essentiellement une liste d'autorisations pour 
// extraire des informations de type d'un type.

type StickerSortPreview = Pick<Sticker, "name" | "updatedAt">;

//**Omit<Type, Keys>

// Creates a type by removing the set of properties Keys
// from Type. Essentially a block-list for extracting type
// information from a type.

type StickerTimeMetadata = Omit<Sticker, "name">;

//**Exclude<Type, RemoveUnion>

// Creates a type where any property in Type's properties
// which don't overlap with RemoveUnion.

type HomeNavigationPages = Exclude<NavigationPages, "home">;

//**Extract<Type, MatchUnion>

// Creates a type where any property in Type's properties
// are included if they overlap with MatchUnion.

type DynamicPages = Extract<NavigationPages, "home" | "stickers">;

//**NonNullable<Type>

// Creates a type by excluding null and undefined from a set
// of properties. Useful when you have a validation check.

type StickerLookupResult = Sticker | undefined | null;
type ValidatedResult = NonNullable<StickerLookupResult>;

//**ReturnType<Type>

// Extracts the return value from a Type.

declare function getStickerByID(id: number): Promise<StickerLookupResult>;
type StickerResponse = ReturnType<typeof getStickerByID>;

//**InstanceType<Type>

// Creates a type which is an instance of a class, or object
// with a constructor function.

class StickerCollection {
  stickers: Sticker[];
}

type CollectionItem = InstanceType<typeof StickerCollection>;

//**Required<Type>

// Creates a type which converts all optional properties
// to required ones.

type AccessiblePageInfo = Required<PageInfo>;

//**ThisType<Type>

// Unlike other types, ThisType does not return a new
// type but instead manipulates the definition of this
// inside a function. You can only use ThisType when you
// have noImplicitThis turned on in your TSConfig.

//*! Nullable Types

// JavaScript has two ways to declare values which don't
// exist, and TypeScript adds extra syntax which allows even
// more ways to declare something as optional or nullable.

// First up, the difference between the two JavaScript
//* Primitives: undefined and null

//Undefined is when something cannot be found or set

const emptyObj = {};
const anUndefinedProperty: undefined = emptyObj["anything"];

//Null is meant to be used when there is a conscious lack of a value.

const searchResults = {
  video: { name: "LEGO Movie" },
  text: null,
  audio: { name: "LEGO Movie Soundtrack" },
};

// Why not use undefined? Mainly, because now you can verify
// that text was correctly included. If text returned as
// undefined then the result is the same as though it was
// not there.

// This might feel a bit superficial, but when converted into
// a JSON string, if text was an undefined, it would not be
// included in the string equivalent.

//* Strict Null Types

// Before TypeScript 2.0 undefined and null were effectively
// ignored in the type system. This let TypeScript provide a
// coding environment closer to un-typed JavaScript.

// Version 2.0 added a compiler flag called "strictNullChecks"
// and this flag required people to treat undefined and null
// as types which needs to be handled via code-flow analysis
// ( see more at example:code-flow )

// For an example of the difference in turning on strict null
// checks to TypeScript, hover over "Potential String" below:

type PotentialString = string | undefined | null;

// The PotentialString discards the undefined and null. If
// you open the "TS Config" menu, enable strictNullChecks, and come
// back, you'll see that hovering on PotentialString now shows
// the full union.

declare function getID(): PotentialString;

const userID = getID();
console.log("User Logged in: ", userID.toUpperCase());

//*Only in strict mode the above will fail ^

// There are ways to tell TypeScript you know more, such as
// a type assertion or via a non-null assertion operator (!)

const definitelyString1 = getID() as string;
const definitelyString2 = getID()!;

// Or you safely can check for the existence via an if:

if (userID) {
  console.log(userID);
}

// Optional Properties

// Void

// Void is the return type of a function which does not
// return a value.

const voidFunction = () => { };
const resultOfVoidFunction = voidFunction();

// This is usually an accident, and TypeScript keeps the void
// type around to let you get compiler errors - even though at
// runtime it would be an undefined.
