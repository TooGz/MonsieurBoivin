---
title: "Simulation WinISD du 15 pouces B&C 15TBX100 pour le projet MB-158 Club Monitor"
description: "Archive technique de la simulation WinISD du haut-parleur B&C 15TBX100 dans une caisse bass-reflex de 114 L accordée à 35 Hz."
summary: "Validation en simulation du 15 pouces B&C 15TBX100 : volume de caisse, accord bass-reflex, évent, excursion, vitesse d’air et filtre passe-haut."
date: 2026-05-21
draft: false
categories:
  - Atelier
  - Audio DIY
tags:
  - enceinte DIY
  - WinISD
  - B&C Speakers
  - 15TBX100
  - bass-reflex
  - subwoofer
  - audio
  - MB-158
---

# Simulation WinISD du 15 pouces B&C 15TBX100 pour le projet MB-158 Club Monitor

Dans le cadre de mon projet d’enceinte active **MB-158 Club Monitor**, j’ai commencé par valider la partie grave à l’aide de **WinISD**.

L’objectif de cette simulation est simple : vérifier si le haut-parleur **B&C 15TBX100 8Ω** est cohérent avec une caisse bass-reflex d’environ **114 litres nets**, accordée autour de **35 Hz**, et capable de recevoir une puissance importante sans dépasser ses limites mécaniques.

Cette page sert d’archive technique pour garder une trace des réglages utilisés, des résultats obtenus et des choix retenus avant de passer à la conception physique de l’enceinte.

---

## Objectif du projet

Le projet **MB-158 Club Monitor** vise une enceinte active 3 voies puissante, capable de produire un grave généreux, propre et physique.

L’idée n’est pas seulement de faire une enceinte hi-fi classique, mais plutôt une enceinte hybride entre :

- une enceinte de monitoring musclée,
- une enceinte de soirée,
- une enceinte type club domestique,
- un système DIY haut rendement avec DSP intégré.

La partie grave repose ici sur un haut-parleur de **15 pouces**, destiné à couvrir la zone basse du spectre jusqu’au raccord avec le médium.

---

## Haut-parleur simulé

Le haut-parleur utilisé pour cette simulation est le :

```text
B&C Speakers 15TBX100 8Ω
```

Principales données constructeur utilisées dans WinISD :

| Paramètre | Valeur |
|---|---:|
| Diamètre nominal | 15 pouces / 380 mm |
| Impédance nominale | 8 Ω |
| Re | 5,1 Ω |
| Fs | 35 Hz |
| Qes | 0,30 |
| Qms | 5,2 |
| Qts | 0,28 |
| Vas | 113 L |
| Sd | 855 cm² |
| Xmax | 9 mm |
| Mms | 163 g |
| BL | 25,5 Tm |
| Le | 1,6 mH |
| Puissance nominale | 1000 W |
| Sensibilité | 96 dB |
| Réponse constructeur | 35 Hz – 1500 Hz |

Le constructeur recommande une caisse de :

```text
Volume : 114 L
Accord : 35 Hz
```

---

## Configuration de la caisse dans WinISD

Dans WinISD, le projet a été créé en bass-reflex avec les réglages suivants :

```text
Type de charge : Vented / Bass-reflex
Volume net : 114 L
Fréquence d’accord : 35 Hz
```

Le volume de **114 L** correspond au volume utile vu par le haut-parleur.

Il faudra donc penser, lors de la conception réelle de la caisse, à ajouter le volume occupé par :

- le haut-parleur,
- l’évent,
- les renforts internes,
- l’éventuelle chambre séparée du médium/aigu,
- les tasseaux ou éléments structurels internes.

Le haut-parleur occupe déjà environ :

```text
5,4 L
```

L’évent simulé occupe lui aussi un volume non négligeable. La caisse brute devra donc être plus grande que 114 L pour obtenir réellement 114 L nets.

---

## Évent retenu pour la simulation

L’évent simulé est un évent fente frontal.

Réglages utilisés :

```text
Nombre d’évents : 1
Forme : rectangulaire / fente
Largeur : 45 cm
Hauteur : 5,5 cm
Surface : 247,5 cm²
Longueur : environ 33,5 cm
```

