//Initialisation des variables (const pour les variables qui ne chageront pas et var pour les booléens (true ou false / vrai ou faux) et let pour les nombres)
const buttonScroll = document.getElementById("buttonScroll");
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const offScreenMenuLink = document.querySelectorAll(".off-screen-menu a");

var menu_activ = false;
var ticking = false;
let lastKnownScrollPosition = 0;

//Fonction pour afficher le bouton du déroulant au scroll
function doSomething(scrollPos) {
  if (scrollPos != 0) {
    buttonScroll.style.opacity = "1";
    hamMenu.style.opacity = "1";
    hamMenu.style.cursor = "pointer";
  } else {
    buttonScroll.style.opacity = "0";
    hamMenu.classList.remove('active');
    offScreenMenu.classList.remove('active');
    menu_activ = false;
    if (window.innerWidth>1600) {
      hamMenu.style.opacity = "0";
      hamMenu.style.cursor = "auto";
    }
  }
}



//Écoute du document pour détecter le scroll
document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    // Temporiser la fonction pour ne pas surcharger la page
    setTimeout(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    }, 20);

    ticking = true;
  }
});

//Écoute du bouton pour scroller tout en haut de la page
buttonScroll.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//Écoute du bouton pour afficher le menu déroulant
hamMenu.addEventListener('click',() => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  if (menu_activ) {
    menu_activ = false;
  } else {
    menu_activ = true;
  }
  
});

//Écoute du document pour afficher le bouton du menu déroulant en fonction de la taille de la fenêtre
window.addEventListener("resize", () => {
  if (window.innerWidth < 1600) {
    hamMenu.style.opacity = "1";
    hamMenu.style.cursor = "pointer";
  } else {
    if (lastKnownScrollPosition == 0) {
      hamMenu.style.opacity = "0";
      hamMenu.style.cursor = "auto";
    }
    else {
      hamMenu.style.opacity = "1";
      hamMenu.style.cursor = "pointer";
    }
  }
});

//Écoute du document pour fermer le menu déroulant au click sur la page
document.addEventListener("click", (e) => {
  if (!offScreenMenu.contains(e.target)) {
    if (!hamMenu.contains(e.target)) {
      if (menu_activ) {
        offScreenMenu.classList.remove('active');
        hamMenu.classList.remove('active');
        menu_activ = false;
      }
    }
  }
});

//Boucle pour fermer le menu déroulant si click sur un des liens
offScreenMenuLink.forEach(link => {
    link.addEventListener("click", () => { //Écoute sur chaques liens du menu
        offScreenMenu.classList.remove('active');
        hamMenu.classList.remove('active');
        menu_activ = false;
    });
});