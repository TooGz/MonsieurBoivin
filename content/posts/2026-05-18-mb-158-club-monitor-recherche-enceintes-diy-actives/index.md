---
title: "MB-158 Club Monitor : carnet de recherche pour une paire d’enceintes DIY actives"
description: "Notes de recherche autour de la conception d’une paire d’enceintes DIY actives 3 voies avec grave 15 pouces, médium 8 pouces, compression sur pavillon, amplification intégrée et DSP."
date: 2026-05-18
lastmod: 2026-05-18
draft: false
slug: "mb-158-club-monitor-recherche-enceintes-diy-actives"
categories:
  - Atelier
  - Audio
  - DIY
tags:
  - enceintes DIY
  - audio
  - hi-fi
  - Hypex
  - B&C Speakers
  - DSP
  - bass-reflex
  - fabrication bois
image: "featured.png"
featured: false
toc: true
---

# MB-158 Club Monitor : carnet de recherche pour une paire d’enceintes DIY actives

Je pose ici mes recherches, mes hypothèses et mes premières pistes autour d’un projet un peu déraisonnable : concevoir une paire d’enceintes DIY actives, puissantes, modernes, avec au moins un haut-parleur de 12 pouces — et probablement plutôt un 15 pouces.

Pour l’instant, ce n’est pas encore un plan de fabrication définitif. C’est une phase d’exploration.

Je rassemble les idées, je compare les choix possibles, j’essaie de comprendre les implications techniques, le budget, les contraintes de mise au point et les compromis à accepter avant de sortir la scie, la défonceuse et les panneaux de bois.

Le nom de travail du projet : **MB-158 Club Monitor**.

Pourquoi ce nom ? Parce que l’architecture qui m’attire le plus pour le moment repose sur :

- un **grave de 15 pouces** ;
- un **médium de 8 pouces** ;
- une **compression aigu sur pavillon** ;
- une amplification active intégrée ;
- un DSP pour régler proprement l’ensemble.

L’idée serait de construire une enceinte qui garde l’énergie d’un système pro ou club monitor, mais avec une mise au point suffisamment fine pour une écoute domestique sérieuse.

---

## Pourquoi ce projet ?

À la base, je voulais réfléchir à une paire d’enceintes un peu “parfaite” à mon goût.

Pas parfaite au sens absolu. Plutôt parfaite pour mon usage, mes goûts et mon envie de fabriquer quelque chose de durable.

J’écoute pas mal de musiques qui demandent de l’impact, de la dynamique et du grave propre : rap, électro, EDM, Daft Punk, Justice, sons très produits, basses bien présentes, kicks marqués. Je ne cherche pas juste une enceinte sage qui sait faire une jolie voix à bas volume.

Je veux quelque chose qui puisse :

- descendre bas ;
- garder du contrôle ;
- avoir de l’impact physique ;
- rester propre quand on monte le volume ;
- être réglable ;
- être réparable ;
- et surtout être fabriqué avec une vraie logique.

Ce projet m’intéresse aussi pour ce qu’il représente : un gros objet d’atelier, entre menuiserie, acoustique, électronique, mesure et mise au point.

Et quelque part, c’est aussi le genre de projet que j’aimerais pouvoir garder longtemps. Peut-être même transmettre un jour à mon grand fils, qui aime déjà beaucoup la musique.

---

## Le cahier des charges provisoire

À ce stade, je ne veux pas figer trop vite les choix. Je préfère poser un cahier des charges de recherche.

L’enceinte idéale devrait être :

- **puissante**, mais pas forcément utilisée à fond ;
- **dynamique**, avec un vrai impact dans le grave et le bas-médium ;
- **moderne**, avec DSP et amplification intégrée ;
- **réglable**, pour pouvoir adapter la réponse à la pièce et à mes goûts ;
- **réparable**, avec des composants accessibles et remplaçables ;
- **documentable**, pour en faire une vraie série d’articles sur le site ;
- **durable**, autant dans la construction que dans l’usage.

