# Audit Manuel

Checklist courte, sans blabla. A passer avant merge pour une page migree, puis avant release pour le lot complet.

## Shell global

- Verifier le skip-link sur clavier des le premier `Tab`.
- Verifier que le header sticky n'ecrase jamais un focus ou une ancre.
- Verifier que le footer est coherent sur mobile, tablet et desktop.
- Verifier que le theme toggle est visible, comprehensible et persistant.

## Contenu et hierarchie

- Verifier qu'il n'y a qu'un seul `h1` par page.
- Verifier l'ordre `h1 > h2 > h3` sans saut arbitraire.
- Verifier que les cartes ont un titre cliquable et une meta lisible.
- Verifier que le texte d'intro n'est pas du remplissage recycle.

## Accessibilite

- Navigation clavier complete: tab, shift+tab, enter, espace, escape.
- `:focus-visible` propre sur liens, boutons, champs, filtres, pagination.
- Taille de cible suffisante pour boutons, tags, toggles, liens de nav.
- Contraste texte/fond valide en light et dark.
- Verification "focus not obscured" avec header sticky.
- Verification "dragging/motion" inutile absente si `prefers-reduced-motion`.

## SEO

- Title et description uniques sur home, listings, detail.
- Canonical correct et absolu.
- OG/Twitter presents et coherents avec le contenu.
- Liens internes crawlables sans action JS.
- JSON-LD present et coherent avec la page.
- Images avec `alt`, `width`, `height`, `loading` correct.

## Performance

- Hero stable visuellement: pas de saut de layout.
- Images hors ecran en lazy.
- Pas de clignotement du theme au chargement.
- Interactions rapides sur mobile reelle ou emulation lente.
- Sections longues sous la ligne de flottaison testees avec `content-visibility`.

## Regression visuelle

- Home vs pages legacy: meme densite, memes rayons, memes ombres, memes couleurs d'accent.
- Listes articles/recettes/projets: meme logique de grille et de meta.
- Pages details: meme largeur de lecture, meme spacing vertical, meme style CTA.
- Etats hover/focus/active alignes sur tout le site.
