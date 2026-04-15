# Audit Automatique

## Prerequis

- Node 20+
- Hugo Extended
- Java 21 pour `vnu-jar`
- Chromium Playwright pour les suites e2e/a11y

## Commandes utiles

```bash
npm install
npm run audit:inventory
npm run build:site:ci
npm run audit:links
npm run audit:seo
npm run audit:html
npm run test:a11y
npm run test:e2e
npm run lhci
```

Pour tout lancer d'un coup :

```bash
npm run audit
```

## Ce que fait chaque script

- `audit:inventory` : sort l'inventaire pages/components/dettes dans `docs/` et `reports/`.
- `build:site:ci` : build Hugo sur `http://127.0.0.1:4173/` pour des checks deterministes.
- `audit:links` : verifie liens internes + ancres sur le HTML genere.
- `audit:seo` : check title, meta description, canonical, OG, Twitter, H1, JSON-LD, `alt`.
- `audit:html` : passe le build dans Nu Html Checker.
- `test:a11y` : Playwright + axe sur un set d'URLs representatif.
- `test:e2e` : smoke tests shell global et composants critiques.
- `lhci` : Lighthouse CI sur home + pages echantillons.

## Lire les resultats vite

- `reports/site-inventory.json` : source de verite pour le scope de migration.
- `reports/lighthouse/` : HTML + JSON par URL.
- `playwright-report/` : details des erreurs e2e/a11y.

## Regles de triage

- Echec `links` ou `html` : blocker direct.
- Echec `seo` : blocker si home, listing principal ou template detail.
- Echec `a11y` : blocker si focus, contraste, labels, landmarks, H1.
- Echec Lighthouse :
  - Perf < 85 sur home = blocker.
  - SEO < 95 = blocker.
  - Accessibility < 95 = blocker.
  - Best Practices < 90 = a corriger avant release si reproducible.
