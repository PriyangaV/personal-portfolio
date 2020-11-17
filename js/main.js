function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*------------------------ Porfolo filter and popup -------------------------*/

(() => {
  const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

  let itemIndex, slideIndex, screenshots;

  /* filter portfolio items */
  filterContainer.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")
    ) {
      // deactivate existing active 'filter-item'
      filterContainer.querySelector(".active").classList.remove("active");
      // activate new 'filter-item'
      event.target.classList.add("active");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portfolioItem = event.target.closest(".portfolio-item-inner")
        .parentElement;
      // get the portfolioItem index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );
      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");
      // convert screenshots into an array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
      slideIndex = 0;
      popupToggle();
      popupSlideShow();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", (event) => {
    popupToggle();
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupToggle() {
    popup.classList.toggle("open");
    popupDetailsToggle();
    bodyScrollingToggle();
  }

  function popupSlideShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");
    // activate the loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // deactivate loader after the popupImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    };
    popup.querySelector(".pp-counter").innerHTML =
      slideIndex + 1 + " of " + screenshots.length;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideShow();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlideShow();
  });

  function popupDetails() {
    // if portfolio-item-details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return; // end function execution
    }
    projectDetailsBtn.style.display = "block";
    //  get the project details, title and category
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;
    const category = portfolioItems[itemIndex].getAttribute("data-category");

    // set the project details, title and category
    popup.querySelector(".pp-project-details").innerHTML = details;
    popup.querySelector(".pp-title h2").innerHTML = title;
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(", ");
  }

  projectDetailsBtn.addEventListener("click", (event) => {
    popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = "700px";
      // projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
      // popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }
})();

// select button and links
const navBtn = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
// add event listener
navBtn.addEventListener("click", () => {
  links.classList.toggle("show-links");
});

// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();
    links.classList.remove("show-links");
    let id = null;
    if (link.classList.contains("page-scroll")) {
      id = e.target.parentElement.getAttribute("href").slice(1);
    } else {
      id = e.target.getAttribute("href").slice(1);
    }

    const element = document.getElementById(id);
    let position = element.offsetTop;
    // document.querySelector("nav ul li a").classList.remove("active");
    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth"
    });
    document.querySelector("nav ul li a[href='#" + element + "']") &&
      document
        .querySelector("nav ul li a[href='#" + element + "']")
        .classList.add("active");
  });
});

const addClassOnScroll = function (event) {
  const windowTop = window.scrollY;
  const element = event.target;
  document.querySelectorAll("section[id]").forEach(function (elem) {
    let offsetTop = elem.offsetTop;
    let outerHeight = elem.offsetHeight;
    if (windowTop > offsetTop - 62 && windowTop < offsetTop + outerHeight) {
      let elemId = elem.getAttribute("id");
      document.querySelector("nav ul li a.active").classList.remove("active");
      document
        .querySelector("nav ul li a[href='#" + elemId + "']")
        .classList.add("active");
    }

    // home active
    if (windowTop === 0) {
      document.querySelector("nav ul li a.active").classList.remove("active");
      document
        .querySelector("nav ul li a[href='#header']")
        .classList.add("active");
    }

    // contact active
    if (
      (element.documentElement && element.documentElement.scrollHeight) -
        (element.documentElement && element.documentElement.scrollTop) ===
      (element.documentElement && element.documentElement.clientHeight)
    ) {
      document.querySelector("nav ul li a.active").classList.remove("active");
      document
        .querySelector("nav ul li a[href='#contact']")
        .classList.add("active");
    }
  });
};

window.addEventListener("scroll", function (event) {
  // navbar active class
  addClassOnScroll(event);

  // When the user scrolls down 1000px from the top of the document, show the button
  toggleBackToTop();
});

// Pre Loader
window.addEventListener("load", () => {
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

// Back to Top
const backToTopIcon = document.querySelector(".back-to-top");

function toggleBackToTop() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    backToTopIcon.classList.add("active");
  } else {
    backToTopIcon.classList.remove("active");
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth"
  });
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Scroll reveal
// window.sr = ScrollReveal({
//   duration: 1500,
//   distance: "10rem",
//   delay: 50,
//   easing: "ease",
//   reset: true,
//   mobile: true
// });

// sr.reveal(".animate-left", {
//   origin: "left"
// });

// sr.reveal(".animate-right", {
//   origin: "right"
// });

// sr.reveal(".animate-bottom", {
//   origin: "bottom"
// });

// sr.reveal(".animate-top", {
//   origin: "top"
// });

// sr.reveal(".zedical-rotate", {
//   rotate: {
//     z: 360
//   }
// });

// sr.reveal(".horizantal-rotate", {
//   rotate: {
//     x: 100
//   }
// });

// sr.reveal(".vertical-rotate", {
//   rotate: {
//     y: 100
//   }
// });

// sr.reveal(".scale", {
//   scale: 0
// });

// sr.reveal(".opacity", {
//   opacity: 0
// });

// sr.reveal(".unreset", {
//   reset: false
// });

// sr.reveal(".no-distance", {
//   distance: "0"
// });

// sr.reveal(".nav-item", {
//   origin: "left"
// });

// sr.reveal(".wait", {
//   duration: 2000,
//   delay: 500
// });
