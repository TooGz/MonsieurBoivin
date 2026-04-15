export const initStickyNav = () => {
  const stickyShell = document.querySelector("[data-sticky-shell]");
  if (!stickyShell) return;

  const sync = () => {
    stickyShell.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  sync();
  window.addEventListener("scroll", sync, { passive: true });
};
