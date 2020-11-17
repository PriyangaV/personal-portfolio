/*---------------------- Toggle theme chooser -----------------------*/

const styleToggler = document.querySelector(".style-toggler");
styleToggler.addEventListener("click", () => {
  styleToggler.classList.toggle("fa-spin");
  document.querySelector(".theme-chooser").classList.toggle("open");
});

// hide theme chooser on scroll
window.addEventListener("scroll", () => {
  if (document.querySelector(".theme-chooser").classList.contains("open")) {
    document.querySelector(".theme-chooser").classList.remove("open");
    styleToggler.classList.remove("fa-spin");
  }
});

/*---------------------- Theme colors -----------------------*/

const alternateStyles = document.querySelectorAll(".alternate-styles");
function setActiveStyle(color) {
  alternateStyles.forEach((style) => {
    if (color === style.getAttribute("title")) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", true);
    }
  });
}

/*---------------------- Light and dark mode -----------------------*/

let darkMode = localStorage.getItem("darkMode");
const dayNight = document.querySelector(".day-night");

const enableDarkMode = () => {
  dayNight.querySelector("i").classList.toggle("fa-sun");
  dayNight.querySelector("i").classList.toggle("fa-moon");
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", "enabled");
};
const disableDarkMode = () => {
  document.body.classList.remove("dark");
  localStorage.setItem("darkMode", null);
};

if (darkMode === "enabled") {
  enableDarkMode();
}

dayNight.addEventListener("click", () => {
  darkMode = localStorage.getItem("darkMode");
  darkMode !== "enabled" ? enableDarkMode() : disableDarkMode();
});

window.addEventListener("load", () => {
  if (document.body.classList.contains("dark")) {
    dayNight.querySelector("i").classList.add("fa-sun");
  } else {
    dayNight.querySelector("i").classList.add("fa-moon");
  }
});