La question centrale est donc :

> Est-ce qu’il est possible de concevoir une paire d’enceintes DIY actives, ambitieuses mais réalistes, autour d’un gros haut-parleur de grave, sans tomber dans un projet ingérable en budget, en amplification ou en mise au point ?

C’est cette question qui guide la recherche pour le moment.

---

## Première piste : une enceinte 3 voies active

La piste qui semble la plus cohérente aujourd’hui est une enceinte **3 voies active**.

Cela signifie qu’au lieu d’utiliser un filtre passif traditionnel entre l’amplificateur et les haut-parleurs, chaque haut-parleur reçoit son propre signal filtré et amplifié.

Schéma simplifié :

```text
Source / préampli
   ↓
Entrée ligne de l’enceinte
   ↓
DSP intégré
   ↓
Amplification séparée grave / médium / aigu
   ↓
Haut-parleurs
```

Cette approche a beaucoup d’avantages :

- les coupures sont réglables ;
- les niveaux de chaque voie sont ajustables ;
- les délais peuvent être corrigés ;
- les haut-parleurs peuvent être protégés par limiteurs ;
- on peut créer plusieurs presets ;
- on évite un filtre passif complexe, coûteux et difficile à modifier.

Mais elle impose aussi des contraintes :

- il faut comprendre le DSP ;
- il faut mesurer ;
- il faut éviter les erreurs de routage ;
- il faut intégrer proprement l’électronique ;
- chaque enceinte devient plus complexe qu’une simple caisse passive.

Pour le moment, cette piste me paraît la plus intéressante, justement parce qu’elle ouvre beaucoup de possibilités de réglage.

---

## Architecture envisagée

L’architecture de départ serait la suivante, par enceinte :

```text
1 x 15" pour le grave / sub-grave
1 x 8" pour le médium / kick / voix
1 x compression aigu sur pavillon
1 x module actif avec DSP + amplification 3 voies
```

Ce qui donnerait pour la paire :

| Élément | Quantité | Rôle |
|---|---:|---|
| Grave 15” | 2 | Grave / sub-grave / impact |
| Médium 8” | 2 | Bas-médium / voix / kick |
| Compression aigu | 2 | Aigu / dynamique / projection contrôlée |
| Pavillon 1” | 2 | Directivité de l’aigu |
| Module actif 3 voies avec DSP | 2 | Filtrage + amplification par enceinte |

Cette structure me plaît parce qu’elle sépare clairement les rôles.

Le 15 pouces n’a pas besoin de monter trop haut. Le 8 pouces prend le relais dans une zone où il sera plus rapide et plus lisible. La compression sur pavillon gère l’aigu avec beaucoup de rendement.

Mais il reste plusieurs points à vérifier :

- le volume de caisse nécessaire ;
- la fréquence d’accord du bass-reflex ;
- la coupure idéale entre le 15” et le 8” ;
- la coupure idéale entre le 8” et la compression ;
- la directivité globale ;
- le coût réel ;
- l’encombrement final ;
- la complexité de réglage.

---

## Haut-parleurs étudiés pour le moment

Une première sélection tourne autour de composants **B&C Speakers**, très utilisés dans le monde professionnel.

Ce n’est pas forcément le choix définitif, mais c’est une base sérieuse pour réfléchir.

| Élément | Quantité | Rôle |
|---|---:|---|
| **B&C 15TBX100 8Ω** | 2 | Grave / sub-grave |
| **B&C 8PE21 8Ω** | 2 | Médium / kick / voix |
| **B&C DE250 8Ω** | 2 | Compression aigu |
| **B&C ME45** ou pavillon équivalent 1” | 2 | Pavillon 90° × 40° |

La répartition envisagée serait :

