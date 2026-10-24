/* =========================
   0. SETTINGS - EDIT THIS
========================= */

// Replace with your real email address.
const YOUR_EMAIL = "d.mayani@alustudent.com";

const root = document.documentElement;

/* =========================
   1. EMAIL LINK IN THE PAGE
========================= */

const emailLink = document.querySelector("#emailLink");

if (emailLink) {
  emailLink.textContent = YOUR_EMAIL;
  emailLink.href = `mailto:${YOUR_EMAIL}`;
}

/* =========================
   2. MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

/* =========================
   3. LIGHT / DARK THEME
========================= */

const themeToggle = document.querySelector("#themeToggle");

try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
} catch (error) {
  // Storage not available: ignore.
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark");

    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Storage not available: ignore.
    }
  });
}

/* =========================
   4. SCROLL ANIMATIONS
========================= */

const revealElements = document.querySelectorAll(
  "main section, .card, .journey-item"
);

revealElements.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* =========================
   5. HIGHLIGHT CURRENT SECTION IN NAV
========================= */

const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAnchors.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => spy.observe(section));
}

/* =========================
   6. AUTOMATIC FOOTER YEAR
========================= */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================
   7. CONTACT FORM (opens email app)
========================= */

const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector(".form-message");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const message = formData.get("message") || "";
    const subject =
      (formData.get("subject") || "").toString().trim() ||
      "Message from my portfolio";

    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const mailtoLink =
      `mailto:${YOUR_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    if (formMessage) {
      formMessage.textContent =
        "Your email app should open. Please send the message from there.";
    }

    contactForm.reset();
  });
}