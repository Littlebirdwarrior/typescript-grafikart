
/*
* Fonctiomment du typescript
* le fichier src/app.ts compilé dans dist/app.js (lien dans le index.html)
* car le .ts n'est pas intérprétable dans le navigateur
* Création d'un fichier de config tsconfig.json pour permettre la compilation automatique
* cmd terminal : # npx tsc --watch
* */

//Création du compteur JS


/*  Vidéo 1 : Installation du TS
*les lets sont convertis en var car les navigateur de destination sont un peu vieux
*pour cibler un navigateur plus recent, parametrer en config config la "target"
*pour ne pas parametrer les erreur "noEmitOnError"
*pour stoper la conversion "noEmit" a true
*strict, active les flag qui permet de contraindre les erreur (toutes les fonctions seront typée)*/


/*const compteur = document.querySelector('#compteur')
let i= 0;

//avec déclaration strict en config, syntax js ne marche plus
const increment = (e) => {
    i++;
    //ici, 1er soucis de type : nombre dans une sting
    compteur.querySelector('span').innerText = i.toString()
}

compteur.addEventListener('click', increment)*/

//Vidéo 2: Syntaxe de base

/* Différents type de base disponible pour le ts
*
*
* */

// const a: string ="Hello world"
// const n: number = 3
// const b: boolean = true
// const d: null = null
//
//pour les tableau, note valeurs contenue dans le tableau
// const arr : string[] = ['aze', 'aze', 'aze'];
// const arr2: number[] = [ 3 , 4 , 5];
//
//type mixé ( à éviter car "trop gros")
// const arrAny: any[] = [ "truc" , 4 , 5];
//
//syntaxe object typé(avec propriété optionnelle avec ?)
// const user: {firstname: string, lastname?:string } = {firstname: "John", lastname: "DOE"}
//
//object avec infinité de clé
// const user2: { [key:string]:string } = {firstname: "John", lastname: "DOE"}
//
//autre type (MouseEvent, date, keyEvent)
// const date: Date = new Date();
//
//type de fonction  avec type de retour
//ici, si return void, retour pas utilisé mais retour faux plus tard
// const callBack : Function = (e:MouseEvent):void =>{
// }
//
// const cb: (e:MouseEvent) => void = (e:MouseEvent): number =>{
//     return 3
// }
//
// function printId(id:number):void{
//     console.log(id.toString());
// }
//
// /*NB:
// * Ts peut deviner les choses: les type que l'on prends sont capable d'être devinée
// * Type LITTÉRALS = ts capable de connaitre directement valeur
// * */
//
// const f ="firstname";
// const user3 = {firstname:"John", lastname:"Doe"}
// //ici comprends que f est la string firstname utilisée en clé, ts capable de comprendre que clé existe
// //capable de faire ça pour nombre et pour booléen et null
// console.log(user3[f]);
//
// /*Quand faut-il préciser les types ?
// * - Quand on doit forcer les type (clés optionnelle)
// * - Pour éviter les erreurs
// * */
//
// /*Parfois pas capable deviner le type
//     "assertion de type" : indiquer à ts de quel type va être le retour avec as ou <...>
//     mais le type doit être plausible (ici, pas MouseEventPar exemple)
// * */
//
// const compteur1 = document.querySelector('#compteur') as HTMLButtonElement
// const compteur2 = <HTMLButtonElement>document.querySelector('#compteur')
//
// /*On peut aussi choisir de laisser le choix entre plusieur type*/
// function printId2(id:number | string):void{
//     console.log(id.toString());
// }

const compteur = document.querySelector('#compteur') as HTMLButtonElement
let i: number = 0;

//ici, la fonction incrément est déclaré comme un mouse event
const increment = (e:Event) => {
    //si l'évenement (le click) n'est pas traité, son action n'est pas exécutée
    e.preventDefault();
    i++;
    //je vérifie au niveau de la constante que span existe (ici, Narrowing)
    const span = compteur?.querySelector('span')
    //dans le cas ou il existe
    if(span){
        //On convertis le i en string
        span.innerText = i.toString()
    }
}

//compteur avec ? ne sera utilisé que si compteur existe
compteur?.addEventListener('click', increment)

/*Conclusion v2, le ts
* -permets d'être plus explicite que le JS
* -permets d'éviter des erreurs de types
* */

////////////////////////////////

