---
title: "Proto Détection — MCP3008 + capteurs piézo"
description: "Prototypage de la détection pour la Grenouille 3.0 : montage avec capteurs piézo, résistances, diodes et MCP3008 pour une lecture fiable via ESP32."
slug: "grenouille-proto-detection"
date: 2025-09-06T22:51:00+02:00
lastmod: 2025-09-06T22:51:00+02:00
authors: ["toogz"]
tags: ["Grenouille 3.0", "Détection", "MCP3008", "Capteurs piézo", "ESP32"]
categories: ["DIY", "Électronique"]
cover:
  image: "img/cover.png"
  alt: "Schéma de montage MCP3008 et capteurs piézo pour la Grenouille 3.0"
  caption: "Montage de test avec MCP3008 et 4 capteurs piézo"
image: "img/cover.png"
showTableOfContents: true
draft: true
---

{{< lead >}}
Ce prototype de détection sert à valider une question centrale du projet Grenouille : comment détecter un impact de manière fiable, reproductible et exploitable côté logiciel ?
Le but n’est pas encore d’optimiser le montage final, mais de vérifier que la chaîne `piézo -> protection -> MCP3008 -> ESP32` tient bien la route.
{{< /lead >}}

## Objectif
Valider le **sous-système de détection** de la Grenouille 3.0 avec un montage simplifié :  
- 4 trous instrumentés avec des **capteurs piézo**,  
- un **MCP3008** pour convertir les signaux analogiques,  
- et l’**ESP32** en lecture.  


## Principe de fonctionnement
- Le **capteur piézo** génère une tension lorsqu’un palet le frappe.  
- Cette impulsion est filtrée/protégée (résistances + diodes).  
- Le signal est lu par une **entrée analogique** du MCP3008.  
- Le MCP3008 transmet la donnée en **SPI** à l’ESP32.  

👉 Le but : obtenir une détection fiable **sans faux positifs**.


## Composants utilisés
Pour **1 trou**, il faut :  

- 1× capteur piézo  
- 1× résistance **1 MΩ** (bleeder, décharge lente)  
- 1× résistance **1–4,7 kΩ** (série, protection)  
- 2× diodes **1N4148** clampées (3.3 V / GND) ou 1× zener 3.6 V  
- 1× condensateur **100 nF** (filtrage)  
- 1× entrée du MCP3008  


## Schéma simplifié

Le schéma de câblage détaillé n’est pas encore intégré à cette page.
Je préfère l’ajouter une fois le montage figé, pour éviter de documenter une version intermédiaire trompeuse.

Principe retenu :  
- Le piézo est relié en série avec une résistance.  
- Un pont de diodes protège contre les surtensions.  
- Le tout est filtré par un condensateur.  
- Le signal arrive propre sur une entrée analogique du MCP3008.  


## Code ESP32 minimal
```cpp
#include <SPI.h>
#include <Adafruit_MCP3008.h>

Adafruit_MCP3008 adc;

void setup() {
  Serial.begin(115200);
  adc.begin(18, 23, 19, 5); // CS, CLK, MOSI, MISO (adapter aux pins ESP32)
}

void loop() {
  for (int i = 0; i < 4; i++) {
    int value = adc.readADC(i);
    if (value > 100) { // seuil à ajuster
      Serial.print("Impact détecté sur capteur ");
      Serial.println(i);
    }
  }
  delay(10);
}
```

Ce code ne fait qu’une chose : lire les 4 entrées et remonter un événement simple quand une valeur dépasse un seuil.
Il sert de base de validation, pas encore de logique finale de jeu.

## Ce que ce proto doit confirmer

- le niveau de bruit au repos ;
- l’amplitude réelle des impacts ;
- la pertinence du seuil de déclenchement ;
- l’influence de la fixation mécanique sur le signal ;
- la stabilité globale de la lecture via MCP3008.

## Points de vigilance

- Les piézos réagissent fortement à la manière dont ils sont collés ou maintenus.
- Un seuil fixe trop bas crée vite des faux positifs.
- Une masse mal pensée peut polluer la lecture analogique.
- La protection d’entrée n’est pas optionnelle : les pics peuvent être violents.

## Suite

La prochaine étape consiste à mesurer les valeurs réelles sur plusieurs impacts, ajuster le filtrage si nécessaire, puis comparer le comportement de plusieurs capteurs montés dans des conditions proches du jeu final.
