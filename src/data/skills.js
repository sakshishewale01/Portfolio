/**
 * Technical skills inventory and Bento Grid dataset
 * Grouped cleanly by comfort level ("Strong" & "Working knowledge")
 * Zero percentage bars or star ratings.
 */

export const skillsBento = {
  categories: [
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      iconName: "Cpu",
      colSpan: "lg:col-span-2",
      description: "Deep learning models, predictive telemetry analysis, and automated anomaly classification.",
      strong: [
        "Python",
        "PyTorch",
        "Scikit-Learn",
        "Pandas & NumPy",
        "Time-Series Anomaly Detection",
        "Model Evaluation Metrics",
      ],
      workingKnowledge: [
        "TensorFlow",
        "Computer Vision / CNNs",
        "HuggingFace Transformers",
        "MLOps & Docker Serving",
      ],
    },
    {
      id: "backend",
      title: "Backend & Systems",
      iconName: "Server",
      colSpan: "lg:col-span-2",
      description: "High-concurrency servers, resilient REST/gRPC APIs, transactional databases, and storage layout.",
      strong: [
        "Node.js",
        "Express.js",
        "FastAPI (Python)",
        "PostgreSQL",
        "REST APIs & JSON Schema",
        "Git Workflows",
      ],
      workingKnowledge: [
        "C / C++",
        "MongoDB",
        "Redis Caching",
        "gRPC & Protobuf",
        "Docker Containerization",
        "B+ Tree Storage Internals",
      ],
    },
    {
      id: "frontend",
      title: "Frontend Engineering",
      iconName: "Layout",
      colSpan: "lg:col-span-2",
      description: "Fluid web architectures, custom design systems, responsive layouts, and 60fps gesture interactions.",
      strong: [
        "React 18",
        "JavaScript (ES6+)",
        "Tailwind CSS v3",
        "HTML5 Semantic Architecture",
        "Component-Driven UI",
      ],
      workingKnowledge: [
        "Framer Motion",
        "Vite & Rollup",
        "WebSockets & Realtime Feeds",
        "Accessibility (WCAG & a11y)",
        "State Management",
      ],
    },
    {
      id: "tools",
      title: "Tools, DevOps & Cloud",
      iconName: "Terminal",
      colSpan: "lg:col-span-2",
      description: "Developer workflows, version control, container management, and continuous integration.",
      strong: [
        "Git & GitHub Workflows",
        "Linux CLI & Shell Scripting",
        "Postman & API Validation",
        "VS Code & Debugging",
      ],
      workingKnowledge: [
        "Docker Engine",
        "CI/CD Automation Pipelines",
        "Nginx Reverse Proxy",
        "Solidity & Web3 Tooling",
      ],
    },
  ],

  currentlyLearning: {
    title: "Currently Exploring",
    iconName: "Compass",
    tagline: "Active deep dives into systems engineering and model quantization",
    items: [
      { name: "Distributed Consensus (Raft)", tag: "Systems" },
      { name: "High-Concurrency Go Pipelines", tag: "Backend" },
      { name: "LLM Inference Quantization (GGUF)", tag: "AI/ML" },
      { name: "Linux eBPF Network Telemetry", tag: "Kernel" },
    ],
    note: "Deepening low-level performance engineering and sub-millisecond edge model latency.",
  },

  principles: [
    {
      title: "Clean Architecture & Modularity",
      summary: "Single-responsibility primitives, clear abstractions, and readable codebases that withstand team scale.",
      icon: "Boxes",
    },
    {
      title: "Low Latency & Efficiency",
      summary: "Optimized algorithmic time complexity, minimal memory overhead, zero unnecessary re-renders, and fast network round-trips.",
      icon: "Zap",
    },
    {
      title: "Pragmatic Shipping",
      summary: "Balancing engineering rigor with rapid iteration, delivering reliable solutions that create measurable real-world impact.",
      icon: "Flame",
    },
  ],
}

// Keep backward compatibility for other components that might import skillCategories
export const skillCategories = [
  {
    category: "AI / Machine Learning",
    description: "Deep learning models, predictive intelligence, and time-series pipelines",
    skills: [
      { name: "Python", level: "Advanced" },
      { name: "PyTorch", level: "Proficient" },
      { name: "Scikit-Learn", level: "Proficient" },
      { name: "Data Analysis & Pandas", level: "Proficient" },
    ],
  },
  {
    category: "Backend & Systems",
    description: "High-concurrency servers, resilient APIs, and transactional databases",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "FastAPI", level: "Proficient" },
      { name: "PostgreSQL", level: "Proficient" },
    ],
  },
  {
    category: "Frontend Development",
    description: "Modern, dynamic web architectures, reactive state, and fluid motion",
    skills: [
      { name: "React 18", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "JavaScript", level: "Advanced" },
      { name: "Framer Motion", level: "Proficient" },
    ],
  },
  {
    category: "Tools & DevOps",
    description: "Infrastructure orchestration, version control, and containerization",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Linux", level: "Proficient" },
      { name: "Docker", level: "Proficient" },
      { name: "Postman", level: "Proficient" },
    ],
  },
]
