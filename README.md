#  TimeTravel Agency — Webapp Interactive

Webapp pour une agence de voyage temporel fictive de luxe, développée dans le cadre du Projet Supervisé IA M1/M2 — Ynov Campus Paris 2025/2026.

> *Explorez l'histoire, réinventée.*

---

##  Auteur

| Nom | Prénom |
|-----|--------|
| G | Max |
| WN | Bertho |
| BJ | Ivan |
---

##  Mission

Développer une webapp moderne et interactive mettant en scène l'agence et ses 3 destinations temporelles avec des fonctionnalités alimentées par l'IA :

- **Paris 1889** — Belle Époque, Tour Eiffel, Exposition Universelle
- **Crétacé –65M** — Dinosaures, nature préhistorique
- **Florence 1504** — Renaissance, art, Michel-Ange

---

##  Features implémentées

### Page 1 — Accueil `[essentiel]`

**Hero section**
- Animation ou vidéo de fond (boucle temporelle)
- Titre accrocheur + baseline de l'agence
- CTA principal « Explorer les destinations »
- Fade-in progressif au chargement

**Navigation**
- Header fixe avec logo TimeTravel Agency
- Liens vers les sections : Destinations, Chat, Réservation
- Design responsive (mobile-first)

**Présentation de l'agence**
- Pitch court de l'agence
- 3 arguments clés (luxe, sécurité, histoire)
- Section « Comment ça marche »

---

### Page 2 — Galerie des destinations `[essentiel]`

**Paris 1889**
- Image hero générée lors du Projet 1
- Descriptif Belle Époque, Tour Eiffel
- Prix fictif + durée du séjour
- Hover effect sur la card

**Crétacé –65M**
- Image hero générée lors du Projet 1
- Descriptif dinosaures, nature préhistorique
- Badge « Aventure extrême »
- Hover effect sur la card

**Florence 1504**
- Image hero générée lors du Projet 1
- Descriptif Renaissance, Michel-Ange
- Badge « Culture & Art »
- Hover effect sur la card

---

### Feature IA — Agent conversationnel `[essentiel]`

**Widget chatbot**
- Icône flottante en bas à droite de la page
- Fenêtre de chat qui s'ouvre au clic
- Design cohérent avec le site (thème sombre, accents dorés)
- Placeholder : *« Posez-moi vos questions sur les voyages temporels... »*

**Personnalité de l'agent**
- Ton : professionnel, chaleureux, passionné d'histoire
- Connaissance approfondie des 3 destinations
- Conseils personnalisés selon les intérêts du client
- FAQ agence automatisée (prix, durée, sécurité)

**Intégration API**
- API Anthropic (modèle : `claude-sonnet-4-6`)
- Système de prompt contextualisé (rôle, destinations, ton)
- Historique de la conversation maintenu
- Gestion des erreurs et des cas limites

---

### Feature IA — Quiz de recommandation `[optionnel — exercice 3.2]`

**Quiz interactif (4 questions)**

1. *Quel type d'expérience recherchez-vous ?*
   - Culturelle et artistique
   - Aventure et nature
   - Élégance et raffinement

2. *Votre période préférée ?*
   - Histoire moderne (XIXe–XXe siècle)
   - Temps anciens et origines
   - Renaissance et classicisme

3. *Vous préférez :*
   - L'effervescence urbaine
   - La nature sauvage
   - L'art et l'architecture

4. *Votre activité idéale :*
   - Visiter des monuments
   - Observer la faune
   - Explorer des musées

- Sélection par boutons cliquables
- Barre de progression visuelle
- Résultat personnalisé avec explication générée par l'IA

---

### Feature — Formulaire de réservation `[optionnel — selon le temps]`

- Sélection de la destination
- Date de départ + durée du séjour
- Nombre de voyageurs
- Validation et confirmation fictive automatisée

---

### Animations & micro-interactions `[optionnel — exercice 2.3]`

- Fade-in progressif des sections au scroll (AOS ou Framer Motion)
- Hover effects sur les cards destinations
- Transitions douces entre les sections
- Durée : 0.6–0.8s, easing naturel

---

