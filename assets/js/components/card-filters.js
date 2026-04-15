const normalize = (value) => value?.trim().toLowerCase() || "";

export const initCardFilters = () => {
  const groups = [...document.querySelectorAll("[data-filter-group]")];
  if (!groups.length) return;

  groups.forEach((group) => {
    const buttons = [...group.querySelectorAll("[data-filter]")];
    const cards = [...group.querySelectorAll("[data-filter-card]")];
    const counter = group.querySelector("[data-filter-count]");
    const emptyState = group.querySelector("[data-filter-empty]");

    if (!buttons.length || !cards.length) return;

    const applyFilter = (rawFilter) => {
      const activeFilter = normalize(rawFilter);
      let visibleCount = 0;

      buttons.forEach((button) => {
        const isActive = normalize(button.dataset.filter) === activeFilter;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      cards.forEach((card) => {
        const tags = normalize(card.dataset.tags).split(/\s+/).filter(Boolean);
        const matches = activeFilter === "all" || tags.includes(activeFilter);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (counter) {
        counter.textContent = String(visibleCount);
      }

      if (emptyState) {
        emptyState.hidden = visibleCount > 0;
      }
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
    });

    applyFilter("all");
  });
};
