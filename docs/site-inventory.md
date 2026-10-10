# Site Inventory

## Stack

- Generateur : Hugo
- Theme : Blowfish
- Routage : Filesystem content bundles + Hugo taxonomies
- CSS : themes/blowfish/assets/css/compiled/main.css, assets/css/design-system/*.css, assets/css/home.css, assets/css/custom.css
- JS : themes/blowfish/assets/js/*.js, assets/js/main.js, assets/js/components/*.js
- CI : .github/workflows/hugo.yaml, .github/workflows/quality.yml

## Types de pages

| Type | Count |
| --- | ---: |
| detail:article | 19 |
| detail:recipe | 14 |
| detail:content | 13 |
| detail:photo-album | 11 |
| detail:project | 8 |
| detail:build-log | 3 |
| detail:author-profile | 2 |
| home | 1 |
| listing:atelier | 1 |
| listing:authors | 1 |
| listing:photos | 1 |
| listing:articles | 1 |
| listing:recipes | 1 |
| listing:tags | 1 |

## Composants communs

| ID | Role | Source |
| --- | --- | --- |
| global-header | Header fixe + menu mobile en <dialog> | `layouts/partials/header/fixed.html` |
| global-footer | Pied de page (navigation, contact, mentions légales) | `layouts/partials/footer/site-footer.html` |
| search | Recherche (fenêtre accessible, insensible aux accents) | `layouts/partials/search.html + assets/js/search.js` |
| media | Galerie + visionneuse, vidéo locale, façade YouTube | `layouts/shortcodes/{gallery,video,youtube}.html` |
| home-shell-v2 | Homepage custom shell with hero, timeline, filters, CTA | `layouts/partials/home/custom.html` |
| mini-card | Reusable cards for article / recipe / project highlights | `layouts/partials/home/mini-card.html` |
| recipe-single | Dedicated recipe detail layout | `layouts/partials/recipes/single.html` |

## URLs de controle rapide

- / | home | Cuisine maison, DIY et idées utiles à refaire
- /posts/ | listing:articles | Articles
- /recettes/ | listing:recipes | Carnet de Recettes
- /posts/2019-03-05-openemu-retrogaming-emulateur-ultime-sur-macos/ | detail:article | OpenEmu, l’émulateur retrogaming ultime sur macOS
- /recettes/bavette-boeuf-grillee/ | detail:recipe | Bavette de bœuf grillée au Kamado
- /atelier/enceinte-mb158-club-monitor/ | detail:project | Enceinte MB158 Club Monitor
- /photos/2012-youssoupha-le-chabada/ | detail:photo-album | Youssoupha @ Le Chabada (2012)

## Dettes detectees

- `high` theme-version : Thème Blowfish 2.90 copié dans themes/ (max Hugo 0.150) ; la version publiée est la 3.x. Hugo reste figé en 0.150 : le déploiement compile avec --panicOnWarning, l'avertissement de compatibilité du thème le ferait échouer.
- `high` privacy : Google Analytics est chargé sans recueil de consentement. Non conforme aux recommandations de la CNIL tant qu'un bandeau ou un outil sans cookies n'est pas en place.
- `medium` css-weight : La feuille compilée du thème (≈106 Ko) est en grande partie inutilisée par les gabarits du site. CSS bloquant le rendu plus lourd que nécessaire.
- `low` content-encoding : 0 fichier(s) montrent des traces d'encodage bancal ou de texte mojibake. SEO, lisibilité et microcopy peuvent se dégrader sur certaines pages.
- `low` drafts : 9 brouillon(s) dans content/ (non publiés, mais présents dans le dépôt). Leurs médias alourdissent le dépôt ; liens vers eux à rétablir lors de la publication.
