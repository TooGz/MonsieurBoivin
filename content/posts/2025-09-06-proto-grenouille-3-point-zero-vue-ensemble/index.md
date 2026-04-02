---
title: "Projet Grenouille 3.0 — Proto"
description: "Prototypage de la Grenouille 3.0 : tests de détection, LEDs, panneau HUB75, son et alimentation."
slug: "grenouille-proto"
date: 2025-09-06T00:04:58+02:00
lastmod: 2025-09-06T00:00:00+02:00
authors: ["toogz"]
tags: ["Grenouille 3.0", "Jeux en Bois", "DIY Électronique", "ESP32", "Arcade"]
categories: ["DIY", "Électronique"]
cover:
  image: "img/cover.png"
  alt: "Prototype de la Grenouille 3.0 avec ESP32 et LEDs"
  caption: "Premier prototype de la Grenouille 3.0"
image: "img/cover.png"
showTableOfContents: true
draft: true
---

Avant de me lancer dans la version complète de la **Grenouille 3.0**, j’ai décidé de monter un **proto réduit**.  
L’objectif est simple : tester toutes les briques essentielles (détection, affichage, son, LEDs) mais en version limitée, avec exactement les mêmes composants que ceux que j’utiliserai dans le jeu final.  

Ce proto me sert de **terrain d’expérimentation** avant de passer à l’intégration complète.

## 🎯 Objectifs du proto
- Tester la **détection** avec quelques capteurs piézo.  
- Faire tourner un **panneau LED HUB75** pour l’affichage des scores.  
- Valider un **ruban LED APA102** pour les effets lumineux.  
- Lire des **sons via DFPlayer Mini** et les amplifier.  
- Vérifier la **gestion des alimentations séparées**.  

## 📦 Les briques principales du proto

### 1. Base ESP32
![ESP32-S3 N8R8](img/esp32-s3-n8r8.webp)
Un ESP32-S3 DevKit qui sert de cerveau au système.  
👉 [Lire la suite →](proto-esp32)

### 2. Détection (MCP3008 + piézos)
![MCP3008](img/mcp3008.jpg)
Je pars avec 4 capteurs piézo pour valider le montage complet (résistances, diodes, filtrage).  
👉 [Lire la suite →]({{< relref "posts/2025-09-06-grenouille-proto-detection/index.md" >}})

### 3. Affichage HUB75
![HUB75](img/hub75.jpg)
Un panneau LED HUB75 64x32 (128x64 au final) (scan 1/16) pour afficher scores et messages.  
👉 [Lire la suite →](proto-matrix-led-display)

### 4. LEDs APA102
![LED](img/led.jpg)
Un petit ruban de 30 LED pour tester les effets lumineux indépendants.  
👉 [Lire la suite →](proto-leds)

### 5. Audio (DFPlayer + ampli + HP)
Lecture de sons depuis µSD, amplification via TPA3116 et restitution dans un caisson clos de 4,3 L.  
👉 [Lire la suite →](proto-audio)

### 6. Alimentation
![PSU](img/psu.jpeggg)
Séparation claire des rails :  
- 5 V dédié HUB75  
- 5 V logique/LEDs/DFPlayer  
- 12 V pour l’ampli audio  
👉 [Lire la suite →](proto-alimentation)

## ✅ Résumé visuel
![Schéma de câblage du proto](schema_proto_reduit_grenouille.svg)

## 🚀 La suite
Ce proto me permettra de :
- vérifier que chaque brique fonctionne bien,  
- valider le câblage et la gestion des masses,  
- préparer les **articles détaillés** avec schémas, codes et retours d’expérience.  
