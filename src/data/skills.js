/**
 * Technical skills inventory for Sakshi's Portfolio
 * Honest, realistic, and tailored for an aspiring software engineer.
 */

export const skillsBento = {
  categories: [
    {
      id: "programming-core",
      title: "Programming & Core CS",
      iconName: "Code2",
      description: "Core programming languages, algorithms, and object-oriented fundamentals.",
      skills: [
        {
          name: "C++",
          status: "Practising",
          note: "Primary language for daily problem solving and algorithmic analysis",
        },
        {
          name: "Java",
          status: "Familiar with",
          note: "Object-oriented programming coursework and core language principles",
        },
        {
          name: "Python",
          status: "Used in projects",
          note: "Backend APIs, data handling, scripting, and applied ML models",
        },
        {
          name: "Data Structures & Algorithms",
          status: "Practising",
          note: "Arrays, trees, graphs, dynamic programming on Striver A2Z & LeetCode",
        },
        {
          name: "Object-Oriented Programming",
          status: "Familiar with",
          note: "Inheritance, polymorphism, encapsulation, and modular class design",
        },
      ],
    },
    {
      id: "web-fullstack",
      title: "Web & Full-Stack",
      iconName: "Layout",
      description: "Frontend and full-stack tools used to build modern, responsive applications.",
      skills: [
        {
          name: "HTML",
          status: "Used in projects",
          note: "Semantic document structure and web accessibility standards",
        },
        {
          name: "CSS",
          status: "Used in projects",
          note: "Responsive layouts, Flexbox, Grid, and CSS transitions",
        },
        {
          name: "JavaScript",
          status: "Used in projects",
          note: "Modern ES6+ syntax, asynchronous programming, and DOM APIs",
        },
        {
          name: "React",
          status: "Used in projects",
          note: "Component-driven architecture, custom hooks, and state management",
        },
        {
          name: "Tailwind CSS",
          status: "Used in projects",
          note: "Design tokens, utility-first styling, and clean dark themes",
        },
      ],
    },
    {
      id: "backend-tools",
      title: "Backend & Developer Tools",
      iconName: "Server",
      description: "API development, database design, version control, and development workflows.",
      skills: [
        {
          name: "FastAPI",
          status: "Used in projects",
          note: "High-performance Python REST APIs with Pydantic validation",
        },
        {
          name: "PostgreSQL",
          status: "Used in projects",
          note: "Relational database schema modeling, queries, and migrations",
        },
        {
          name: "MySQL",
          status: "Used in projects",
          note: "Database management system coursework and structured queries",
        },
        {
          name: "Git and GitHub",
          status: "Used in projects",
          note: "Version control, branching strategies, and repository collaboration",
        },
        {
          name: "REST APIs",
          status: "Used in projects",
          note: "CRUD routing, client-server communication, and JSON payload handling",
        },
      ],
    },
    {
      id: "applied-ai-data",
      title: "Applied AI & Data",
      iconName: "Cpu",
      description: "Applied machine learning tools and exploratory data analysis workflows.",
      skills: [
        {
          name: "Scikit-learn",
          status: "Used in projects",
          note: "Classification, regression, and model evaluation workflows",
        },
        {
          name: "Streamlit",
          status: "Used in projects",
          note: "Rapid interactive web interfaces and network analysis dashboards",
        },
        {
          name: "Machine Learning",
          status: "Currently learning",
          note: "Supervised learning concepts, evaluation metrics, and model tuning",
        },
        {
          name: "Data preprocessing and feature engineering",
          status: "Used in projects",
          note: "Cleaning missing values, scaling features, and tabular preparation",
        },
      ],
    },
  ],

  currentFocus: {
    title: "CURRENT FOCUS",
    command: "sakshi --focus",
    fields: [
      { key: "current_focus", value: "C++ and DSA" },
      { key: "practice", value: "Striver A2Z" },
      { key: "building", value: "Full-stack and applied AI projects" },
      { key: "goal", value: "Software engineering internships in 2027" },
    ],
  },

  constellation: [
    {
      id: "react-js",
      source: "React",
      target: "JavaScript",
      description: "Component Architecture ↔ Modern ES6+",
      category: "Frontend",
    },
    {
      id: "fastapi-py",
      source: "FastAPI",
      target: "Python",
      description: "High-Performance APIs ↔ Python Ecosystem",
      category: "Backend",
    },
    {
      id: "postgres-backend",
      source: "PostgreSQL",
      target: "Backend Systems",
      description: "Relational Storage ↔ Data Persistence",
      category: "Data",
    },
    {
      id: "scikit-ml",
      source: "Scikit-learn",
      target: "Machine Learning",
      description: "Predictive Pipelines ↔ Applied AI",
      category: "AI",
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
