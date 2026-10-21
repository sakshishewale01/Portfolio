/**
 * Profile & Personal Information for Sakshi
 */
export const profile = {
  name: "Sakshi",
  fullName: "Sakshi Shewale",
  monogram: "SS",
  role: "Software & AI/ML Engineer",
  title: "Computer Engineering B.Tech Student & Software Engineer",
  availability: "Open to AI / Software Roles • 2027",
  
  photo: {
    src: "/images/sakshi.jpg",
    alt: "Portrait of Sakshi",
    width: 600,
    height: 750,
  },

  rotatingRoles: [
    "AI Systems Engineer",
    "Full-Stack Developer",
    "Distributed Systems Builder",
    "Algorithmic Problem Solver",
  ],
  tagline: "Architecting intelligent systems, distributed backend infrastructure, and fluid user experiences.",
  location: "Pune, India",
  resumeUrl: "/resume.pdf",
  bio: "Computer Engineering undergraduate focused on the intersection of modern software systems, scalable backends, and applied artificial intelligence. Passionate about engineering production-grade software that solves complex problems with elegance, speed, and precision.",
  
  about: {
    paragraphs: [
      "I am a final-year Computer Engineering undergraduate driven by a commitment to understand how modern computing systems scale from core algorithmic principles to high-throughput, fault-tolerant infrastructure.",
      "My engineering work bridges distributed backend systems and applied artificial intelligence. Whether optimizing machine learning pipelines for network telemetry anomaly detection during my internship at Cisco or architecting decentralized social protocols and embeddable storage engines, I build for low latency, reliability, and clean separation of concerns.",
      "I am looking for high-impact Software Engineering and AI/ML roles at forward-thinking engineering companies where I can contribute to mission-critical distributed systems, learn alongside high-caliber engineers, and ship robust software.",
    ],
    education: {
      institution: "Pune Institute of Computer Technology (PICT)",
      degree: "B.Tech in Computer Engineering",
      period: "2023 — 2027",
      location: "Pune, India",
      coursework: "Distributed Systems, Advanced Algorithms & Data Structures, Database Internals, Machine Learning, Operating Systems",
    },
    highlights: [
      {
        title: "AI/ML Intern at Cisco",
        subtitle: "Enterprise Telemetry",
        description: "Engineered time-series network failure classification models reducing false positive alerts by 28%.",
        metric: "Cisco Intern",
      },
      {
        title: "B.Tech Computer Engineering",
        subtitle: "PICT Pune",
        description: "Rigorous focus on distributed systems, operating system internals, and computational complexity.",
        metric: "Class of 2027",
      },
      {
        title: "5+ Systems Shipped",
        subtitle: "Full-Stack & Web3",
        description: "Engineered production apps spanning decentralized social platforms, workflow engines, and embedded B+ tree databases.",
        metric: "5 Systems",
      },
      {
        title: "450+ Algorithmic Challenges",
        subtitle: "LeetCode & CodeChef",
        description: "Extensive problem solving covering dynamic programming, graph theory, trees, and concurrency.",
        metric: "450+ Solved",
      },
    ],
  },

  codingProfiles: {
    github: {
      username: "sakshishewale01",
      profileUrl: "https://github.com/sakshishewale01",
      fallbackRepos: 18,
      fallbackFollowers: 24,
      fallbackStars: 15,
    },
    leetcode: {
      username: "sakshishewale",
      profileUrl: "https://leetcode.com/u/sakshishewale",
      solved: 450,
      easy: 160,
      medium: 240,
      hard: 50,
      rating: 1785,
      lastUpdated: "October 2026",
    },
    codechef: {
      username: "sakshishewale",
      profileUrl: "https://www.codechef.com/users/sakshishewale",
      rating: 1620,
      stars: "3★",
      globalRank: "Top 8%",
      lastUpdated: "October 2026",
    },
  },

  socials: {
    linkedin: "https://www.linkedin.com/in/sakshishewale",
    github: "https://github.com/sakshishewale01",
    leetcode: "https://leetcode.com/u/sakshishewale",
    codechef: "https://www.codechef.com/users/sakshishewale",
  },

  stats: [
    {
      label: "Projects Built",
      numericValue: 5,
      suffix: "+",
      description: "Full-stack & AI systems",
    },
    {
      label: "LeetCode Solved",
      numericValue: 450,
      suffix: "+",
      description: "Data structures & algorithms",
    },
    {
      label: "Industry Experience",
      numericValue: 1,
      suffix: " Internship",
      description: "AI/ML Intern at Cisco",
    },
  ],

  techMarquee: [
    "Python",
    "PyTorch",
    "React 18",
    "Node.js",
    "Docker",
    "Tailwind CSS",
    "FastAPI",
    "PostgreSQL",
    "C++",
    "Redis",
    "Solidity",
    "Git",
    "gRPC",
    "TypeScript",
  ],
}

/**
 * Site Navigation Links
 */
export const navLinks = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "projects", label: "Projects", href: "/#projects" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "contact", label: "Contact", href: "/#contact" },
]
