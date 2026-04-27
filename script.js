const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const revealTargets = document.querySelectorAll(".reveal");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("section[id]").forEach((section) => {
  sectionObserver.observe(section);
});
