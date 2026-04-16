---
title: "Projet Grenouille 3.0 - Archive de cadrage"
description: "Premières notes de cadrage conservées comme archive interne. Le point d’entrée actif du projet est maintenant la section Atelier."
date: 2025-09-02T00:04:58+02:00
tags: ["Jeux en Bois", "Grenouille"]
categories: ["DIY"]
draft: true
build:
  render: never
  list: never
  publishResources: false
---

Cette page conserve les premières notes de cadrage du projet.

Le point d'entrée actif est maintenant ici :

- [Projet Grenouille 3.0]({{< relref "atelier/grenouille/_index.md" >}})
- [Carnet de construction]({{< relref "atelier/grenouille/build/_index.md" >}})

Les notes utiles de départ restent ci-dessous pour mémoire.

## Besoin initial

Avant de parler composants et architecture, je me suis demandé ce qu'il fallait vraiment pour que la grenouille 3.0 soit un jeu fiable, fun et simple à utiliser.

- Détection fiable des lancers
- Retour visuel clair et immersif
- Retour sonore dynamique
- Logique de jeu évolutive
- Robustesse et autonomie
- Simplicité d'usage pour un joueur non technique
- Possibilité d'ajouter de nouveaux modules plus tard

## Contraintes d'usage

- Démarrage instantané
- Tolérance aux coupures
- Auto-test au boot
- Mode attract quand le jeu est inactif
- Configuration locale simple
- Mise à jour firmware sans procédure lourde

## Roadmap de départ

- Proto minimal : 1 piézo + LED + buzzer
- Multi-piezos via MCP3008
- Effets lumineux
- Audio
- Affichage des scores
- PCB et boitier
- Configuration web et OTA
