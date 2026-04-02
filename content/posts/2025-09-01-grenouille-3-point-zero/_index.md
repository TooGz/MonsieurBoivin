---
title: "Projet Grenouille 3.0 - Archive de cadrage"
description: "Premieres notes de cadrage conservees comme archive interne. Le point d'entree actif du projet est maintenant la section Atelier."
date: 2025-09-02T00:04:58+02:00
tags: ["Jeux en Bois", "Grenouille"]
categories: ["DIY"]
draft: true
build:
  render: never
  list: never
  publishResources: false
---

Cette page conserve les premieres notes de cadrage du projet.

Le point d'entree actif est maintenant ici :

- [Projet Grenouille 3.0]({{< relref "atelier/grenouille/_index.md" >}})
- [Carnet de construction]({{< relref "atelier/grenouille/build/_index.md" >}})

Les notes utiles de depart restent ci-dessous pour memoire.

## Besoin initial

Avant de parler composants et architecture, je me suis demande ce qu'il fallait vraiment pour que la grenouille 3.0 soit un jeu fiable, fun et simple a utiliser.

- Detection fiable des lancers
- Retour visuel clair et immersif
- Retour sonore dynamique
- Logique de jeu evolutive
- Robustesse et autonomie
- Simplicite d'usage pour un joueur non technique
- Possibilite d'ajouter de nouveaux modules plus tard

## Contraintes d'usage

- Demarrage instantane
- Tolerance aux coupures
- Auto-test au boot
- Mode attract quand le jeu est inactif
- Configuration locale simple
- Mise a jour firmware sans procedure lourde

## Roadmap de depart

- Proto minimal : 1 piezo + LED + buzzer
- Multi-piezos via MCP3008
- Effets lumineux
- Audio
- Affichage des scores
- PCB et boitier
- Configuration web et OTA
