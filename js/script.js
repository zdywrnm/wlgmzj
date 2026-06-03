function initializePage() {
    initMobileMenu();
    initScrollEffects();
    initQrCodeModal();
    initSmoothScroll();
}

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target.tagName === "A") closeMenu();
    });

    document.addEventListener("click", (event) => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) closeMenu();
    });
}

function initScrollEffects() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const updateNavbar = () => {
        navbar.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
}

function initQrCodeModal() {
    const modal = document.getElementById("qrCodeModal");
    const modalImage = document.getElementById("modalImage");
    const closeButton = document.querySelector(".close-modal");

    if (!modal || !modalImage) return;

    const closeModal = () => {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modalImage.src = "";
    };

    document.querySelectorAll(".social-icon").forEach((icon) => {
        icon.addEventListener("click", (event) => {
            event.preventDefault();
            const imagePath = icon.getAttribute("data-image");
            if (!imagePath) return;

            modalImage.src = imagePath;
            modal.style.display = "flex";
            modal.setAttribute("aria-hidden", "false");
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;

            event.preventDefault();
            const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 88;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        });
    });
}

document.addEventListener("DOMContentLoaded", initializePage);