##  Stack technique

| Couche | Technologie |
|--------|------------|
| Framework | React |
| Styles | Tailwind CSS |
| Animations | Framer Motion / AOS |
| IA Chatbot | Anthropic API (`claude-sonnet-4-6`) |
| Génération code | Claude Code (VS Code) |
| Assets | Inclus dans le repo (`public/assets/`) |
| Déploiement | GitHub Pages (via GitHub Actions) |
| CI/CD | GitHub Actions |

---

##  Outils IA utilisés

| Usage | Outil | Détail |
|-------|-------|--------|
| Génération des images hero | **Runway** | Format 16:9, template prompt cinématique, 2–3 variations par destination |
| Animation image-to-video | **Runway** | Mouvements de caméra spécifiques par destination, 5 sec par clip |
| Voix-off narration | **Runway** | Voix française, ton chaud et posé, débit 0.85x |
| Musique de fond | **Suno** | Style cinématique orchestral, Hans Zimmer style, no vocals |
| Montage vidéo / assemblage | **CapCut** | Transitions Dissolve, mixage voix 100% / musique 25% |
| Agent conversationnel | **Anthropic API** | Modèle `claude-sonnet-4-6`, prompt contextualisé TimeTravel |
| Génération & édition du code | **Claude Code** | Extension VS Code, itérations successives |
| Quiz personnalisation | **Anthropic API** | Modèle `claude-sonnet-4-6` |

---

##  Structure du projet

```
timetravel-agency/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD GitHub Actions → GitHub Pages
├── public/
│   └── assets/
│       ├── images/
│       │   ├── paris/
│       │   │   ├── paris-hero-1.jpg
│       │   │   ├── paris-hero-2.jpg
│       │   │   └── paris-hero-3.jpg
│       │   ├── cretace/
│       │   │   ├── cretace-hero-1.jpg
│       │   │   ├── cretace-hero-2.jpg
│       │   │   └── cretace-hero-3.jpg
│       │   └── florence/
│       │       ├── florence-hero-1.jpg
│       │       ├── florence-hero-2.jpg
│       │       └── florence-hero-3.jpg
│       ├── videos/
│       │   ├── hero-bg.mp4               # Zoom arrière depuis la Terre, lumière dorée (fond hero global)
│       │   ├── paris-bg.mp4              # Dolly push vers la Tour Eiffel, foule victorienne
│       │   ├── cretace-bg.mp4            # Crane reveal depuis la jungle, T-Rex émergeant
│       │   ├── florence-bg.mp4           # Panoramique sur les toits florentins, Duomo révélé
│       │   └── timetravel-reel.mp4       # Vidéo de rendu final (présentation de l'agence)
│       └── audio/
│           ├── maya-voiceover.mp3        # Narration voix over de l'agence (Maya)
│           └── skyline-runway.mp3        # Bande-son de fond de la webapp
├── src/
│   ├── components/
│   │   ├── Hero.jsx
│   │   ├── DestinationCard.jsx
│   │   ├── ChatWidget.jsx
│   │   ├── Quiz.jsx
│   │   └── BookingForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Destinations.jsx
│   ├── App.jsx
│   └── main.jsx
├── README.md
└── package.json
```

###  Détail des assets

#### Images — générées avec Runway (Projet 1)

| Fichier | Description |
|---------|-------------|
| `paris-hero-1/2/3.jpg` | Paris 1889 — Tour Eiffel en construction, Belle Époque, lumière dorée |
| `cretace-hero-1/2/3.jpg` | Crétacé –65M — T-Rex en silhouette dans la jungle primordiale brumeuse |
| `florence-hero-1/2/3.jpg` | Florence 1504 — Panorama du Duomo au coucher du soleil, toits en terracotta |

#### Vidéos — générées avec Runway (Projet 1)

