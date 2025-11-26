const buttonScroll = document.getElementById("buttonScroll");
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const offScreenMenuLink = document.querySelectorAll(".off-screen-menu a");
let menu_activ = false;

let lastKnownScrollPosition = 0;
let ticking = false;


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

document.addEventListener("scroll", (event) => {
  lastKnownScrollPosition = window.scrollY;

  if (!ticking) {
    // Throttle the event to "do something" every 20ms
    setTimeout(() => {
      doSomething(lastKnownScrollPosition);
      ticking = false;
    }, 20);

    ticking = true;
  }
});

buttonScroll.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

hamMenu.addEventListener('click',() => {
  hamMenu.classList.toggle('active');
  offScreenMenu.classList.toggle('active');
  if (menu_activ) {
    menu_activ = false;
  } else {
    menu_activ = true;
  }
  
});

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

offScreenMenuLink.forEach(link => {
    link.addEventListener("click", () => {
        offScreenMenu.classList.remove('active');
        hamMenu.classList.remove('active');
        menu_activ = false;
    });
});