Ce choix donne une surface d’évent légèrement supérieure à la recommandation constructeur.

C’est volontaire : l’objectif est de limiter la vitesse d’air dans l’évent lorsque l’enceinte est utilisée à forte puissance.

### Dimensions retenues

| Élément | Valeur |
|---|---:|
| Largeur évent | 450 mm |
| Hauteur évent | 55 mm |
| Surface | 247,5 cm² |
| Longueur calculée | ≈ 335 mm |
| Accord obtenu | 35 Hz |

Cette fente est assez grande pour limiter les bruits d’écoulement d’air, tout en restant réaliste à construire dans une enceinte de ce gabarit.

---

## Première simulation sans filtre passe-haut

La première simulation a été faite à :

```text
Puissance : 500 W
Filtre passe-haut : aucun
```

### Résultat SPL

![](../img/B&C15BTX100_500W_SPL.png)

La réponse simulée montre un niveau important, situé autour de :

```text
118 à 120 dB au-dessus de 40 Hz
```

Ce niveau est très cohérent avec l’objectif du projet : une enceinte capable de sortir un grave puissant et physique.

La réponse monte fortement jusqu’à la zone d’accord, puis reste relativement stable dans la bande utile.

### Excursion du haut-parleur

![](../img/B&C15BTX100_500W_CONE_EXCURSION.png)

Sans filtre passe-haut, le résultat montre un problème classique en bass-reflex : sous la fréquence d’accord, l’excursion augmente très fortement.

Le haut-parleur dépasse son Xmax sous environ :

```text
30 à 32 Hz
```

Comme le Xmax du 15TBX100 est de :

```text
9 mm
```

il n’est pas raisonnable d’utiliser cette configuration à forte puissance sans protection dans l’extrême grave.

Ce comportement est normal : sous l’accord de la caisse, le haut-parleur n’est plus correctement contrôlé par le bass-reflex.

### Vitesse d’air dans l’évent

![](../img/B&C15BTX100_500W_AIR_VELOCITY.png)

À 500 W sans filtre passe-haut, la vitesse d’air maximale dans l’évent atteint environ :

```text
23 m/s autour de 35 Hz
```

Ce résultat reste acceptable pour une enceinte puissante, surtout avec un évent correctement conçu :

- entrée bien dégagée,
- sortie propre,
- arrêtes arrondies,
- évent rigide,
- absence d’obstacle immédiat derrière l’évent.

---

## Ajout d’un filtre passe-haut

Pour protéger le haut-parleur sous la fréquence d’accord, un filtre passe-haut a été ajouté dans WinISD.

Réglage retenu :

```text
Type : Highpass
Filtre : Butterworth
Ordre : 4
Fréquence : 30 Hz
Pente équivalente : 24 dB/octave
```

Ce filtre pourra ensuite être reproduit dans le DSP de l’amplificateur actif.

---

## Simulation avec passe-haut 30 Hz / 24 dB

Avec le filtre activé, le comportement devient beaucoup plus sain.

### Excursion avec filtre

![](../img/B&C15BTX100_500W_CONE_EXCURSION_FILTERED.png)

À 500 W, l’excursion reste sous la limite de 9 mm.

Résultat observé :

```text
Pic d’excursion : environ 7 à 8 mm
Limite Xmax : 9 mm
```

La protection est donc efficace : le haut-parleur reste dans sa zone de fonctionnement mécanique acceptable.

Ce point valide l’utilisation du 15TBX100 dans cette caisse à forte puissance, à condition d’appliquer un filtrage adapté.

### Vitesse d’air dans l’évent avec filtre

![](../img/B&C15BTX100_500W_AIR_VELOCITY_FILTERED.png)

Avec le passe-haut actif, la vitesse d’air dans l’évent baisse légèrement.

Résultat observé :

```text
Pic : environ 20 m/s autour de 35 Hz
```

C’est un bon résultat pour une enceinte de ce type.

L’évent de **450 x 55 mm** est donc validé pour cette simulation.

### SPL avec filtre

![](../img/B&C15BTX100_500W_SPL_FILTERED.png)