| Fichier | Description | Usage |
|---------|-------------|-------|
| `hero-bg.mp4` | Slow zoom arrière depuis la Terre, lumière dorée sur l'horizon | Background hero global |
| `paris-bg.mp4` | Slow dolly push vers la Tour Eiffel, foule victorienne qui s'écarte | Background card Paris |
| `cretace-bg.mp4` | Slow crane reveal depuis le sol de la jungle, T-Rex émergeant des fougères | Background card Crétacé |
| `florence-bg.mp4` | Slow panoramique sur les toits florentins, Duomo révélé progressivement | Background card Florence |
| `timetravel-reel.mp4` | Vidéo de rendu final compilant les 3 destinations | Section présentation agence |

#### Audio — générés avec Runway et Suno (Projet 1)

| Fichier | Description | Usage |
|---------|-------------|-------|
| `maya-voiceover.mp3` | Narration voix over (Maya) — *« Le temps n'est plus une limite... »* | Intro ou onboarding audio |
| `skyline-runway.mp3` | Bande-son de fond, ambiance temporelle | Musique de fond de la webapp (avec bouton mute) |

---

##  Installation & lancement

```bash
# Cloner le repo
git clone https://github.com/MaxGlt/timetravel-agency.git
cd timetravel-agency

# Installer les dépendances
npm install

# Configurer la clé API (créer un fichier .env.local)
echo "VITE_ANTHROPIC_API_KEY=your_key_here" > .env.local

# Lancer en local
npm run dev

# Build de production
npm run build
```

>  Le fichier `.env.local` ne doit jamais être commité. Vérifie qu'il est bien dans ton `.gitignore`.

---

##  Déploiement

URL publique : **https://[ton-username].github.io/timetravel-agency/**

Plateforme : GitHub Pages — déployé automatiquement via GitHub Actions à chaque push sur `main`.

> Testé sur mobile et desktop 

### Workflow CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_ANTHROPIC_API_KEY: ${{ secrets.VITE_ANTHROPIC_API_KEY }}

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

>  La clé API Anthropic a été ajoutée dans **Settings → Secrets → Actions** de mon repo GitHub sous le nom `VITE_ANTHROPIC_API_KEY`. Ne jamais la committer dans le code.

---

##  Prompts documentés

**Prompt système du chatbot :**

```
Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.
Ton ton : professionnel mais chaleureux, passionné d'histoire, toujours enthousiaste
sans être trop familier, expertise en voyage temporel (fictif mais crédible).
Tu connais parfaitement :
- Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle)
- Crétacé -65M (dinosaures, nature préhistorique)
- Florence 1504 (Renaissance, art, Michel-Ange)
Tu peux suggérer des destinations selon les intérêts du client.
```

**Prompt de génération du code de base (Claude Code / VS Code) :**

