export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    "public/**/*",
    "resources/**/*",
    ".hugo_cache/**/*",
    "themes/**/*",
    "reports/lighthouse/**/*"
  ],
  rules: {
    "selector-class-pattern": null,
    "custom-property-pattern": null,
    "alpha-value-notation": null,
    "color-function-notation": null
  }
};
