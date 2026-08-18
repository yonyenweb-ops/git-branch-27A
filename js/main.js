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

  // ---------- Sign in modal ----------
  const overlay = document.getElementById("signin-overlay");
  const closeBtn = document.getElementById("signin-close");
  const form = document.getElementById("signin-form");
  const accountBtn = document.querySelector(".header__actions .icon-btn[aria-label='Account']");
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");

  if (overlay && closeBtn && form) {
    let pendingWishlistBtn = null;

    const isSignedIn = () => localStorage.getItem("shoply_signed_in") === "true";

    const openModal = () => {
      overlay.hidden = false;
      document.getElementById("signin-email").focus();
    };

    const closeModal = () => {
      overlay.hidden = true;
      pendingWishlistBtn = null;
      form.reset();
    };

    const toggleWishlist = (btn) => {
      btn.classList.toggle("is-active");
    };

    wishlistBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (isSignedIn()) {
          toggleWishlist(btn);
        } else {
          pendingWishlistBtn = btn;
          openModal();
        }
      });
    });

    if (accountBtn) {
      accountBtn.addEventListener("click", () => {
        if (!isSignedIn()) openModal();
      });
    }

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !overlay.hidden) closeModal();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      localStorage.setItem("shoply_signed_in", "true");
      if (pendingWishlistBtn) toggleWishlist(pendingWishlistBtn);
      closeModal();
    });
  }
});
