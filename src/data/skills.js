/**
 * Technical skills inventory for Sakshi's Portfolio
 * Honest, realistic, and tailored for early-career software engineering opportunities.
 * Organised into 6 meaningful engineering categories.
 */

export const skillsBento = {
  categories: [
    {
      id: "programming-languages",
      title: "Programming Languages & Core CS",
      iconName: "Code2",
      description: "Primary languages for algorithmic problem solving, software logic, and computer science foundations.",
      skills: [
        {
          name: "C++",
          status: "Practising",
          note: "Primary language for daily algorithmic problem solving, Striver A2Z sheet, and LeetCode",
        },
        {
          name: "Python",
          status: "Used in projects",
          note: "Backend APIs with FastAPI & Flask, data manipulation, and applied ML pipelines",
        },
        {
          name: "Java",
          status: "Familiar with",
          note: "Object-oriented programming coursework, inheritance, interfaces, and core concepts",
        },
        {
          name: "Data Structures & Algorithms",
          status: "Practising",
          note: "Arrays, two pointers, trees, graphs, and dynamic programming patterns",
        },
        {
          name: "Object-Oriented Programming (OOP)",
          status: "Familiar with",
          note: "Polymorphism, abstraction, encapsulation, modular class design, and clean code",
        },
      ],
    },
    {
      id: "frontend-dev",
      title: "Frontend Development",
      iconName: "Layout",
      description: "Modern component-driven interfaces, responsive layout systems, and interactive state management.",
      skills: [
        {
          name: "React",
          status: "Used in projects",
          note: "Functional components, custom hooks, context, state management, and lifecycle patterns",
        },
        {
          name: "JavaScript (ES6+)",
          status: "Used in projects",
          note: "Async/await, closures, promises, array methods, and modern ECMAScript standards",
        },
        {
          name: "Tailwind CSS",
          status: "Used in projects",
          note: "Utility-first design tokens, dark themes, responsive layouts, and custom animations",
        },
        {
          name: "HTML5 & Semantic Web",
          status: "Used in projects",
          note: "Accessible document trees, ARIA attributes, forms, and SEO best practices",
        },
        {
          name: "CSS3 / Modern CSS",
          status: "Used in projects",
          note: "CSS Grid, Flexbox, responsive typography clamp, and GPU-accelerated keyframe animations",
        },
      ],
    },
    {
      id: "backend-dev",
      title: "Backend Development & APIs",
      iconName: "Server",
      description: "RESTful API engineering, authentication systems, and server architectures.",
      skills: [
        {
          name: "FastAPI",
          status: "Used in projects",
          note: "High-performance Python asynchronous APIs with Pydantic schemas in FlowGrid",
        },
        {
          name: "Flask",
          status: "Used in projects",
          note: "Modular routing, Jinja2 integration, and session management in Conference Review System",
        },
        {
          name: "RESTful API Design",
          status: "Used in projects",
          note: "Resource modeling, HTTP status codes, structured JSON payloads, and CRUD endpoints",
        },
        {
          name: "Authentication & RBAC",
          status: "Used in projects",
          note: "Role-based access control, session validation, and Supabase auth workflows",
        },
      ],
    },
    {
      id: "databases-storage",
      title: "Databases & Storage",
      iconName: "Database",
      description: "Relational database schema modeling, queries, data integrity, and cloud persistence.",
      skills: [
        {
          name: "PostgreSQL",
          status: "Used in projects",
          note: "Relational modeling, foreign keys, indexes, and queries in FlowGrid & TeamFlow",
        },
        {
          name: "MySQL",
          status: "Used in projects",
          note: "Academic and project schema modeling, multi-table joins, and referential integrity",
        },
        {
          name: "Supabase",
          status: "Used in projects",
          note: "PostgreSQL hosting, realtime table change listeners, and auth tables in TeamFlow",
        },
        {
          name: "SQLAlchemy / ORM",
          status: "Used in projects",
          note: "Declarative model mapping, migrations, and relationship cascading in FastAPI",
        },
      ],
    },
    {
      id: "applied-ai-data",
      title: "AI/ML & Data",
      iconName: "Cpu",
      description: "Applied machine learning workflows, predictive modeling, and interactive telemetry dashboards.",
      skills: [
        {
          name: "Scikit-learn",
          status: "Used in projects",
          note: "Regression, classification, feature preprocessing, and delay estimation in FlowGrid",
        },
        {
          name: "Machine Learning Foundations",
          status: "Currently learning",
          note: "Supervised learning models, train/test splitting, cross-validation, and metrics",
        },
        {
          name: "Streamlit",
          status: "Used in projects",
          note: "Rapid interactive dashboards and diagnostic inspection tools built in NetSage AI",
        },
        {
          name: "Data Preprocessing",
          status: "Used in projects",
          note: "Feature scaling, missing value imputation, categorical encoding, and tabular data prep",
        },
      ],
    },
    {
      id: "tools-devops",
      title: "Developer Tools & Cloud",
      iconName: "Terminal",
      description: "Version control, container basics, cloud deployment, and engineering tooling.",
      skills: [
        {
          name: "Git & GitHub",
          status: "Used in projects",
          note: "Branch management, pull requests, conventional commits, and open-source collaboration",
        },
        {
          name: "Docker Basics",
          status: "Currently learning",
          note: "Containerization concepts, Dockerfiles, and local service configuration",
        },
        {
          name: "Vite & Modern Tooling",
          status: "Used in projects",
          note: "Fast dev servers, chunking, build optimizations, and PostCSS / Tailwind pipelines",
        },
        {
          name: "Vercel Deployment",
          status: "Used in projects",
          note: "Client-side routing configurations, continuous deployment hooks, and production hosting",
        },
      ],
    },
  ],

  currentFocus: {
    title: "CURRENT ENGINEERING FOCUS",
    command: "sakshi --focus",
    fields: [
      { key: "focus", value: "C++ Algorithmic Problem Solving & DSA" },
      { key: "practice_sheet", value: "Striver A2Z DSA Sheet + LeetCode Daily" },
      { key: "building", value: "FlowGrid (FastAPI + ML) & TeamFlow (Supabase)" },
      { key: "education", value: "Third-Year B.Tech CSE at MIT AOE, Pune" },
      { key: "target", value: "Software Engineering Internships (2027 Opportunities)" },
    ],
  },

  constellation: [
    {
      id: "react-supabase",
      source: "React",
      target: "Supabase",
      description: "Realtime WebSockets ↔ Component State (TeamFlow)",
      category: "Frontend/Backend",
    },
    {
      id: "fastapi-postgres",
      source: "FastAPI",
      target: "PostgreSQL",
      description: "Pydantic Schemas ↔ Relational Storage (FlowGrid)",
      category: "Backend/Database",
    },
    {
      id: "scikit-fastapi",
      source: "Scikit-learn",
      target: "FastAPI",
      description: "Delay Prediction Model ↔ REST Inference Endpoint",
      category: "AI/Backend",
    },
    {
      id: "cpp-dsa",
      source: "C++",
      target: "Algorithms",
      description: "Striver A2Z Practice ↔ Time & Space Complexity",
      category: "Problem Solving",
    },
  ],
}

// Backward compatibility for DesignPreview page
export const skillCategories = skillsBento.categories.map((c) => ({
  category: c.title,
  description: c.description,
  skills: c.skills.map((s) => ({
    name: s.name,
    level: s.status,
  })),
}))

