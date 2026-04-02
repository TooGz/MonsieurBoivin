---
title: "Proto Détection — MCP3008 + capteurs piézo"
description: "Prototypage de la détection pour la Grenouille 3.0 : montage avec capteurs piézo, résistances, diodes et MCP3008 pour une lecture fiable via ESP32."
slug: "grenouille-proto-detection"
date: 2025-09-06T22:51:00+02:00
lastmod: 2025-09-06T22:51:00+02:00
author: "TooGz"
tags: ["Grenouille 3.0", "Détection", "MCP3008", "Capteurs piézo", "ESP32"]
categories: ["DIY", "Électronique"]
cover:
  image: "img/proto-detection.png"
  alt: "Schéma de montage MCP3008 et capteurs piézo pour la Grenouille 3.0"
  caption: "Montage de test avec MCP3008 et 4 capteurs piézo"
image: "img/cover.png"
showTableOfContents: true
draft: true
---

## 🎯 Objectif  
Valider le **sous-système de détection** de la Grenouille 3.0 avec un montage simplifié :  
- 4 trous instrumentés avec des **capteurs piézo**,  
- un **MCP3008** pour convertir les signaux analogiques,  
- et l’**ESP32** en lecture.  


## ⚙️ Principe de fonctionnement  
- Le **capteur piézo** génère une tension lorsqu’un palet le frappe.  
- Cette impulsion est filtrée/protégée (résistances + diodes).  
- Le signal est lu par une **entrée analogique** du MCP3008.  
- Le MCP3008 transmet la donnée en **SPI** à l’ESP32.  

👉 Le but : obtenir une détection fiable **sans faux positifs**.


## 🧩 Composants utilisés  
Pour **1 trou**, il faut :  

- 1× capteur piézo  
- 1× résistance **1 MΩ** (bleeder, décharge lente)  
- 1× résistance **1–4,7 kΩ** (série, protection)  
- 2× diodes **1N4148** clampées (3.3 V / GND) ou 1× zener 3.6 V  
- 1× condensateur **100 nF** (filtrage)  
- 1× entrée du MCP3008  


## 🔌 Schéma simplifié  
![Schéma de câblage détection](schema_proto_detection.svg)

Explication :  
- Le piézo est relié en série avec une résistance.  
- Un pont de diodes protège contre les surtensions.  
- Le tout est filtré par un condensateur.  
- Le signal arrive propre sur une entrée analogique du MCP3008.  


## 🖥️ Code ESP32 (exemple minimal)
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
