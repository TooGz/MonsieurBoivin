# Post-Deploy Monitoring

## Ce qu'on suit

- LCP
- INP
- CLS
- erreurs JS shell global
- taux d'echec des formulaires / filtres si on ajoute du tracking plus tard

## RUM minimal

Le repo embarque `web-vitals` dans `package.json`. Si tu veux activer le suivi reel, branche un endpoint maison et envoie les mesures via `sendBeacon`.

Exemple:

```js
import { onCLS, onINP, onLCP } from "web-vitals/attribution";

const send = (metric) => {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    id: metric.id,
    url: location.pathname,
    ts: Date.now()
  });

  navigator.sendBeacon("/api/web-vitals", body);
};

onCLS(send);
onINP(send);
onLCP(send);
```

## Seuils simples

- LCP:
  - bon <= 2500 ms
  - alerte > 3000 ms
- INP:
  - bon <= 200 ms
  - alerte > 300 ms
- CLS:
  - bon <= 0.1
  - alerte > 0.15

## Routine

- A chaque release: regarder Lighthouse CI et erreurs Playwright.
- Chaque semaine: relire Search Console + logs serveur + vitals reels.
- Chaque mois: repasser un audit manuel sur home + 1 listing + 2 pages detail.

## Alertes utiles

- Chute Lighthouse home > 10 points.
- `audit:seo` ou `audit:links` rouge sur `main`.
- Vitals reels hors seuil pendant 3 jours.
- hausse visible des erreurs JS ou du CLS sur mobile.
