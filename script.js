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
// HAMBURGER MENU & ACTIVE LINKS
// ================================
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    const links = document.querySelectorAll(".menu a");

    // Toggle menu
    hamburger.addEventListener("click", () => {
        menu.classList.toggle("active");
        hamburger.classList.toggle("open");
    });

    // Close menu and set active link when clicked
    links.forEach(link => {
        link.addEventListener("click", () => {
            // Remove active from all links
            links.forEach(l => l.classList.remove("active"));

            // Add active to clicked link
            link.classList.add("active");

            // Close menu
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
    seeMoreBtn.style.display = "none"; // hide button if <=5
  }

  // update active class for filter buttons
  filterLinks.forEach(link => link.classList.remove("active"));
  filterLinks.forEach(link => {
    if (link.dataset.filter === currentFilter) link.classList.add("active");
  });
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
    expanded = false; // reset see more
    updateProjects();
  });
});

// --- Initial load ---
updateProjects();

// --- MOBILE BEFORE/AFTER TOGGLE ---
allCards.forEach(card => {
  const beforeImg = card.querySelector("img.before");
  let mobileToggle = false;

  card.addEventListener("click", () => {
    if (window.innerWidth <= 768) { // mobile only
      mobileToggle = !mobileToggle;
      if (beforeImg) {
        beforeImg.style.opacity = mobileToggle ? "1" : "0";
      }
    }
  });
});


// ------------------------------------------------------------
// ✅ PROJECT DETAILS MODAL + LIGHTBOX
// ------------------------------------------------------------
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modalTitle");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const modalGallery = document.getElementById("modalGallery");

// 🔹 Lightbox
const lightbox = document.createElement("div");
lightbox.classList.add("lightbox");
document.body.appendChild(lightbox);
const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.style.display = "flex";
}
lightbox.addEventListener("click", () => lightbox.style.display = "none");

