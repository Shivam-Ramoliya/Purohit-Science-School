document.addEventListener("DOMContentLoaded", () => {

    const heroSection = document.querySelector(".hero"); // Use correct selector

    // List of Background Images
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

    // Set Initial Background
    changeBackground();
    // Change Background Every 5 Seconds
    setInterval(changeBackground, 5000);


    // Mobile Menu Toggle
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Smooth Scrolling for Navigation Links with Offset
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

    // Active Navigation Link Highlight on Scroll
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

    // People Section - Redirect on Click
    document.querySelectorAll(".people-card").forEach(card => {
        card.addEventListener("click", function () {
            let page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });

    // Intersection Observer for Fade-in Animation
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

    // Observe all sections for animation
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("fade-out");
        observer.observe(section);
    });

    document.querySelectorAll(".star-card").forEach(card => {
        card.addEventListener("click", function () {
            let page = this.getAttribute("data-page");
            if (page) {
                window.location.href = page;
            }
        });
    });
});
