# Migration UI

## Strategie retenue

Migration progressive, pas big-bang.

- on garde Blowfish legacy vivant
- on ajoute un design system au-dessus
- on bascule page par page avec `data-ui`
- on ferme les ecarts de shell avant de refaire chaque template detail

## Feature flag

- global par config: `params.ui.defaultVersion`
- home forcee en `params.ui.homeVersion`
- override page par page possible via front matter `uiVersion = "v2"`

## Ordre de migration

1. Shell global: header, skip-link, footer, theme toggle, tokens.
2. Listings: posts, recettes, atelier, tags.
3. Details: article, recette, projet, album photo.
4. Formulaires / recherche / micro-interactions.
5. Nettoyage final des overrides legacy.

## Done par page

- shell stable mobile/tablet/desktop
- 1 seul `h1`
- title/description/canonical/OG/JSON-LD OK
- pas de regression clavier/focus
- Lighthouse dans les seuils
- liens et ancres verts
- pas de contenu bloque sans JS

## Anti-regression

- ne pas supprimer l'ancien CSS tant que la page n'est pas migree
- limiter les collisions avec `@layer` et scopes `data-ui`
- garder les memes URLs, canoniques et structures de headings
- valider home + 1 listing + 1 detail a chaque lot

## Rollback

- repasser `uiVersion = "legacy"` sur la page ou la section
- ou remettre `params.ui.defaultVersion = "legacy"` pour tout le site
- garder un tag git avant chaque vague de migration
