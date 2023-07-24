import { rules as stylelintConfigRecommended } from "npm:stylelint-config-recommended@13.0.0";

// run
export default {
  rules: {
    ...stylelintConfigRecommended,

    "color-named": "never",
    "font-family-name-quotes": "always-where-required",
    "font-weight-notation": "named-where-possible",
    "function-url-no-scheme-relative": true,
    "function-url-quotes": "always",
    "value-keyword-case": ["lower", { ignoreKeywords: ["Raleway"] }],
    "unit-disallowed-list": [],
    "no-descending-specificity": true,
    "no-duplicate-selectors": true,
    "font-family-no-missing-generic-family-keyword": null,
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["/^lost-/"],
      },
    ],
  },
};
