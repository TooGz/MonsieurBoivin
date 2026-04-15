# Site Inventory

## Stack

- Generateur : Hugo
- Theme : Blowfish
- Routage : content bundles filesystem + taxonomies Hugo
- CSS : `themes/blowfish/assets/css/compiled/main.css`, `assets/css/design-system/*.css`, `assets/css/styles.css`, `assets/css/custom.css`
- JS : `themes/blowfish/assets/js/*.js`, `assets/js/main.js`, `assets/js/components/*.js`
- CI : `.github/workflows/hugo.yaml`, `.github/workflows/quality.yml`

## Types de pages

| Type | Count |
| --- | ---: |
| `detail:article` | 18 |
| `detail:recipe` | 14 |
| `detail:photo-album` | 11 |
| `detail:project` | 6 |
| `detail:build-log` | 3 |
| `detail:author-profile` | 2 |
| `home` | 1 |
| `listing:articles` | 1 |
| `listing:atelier` | 1 |
| `listing:authors` | 1 |
| `listing:photos` | 1 |
| `listing:recipes` | 1 |
| `listing:tags` | 1 |

Le detail complet page par page est dans `reports/site-inventory.json`.

## Composants communs

| ID | Role | Source |
| --- | --- | --- |
| `global-header` | Header + navigation legacy Blowfish | `themes/blowfish/layouts/partials/header/basic.html` |
| `global-footer` | Footer global legacy Blowfish | `themes/blowfish/layouts/partials/footer.html` |
| `home-shell-v2` | Home custom shell avec hero, timeline, filtres, CTA | `layouts/partials/home/custom.html` |
| `mini-card` | Carte reusable article / recette / projet | `layouts/partials/home/mini-card.html` |
| `recipe-single` | Layout detail recette dedie | `layouts/partials/recipes/single.html` |
| `design-system-patterns` | Patterns de reference pour migration | `design-system/components/*.html` |

## URLs de controle rapide

- `/` | `home` | Cuisine maison, DIY et idees utiles a refaire
- `/posts/` | `listing:articles` | Articles
- `/recettes/` | `listing:recipes` | Carnet de Recettes
- `/posts/bases-photo-ouverture/` | `detail:article` | Les bases de la photographie [PART 1/3] : l'ouverture
- `/recettes/bavette-boeuf-grillee/` | `detail:recipe` | Bavette de boeuf grillee au Kamado
- `/atelier/grenouille/` | `detail:project` | Projet Grenouille 3.0
- `/photos/2012-Youssoupha-le-chabada/` | `detail:photo-album` | Youssoupha @ Le Chabada [2012]

## Dettes detectees

- `high` `layout-shell` : home v2 et pages legacy n'utilisent pas encore le meme shell visuel. Header, footer, densite et cartes varient trop selon les templates.
- `high` `css-architecture` : Blowfish compile du style utilitaire pendant que le repo ajoute du CSS custom et un design system. Il faut cadrer les zones de responsabilite pour eviter la collision.
- `medium` `component-consistency` : les cartes, meta et listings ne racontent pas encore la meme histoire visuelle selon la section.
- `medium` `js-behaviour` : theme legacy, home v2 et futurs scripts d'audit doivent converger sur `data-js`, theme toggle et disclosure patterns.
- `low` `tooling` : le repo n'avait pas de quality gate front avant cette passe.
- `low` `coverage` : les pages photos restent surtout documentaires. Une vague 2 doit poser un pattern galerie/album plus net.
