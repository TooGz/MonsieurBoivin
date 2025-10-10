---
title: "Projet Grenouille 3.0 — Carnet de bord"
description: "Présentation et recherches préliminaires sur la maniere d'ajouter du gameplay electronique au jeu de la grenouille"
date: 2025-09-02T00:04:58+02:00
tags: ["Jeux en Bois", "Grenouille"]
categories: ["DIY"]
---
Je me lance dans une nouvelle aventure : moderniser le **jeu de la grenouille**, ce grand classique des fêtes de village et des guinguettes.  
L’idée : créer une version **connectée, lumineuse et sonore**, capable de compter les points automatiquement, tout en gardant l’âme du jeu d’origine.  

Ce projet est né d’un mélange entre **passion du bois**, curiosité électronique et envie de documenter et partager ce projet.

---

## 🧭 Présentation générale

### 🎯 Objectif
> Créer un jeu de la grenouille artisanal et connecté, combinant **bois, métal, électronique et code**, documenté pas à pas.

- **Fabrication artisanale complète** : structure bois, grenouille fonte, arches, plateau.  
- **Intégration technologique** : ESP32, capteurs piézo, LEDs WS2812B, sons et scoring automatique.  
- **Documentation vivante** : chaque étape expliquée, illustrée et archivée.  

---

## 🧱 Structure de la documentation

La documentation complète est divisée en **14 sections**, organisées en **3 grands chapitres** :

---

### 🪚 CHAPITRE I — Construction artisanale

Cette première partie aborde toute la conception physique du jeu :  
plans, bois, assemblages, astuces, finitions…


1. [Introduction générale](../01-introduction/)
2. [Vue d’ensemble du projet](./02-vue-densemble.md)
3. [Conception du jeu (partie bois)](./03-conception-bois.md)

---

### ⚡ CHAPITRE II — Électronique et intelligence du jeu

On entre ici dans la partie “nerveuse” du projet : les capteurs, le câblage, les LEDs et le firmware ESP32.  
C’est le cœur technologique qui transforme un jeu traditionnel en expérience moderne.


  ./04-integration-electronique/" title="4. Intégration de l’électronique"
  ./05-schema-cablage/" title="5. Schéma & câblage complet"
  ./06-firmware-logique/" title="6. Firmware & logique du jeu"
  ./07-connectivite/" title="7. Fonctionnalités connectées"


---

### 💡 CHAPITRE III — Expérience, maintenance & évolutions

Une fois la grenouille opérationnelle, place à la finition, aux tests, à la calibration et aux futures versions (3.0 et +).


  ./08-interface-ux/" title="8. Interface & expérience de jeu"
  ./09-finitions-design/" title="9. Finitions & design final"
  ./10-tests-maintenance/" title="10. Tests, calibration & dépannage"
  ./11-evolutions/" title="11. Améliorations & version 3.0"
  ./12-ressources/" title="12. Ressources & crédits"
  ./13-conclusion/" title="13. Conclusion & philosophie finale"
  ./14-annexes/" title="14. Annexes & téléchargements"


---

## 📘 Contenu et philosophie

Chaque section du projet a été pensée pour être :
- **autonome** : lisible sans devoir tout parcourir ;  
- **documentée** : schémas, tableaux, codes, photos, astuces ;  
- **accessible** : Essayer de rendre cette documentation la plus accessible.

💡 *L’objectif n’est pas juste de construire une grenouille, mais de comprendre comment elle fonctionne.*

---

## 🧩 Aperçu des grandes étapes

| Étape | Domaine | Description rapide |
|--------|-----------|-------------------|
| 🪵 Fabrication | Menuiserie | Construction complète du jeu en bois |
| ⚙️ Intégration | Électronique | ESP32, capteurs, LEDs, son |
| 💻 Programmation | Firmware | Code Arduino, logique, scoring |
| 🎮 Expérience | UX & design | Interface joueur, effets lumineux et sonores |
| 🔧 Maintenance | Calibration | Dépannage, évolutions, v3 en cours |

---

