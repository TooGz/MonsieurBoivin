# Implementation Rules

## Conventions de nommage

- Composants : prefixe `c-`
- Layouts : prefixe `l-`
- Utilities : prefixe `u-`
- Etats JS/CSS : `is-*`, `has-*`, `data-*`
- Migration : `html[data-ui="legacy"]` et `html[data-ui="v2"]`

## Ordre des layers CSS

```css
@layer ds-base, ds-components, ds-utilities, ds-overrides;
```

- `ds-base` : tokens, reset, typographie, liens, focus, comportements globaux.
- `ds-components` : nav, hero, cards, forms, timeline, footer.
- `ds-utilities` : container, stack, cluster, flow, grid, helpers visuels.
- `ds-overrides` : pont temporaire entre Blowfish legacy et patterns v2.

## Breakpoints et container queries

- Mobile first par defaut.
- Breakpoints minimaux:
  - `40rem` pour sortir d'un mono-colonne serre
  - `64rem` pour densifier desktop
- Preferer `@container` quand le composant doit reagir a son conteneur, pas a la fenetre.
- Garder `@media` pour layout global, header, grilles majeures et hero.

## Dark / light

- Source de verite: classe `dark` du theme Blowfish + `data-theme`.
- Respecter `prefers-color-scheme` tant qu'aucun choix manuel n'est stocke.
- Le toggle manuel ecrit dans `localStorage`.
- Aucun style ne doit supposer qu'une couleur est valide seulement en dark.

## Reduced motion

- Limiter les animations a `transform` et `opacity`.
- Si `prefers-reduced-motion: reduce`, couper transitions longues, lift cards, reveal scroll.
- Pas de scrolling anime obligatoire pour atteindre un contenu.

## No-JS fallback

- `html[data-js="off"]` tant que `main.js` n'a pas demarre.
- Sans JS:
  - le menu doit rester lisible ou deja visible
  - les filtres ne doivent rien masquer
  - le contenu principal doit etre complet
- JS ne fait qu'ameliorer disclosure, filtres, sticky shadow, theme sync.

## Images et medias

- Toujours `width` + `height`.
- Hero/LCP: preload ou `fetchpriority="high"` si l'image le merite.
- Hors ecran: `loading="lazy"`.
- `alt` utile, pas de bourrage de mots-cle.

## Perf budget de travail

- CSS critique: reserve a l'above-the-fold.
- JS custom home + shell: petit, modulaire, sans dependances lourdes.
- Eviter toute logique qui force un reflow boucle sur scroll/resize.
- `content-visibility: auto` pour sections longues sous la ligne de flottaison.