| Voie | Haut-parleur | Charge envisagée | Bande de travail estimée |
|---|---|---|---|
| Grave | B&C 15TBX100 | Bass-reflex | environ 30/35 Hz à 120 Hz |
| Médium | B&C 8PE21 | Clos amorti | environ 120 Hz à 1,6 kHz |
| Aigu | B&C DE250 + ME45 | Pavillon | environ 1,6 kHz à 18 kHz |

À ce stade, ce sont des hypothèses de travail.

Le **15TBX100** paraît intéressant pour obtenir du grave solide avec une vraie capacité de déplacement d’air. Mais il faut vérifier qu’il reste adapté à un usage domestique, notamment en volume de caisse et en accord.

Le **8PE21** semble cohérent pour soulager le 15 pouces et garder un bas-médium propre.

La **DE250** est une compression connue, souvent appréciée, mais il faut vérifier son raccord avec le 8 pouces et le pavillon choisi.

---

## Question importante : 12 pouces ou 15 pouces ?

Au départ, je voulais garder au moins un haut-parleur de 12 pouces. Mais plus je creuse, plus le 15 pouces devient tentant.

Le 12 pouces aurait plusieurs avantages :

- caisse plus compacte ;
- intégration plus facile dans une pièce ;
- besoin en volume potentiellement plus raisonnable ;
- esthétique moins massive ;
- mise au point peut-être plus simple.

Le 15 pouces apporte autre chose :

- plus de surface émissive ;
- plus d’impact ;
- plus de sensation physique ;
- moins d’effort pour reproduire le grave à niveau équivalent ;
- une vraie personnalité visuelle et sonore.

Le problème, c’est que le 15 pouces entraîne tout le reste :

- caisse plus grande ;
- poids plus important ;
- évent plus sérieux ;
- amplification plus conséquente ;
- intégration plus exigeante ;
- coût plus élevé.

Pour l’instant, mon intuition penche vers le **15 pouces**, mais je dois encore vérifier que le résultat reste raisonnable dans une pièce de vie.

---

## Amplification et DSP : piste Hypex FusionAmp

Une des pistes les plus propres serait d’utiliser deux modules **Hypex FusionAmp FA503**, un par enceinte.

| Élément | Quantité | Rôle |
|---|---:|---|
| **Hypex FusionAmp FA503** | 2 | DSP + amplification 3 voies par enceinte |
| Câble USB / interface de programmation Hypex | 1 | Configuration des modules |
| Logiciel **Hypex Filter Design** | 1 | Filtres, égalisation, délais, presets, limiteurs |

L’intérêt est évident : chaque enceinte devient autonome.

Par enceinte :

```text
FA503
├── canal grave  → 15"
├── canal médium → 8"
└── canal aigu   → compression
```

Le module gérerait :

- les filtres actifs ;
- les égalisations ;
- les délais ;
- les gains ;
- les limiteurs ;
- plusieurs presets d’écoute ;
- l’amplification des trois voies.

C’est séduisant parce que cela évite d’empiler un DSP externe, plusieurs amplis, beaucoup de câbles et un filtre passif compliqué.

Mais il y a des questions à trancher :

- le FA503 est-il suffisamment dimensionné pour le 15 pouces choisi ?
- la réserve de puissance est-elle cohérente avec le projet ?
- le DSP intégré est-il assez souple ?
- la ventilation passive sera-t-elle suffisante ?
- le module restera-t-il fiable dans le temps ?
- vaut-il mieux un module intégré ou une électronique séparée ?

Pour le moment, le choix Hypex paraît très cohérent, mais il mérite une vraie vérification avant achat.

---

## Source audio : comment envoyer le son aux enceintes ?

Une enceinte active n’a pas besoin d’un ampli externe classique. Elle a besoin d’un signal ligne propre, avec une gestion du volume en amont.

Il faut donc réfléchir à l’appareil central qui va piloter le système.

Les sources possibles :

- TV ;
- streamer réseau ;
- AirPlay ;
- platine vinyle ;
- DAC ;
- ordinateur ;
- console ou lecteur multimédia.

La chaîne pourrait ressembler à ça :

