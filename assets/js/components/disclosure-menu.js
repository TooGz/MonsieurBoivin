export const initDisclosureMenus = () => {
  const disclosures = [...document.querySelectorAll("[data-nav-disclosure]")];
  if (!disclosures.length) return;

  const closeDisclosure = (details) => {
    details.open = false;
    document.body.style.overflow = "";
  };

  disclosures.forEach((details) => {
    details.addEventListener("toggle", () => {
      document.body.style.overflow = details.open ? "hidden" : "";
    });

    details.querySelectorAll("a, button").forEach((item) => {
      item.addEventListener("click", () => closeDisclosure(details));
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    disclosures.forEach(closeDisclosure);
  });

  document.addEventListener("click", (event) => {
    disclosures.forEach((details) => {
      if (!details.open) return;
      if (details.contains(event.target)) return;
      closeDisclosure(details);
    });
  });
};
