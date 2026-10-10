export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    "public/**/*",
    "resources/**/*",
    ".hugo_cache/**/*",
    "themes/**/*",
    "reports/lighthouse/**/*",
  ],
  rules: {
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "alpha-value-notation": null,
    "color-function-notation": null,
    // Signale l'ordre des sélecteurs (spécificité décroissante), pas des erreurs :
    // les feuilles s'appuient volontairement sur la cascade (états, thème sombre, surcharges du thème).
    "no-descending-specificity": null,
  },
};