```text
TV / AirPlay / streamer / platine
        ↓
Préampli / DAC / streamer avec volume
        ↓
Sortie gauche → enceinte gauche active
Sortie droite → enceinte droite active
```

La question du **RCA ou XLR** se pose.

| Liaison | Avantages | Limites |
|---|---|---|
| RCA | Simple, courant, moins cher | Plus sensible aux parasites |
| XLR | Symétrique, robuste, plus propre sur longues distances | Demande une source compatible |

Le XLR n’est pas obligatoire, mais il semble logique sur un projet d’enceintes actives ambitieuses, surtout si les câbles sont un peu longs ou passent près d’autres appareils.

Pour l’instant, je retiens cette idée :

> RCA suffisant dans une installation courte et propre, XLR préférable pour une solution plus durable et plus robuste.

---

## Cas particulier de la platine vinyle

La platine vinyle ne pourra pas être branchée directement dans les enceintes, sauf cas particulier avec préampli intégré et gestion de volume correcte.

Dans la majorité des cas, il faudra :

```text
Platine vinyle
   ↓
Préampli phono
   ↓
Préampli / streamer / DAC avec volume
   ↓
Enceintes actives
```

À prévoir éventuellement :

| Élément | Rôle |
|---|---|
| Préampli phono MM | Pour cellule MM classique |
| Préampli phono MC | Si cellule MC |
| Entrée ligne sur le préampli principal | Pour intégrer la platine au système |

C’est un point à intégrer dès le départ, car il influence le choix de l’appareil central.

L’idéal serait peut-être un appareil capable de gérer :

- AirPlay ;
- TV ;
- entrées numériques ;
- entrée analogique ;
- sorties XLR ou RCA ;
- contrôle de volume propre.

---

## Caisse : premières dimensions de travail

La caisse est l’un des gros sujets du projet.

Avec un 15 pouces, on ne parle pas d’une petite enceinte discrète. Il faut accepter un volume sérieux.

Premières dimensions envisagées par enceinte :

| Cote | Valeur approximative |
|---|---:|
| Hauteur | 1150 mm |
| Largeur | 500 mm |
| Profondeur | 560 mm |
| Épaisseur panneaux | 24 mm |
| Façade | Double épaisseur recommandée : 42 à 48 mm |

Ce sont des valeurs de départ, pas encore un plan définitif.

L’objectif serait d’obtenir :

- un volume grave suffisant ;
- une façade rigide ;
- de la place pour le 8 pouces et le pavillon ;
- un compartiment électronique séparé ;
- un évent frontal bien dimensionné ;
- une construction robuste.

La question du matériau reste ouverte :

| Matériau | Avantages | Limites |
|---|---|---|
| MDF 25 mm | Stable, facile à peindre, dense | Lourd, moins agréable aux vissages répétés |
| CP bouleau 24 mm | Rigide, durable, solide, beau | Plus cher, demande une finition soignée |

Mon intuition va plutôt vers le **contreplaqué bouleau 24 mm**, surtout pour un projet durable et démontable. Mais le MDF reste une option valable pour une finition peinte très propre.

---

## Volumes internes à vérifier

Une première cible serait :

| Zone | Volume cible par enceinte |
|---|---:|
| Chambre grave 15” bass-reflex | environ **114 L nets** |
| Chambre 8” close | **8 à 12 L nets** |
| Compartiment électronique | séparé, non compté dans le volume grave |
| Chambre pavillon / compression | séparée, sans fuite vers le grave |

Le mot important ici est **net**.

Le volume réel doit être calculé après retrait :

- du haut-parleur ;
- de l’évent ;
- des renforts ;
- des cloisons ;
- du compartiment électronique ;
- des tasseaux ;
- des éventuelles plaques de doublage.

C’est typiquement le genre de point à modéliser proprement avant de couper quoi que ce soit.

---

## L’évent bass-reflex : point critique

Si le grave est en bass-reflex, l’évent devient un élément majeur du projet.

Première hypothèse par enceinte :

