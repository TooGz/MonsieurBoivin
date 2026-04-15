# MonsieurBoivin.fr

Refonte home + socle d'audit + design system minimal pour homogeniser tout le site Hugo/Blowfish sans casser l'existant.

## Ce qu'il y a dans le repo

- home v2 dans `layouts/partials/home/`
- SEO centralise dans `layouts/partials/seo.html` et `layouts/partials/schema.html`
- design system CSS dans `assets/css/design-system/`
- JS progressif dans `assets/js/main.js` et `assets/js/components/`
- scripts d'audit dans `scripts/audit/`
- tests Playwright dans `tests/`
- docs de migration et de controle dans `docs/`

## Commandes

Dev Hugo :

```bash
hugo server -D
```

Build prod :

```bash
hugo --gc --minify --environment production --baseURL https://monsieurboivin.fr/
```

Tooling qualite :

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

## Checklists

Pre-launch :

- home, listing et detail avec 1 seul `h1`
- theme toggle OK et sans flash sale
- focus visible sur tout le shell
- title, description, canonical, OG, JSON-LD OK
- liens internes et ancres OK
- images hero stables, images secondaires en lazy

Post-launch :

- verifier Search Console et sitemap
- verifier Lighthouse home + pages echantillons
- verifier vitals reels si le RUM est branche
- verifier les erreurs JS ou liens casses remontes par CI

## Fichiers a lire ensuite

- `README-migration.md`
- `docs/site-inventory.md`
- `docs/audit-manuel.md`
- `docs/audit-automatique.md`
- `docs/implementation-rules.md`
- `docs/post-deploy-monitoring.md`
