---
title: "Nom de l’offre"
type: "landing"           # <- relie au layout ci-dessous
url: "/offre-x/"          # URL courte
date: 2025-10-27
showBreadcrumbs: false
showDate: false
robots: "index,follow"    # ou "noindex" si test
description: "Promesse claire en une phrase."
hero:
  eyebrow: "Nouveau"
  heading: "La promesse qui fait tilt"
  subheading: "Bénéfice principal + objection levée."
  primary_cta_text: "Commencer maintenant"
  primary_cta_href: "#cta"
  secondary_cta_text: "Voir la démo"
  secondary_cta_href: "#video"
social_proof:
  logos: ["/img/press1.svg","/img/press2.svg"]
features:
  - icon: "⚡"
    title: "Rapide"
    text: "Métrique ou preuve."
  - icon: "🛠️"
    title: "Flexible"
    text: "Cas d’usage concret."
  - icon: "🔒"
    title: "Fiable"
    text: "Preuve sociale/technique."
testimonials:
  - name: "Camille"
    role: "Indé"
    quote: "J’ai gagné 6h/semaine dès la 1re semaine."
pricing:
  title: "Choisis ton plan"
  note: "Garantie 14 jours satisfait ou remboursé."
  plans:
    - name: "Essentiel"
      price: "29€"
      period: "/mois"
      features: ["X illimité","Support mail"]
      cta_text: "Essayer"
      cta_href: "#checkout"
      highlighted: false
    - name: "Pro"
      price: "79€"
      period: "/mois"
      features: ["Tout Essentiel","Priorité support","Intégrations"]
      cta_text: "Passer Pro"
      cta_href: "#checkout"
      highlighted: true
faq:
  - q: "C’est pour qui ?"
    a: "…"
  - q: "Puis-je annuler ?"
    a: "Oui, à tout moment."
form:
  provider: "netlify" # "formspree" ou "custom"
  id: "lead-landing"
  success_message: "Merci ! On revient vers toi rapidement."
---