| Élément | Valeur de départ |
|---|---:|
| Type | Évent en fente frontal |
| Largeur | environ 452 mm |
| Hauteur | environ 55 mm |
| Surface | environ 248 cm² |
| Longueur | 400 à 420 mm |
| Accord cible | autour de 35 Hz |

Ce n’est pas un détail esthétique. L’évent doit être assez grand pour éviter les bruits d’écoulement, assez rigide pour ne pas vibrer, et correctement accordé.

À vérifier :

- la vitesse d’air dans l’évent ;
- la longueur réelle nécessaire ;
- l’influence des extrémités rayonnées ;
- la place prise dans la caisse ;
- la distance entre la sortie interne de l’évent et les parois ;
- la facilité de fabrication.

À ce stade, je retiens surtout qu’il faut éviter les évents sous-dimensionnés. Sur une enceinte de cette ambition, l’évent doit être traité comme une vraie pièce de conception.

---

## Compartiment électronique et ventilation

Si les modules actifs sont intégrés dans les enceintes, il faut gérer la ventilation et la sécurité.

L’idée serait de créer un compartiment électronique séparé, à l’arrière de chaque enceinte.

Principe :

```text
Chambre grave étanche
Compartiment électronique séparé
Ventilation passive vers l’extérieur uniquement
```

À prévoir :

| Élément | Rôle |
|---|---|
| Ouïe basse | Entrée d’air frais |
| Ouïe haute | Sortie d’air chaud |
| Grilles | Protection des ouvertures |
| Cloison étanche | Séparation avec le volume grave |
| Joint autour du module | Étanchéité mécanique |

Question ouverte : faut-il une ventilation active ?

Pour le moment, l’idée serait plutôt de rester en **ventilation passive**, pour éviter le bruit, la poussière et une pièce mécanique supplémentaire. Mais il faudra vérifier la chauffe réelle des modules dans l’usage.

---

## Étanchéité : à ne pas sous-estimer

Une caisse bass-reflex doit être étanche partout, sauf au niveau de l’évent.

À prévoir :

| Élément | Rôle |
|---|---|
| Joint mousse 15” | Étanchéité du grave |
| Joint mousse 8” | Étanchéité du médium |
| Joint pavillon | Étanchéité façade |
| Joint module Hypex | Étanchéité arrière |
| Mastic interne | Angles et assemblages |
| Inserts filetés | Démontage propre des haut-parleurs |

Règle de conception provisoire :

```text
La chambre grave ne communique avec l’extérieur que par l’évent.
Le compartiment électronique ne communique jamais avec la chambre grave.
```

C’est invisible une fois l’enceinte terminée, mais probablement décisif pour obtenir un résultat propre.

---

## Protection de la compression

Même avec un DSP, il semble prudent d’ajouter une protection passive minimale sur la compression aigu.

Hypothèse :

| Élément | Valeur envisagée |
|---|---:|
| Condensateur série non polarisé | 33 à 47 µF |
| Tension | 100 V minimum, idéalement plus |
| Quantité | 1 par enceinte |

Ce condensateur ne sert pas à faire le filtre principal. Le filtrage serait fait dans le DSP.

Il servirait plutôt de sécurité en cas :

- d’erreur de preset ;
- de bruit au démarrage ;
- de mauvais routage ;
- de mauvaise manipulation ;
- d’envoi accidentel de basses fréquences vers la compression.

C’est une petite sécurité qui semble logique sur un projet actif.

---

## Réglages DSP : premières hypothèses

Les valeurs ci-dessous ne sont pas des réglages définitifs. Ce sont des points de départ à tester.

| Réglage | Hypothèse de départ |
|---|---:|
| Passe-haut 15” | 28–30 Hz |
| Coupure 15” / 8” | 120 Hz LR24 ou LR48 |
| Coupure 8” / compression | 1,6 kHz LR48 |
| Gain 15” | 0 dB |
| Gain 8” | environ -2 dB |
| Gain compression | environ -10 à -13 dB |
| Limiteur 15” | à calculer selon HP et ampli |
| Limiteur 8” | à calculer selon HP et ampli |
| Limiteur compression | à calculer prudemment |

