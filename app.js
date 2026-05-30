// ===========================
// TYPEWRITER EFFECT
// ===========================
const roles = [
  "Mobile App Developer",
  "Web Developer",
  "Machine Learning Enthusiast",
  "Open Source Contributor",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEl = document.getElementById("typewriter");

function typewriter() {
  if (!typeEl) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing
    typeEl.innerHTML = currentRole.slice(0, charIndex + 1) + '<span class="cursor"></span>';
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typewriter, 1800);
      return;
    }
  } else {
    // Deleting
    typeEl.innerHTML = currentRole.slice(0, charIndex - 1) + '<span class="cursor"></span>';
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typewriter, isDeleting ? 60 : 110);
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===========================
// MOBILE NAV TOGGLE
// ===========================
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = navToggle.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  }
});

// Close nav on link click (mobile)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "";
    spans[1].style.opacity = "";
    spans[2].style.transform = "";
  });
});

// ===========================
// SCROLL REVEAL (FADE IN)
// ===========================
const fadeElements = document.querySelectorAll(
  ".skill-card, .project-card, .contact-item, .section-header"
);

// Add fade-in class to elements
fadeElements.forEach(el => el.classList.add("fade-in"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid items
        const siblings = Array.from(entry.target.parentElement.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 80}ms`;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

fadeElements.forEach(el => observer.observe(el));

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const level = card.getAttribute("data-level");
        const fill = card.querySelector(".skill-fill");
        if (fill) {
          setTimeout(() => {
            fill.style.width = level + "%";
          }, 200);
        }
        skillObserver.unobserve(card);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-card").forEach(card => {
  skillObserver.observe(card);
});

// ===========================
// SMOOTH ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll("section[id]");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-links a").forEach(a => {
          a.style.color = "";
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (activeLink) activeLink.style.color = "var(--clr-primary)";
      }
    });
  },
  { threshold: 0.5 }
);

sections.forEach(sec => navObserver.observe(sec));

// ===========================
// INIT
// ===========================
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typewriter, 600);
});