// Project Data
const projectData = {
  project1: {
    title: "House Renovation",
    location: "Purok 2 Balungao, Calumpit, Bulacan",
    description: "Home renovation featuring modern finishes, enhanced structural safety, and durable stainless rails installation.",
    images: ["after.jpg", "HR_03.jpg","HR_06.jpg", "HR_04.jpg", "HR_05.jpg", "beforee.jpg","HR_08.jpg", "HR_07.jpg"]
  },
  project2: {
    title: "Trusses Arc Roof Installation",
    location: "LA Residencia, Calumpit, Bulacan",
    description: "Installation of trussed arc roof system for enhanced structural support and long-term durability.",
    images: ["trusses_before.jpg", "trusses_after.jpg"]
  },
  project3: {
    title: "Stainless Railings with Gold design",
    location: "Bulacan",
    description: "Elegant stainless railings enhanced with gold accents for a durable and luxurious finish.",
    images: ["rails2.jpg", "rails.jpg"]
  },
  project4: {
    title: "Gate",
    location: "Bulacan",
    description: "Modern gate design that combines protection with sleek visual appeal.",
    images: ["gate4_before.jpg", "gate4_after.jpg"]
  },
  project5: {
    title: "Roof Framing, Polycarbonate remove and installed",
    location: "Sampaguita Street, Las Piñas City",
    description: "Roof framing completed with precise polycarbonate removal and installation for durability and protection.",
    images: ["roofframming_before.jpg", "roofframming_after.jpg"]
  },
  project6: {
    title: "Flood Gate",
    location: "La Residencia, Calumpit, Bulacan",
    description: "Strong, durable flood gate installation combining security and sleek design.",
    images: ["floodgate_before.jpg", "floodgate_after.jpg"]
  },
  project7: {
    title: "Trusses/Roof Framing Installation",
    location: "LA Residencia, Calumpit, Bulacan",
    description: "Professional installation of trusses and roof framing to ensure structural integrity.",
    images: ["trusses2_before.jpg", "trusses2_after.jpg"]
  },
  project8: {
    title: "Roof Framing and Installation",
    location: "Pinag Bakahan, Malolos, Bulacan",
    description: "Roof framing and installation completed with precision for durability and safety.",
    images: ["roof4_before.jpg", "roof4_after.jpg"]
  },
  project9: {
    title: "Roof Framing & Paint + Sliding Gate Installation",
    location: "Agro Industrial, Calumpit, Bulacan",
    description: "Roof framing with paint finish and sliding gate installation for enhanced durability and style.",
    images: ["roof & gate_before.jpg", "roof & gate_after.jpg"]
  },
  project10: {
    title: "Roof Framing",
    location: "LA Residencia, Calumpit, Bulacan",
    description: "Roof framing for structural strength and durability.",
    images: ["roof5_before.jpg", "roof5_after.jpg"]
  },
  project11: {
    title: "Signage",
    location: "Las Piñas City",
    description: "Durable and high-impact signage built for visibility, safety, and modern appeal.",
    images: ["sinage_before.jpg", "sinage_after.jpg"]
  },
  project12: {
    title: "Roof Framing and Installation",
    location: "Calumpit, Bulacan",
    description: "Durable roof framing and precise installation ensuring structural strength and weather protection.",
    images: ["roof6_before.png", "roof6_after.png"]
  },
  project13: {
    title: "Renovation and Extension",
    location: "Calumpit, Bulacan",
    description: "Reliable renovation and seamless extensions that upgrade spaces with strength, style, and lasting value.",
    images: ["renovation2_before.png", "renovation2_after.png"]
  },
  project14: {
    title: "Gate",
    location: "Calumpit, Bulacan",
    description: "Strong and secure gate installation combining durability, functionality, and modern design.",
    images: ["gatee.jpg", "gate2.jpg"]
  },
  project15: {
    title: "Gate",
    location: "Calumpit, Bulacan",
    description: "High-quality gate installation combining robust protection with a sleek finish.",
    images: ["gate3_before.jpg", "gate3.jpg"]
  },
  project16: {
    title: "Roll Up Doors",
    location: "Bulacan",
    description: "Heavy-duty roll-up doors built to secure spaces while allowing smooth and effortless access.",
    images: ["rollup2.2.jpg", "rollup2.jpg"]
  },
  project17: {
    title: "OG Billiard Renovation",
    location: "Apalit, Pampanga",
    description: "Custom renovation enhancing safety, durability, and aesthetic appeal for a billiard shop.",
    images: ["OGBilliard_Before.jpg", "OGBillliard_After.jpg"]
  },
  project18: {
    title: "Roll Up Doors",
    location: "Pio Cruzcosa, Calumpit, Bulacan",
    description: "Secure and durable roll-up doors with precision installation.",
    images: ["rollup_before.jpg", "rollup_after.jpg"]
  }
};

// ------------------------------------------------------------
// ✅ Hook up "View Details" buttons
// ------------------------------------------------------------
document.querySelectorAll(".view-details button").forEach(btn => {
  btn.addEventListener("click", () => {
    const projectId = btn.dataset.project;
    const data = projectData[projectId];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalLocation.textContent = data.location;
    modalDescription.textContent = data.description;

    modalGallery.innerHTML = "";
    data.images.forEach(img => {
      const imageEl = document.createElement("img");
      imageEl.src = img;
      modalGallery.appendChild(imageEl);

      imageEl.addEventListener("click", () => {
        openLightbox(img);
      });
    });

    modal.style.display = "block";
  });
});

// Close modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };


// --- IMAGE SCROLL CLICK TO PAUSE ON MOBILE ---
const scrollContent = document.querySelector(".scroll-content");

if (scrollContent) {
  const imgs = scrollContent.querySelectorAll("img");

  imgs.forEach(img => {
    img.addEventListener("click", () => {
      if (window.innerWidth <= 768) { // mobile only
        const isPaused = img.classList.contains("zoomed");

        // clear all zoomed para isang image lang
        imgs.forEach(i => i.classList.remove("zoomed"));

        if (!isPaused) {
          img.classList.add("zoomed");
          scrollContent.style.animationPlayState = "paused"; // stop scroll
        } else {
          scrollContent.style.animationPlayState = "running"; // resume scroll
        }
      }
    });
  });
}


