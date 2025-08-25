// NAVBAR

  let lastScrollTop = 0;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // 📉 Scrolling Down → Shrink Navbar
      navbar.classList.add("shrink");
    } else {
      // 📈 Scrolling Up → Expand Navbar
      navbar.classList.remove("shrink");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // Optional: auto close menu when link clicked (mobile)
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  let lastScrollY = window.scrollY;

  // 🔹 Toggle menu (open/close)
  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("open");
  });

  // 🔹 Close menu kapag nag-click ng link
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });

  // 🔹 Scroll effect (mobile only)
  window.addEventListener("scroll", () => {
    if (window.innerWidth <= 768) {
      if (window.scrollY > lastScrollY) {
        // scroll down → hide
        nav.style.transform = "scaleY(0)";
      } else {
        // scroll up → show
        nav.style.transform = "scaleY(1)";
      }
    } else {
      // reset kapag desktop
      nav.style.transform = "scaleY(1)";
    }
    lastScrollY = window.scrollY;
  });
});



/*HOME*/

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let index = 0;
let totalSlides = slides.length;

// clone first & last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
slider.appendChild(firstClone);
slider.insertBefore(lastClone, slides[0]);

// adjust initial position (nasa "real first slide")
slider.style.transform = `translateX(-100%)`;
index = 1; // dahil may lastClone sa unahan

function moveToSlide(n, instant = false) {
    if (instant) {
        slider.style.transition = "none";
    } else {
        slider.style.transition = "transform 0.5s ease";
    }
    slider.style.transform = `translateX(-${n * 100}%)`;
}

// update dots
function updateDots() {
    dots.forEach(dot => dot.classList.remove("active"));
    let dotIndex = index - 1;
    if (index === 0) dotIndex = totalSlides - 1; // nasa lastClone
    if (index === totalSlides + 1) dotIndex = 0; // nasa firstClone
    dots[dotIndex].classList.add("active");
}

// auto + next (pa-left)
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

// prev (pa-right)
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

// controls
document.querySelector(".next").addEventListener("click", nextSlide);
document.querySelector(".prev").addEventListener("click", prevSlide);
setInterval(nextSlide, 3000);

// dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i + 1;
        moveToSlide(index);
        updateDots();
    });
});


/*ABOUT*/

function auReadMore()
{
    var btn = document.querySelector('.read-more-btn');
    var grad = document.querySelector('.card .auBg');
    var toggleImage = document.querySelector('.read-more-btn img');

    var extraText = document.getElementById('card_read-more');
    
            if (extraText.classList.contains('hidden')) {
                extraText.classList.remove('hidden');
                grad.style.display = "none";
                btn.style.display = "inline-flex";
                btn.style.marginTop = "0%";
                toggleImage.src = 'aboutUsLessBtn.png';
                toggleImage.alt = 'Show Less';
            }  
            else {
                extraText.classList.add('hidden');
                grad.style.display = "flex";
                btn.style.display = "inline-flex";
                btn.style.marginTop = "-5.5%";
                toggleImage.src = 'aboutUsMoreBtn.png';
                toggleImage.alt = 'Show More';
            }
}

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("nav .menu").classList.toggle("active");
});


    window.addEventListener("scroll", function () {
        const nav = document.querySelector("nav");
        if (window.scrollY > 50) { // kapag lumampas ng 50px scroll
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
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

