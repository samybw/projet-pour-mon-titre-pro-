'use strict';   // Mode strict du JavaScript
/*
class Carrousel {

/**
* Assign the project to an employee.
* @param {HTMLElement} element
* @param {Object} options
* @param {Object} options.slidesToScroll Nombre d'élement a faire défiler
* @param {Object} options.slidesVisible Nombre d'élement vidible dans un slide


constructor(element,options = {}) {
this.element = element
this.options = Object.Assign((),{
slidesToScroll: 1,
slidesVisible: 1
},options)
}

}

document.addEventListener('DomContentLoaded', function(){

new Carrousel(document.querySelector('#carrousel1'), {
slidesToScroll: 1,
slidesVisible: 1

})
})
*/

/*  DONNEES CARROUSEL */

// Codes des touches du clavier.
const LEFT_ARROW_KEY = 'ArrowLeft';
const RIGHT_ARROW_KEY = 'ArrowRight';

// La liste des slides du carrousel.
const slides =
[
  { image: 'images/Davidtr1.PNG', legend: 'Sublimé votre potentiel !' },
  { image: 'images/Davidtr2.PNG', legend: 'Vous etes votre seul limite !'},
  { image: 'images/david2020.png', legend: 'Laissez moi vous aide a atteindre votre but !'}


];

//  l'état du carrousel.
let state;

/*  FONCTIONS CARROUSEL */

function onSliderGoToNext()
{
  // Passage à la slide suivante.
  state.index++;

  // Est-ce qu'on est arrivé à la fin de la liste des slides ?
  if(state.index == slides.length)
  {
    // Oui, on revient au début (le carrousel est circulaire).
    state.index = 0;
  }

  // Mise à jour de l'affichage.
  refreshSlider();
}

function onSliderGoToPrevious()
{
  // Passage à la slide précédente.
  state.index--;

  // Est-ce qu'on est revenu au début de la liste des slides ?
  if(state.index < 0) {

    // Oui, on revient à la fin (le carrousel est circulaire).
    state.index = slides.length - 1;
  }

  // Mise à jour de l'affichage.
  refreshSlider();
}

function onSliderGoToRandom()
{
  let index;

  do
  {
    /*
    * Récupération d'un numéro de slide aléatoire différent
    * du numéro de slide actuel.
    */
    index = getRandomInteger(0, slides.length - 1);
  }
  while(index == state.index);

  // Passage à une slide aléatoire.
  state.index = index;

  // Mise à jour de l'affichage.
  refreshSlider();
}

/*
* Quand on créé un gestionnaire d'évènements, le navigateur appelle la
* fonction en fournissant un argument event représentant l'évènement lui-même.
*
* Si le gestionnaire d'évènements n'a pas besoin de cet argument,
* inutile de le déclarer !
*
* Mais ici on va en avoir besoin...
*/

function onSliderKeyUp(event)
{
  /*
  * Les gestionnaires d'évènements d'appui sur une touche (évènements
  * keydown, keyup, keypress) contiennent une propriété keyCode dans l'objet
  * event représentant le code de la touche du clavier.
  *
  * Il existe de très nombreux codes, plus ou moins standards, voir la page :
  * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  */

  switch(event.code)
  {
    case RIGHT_ARROW_KEY:
    // On passe à la slide suivante.
    onSliderGoToNext();
    break;


    case LEFT_ARROW_KEY:
    // On passe à la slide précédente.
    onSliderGoToPrevious();
    break;
  }
}

function onSliderToggle()
{

  // Est-ce que le carousel est démarré ?
  if(state.timer == null) {

    // Non, démarrage du carousel, toutes les deux secondes.
    state.timer = window.setInterval(onSliderGoToNext, 5000);

    /*
    * Modification du libellé du bouton en mode "OFF".
    *
    * La variable spéciale this est automatiquement initialisée par le
    * navigateur avec l'objet DOM qui a déclenché l'évènement.
    *
    * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
    * l'évènement, donc la variable spéciale this vaut la même chose
    * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
    */
  }
}

function refreshSlider()
{
  // Recherche des balises de contenu du carrousel.
  const sliderImage  = document.querySelector('#slider img');
  const sliderLegend = document.querySelector('#slider figcaption');

  // Changement de la source de l'image et du texte de la légende du carrousel.
  sliderImage.src          = slides[state.index].image;
  sliderLegend.textContent = slides[state.index].legend;
}
/*  FONCTIONS CARROUSEL */

document.addEventListener('DOMContentLoaded', function() {

  // Initialisation du carrousel.
  state       = {};
  state.index = 0;                   // On commence à la première slide
  state.timer = null;                // Le carrousel est arrêté au démarrage




  /*
  * L'évènement d'appui sur une touche doit être installé sur l'ensemble de la
  * page, on ne recherche pas une balise en particulier dans l'arbre DOM.
  *
  * L'ensemble de la page c'est la balise <html> et donc la variable document.
  */
  document.addEventListener('keyup', onSliderKeyUp);
  // Equivalent à installEventHandler('html', 'keyup', onSliderKeyUp);


  // Affichage initial.
  refreshSlider();
  onSliderToggle();
});