## 🪵 L’esprit du projet

> “Allier le bois, le métal et le code, c’est créer un pont entre tradition et innovation.”

- 🔩 Fabrication 100 % artisanale  
- 💡 Technologie open-source  
- 🎨 Design sobre et cohérent  
- 🧠 Documentation libre et durable  

---

## 📦 Ressources disponibles

- 📄 [Plan complet (14 parties)](./plan-grenouille-2.0.md)  
- 🧰 [Plans SketchUp / DXF / PDF fabrication](./14-annexes/)  
- ⚙️ [Code source ESP32](./12-ressources/)  
- 🪛 [Liste des composants et schémas techniques](./05-schema-cablage/)  

---


































Ce post est une archive de mes recherches et réflexions et est ammené a évoluer.

## 📝 Besoin
Avant de parler composants et architecture, je me suis demandé : **qu’est-ce qu’il me faut vraiment pour que la grenouille 3.0 soit un vrai jeu fun et robuste ?**

- **Détection fiable des lancers**  
  - Pas de faux positifs, même si plusieurs trous vibrent.  
  - Un capteur par trou pour que chaque cible soit indépendante.  
  - Filtrage matériel + logiciel pour lisser les signaux.

- **Retour visuel clair et immersif**  
  - Un affichage central (panneau LED) pour montrer les scores, missions et animations.  
  - Des LEDs dans les trous et autour pour donner du feedback instantané.  
  - Des effets colorés qui renforcent le gameplay (flash, combo, jackpot…).

- **Retour sonore dynamique**  
  - Bips et bruitages pour marquer les coups.  
  - Voix ou musiques pour ambiance “arcade / flipper”.  
  - Une banque de sons facilement extensible, stockée à part (microSD).

- **Logique de jeu évoluée**  
  - Compter des points simplement (version “fête foraine”).  
  - Mode type flechettes (301, etc...)
  - Mais aussi gérer des **missions scénarisées** façon flipper (séquences, combos, bonus).  
  - Un moteur flexible, où je peux ajouter ou modifier des missions sans tout reprogrammer.

- **Robustesse et autonomie**  
  - Supporter une journée complète d’utilisation sans plantage.  
  - Démarrer instantanément → pas de temps de boot long.  
  - Résister aux coupures de courant (pas de corruption de données).  
  - Un boîtier solide, avec connectique simple (plug-and-play pour l'utilisateur).

- **Simplicité pour l’utilisateur final**  
  - Un seul bouton ON/OFF.  
  - Le jeu démarre tout seul en “Attract Mode”.  
  - Config possible via Wi-Fi/BLE (page web simple).  
  - Consignes ultra courtes pour un client non-tech.

- **Évolutivité**  
  - Pouvoir ajouter facilement de nouveaux sons, visuels ou modes de jeu.  
  - Prévoir de la place mémoire pour ne pas être bloqué plus tard.  
  - Garder des interfaces standard (SPI, I²C, UART) pour ajouter des modules si besoin.

En résumé : **je veux une grenouille qui réagit vite, qui clignote, qui fait du bruit, qui compte les points comme un flipper, et qui reste simple à utiliser même par quelqu’un qui n’y connaît rien.**

## ✅ Résilience & usage client
- Démarrage instantané (pas d’OS).
- Tolère coupures (pas de corruption).
- Auto-test au boot (piézos, LEDs, audio).
- Attract Mode quand inactif (comme un flipper).
- Webconfig local (luminosité, sons, missions).
- OTA pour MAJ firmware.
- Consignes client → une page A5 plastifiée (ON/OFF).

## 🛠️ Roadmap
- [Proto minimal](/grenouille-proto) (1 piezo + LED + buzzer).
- Mini moteur de jeu (missions simples).
- [Multi-piézos via MCP3008](/grenouille-proto-detection) (14 trous).
- Rubans APA102 (effets).
- DFPlayer Mini (sons).
- HUB75 128×64 (scores, animations).
- PCB + boîtier (robustesse).
- Webconfig + OTA (produit fini).


🐸🐸🐸