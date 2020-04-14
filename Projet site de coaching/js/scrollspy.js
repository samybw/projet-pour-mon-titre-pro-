'use strict';   // Mode strict du JavaScript
const ratio = .1
var options = {
   root: null, // root est l'élement racine il sert de zone d'affichage il permettra de detecter si l'élément est visible ou non
   rootMargin: '0px', // c'est pour dire qu'il faut que sa est dépassé cette marge pour etre visible
   threshold: ratio //  va permettre d'indiqué a partir de quel moment le systeme d'intersection va etre detecter 1 veut dire que sa veut dire que tout l'element doit etre visible dans l'écran pour que pour que IntersectionObserver marche .

}

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry)  {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add('reveal-visible')
      observer.unobserve(entry.target)
    }
  })
}

const observer = new IntersectionObserver(handleIntersect,options);
document.querySelectorAll('[class*="reveal-"]').forEach(function (r){
  observer.observe(r)
})
