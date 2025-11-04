---
title: "ESP32 WROOM DevKit V1 — Référence complète du Pinout"
description: "Guide complet du brochage (pinout) pour l’ESP32 WROOM DevKit V1 : GPIO, fonctions spéciales, broches à éviter, usages recommandés."
author: "Monsieur Boivin"
slug: "esp32-pinout"
date: 2025-11-03
categories: ["Électronique"]
tags: ["ESP32", "WROOM", "Pinout", "GPIO", "DevKit"]
ShowToc: true
draft: false
---

L’ESP32 WROOM DevKit V1 est l’une des cartes les plus utilisées dans le monde du prototypage électronique et de l’IoT.  
Grâce à son microcontrôleur **Espressif ESP32**, elle combine **Wi-Fi, Bluetooth, ADC, DAC et GPIO multifonctions**.  
Ce guide détaille le **pinout complet** du module, les **broches GPIO disponibles**, les **broches à éviter**, ainsi que les **bonnes pratiques de câblage** pour éviter les erreurs de démarrage.
).  
Cet article s’inspire notamment du guide « [Pinout Reference](https://www.upesy.fr/blogs/tutorials/esp32-pinout-reference-gpio-pins-ultimate-guide) » de uPesy.

---

## Schéma de brochage général  
![Schéma complet du brochage ESP32 WROOM DevKit V1 — GPIO, SPI, I2C, UART](featured.webp)

---

## Les grandes familles de broches

### Alimentation & Masse  
- Pin **3V3** : sortie du régulateur intégré (ou entrée si tu alimentes directement en 3,3 V).  
- Pin **GND** : masse commune.  
- Pin **VIN / 5 V** : entrée d’alimentation 5 V (utile si tu n’utilises pas le port USB).

---

### GPIO numériques & périphériques  
Grâce à la flexibilité du puce **ESP32**, beaucoup de pins peuvent être configurées en **digital**, **analogique**, **PWM**, **I²C**, **SPI**, etc.  
Les plus couramment utilisées et “sûres” sont : **4, 5, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33**.

---

### ADC / DAC / Tactile  
- Les entrées analogiques (**ADC**) du bloc **ADC1 / ADC2** sont réparties sur plusieurs GPIO.  
- Le module intègre deux **sorties DAC** : **GPIO 25** et **GPIO 26**.  
- Les capteurs tactiles (**Touch**) sont disponibles sur : **GPIO 0, 2, 4, 12–15, 27, 32, 33**.  

> ⚠️ **Note importante :** les broches du bloc **ADC2** (GPIO 0, 2, 4, 12–15, 25–27) ne fonctionnent pas correctement lorsque le **Wi-Fi** est actif, car elles partagent des ressources internes.  
> Pour des mesures analogiques fiables, utilise de préférence **ADC1 (GPIO 32–39)**.

---

### Interfaces de communication  
| Interface | Broches « courantes » | Remarques |
|-----------|---------------------|------------|
| **I²C** | SDA 21 / SCL 22 | Broches par défaut, reconfigurables dans le code |
| **SPI** | MOSI 23 / MISO 19 / SCK 18 / CS 5 | Brochage standard VSPI |
| **UART** | TX0 1 / RX0 3 (USB) • TX2 17 / RX2 16 (libre) | UART0 = port série USB |

---

## Broches sensibles / à manier avec précaution  

Certaines broches sont critiques au démarrage (boot) ou utilisées en interne par la mémoire flash.  
Les manipuler à tort peut empêcher le boot du module.

| GPIO | Particularité | Recommandation |
|------|----------------|----------------|
| **6 → 11** | Reliées à la Flash SPI interne | ❌ Ne jamais utiliser |
| **0** | Doit être LOW pour passer en mode flash | ⚠️ À éviter pour des boutons / LED |
| **2** | Doit être LOW au boot | ⚠️ Éviter en sortie |
| **12** | HIGH empêche le démarrage | ⚠️ Ne pas utiliser |
| **15** | Doit être LOW au boot | ⚠️ À éviter |
| **34 → 39** | Entrées uniquement (pas de sortie) | ✅ Parfait pour capteurs analogiques |

---

## Broches « sûres » et bons usages  

Voici les broches les plus stables et sans conflit matériel :

| Usage | GPIO recommandé | Exemple |
|--------|----------------|----------|
| LED / PWM | 25, 26, 27 | Contrôle de LED ou servo |
| Entrées analogiques | 32, 33, 34, 35 | Capteur piézo, potentiomètre |
| I²C | 21 (SDA), 22 (SCL) | Écran OLED, capteur BMP280 |
| SPI | 18 (CLK), 19 (MISO), 23 (MOSI), 5 (CS) | MCP3008, lecteur SD |
| UART libre | 16 (RX2), 17 (TX2) | DFPlayer Mini, GPS |

---

## Conseils pratiques  

- Toujours **relier la masse (GND)** de l’ESP32 et de tous les périphériques.  
- Ne jamais injecter de **5 V sur un GPIO** (3,3 V max).  
- Prévoir une **alimentation externe** si tu utilises beaucoup de périphériques (LED, moteurs, HUB75, etc.).  
- Identifier les **broches réservées** (Flash, Strapping) dès la conception du schéma.  
- Définir les pins dans ton code via `#define` ou constantes (`const int LED_PIN = 25;`) pour clarifier ton câblage.  

---

## Ressources utiles  

- 🔗 **[uPesy — ESP32 Pinout Reference (FR)](https://www.upesy.fr/blogs/tutorials/esp32-pinout-reference-gpio-pins-ultimate-guide)**  
- 🔗 **[Random Nerd Tutorials — ESP32 Pinout Reference (EN)](https://randomnerdtutorials.com/esp32-pinout-reference-gpios/)**  
- 🔗 **[LastMinuteEngineers — ESP32 WROOM-32 GPIO Guide (EN)](https://lastminuteengineers.com/esp32-wroom-32-pinout-reference/)**  
- 🔗 **[Espressif — ESP32 Hardware Design Guidelines (PDF officiel)](https://www.espressif.com/sites/default/files/documentation/esp32_hardware_design_guidelines_en.pdf)**  
- 🔗 **[Documentation Espressif officielle (ESP-IDF)](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/hw-reference/index.html)**  

---

## En résumé  

- ✅ **GPIO 25–27 / 32–33** → zones sûres pour tests  
- ⚠️ **GPIO 0 / 2 / 12 / 15** → attention au boot  
- ❌ **GPIO 6–11** → réservées à la Flash  
- 🧮 **GPIO 34–39** → entrées uniquement  
- 🔋 Alim toujours en **3.3 V** sur les GPIO  
- 📶 Évite **ADC2** si le Wi-Fi est actif  

---

👉 Si tu veux aller plus loin, consulte mon article sur le [branchement d’un capteur piézo sur ESP32](../capteurs-piezo-detection-vibration)


---