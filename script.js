// ================================
// NAVBAR SCROLL LOGIC
// ================================
const navbar = document.querySelector("nav");
let lastScroll = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    // Scroll down → hide navbar, Scroll up → show navbar
    if (currentScroll > lastScroll) {
        navbar.classList.add("hidden");
    } else {
        navbar.classList.remove("hidden");
    }

    // Top of page → transparent, else → scrolled style
    if (currentScroll < 50) {
        navbar.classList.remove("scrolled");
    } else {
        navbar.classList.add("scrolled");
    }

    lastScroll = currentScroll;
});

// ================================
// HAMBURGER MENU
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");

    // Toggle menu
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    // Close menu when link clicked
    document.querySelectorAll(".menu a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
            hamburger.classList.remove("open");
        });
    });
});

// ================================
// HOME SLIDER
// ================================
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;
let totalSlides = slides.length;

// Clone first & last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// Initial position
slider.style.transform = `translateX(-100%)`;
index = 1;

function moveToSlide(n, instant = false) {
    if (instant) slider.style.transition = "none";
    else slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${n * 100}%)`;
}

// Update dots
function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    let dotIndex = index - 1;
    if (index === 0) dotIndex = totalSlides - 1;
    if (index === totalSlides + 1) dotIndex = 0;
    dots[dotIndex].classList.add("active");
}

// Next / Prev slides
function nextSlide() {
    index++;
    moveToSlide(index);
    if (index === totalSlides + 1) {
        setTimeout(() => {
            index = 1;
            moveToSlide(index, true);
        }, 500);
    }
    updateDots();
}

function prevSlide() {
    index--;
    moveToSlide(index);
    if (index === 0) {
        setTimeout(() => {
            index = totalSlides;
            moveToSlide(index, true);
        }, 500);
    }
    updateDots();
}

// Autoplay
let slideInterval = setInterval(nextSlide, 3000);
function resetTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

// Controls
document.querySelector(".next").addEventListener("click", () => {
    nextSlide();
    resetTimer();
});

document.querySelector(".prev").addEventListener("click", () => {
    prevSlide();
    resetTimer();
});

// Dot navigation
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i + 1;
        moveToSlide(index);
        updateDots();
        resetTimer();
    });
});




// PROJECT
const seeMoreBtn = document.getElementById("seeMoreBtn");
const allCards = document.querySelectorAll(".project-card");
const filterLinks = document.querySelectorAll(".filter-buttons a");

let expanded = false;
let currentFilter = "all"; // default filter

function updateProjects() {
  let visibleCount = 0;
  allCards.forEach(card => {
    if (currentFilter === "all" || card.dataset.category === currentFilter) {
      if (!expanded && visibleCount >= 5) {
        card.style.display = "none";
      } else {
        card.style.display = "block";
      }
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  // toggle button text depende sa state
  if (visibleCount > 5) {
    seeMoreBtn.style.display = "inline-block";
    seeMoreBtn.textContent = expanded ? "See Less" : "See More";
  } else {
    seeMoreBtn.style.display = "none"; // kung 5 or less projects lang, hide button
  }
}

// --- SEE MORE / SEE LESS ---
seeMoreBtn.addEventListener("click", () => {
  expanded = !expanded;
  updateProjects();
});

// --- FILTERING ---
filterLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    currentFilter = link.dataset.filter;
    expanded = false; // reset
    updateProjects();
  });
});

// --- Initial load (ALL with first 5 only)
updateProjects();

