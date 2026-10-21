# Standing Rules for Sakshi's Portfolio Website

These rules govern all architectural, design, and implementation decisions across all future development steps for this repository.

---

### Rule 1: Centralized Data-Driven Content (No Hardcoded Strings)
- All copy, project descriptions, skills, experience achievements, metrics, URLs, and personal details **MUST** reside exclusively in the files under `src/data/`:
  - `src/data/profile.js`
  - `src/data/projects.js`
  - `src/data/experience.js`
  - `src/data/skills.js`
- **Zero hardcoded content in JSX**. UI components must act as pure visual presenters consuming structured data props or importing from `src/data/`.

---

### Rule 2: Accessibility & Reduced-Motion Enforcement
- **Every animation and transition** must respect user OS accessibility preferences (`prefers-reduced-motion`).
- Always consume motion presets from `src/lib/motion.js` or query the `useReducedMotion()` hook.
- When `prefers-reduced-motion` is active:
  - Collapse translate/scale transforms to 0.
  - Set transition durations to minimal or 0.
  - Bypass Lenis smooth scroll interception to preserve native scrolling behavior.

---

### Rule 3: Atomic, Focused, and Reusable Components
- Keep components small, single-purpose, and modular.
- Complex sections must be broken down into composable subcomponents.
- UI elements must extend the primitives in `src/components/ui/` (`Button`, `Badge`, `Card`, `Section`) rather than re-implementing ad-hoc containers or styles.

---

### Rule 4: Mobile-First Responsive Design
- Design from mobile viewport widths upwards (320px -> 640px -> 768px -> 1024px -> 1280px).
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- Utilize fluid typography with `clamp()` defined in `tailwind.config.js` (`text-fluid-h1`, `text-fluid-h2`, `text-fluid-body`) to eliminate jarring breakpoint jumps.

---

### Rule 5: Semantic HTML & Accessibility (a11y)
- Use standard semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- Every section must contain a structured heading hierarchy (`<h1>` on page, `<h2>` for sections, `<h3>` for cards).
- All interactive elements must have:
  - Visible focus indicators (`focus-visible:ring-2 focus-visible:ring-accent`).
  - `aria-label` on icon-only buttons or external links.
  - Explicit `target="_blank"` with `rel="noopener noreferrer"`.

---

### Rule 6: Dependency Freeze
- **No new third-party dependencies** may be added to `package.json` without explicit approval from the user.
- Utilize the approved stack only:
  - React 18
  - Tailwind CSS v3
  - Framer Motion
  - Lenis
  - React Router v6
  - Lucide React
  - Native browser APIs
