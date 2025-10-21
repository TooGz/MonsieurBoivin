---
title: "Capteurs Piézo et Détection de Vibrations"
description: "Étude et recherches sur l’utilisation des capteurs piézoélectriques pour la détection de choc et de vibration. Recherches, schéma de câblage, composants, filtrage et test sur ESP32 + MCP3008."
slug: "capteurs-piezo-detection-vibration"
date: 2025-10-21
categories: ["Électronique"]
tags: ["piezo", "détection", "vibration", "ESP32", "MCP3008", "prototypage"]
ShowToc: true
draft: false
---

## Contexte du projet

Dans le cadre du développement de la **[Grenouille 3.0](/../atelier/grenouille)**, je cherchais une méthode simple, fiable et économique pour **détecter un impact** (le lancer d’un palet dans un trou).  
L’objectif : construire un **système de détection** précis, réactif, et surtout sans faux positifs.

Après quelques explorations, le **capteur piézoélectrique** s’est imposé comme une piste sérieuse.  
Voici le résultat de mes recherches et tests.

---

## Comprendre le capteur piézoélectrique

Un **capteur piézo** convertit une **contrainte mécanique** (choc, vibration, flexion) en **tension électrique** grâce à l’effet piézoélectrique.  

En pratique :
- lorsqu’un palet frappe la surface reliée au piezo → le disque se déforme → une tension apparaît entre ses bornes,
- cette tension est **brève et proportionnelle à la force de l’impact**.

### Caractéristiques principales
- Tension générée : de quelques mV à plusieurs volts selon la force du choc.  
- Polarité : le centre du disque = positif, le bord = négatif.  
- Réponse : instantanée, mais très bruitée → nécessite filtrage.  
- Aucun besoin d’alimentation (générateur passif).  

---

## Objectif du prototype

Valider un montage avec :
- **1 capteurs piézo** (un par trou du jeu),
- quelques **resistances** et **diodes**,
- **1 MCP3008** pour convertir les signaux analogiques,
- et un **ESP32** pour la lecture et le traitement des valeurs.

### But
Obtenir une **détection fiable, rapide et reproductible**, sans fausses détections liées aux vibrations du châssis ou aux résonances mécaniques.

---

## Principe de fonctionnement du montage

1. Le **piezo** génère une tension lors d’un impact.  
2. Cette tension est **filtrée et protégée** (résistances + diodes).  
3. Le signal est **envoyé au MCP3008**, un ADC 10 bits connecté en SPI.  
4. L’**ESP32** lit les valeurs analogiques et détecte les chocs au-dessus d’un seuil défini.

```
PIEZO → [Protection + Filtrage] → MCP3008 → SPI → ESP32
```

---

## Composants et valeurs recommandées

Pour **1 capteur** :

| Composant | Valeur | Rôle |
|------------|---------|------|
| Capteur piezo | Ø27 | Détection d’impact |
| Résistance (pull-down) | 1 MΩ | Décharge lente du signal |
| Résistance série | 1–4,7 kΩ | Limite le courant / protège l’entrée ADC |
| Diodes de protection | 2× 1N4148 | Clampent le signal entre 0 V et 3.3 V |
| Condensateur | 100 nF | Filtre les oscillations résiduelles |
| MCP3008 | — | Convertisseur analogique/numérique SPI |
| ESP32 | — | Microcontrôleur principal |


---

## Comparaison avec d'autres capteurs

| Technologie | Avantages | Inconvénients |
|--------------|------------|----------------|
| **Piezo** | Simple, rapide, pas cher, passif | Signal bruité, sensible aux vibrations globales |
| **Accéléromètre (MPU6050)** | Mesure vectorielle fine, filtrable | Complexité, besoin d’alim stable |
| **Capteur de son** | Réagit aux bruits d’impact | Moins précis spatialement |
| **Micro-interrupteur** | Déclenchement net | Contact mécanique, usure |

Le piezo reste **le meilleur compromis** pour ce type d’usage :  
→ détection d’un choc ponctuel, sur une structure rigide, à faible coût.

---

## Calibration et seuils

Une calibration simple peut être effectuée ainsi :
1. Lire les valeurs brutes en continu (via le port série).  
2. Noter les valeurs “au repos” → bruit moyen.  
3. Noter les valeurs lors d’un impact → pic maximum.  
4. Fixer un seuil à mi-chemin ou via un facteur multiplicatif.

Exemple :
```text
Repos : 0–15  
Impact : 250–400  
→ seuil optimal ≈ 100–120
```

---

## Points clés retenus

- Les capteurs piezo sont **parfaits pour les chocs ponctuels**.  
- Un filtrage matériel (résistance + diodes + condo) est **indispensable**.  
- Le MCP3008 permet de **multiplier les capteurs analogiques**.  
- La fixation mécanique influence plus le signal que le code lui-même.  
- Un filtrage logiciel simple suffit pour fiabiliser la détection.

---

## Prochaine étape  
→ tests et calibration

---

## Ressources et documentation

- [Adafruit MCP3008 Library](https://github.com/adafruit/Adafruit_MCP3008)
- [MCP3008 Datasheet](https://cdn-shop.adafruit.com/datasheets/MCP3008.pdf)
- [Effet Piézoélectrique – Wikipédia](https://fr.wikipedia.org/wiki/Électrostriction)  

---