Le DSP permettrait aussi de créer plusieurs profils :

| Preset | Idée |
|---|---|
| Neutre | Réponse équilibrée |
| Fun / urbain | Grave légèrement renforcé |
| Nuit | Grave contenu, niveau plus doux |
| Mesure | Voies isolées pour réglages |

Mais tout cela reste théorique tant que l’enceinte n’est pas mesurée.

---

## Mesure : probablement obligatoire

C’est un point qui ressort assez vite : sur une enceinte active 3 voies, il sera difficile de faire quelque chose de sérieux sans micro de mesure.

À prévoir :

| Élément | Rôle |
|---|---|
| Micro type UMIK-1 | Mesure acoustique |
| Pied micro | Placement fiable |
| REW | Logiciel de mesure |
| Ordinateur | Mesure et réglage DSP |
| Câble USB Hypex | Configuration des modules |
| Multimètre | Contrôle câblage |

Les mesures serviront à vérifier :

- la réponse de chaque voie ;
- le niveau relatif des haut-parleurs ;
- les raccords de fréquence ;
- la phase ;
- les délais ;
- l’accord de l’évent ;
- les accidents liés à la pièce ;
- la cohérence des presets.

Sans mesure, on peut fabriquer une belle enceinte. Avec mesure, on peut espérer fabriquer une enceinte vraiment réglée.

---

## Budget : ça commence à piquer

Le projet est plus cher que ce que j’imaginais au départ, mais moins délirant que certains systèmes hi-fi très haut de gamme.

Les gros postes sont clairement :

- les haut-parleurs ;
- les modules actifs ;
- le bois ;
- la source / préampli ;
- la mesure ;
- la finition.

Le petit matériel — câbles, joints, visserie, amortissant, grilles — finit aussi par compter, mais ce n’est pas lui qui change la nature du budget.

Ce qui rend le projet cher, c’est surtout le choix d’une architecture active 3 voies par enceinte.

En contrepartie, cette architecture remplace :

- un gros ampli externe ;
- un filtre passif complexe ;
- un DSP séparé ;
- plusieurs appareils intermédiaires ;
- une partie du câblage externe.

La vraie question n’est donc pas seulement “combien ça coûte ?”, mais plutôt :

> Est-ce que le budget est cohérent avec le résultat espéré, l’apprentissage, la durabilité et le plaisir de fabrication ?

Pour l’instant, je trouve que le projet reste cher, mais pas absurde.

---

## Fiabilité : un point à prendre au sérieux

Comme l’électronique est intégrée dans l’enceinte, la fiabilité devient une vraie question.

Les points à surveiller :

- chauffe des modules ;
- accès au module en cas de panne ;
- ventilation suffisante ;
- câblage secteur propre ;
- protection des haut-parleurs ;
- possibilité de démonter sans abîmer la caisse ;
- documentation des réglages DSP ;
- sauvegarde des presets.

Un système actif est plus complexe qu’une enceinte passive. Mais il peut rester très fiable si l’intégration est propre.

Pour ça, il faudra prévoir dès la conception :

- un accès facile à l’électronique ;
- une ventilation passive sérieuse ;
- des connecteurs propres ;
- des passages de câbles fixés ;
- des joints remplaçables ;
- une documentation claire de tout le câblage.

---

## Liste provisoire du matériel à étudier

### Audio principal

| Élément | Quantité | Statut |
|---|---:|---|
| B&C 15TBX100 8Ω | 2 | Piste principale |
| B&C 8PE21 8Ω | 2 | Piste principale |
| B&C DE250 8Ω | 2 | Piste principale |
| B&C ME45 ou équivalent | 2 | À confirmer |
| Hypex FA503 | 2 | Piste principale |
| Condensateurs 33–47 µF | 2 | Protection recommandée |
| Source / préampli / streamer | 1 | À choisir |
| Câbles RCA ou XLR | 1 paire | Selon source choisie |

