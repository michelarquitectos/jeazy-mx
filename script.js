const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const ageGate = document.querySelector("#ageGate");
const ageYes = document.querySelector("#ageYes");
const ageNo = document.querySelector("#ageNo");
const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector("#navLinks");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = selected === "all" || card.dataset.category === selected;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

if (ageGate && !localStorage.getItem("jeazy-store-age")) {
  ageGate.classList.add("show");
  document.body.classList.add("locked");
}

ageYes?.addEventListener("click", () => {
  localStorage.setItem("jeazy-store-age", "yes");
  ageGate.classList.remove("show");
  document.body.classList.remove("locked");
});

ageNo?.addEventListener("click", () => {
  window.location.href = "https://www.google.com";
});

menuButton?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
