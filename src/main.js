// All necessary Selement select ;
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const logo = document.getElementById("logo");
const navUl = document.getElementById("nav__links");
const navLinks = document.querySelectorAll(".nav__link");
const sections = document.querySelectorAll(".section");
const sectionImgs = document.querySelectorAll("img[data-src]");
const section1 = document.getElementById("section--1");
const section3 = document.getElementById("section--3");
const tabsContainer = document.getElementById("tabs-container");
const tabs = document.querySelectorAll(".tab-btn");
const tabsContent = document.querySelectorAll(".operation-content");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots-container");

const showModalBtn = document.querySelectorAll(".show-modal-btn");
const modalCloseBtn = document.getElementById("closeBtn");
const learMoreBtn = document.getElementById("learn-more");
const prevBtn = document.getElementById("leftBtn");
const nextBtn = document.getElementById("rightBtn");

// modal function
showModalBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.remove("disappear");
    overlay.classList.remove("disappear");
  });
});

const modalClose = function () {
  modal.classList.add("disappear");
  overlay.classList.add("disappear");
};
overlay.addEventListener("click", modalClose);
modalCloseBtn.addEventListener("click", modalClose);

// menu fade animation;

const mouseHandler = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const allLink = e.target.closest(".nav").querySelectorAll(".nav__link");
    const img = e.target.closest(".nav").querySelector("img");

    allLink.forEach((link) => {
      if (link !== e.target) link.style.opacity = opacity;
    });
    img.style.opacity = opacity;
  }
};

nav.addEventListener("mouseover", (e) => mouseHandler(e, 0.5));
nav.addEventListener("mouseout", (e) => mouseHandler(e, 1));

// retrun home hero section function;
logo.addEventListener("click", () =>
  header.scrollIntoView({ behavior: "smooth" })
);

// learn more button scorll function;

learMoreBtn.addEventListener("click", () =>
  section1.scrollIntoView({ behavior: "smooth" })
);

// sticky navigation function;
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(
  (entries, oberver) => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
);
headerObserver.observe(header);

// page navigation function
navUl.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const link = e.target.getAttribute("href");
    document.querySelector(link).scrollIntoView({ behavior: "smooth" });
  }
});

// animation during scrolling
const sectionObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove("animate");
    observer.unobserve(entry.target);
  },
  {
    threshold: 0.15,
  }
);

sections.forEach((section) => {
  section.classList.add("animate");
  sectionObserver.observe(section);
});

// lazy image loading function

const imgObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.classList.remove("lazy-img");
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "200px",
  }
);

sectionImgs.forEach((img) => imgObserver.observe(img));

// tab components function;
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();

  const targetBtn = e.target.closest(".tab-btn");

  if(targetBtn){
    tabs.forEach((tab) => tab.classList.remove("tab-btn-active"));
    tabsContent.forEach((content) =>
      content.classList.remove("operation-content-active")
    );
  
    targetBtn.classList.add("tab-btn-active");
  
    document
      .querySelector(`#tab-content-${targetBtn.dataset.tab}`)
      .classList.add("operation-content-active");
  }
});


// * slider slide =============================
let currentSlide = 0;
let maxSlide = slides.length - 1;

const goToSlide = function (value) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - value)}%)`;
  });
};
goToSlide(0);
//0% 100% 200%

// create dot function
const createDots = function () {
  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.classList.add("dots_dot");
    if (i === 0) dot.classList.add("dot-active");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
    // dotsContainer.insertAdjacentHTML(
    //   "beforeend",
    //   `<button class="dots_dot" data-slide="${i}"></button>`
    // );
  });
};

// active dot function;
const activateDot = function (value) {
  document
    .querySelectorAll(".dots_dot")
    .forEach((dot) => dot.classList.remove("dot-active"));

  document
    .querySelector(`.dots_dot[data-index="${value}"]`)
    .classList.add("dot-active");
};

createDots();
// next slide function
const nextSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// previus slide function
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

// Next button
nextBtn.addEventListener("click", nextSlide);
// prevbutton
prevBtn.addEventListener("click", prevSlide);

// dot button event
dotsContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots_dot")) {
    const data = e.target.dataset.index;
    goToSlide(data);
    activateDot(data);
  }
});

// key aroow button slide function

const handleKeydown = function(e){
    if(e.key === 'ArrowRight') nextSlide();
    if(e.key === 'ArrowLeft') prevSlide();
}

const slideObserver = new IntersectionObserver(
  (entries, observer) => {
    const [entry] = entries;
    if(entry.isIntersecting){
      document.addEventListener('keydown', handleKeydown);
    }else{
      document.removeEventListener('keydown', handleKeydown);
    }
  },
  {
    threshold: 0.5,
  }
);
slideObserver.observe(section3);

// auto slide
const autoSlide = setInterval(nextSlide, 2000);
autoSlide();



