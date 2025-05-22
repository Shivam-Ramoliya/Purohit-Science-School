document.addEventListener("DOMContentLoaded", () => {
    /* ------------------------- HERO BACKGROUND SLIDESHOW ------------------------- */
    const heroSection = document.querySelector(".hero");

    const images = [
        "images/utilities/hero-bg1.jpg",
        "images/utilities/hero-bg2.jpg",
        "images/utilities/hero-bg3.jpg",
        "images/utilities/hero-bg4.jpg",
        "images/utilities/hero-bg5.jpg",
        "images/utilities/hero-bg6.jpg"
    ];

    let currentIndex = 0;

    function changeBackground() {
        heroSection.style.background = `
            linear-gradient(rgba(70, 80, 152, 0), rgba(0, 0, 0, 0)),
            url('${images[currentIndex]}') no-repeat center center / cover`;
        currentIndex = (currentIndex + 1) % images.length;
    }

    changeBackground();
    setInterval(changeBackground, 5000);

    /* ---------------------------- MOBILE MENU TOGGLE ---------------------------- */
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    /* ------------------------ SMOOTH SCROLL FOR NAV LINKS ------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = document.querySelector("header").offsetHeight;
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset + 65;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link (for mobile users)
                navLinks.classList.remove("active");
            }
        });
    });

    /* ------------------- ACTIVE LINK HIGHLIGHT BASED ON SCROLL ------------------- */
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 55;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href").slice(1) === current) {
                item.classList.add("active");
            }
        });
    });

    /* ------------------------- PEOPLE CARD REDIRECTION --------------------------- */
    document.querySelectorAll(".people-card").forEach(card => {
        card.addEventListener("click", function () {
            const page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    /* ------------------------- PEOPLE CARD REDIRECTION --------------------------- */
    document.querySelectorAll(".people-card3").forEach(card => {
        card.addEventListener("click", function () {
            const page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    /* ------------------------- STAR CARD REDIRECTION ----------------------------- */
    document.querySelectorAll(".star-card").forEach(card => {
        card.addEventListener("click", function () {
            const page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    /* ----------------- FADE-IN ANIMATION WITH INTERSECTION OBSERVER ---------------- */
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        section.classList.add("fade-out");
        observer.observe(section);
    });

    /* ----------------------- MOBILE NAVIGATION (MORE LOGIC) ----------------------- */
    // Close mobile nav on clicking links inside it
    document.querySelectorAll("#mobile-nav a").forEach(item => {
        item.addEventListener("click", () => {
            document.getElementById("mobile-nav").classList.remove("active");
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener("click", (event) => {
        const mobileNav = document.getElementById("mobile-nav");
        const mobileMenu = document.querySelector(".mobile-menu");

        if (!mobileNav.contains(event.target) && !mobileMenu.contains(event.target)) {
            mobileNav.classList.remove("active");
        }
    });
});

// Expose toggleMenu globally so it can be called from HTML inline handlers
window.toggleMenu = function () {
    const mobileNav = document.getElementById("mobile-nav");
    if (mobileNav) {
        mobileNav.classList.toggle("active");
    }
};

const firstLine = "Welcome to the new era of Knowledge!";
const secondLine = "Crafting a bright future with passion and precision.";

const typingSpeed = 50;
const deletingSpeed = 50;
const pauseBetween = 1500;

const titleElement = document.getElementById("typewriter-title");
const subtitleElement = document.getElementById("typewriter-subtitle");

function typeText(element, text, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, typingSpeed);
        } else {
            if (callback) callback();
        }
    }
    typing();
}

function loopTypeDelete(element, text) {
    let charIndex = 0;
    let isDeleting = false;

    function loop() {
        if (!isDeleting) {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(loop, typingSpeed);
            } else {
                setTimeout(() => {
                    isDeleting = true;
                    loop();
                }, pauseBetween);
            }
        } else {
            if (charIndex > 0) {
                element.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(loop, deletingSpeed);
            } else {
                isDeleting = false;
                setTimeout(loop, typingSpeed);
            }
        }
    }
    loop();
}

// First type the title, then start the looping subtitle
window.onload = () => {
    typeText(titleElement, firstLine, () => {
        loopTypeDelete(subtitleElement, secondLine);
    });
};