Le filtre passe-haut réduit logiquement le niveau sous 30 Hz, mais il conserve toute l’énergie utile au-dessus de 35/40 Hz.

La réponse reste située autour de :

```text
118 à 120 dB au-dessus de 40 Hz
```

Le grave utile reste donc très solide.

Pour un usage musical, notamment rap, électro, pop, rock ou ambiance forte, cette coupure basse est raisonnable. Elle protège le haut-parleur sans donner l’impression de supprimer le grave.

---

## Comparaison rapide : sans filtre vs avec filtre

| Élément | Sans filtre | Avec passe-haut 30 Hz |
|---|---:|---:|
| Puissance simulée | 500 W | 500 W |
| Accord caisse | 35 Hz | 35 Hz |
| Excursion sous 30 Hz | Trop élevée | Contrôlée |
| Xmax dépassé | Oui | Non |
| Vitesse d’air évent | ≈ 23 m/s | ≈ 20 m/s |
| SPL utile | Très élevé | Très élevé |
| Sécurité mécanique | Non | Oui |

La conclusion est nette :

**la caisse fonctionne bien, l’évent est cohérent, mais le passe-haut est obligatoire.**

---

## Réglage final retenu

Pour cette version de base, je retiens donc la configuration suivante :

```text
Haut-parleur : B&C 15TBX100 8Ω
Type de caisse : Bass-reflex
Volume net : 114 L
Accord : 35 Hz
Évent : fente frontale
Dimensions évent : 450 x 55 mm
Longueur évent : environ 335 mm
Filtre passe-haut : Butterworth 30 Hz / 24 dB/octave
Puissance simulée : 500 W
```

Ce réglage donne une bonne combinaison entre :

- extension dans le grave,
- niveau SPL élevé,
- sécurité mécanique,
- vitesse d’air acceptable,
- faisabilité de construction.

---

## Volume brut à prévoir

Attention : le volume de 114 L correspond au volume net.

Pour obtenir ce volume réel dans la caisse, il faut ajouter les volumes occupés par les éléments internes.

Estimation rapide :

| Élément | Volume approximatif |
|---|---:|
| Volume net souhaité | 114 L |
| Haut-parleur | + 5,4 L |
| Évent fente | + ≈ 8,3 L |
| Renforts internes | + quelques litres |
| Marge de construction | + quelques litres |

Il faudra donc viser une caisse brute autour de :

```text
130 à 135 L
```

afin d’obtenir environ 114 L nets après déduction des volumes occupés.

---

## Remarques importantes

WinISD permet de valider la partie basse fréquence, mais il ne remplace pas une mise au point complète de l’enceinte.

Cette simulation ne prend pas en compte :

- la réponse réelle de la façade,
- la directivité du 15 pouces,
- les diffractions,
- le raccord avec le haut-parleur médium,
- le raccord avec la compression ou le tweeter,
- la pièce d’écoute,
- les corrections DSP finales,
- les pertes réelles de la caisse,
- les éventuelles vibrations ou résonances mécaniques.

La simulation valide donc la logique du grave, mais il faudra ensuite compléter avec :

- une conception précise de la caisse,
- une simulation ou mesure du filtrage complet,
- des mesures REW,
- une correction DSP,
- une mise au point à l’écoute.

---

## Conclusion

Cette première simulation WinISD valide clairement le choix du **B&C 15TBX100** pour le projet **MB-158 Club Monitor**.

La configuration **114 L / 35 Hz** est cohérente avec les recommandations constructeur et donne un résultat solide en simulation.

L’évent fente de **450 x 55 mm**, long d’environ **335 mm**, permet de garder une vitesse d’air raisonnable, même avec une puissance importante.

Le point essentiel à retenir est l’obligation d’utiliser un filtre passe-haut :

```text
30 Hz / 24 dB octave minimum
```

Avec ce filtre, le haut-parleur reste sous son Xmax à 500 W, tout en conservant un grave puissant et exploitable.

Cette base peut donc être considérée comme validée pour la suite du projet.


[Datasheet 15TBX100](../data/15TBX100.pdf)