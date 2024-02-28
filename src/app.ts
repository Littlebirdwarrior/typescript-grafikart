
/*
* Fonctiomment du typescript
* le fichier src/app.ts compilé dans dist/app.js (lien dans le index.html)
* car le .ts n'est pas intérprétable dans le navigateur
* Création d'un fichier de config tsconfig.json pour permettre la compilation automatique
* cmd terminal : # npx tsc --watch
* */

//Création du compteur JS
// les lets sont convertis en var car les navigateur de destination sont un peu vieux
//pour cibler un navigateur plus recent, parametrer en config config la "target"
//pour ne pas parametrer les erreur "noEmitOnError"
//pour stoper la conversion "noEmit" a true
//strict, active les flag qui permet de contraindre les erreur (toutes les fonctions seront typée)
const compteur = document.querySelector('#compteur')
let i= 0;

const increment = (e) => {
    i++;
    //ici, 1er soucis de type : nombre dans une sting
    compteur.querySelector('span').innerText = i.toString()
}

compteur.addEventListener('click', increment)