### Caisse et construction

| Élément | Quantité approximative | Statut |
|---|---:|---|
| CP bouleau 24 mm ou MDF 25 mm | 2 à 3 panneaux | À trancher |
| Façade doublée | 2 | Recommandé |
| Renforts internes | plusieurs | Obligatoire |
| Évent en fente | 1 par enceinte | À dimensionner |
| Colle à bois | 1 à 2 bouteilles | Obligatoire |
| Inserts filetés | assortiment | Recommandé |
| Joints mousse | plusieurs mètres | Obligatoire |
| Mastic interne | 1 cartouche | Recommandé |
| Amortissant interne | 2 à 4 m² | À doser |
| Grilles de ventilation | 4 | Si modules intégrés |

### Mesure et réglage

| Élément | Quantité | Statut |
|---|---:|---|
| Micro UMIK-1 ou équivalent | 1 | Fortement recommandé |
| Pied micro | 1 | Recommandé |
| REW | 1 | Gratuit / nécessaire |
| PC | 1 | Nécessaire |
| Multimètre | 1 | Nécessaire |
| Câble USB Hypex | 1 | Nécessaire |

---

## Ce qui est presque certain

À ce stade de la recherche, certains choix semblent déjà assez solides :

- partir sur une enceinte active plutôt que passive ;
- utiliser un DSP intégré ou externe ;
- prévoir une vraie mesure au micro ;
- séparer les volumes internes ;
- utiliser une caisse très rigide ;
- protéger la compression ;
- documenter chaque étape ;
- garder une logique de réparabilité.

---

## Ce qui reste à vérifier

Les points ouverts sont encore nombreux :

- 12 pouces ou 15 pouces définitivement ?
- le B&C 15TBX100 est-il le meilleur choix ?
- le volume de 114 L nets est-il optimal ?
- l’accord à 35 Hz est-il le bon compromis ?
- le Hypex FA503 est-il suffisamment confortable ?
- XLR obligatoire ou RCA suffisant dans mon cas ?
- quelle source centrale choisir pour AirPlay, TV et platine ?
- quelle finition extérieure correspond le mieux au projet ?
- quel poids final par enceinte ?
- est-ce raisonnable dans une pièce de vie ?

Ce sont ces questions qui devront guider la suite.

---

## Ordre logique pour continuer la recherche

Avant de construire, je dois probablement avancer dans cet ordre :

1. Comparer sérieusement les options 12” et 15”.
2. Simuler le grave et l’accord bass-reflex.
3. Valider les haut-parleurs pressentis.
4. Vérifier le dimensionnement du module Hypex.
5. Choisir la source centrale adaptée à mes usages.
6. Modéliser la caisse en 3D.
7. Calculer les volumes nets.
8. Dessiner l’évent précisément.
9. Prévoir l’intégration électronique et la ventilation.
10. Chiffrer le projet complet.
11. Décider si je pars sur un prototype ou directement sur la paire.

---

## Conclusion provisoire

Pour le moment, ce projet est encore une recherche.

Mais la direction commence à se dessiner : une paire d’enceintes actives 3 voies, imposantes, réglables, puissantes, construites autour d’un gros haut-parleur de grave et d’une électronique moderne.

Ce n’est pas le choix le plus simple. Ce n’est probablement pas le choix le moins cher. Mais c’est un projet qui coche beaucoup de cases : musique, bricolage, bois, électronique, mesure, apprentissage et bel objet durable.

Je ne sais pas encore si cette architecture sera la version finale.

Mais elle mérite clairement d’être étudiée sérieusement.

La prochaine étape sera de sortir du simple inventaire de matériel pour entrer dans les vrais calculs : volume de caisse, simulation du grave, accord de l’évent, choix définitif de l’amplification et intégration dans une pièce réelle.
