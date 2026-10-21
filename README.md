# Sakshi Shewale — Personal Portfolio Architecture

A dark-first personal portfolio website engineered with **React 18**, **Tailwind CSS v3**, **Framer Motion**, **Lenis**, and **Lucide React**.

Designed for computer engineering and AI/ML candidate showcases targeting top-tier software and AI engineering roles.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Open in your browser
http://localhost:5173
```

To create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## 🛠️ Technology Stack (Free & Open Source Only)

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime & UI** | React 18 | Declarative component model & concurrent features |
| **Build Engine** | Vite 5 | Instant Hot Module Replacement (HMR) & ES module builds |
| **Styling** | Tailwind CSS v3 + CSS Vars | Atomic design tokens, responsive fluid typography (`clamp()`) |
| **Smooth Scroll** | Lenis | Hardware-accelerated decoupled momentum scrolling |
| **Motion** | Framer Motion | Declarative animations with `prefers-reduced-motion` compliance |
| **Routing** | React Router v6 | Dynamic routing (`/`, `/projects/:slug`, `*`) |
| **Icons** | Lucide React | Lightweight SVG icon system |
| **Typography** | Google Fonts | Space Grotesk (Headings), Inter (Body), JetBrains Mono (Code) |

---

## 📁 Architecture & File Breakdown (Learning Guide)

This codebase is organized following modern frontend software engineering principles. Below is an educational breakdown of every directory and file created:

```text
sakshi-portfolio/
├── .agent/rules/portfolio.md          # Architectural constraints and standing rules
├── .agents/rules/portfolio.md         # Mirrored workspace rules
├── index.html                         # Entry HTML with preconnected Google Fonts & meta SEO
├── tailwind.config.js                 # Custom design tokens, fluid typography, and radii
├── postcss.config.js                  # PostCSS pipeline for Tailwind & Autoprefixer
├── package.json                       # Core dependencies and scripts
├── src/
│   ├── main.jsx                       # React DOM root entry point
│   ├── App.jsx                        # App shell: Router, Lenis provider, ambient grid overlay
│   │
│   ├── styles/
│   │   └── index.css                  # CSS custom properties, grid/noise classes, Lenis rules
│   │
│   ├── lib/
│   │   ├── utils.js                   # Class merging utility (clsx + tailwind-merge)
│   │   └── motion.js                  # Framer Motion animation variants respecting reduced motion
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.js        # Listener for OS prefers-reduced-motion setting
│   │   ├── useMousePosition.js        # Global cursor coordinate tracker
│   │   └── useScrollProgress.js       # Window scroll position and progress calculator
│   │
│   ├── data/                          # ZERO hardcoded copy in JSX: Single Source of Truth
│   │   ├── profile.js                 # Personal details, bio, and social links
│   │   ├── projects.js                # 5 projects (Socio3, TeamFlow, FlowGrid, BolDB, CampusConnect)
│   │   ├── experience.js              # Professional history (Cisco AI/ML internship)
│   │   └── skills.js                  # Grouped technical competencies (AI/ML, Backend, Frontend, Tools)
│   │
│   ├── components/
│   │   ├── ui/                        # Reusable atomic primitives
│   │   │   ├── Button.jsx             # Primary (violet glow) & ghost variants with focus states
│   │   │   ├── Badge.jsx              # Status and tech pill with optional pulsing dot
│   │   │   ├── Card.jsx               # Interactive card with cursor-following border glow
│   │   │   └── Section.jsx            # Semantic <section> wrapper with label, title & subtitle
│   │   └── layout/
│   │       ├── Navbar.jsx             # Sticky glassmorphism header with mobile menu
│   │       ├── Footer.jsx             # Global footer with live social links
│   │       └── PageTransition.jsx     # Route transition container
│   │
│   ├── sections/                      # Stubs for modular page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   └── Contact.jsx
│   │
│   └── pages/
│       ├── Home.jsx                   # Design System Preview & interactive token testbed
│       ├── ProjectDetail.jsx          # Dynamic project case study route (/projects/:slug)
│       └── NotFound.jsx               # 404 fallback page
```

---

## 💡 Key Architectural Concepts

### 1. The Single Accent Color Rule
Rather than using generic rainbow palettes, the interface is anchored around **one vibrant accent** (`#7C5CFF` — Electric Violet) set against deep obsidian shades (`#0A0A0B` and `#111113`). This creates an authoritative, high-contrast aesthetic standard in modern developer tools.

### 2. Cursor-Following Glow (`Card.jsx`)
Modern interfaces (such as Linear and Vercel) feel tactile because they respond to input before clicks occur. `Card.jsx` tracks `(clientX, clientY)` relative to its bounding box and projects an electric violet spotlight along the card's 1px border using CSS `radial-gradient` and mask composites.

### 3. Accessibility-First Motion (`motion.js` & `useReducedMotion.js`)
Animations create delight but can trigger vestibular disorders for sensitive users. The motion presets in `src/lib/motion.js` dynamically inspect `prefers-reduced-motion` and collapse transforms when necessary, ensuring the site meets WCAG accessibility guidelines.

### 4. Zero Hardcoded Data in JSX
All content lives in `src/data/*.js`. When updating your bio, adding new internship achievements, or showcasing a new project, you edit pure JavaScript data objects without risking breaking JSX layouts or styling.
