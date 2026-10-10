# MonsieurBoivin.fr

Site personnel (cuisine, atelier DIY, articles techniques, albums photo) généré avec [Hugo](https://gohugo.io) et le thème [Blowfish](https://blowfish.page), publié sur GitHub Pages.

## Versions

| Outil    | Version            | Où                                                                       |
| -------- | ------------------ | ------------------------------------------------------------------------ |
| Hugo     | 0.150.0 (extended) | `.tool-versions`, `.github/workflows/*.yml`                              |
| Node.js  | 22.18.0            | outillage qualité uniquement (le build Hugo n'utilise aucun paquet Node) |
| Blowfish | 2.90.0             | copié dans `themes/blowfish` (avec quelques retouches locales)           |

Hugo est volontairement figé en 0.150 : voir [Mettre à jour Hugo ou Blowfish](#mettre-à-jour-hugo-ou-blowfish).

## Démarrer

```bash
hugo server            # aperçu local sur http://localhost:1313
hugo --gc --minify     # build de production dans public/
```

Outillage qualité (optionnel en local, exécuté par la CI) :

```bash
npm ci
npm run format:check   # Prettier
npm run lint:js        # ESLint
npm run lint:css       # Stylelint
npm run build:site:ci  # build pour les audits
npm run audit:links    # liens et ancres internes
npm run audit:seo      # title, description, canonical, OG, JSON-LD, h1, alt
npm run test:a11y      # axe-core (Playwright)
npm run test:e2e       # tests de fumée (Playwright)
```

`npm run audit:html` (validateur Nu) demande Java ; les tests Playwright demandent `npx playwright install chromium`.

## Organisation

```
content/            contenus (Markdown + front matter YAML)
  posts/            articles
  recettes/         recettes (contenu structuré dans le front matter)
  atelier/          projets (Grenouille 3.0, MB-158…) et carnets de construction
  photos/           albums photo (shortcode gallery)
  categories/, tags/  pages de termes : description + redirections (aliases) des anciennes URL
  mentions-legales.md
layouts/            gabarits du site (surchargent ceux du thème)
  partials/seo.html, schema.html   balises SEO, Open Graph et données structurées
  partials/functions/              fonctions (descriptions, typographie française, accès aux données…)
  shortcodes/                      gallery, video, youtube
assets/css/         site-v2.css (habillage), home.css, recipes.css, modern-2026.css (couche moderne)
assets/js/          apparence, menu mobile, recherche, visionneuse, outils recette, façade YouTube
static/             icônes, manifeste, polices auto-hébergées (static/fonts)
archetypes/         modèles de nouveaux contenus (hugo new content --kind recette …)
scripts/, tests/    audits et tests de la CI qualité
```

## Écrire du contenu

Créer un contenu à partir d'un archétype :

```bash
hugo new content --kind recette recettes/ma-recette/index.md
hugo new content --kind build-log atelier/grenouille/build/2026-10-12-J04/index.md
hugo new content --kind album photos/mon-album/index.md
hugo new content --kind guide posts/2026-10-12-mon-guide/index.md
```

Conventions :

- **Catégories** (liste fermée) : Atelier de Michel, Électronique, Audio, Rétro et jeux vidéo, Photographie, Photos ; côté cuisine : Desserts et goûter, Kamado et cuisson au feu, Sauces, pâtes et marinades, Plats et accompagnements ; Jardin. Une nouvelle catégorie = une page `content/categories/<clé>/_index.md` avec une description. La clé est le terme en minuscules, espaces remplacés par des tirets, **accents et ponctuation conservés** (`électronique`, `sauces,-pâtes-et-marinades`) : c'est ainsi que Hugo relie la page au terme. L'URL publiée, elle, est sans accents (`removePathAccents`). Avec une clé mal écrite, Hugo crée deux pages à la même adresse, et l'avertissement « Duplicate target paths » bloque le déploiement.
- **Tags** : en minuscules sauf noms propres et sigles (ESP32, MCP3008) ; réutiliser un tag existant plutôt qu'une variante (« enceintes DIY », pas « enceinte DIY »).
- **Titres** : capitale initiale seulement (« Gaufres maison faciles »), pas de casse à l'anglaise.
- **Dates** : `date:` pour la publication, `lastmod:` pour la mise à jour (fuseau Europe/Paris par défaut).
- **SEO** : `description` (≈ 120-155 caractères, propre à la page) ; titre court dans `seo.meta_title` si le titre dépasse ~60 caractères.
- **Image principale** : fichier `featured.jpg` (ou `*featured*`) dans le dossier de la page. Sources ≤ 2560 px : Hugo produit les versions WebP redimensionnées.
- **Vidéos** : MP4 **H.264** (pas HEVC/H.265, illisible dans Firefox et une partie de Chrome), avec une affiche `<nom>-poster.jpg` à côté :
  ```bash
  ffmpeg -i source.mov -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 96k -pix_fmt yuv420p -movflags +faststart medias/clip.mp4
  ffmpeg -ss 0.6 -i medias/clip.mp4 -frames:v 1 -q:v 5 medias/clip-poster.jpg
  ```
  Puis `{{< video src="./medias/clip.mp4" title="Description" >}}` ; pour remplacer un GIF : `animation="true"`.
- **YouTube** : `{{< youtube ID >}}` (vignette cliquable, lecteur chargé au clic en youtube-nocookie) ; dans une recette, champ `video:` du front matter.
- **Typographie** : les espaces insécables (avant `; : ! ?`, dans les guillemets) sont ajoutées automatiquement au rendu.
- **Brouillons** : `draft: true`. Ne pas créer de lien vers un brouillon depuis une page publiée (le contrôle de liens du déploiement échouerait).

## Déploiement

Chaque push sur `main` lance `.github/workflows/hugo.yaml` : build Hugo (`--panicOnWarning`), contrôle des liens internes, publication sur GitHub Pages. Les autres branches ne sont jamais déployées.

`.github/workflows/quality.yml` (sur les PR et sur `main`) : formatage, lint, liens, SEO, HTML, accessibilité, tests de fumée, Lighthouse.

## Mettre à jour Hugo ou Blowfish

Le build de déploiement échoue au moindre avertissement (`--panicOnWarning`). Or Blowfish 2.90 déclare `max = 0.150` : avec un Hugo plus récent, l'avertissement « Module blowfish is not compatible » bloque la mise en ligne. Procédure :

1. Mettre à jour Blowfish (idéalement en sous-module ou module Hugo plutôt qu'en copie) et reporter les gabarits surchargés de `layouts/`.
2. Monter `HUGO_VERSION` dans les deux workflows et `.tool-versions`.
3. `hugo --gc --minify --panicOnWarning` en local : zéro avertissement attendu.

Le code du projet est déjà prêt pour Hugo ≥ 0.156/0.158 : `functions/site-data.html` choisit `hugo.Data` ou `.Site.Data` selon la version, et ni `.Site.LanguageCode` ni `languageCode` ne sont utilisés.

## Décisions en attente

- **Mesure d'audience** : Google Analytics est chargé sans consentement (mise en conformité reportée : bandeau ou outil sans cookies type Umami).
- **CSS du thème** : la feuille compilée de Blowfish (≈ 106 Ko) est en grande partie inutilisée ; à purger lors de la mise à jour du thème.
