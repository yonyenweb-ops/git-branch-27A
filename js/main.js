document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("primary-nav");

  if (!menuToggle || !nav) return;

  const navLinks = nav.querySelectorAll(".nav__list a");

  const closeNav = () => {
    nav.classList.remove("nav--open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const setActiveLink = (clickedLink) => {
    navLinks.forEach((link) => link.classList.remove("active"));
    clickedLink.classList.add("active");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setActiveLink(link);
      closeNav();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
});