```
[CONTEXT]
Tu interviens sur un projet étudiant M1/M2 Digital & IA (Ynov Campus Paris 2025/2026), réalisé en solo. Le projet est une webapp interactive pour TimeTravel Agency, une agence de voyage temporel fictive de luxe proposant 3 destinations : Paris 1889 (Belle Époque), Crétacé –65M (préhistoire) et Florence 1504 (Renaissance). Stack : React + Tailwind CSS, déployé sur GitHub Pages via GitHub Actions.

[OBJECTIVE]
Génère l'intégralité du code source de la webapp avec : une landing page immersive (hero section avec vidéo de fond `public/assets/videos/hero-bg.mp4`), une galerie de 3 destinations avec cards interactives (vidéos et images dans `public/assets/`), un widget chatbot IA flottant connecté à l'API Anthropic (`claude-sonnet-4-6`) avec le prompt système TimeTravel Agency, un quiz de recommandation personnalisée en 4 questions dont le résultat est généré par l'IA, et un formulaire de réservation fictif. Le fichier `.github/workflows/deploy.yml` doit automatiser le build et le déploiement sur GitHub Pages.

[STYLE]
React avec composants fonctionnels et hooks. Fichiers séparés : `Hero.jsx`, `DestinationCard.jsx`, `ChatWidget.jsx`, `Quiz.jsx`, `BookingForm.jsx`. Tailwind CSS pour les styles. Framer Motion pour les animations (fade-in au scroll, hover sur les cards, transitions 0.6–0.8s easing naturel). Design dark mode, accents dorés (#D4A017), ambiance premium et cinématique.

[TONE]
Code propre, lisible et commenté. Clé API via variable d'environnement `VITE_ANTHROPIC_API_KEY` uniquement, jamais en dur. Lazy loading sur les vidéos et images. `.env.local` listé dans `.gitignore`.

[AUDIENCE]
Développeur solo utilisant Claude Code dans VS Code. Le code doit être directement exécutable après `npm install` et configuration du `.env.local`.

[RESPONSE]
Les assets sont déjà placés dans `public/assets/` selon cette structure :

public/assets/
├── images/
│   ├── paris/
│   │   ├── paris-hero-1.jpg
│   │   ├── paris-hero-2.jpg
│   │   └── paris-hero-3.jpg
│   ├── cretace/
│   │   ├── cretace-hero-1.jpg
│   │   ├── cretace-hero-2.jpg
│   │   └── cretace-hero-3.jpg
│   └── florence/
│       ├── florence-hero-1.jpg
│       ├── florence-hero-2.jpg
│       └── florence-hero-3.jpg
├── videos/
│   ├── hero-bg.mp4
│   ├── paris-bg.mp4
│   ├── cretace-bg.mp4
│   ├── florence-bg.mp4
│   └── timetravel-reel.mp4
└── audio/
    ├── maya-voiceover.mp3
    └── skyline-runway.mp3

Utilise ces chemins exacts dans le code. Livre tous les fichiers complets et prêts à l'emploi, dans cet ordre :
1. `package.json`
2. `vite.config.js`
3. `index.html`
4. `src/App.jsx`
5. `src/main.jsx`
6. `src/components/Hero.jsx`
7. `src/components/DestinationCard.jsx`
8. `src/components/ChatWidget.jsx`
9. `src/components/Quiz.jsx`
10. `src/components/BookingForm.jsx`
11. `.github/workflows/deploy.yml`
12. `.gitignore`

Chaque fichier doit être livré intégralement, sans placeholder ni TODO.
```

---

##  Réflexion sur le processus

Ce projet a été réalisé en solo en combinant deux phases distinctes : une campagne marketing complète générée avec des outils IA (Projet 1), puis une webapp interactive construite par vibe coding (Projet 2).

**Workflow Projet 1 — Campagne marketing (2h)**

Chaque phase a utilisé un outil spécialisé : Runway pour les images et les vidéos, Suno pour la musique, CapCut pour l'assemblage. Cette combinaison a permis de produire en 2 heures un niveau de rendu qui aurait nécessité plusieurs jours avec des outils traditionnels.

**Workflow Projet 2 — Webapp (vibe coding)**

Génération rapide d'une base fonctionnelle via prompt, puis itérations successives pour affiner le design et intégrer les assets du Projet 1. L'IA a été utilisée à toutes les étapes : génération de code, intégration du chatbot, quiz de recommandation.

**Principaux enseignements**

- Fixer le style visuel dès le départ évite les retours en arrière coûteux en temps
- Préparer tous les prompts à l'avance avant de lancer les générations
- Générer les assets en parallèle (plusieurs onglets) pour optimiser les temps d'attente IA
- Un MVP fonctionnel vaut mieux que des features incomplètes
- Le principal défi reste le temps de génération IA (2–4 min par asset) qui s'accumule sur un projet multi-livrables

---

##  Crédits & licences

- Images des destinations : générées avec **Runway** — template prompt cinématique (Projet 1)
- Vidéos de fond : générées avec **Runway** — image-to-video, mouvements de caméra cinématiques (Projet 1)
- Voix over : générée avec **Runway** — voix française Maya, ton chaud et posé (Projet 1)
- Musique de fond : générée avec **Suno** — style orchestral cinématique, Hans Zimmer style (Projet 1)
- Montage & assemblage : réalisé avec **CapCut** (Projet 1)
- Code : généré avec **Claude Code** (extension VS Code)
- Agent conversationnel : **Anthropic API** (`claude-sonnet-4-6`)
- Animations : Framer Motion (MIT) / AOS (MIT)
- Design inspiré de : Awwwards, Dribbble

> Projet pédagogique — M1/M2 Digital & IA — Ynov Campus Paris 2025/2026
