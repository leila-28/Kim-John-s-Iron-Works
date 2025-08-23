let slideIndex = 0;
let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");
let slider = document.querySelector(".slider");

function showSlide(index) {
    // shift entire slider
    slider.style.transform = `translateX(-${index * 100}%)`;

    // update dots
    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Next/Prev controls
document.querySelector(".next").addEventListener("click", () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
});

// Dot controls
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        slideIndex = i;
        showSlide(slideIndex);
    });
});

// Auto slide every 5s
setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 5000);