document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Smooth Scrolling for Navigation Links with Offset to prevent hiding under header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                const headerOffset = document.querySelector("header").offsetHeight; // Get header height
                const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset + 65; // Adjust -20px for extra spacing

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link (for mobile users)
                document.querySelector(".nav-links").classList.remove("active");
            }
        });
    });


    // Active Navigation Link Highlight on Scroll
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 55;
            const sectionHeight = section.clientHeight;
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
                window.location.href = page; // Redirect to the correct page
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
});