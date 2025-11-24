const buttonScroll = document.getElementById("buttonScroll");
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

let lastKnownScrollPosition = 0;
let ticking = false;

function doSomething(scrollPos) {
  if (scrollPos != 0) {
    buttonScroll.style.opacity = "1";
    hamMenu.style.opacity = "1";
  } else {
    buttonScroll.style.opacity = "0";
    hamMenu.style.opacity = "0";
    hamMenu.classList.remove('active');
  offScreenMenu.classList.remove('active');
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
});