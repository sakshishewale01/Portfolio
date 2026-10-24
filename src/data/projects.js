/**
 * Centralized Projects Dataset for Sakshi's Portfolio
 * Clean, realistic, and honest projects for an aspiring software engineer.
 * Each project includes problem statements, actual implementation details,
 * verified GitHub repository and Live Demo links where available.
 */
export const projects = [
  {
    slug: "flowgrid",
    title: "FlowGrid",
    tagline: "Smart logistics management platform with ML delay prediction",
    category: "Full-Stack + ML",
    status: "In Progress",
    accent: "#10B981",
    featured: true,
    myRole: "Full-Stack & Backend Developer",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01",
    liveUrl: null, // Actively in development, no fake demo URL
    problem:
      "Modern supply chain operations frequently encounter transit delays, fragmented driver-warehouse handoffs, and lack of predictive foresight for bottlenecked shipments.",
    solution:
      "Constructed a centralized logistics platform pairing FastAPI backend services with PostgreSQL for inventory tracking, driver assignments, and a Scikit-learn predictive model that computes expected delay probabilities before dispatch.",
    description:
      "A smart logistics platform tracking multi-hub warehouses, inventory levels, driver assignments, and shipment lifecycles with an integrated delay-prediction model.",
    whatItDoes:
      "Provides dispatch coordinators with real-time tracking of packages across origin, sorting relays, and delivery destinations, pairing operational CRUD workflows with an applied machine learning model that estimates shipment delays based on distance, weather, and transit variables.",
    architecture:
      "FastAPI RESTful API handling CRUD endpoints and Pydantic validation -> SQLAlchemy ORM layer -> PostgreSQL relational database. React client dashboard with interactive routing map and delay forecasting telemetry.",
    highlights: [
      "Designed FastAPI RESTful backend service with Pydantic schema validation and PostgreSQL persistence",
      "Integrated Scikit-learn predictive model estimating delivery delays from route and transit features",
      "Engineered relational database schema tracking multi-hub inventory, drivers, and shipment status transitions",
      "Implemented role-based permissions separating fleet coordinators, warehouse managers, and drivers",
    ],
    challenges: [
      "Structuring relational schema for multi-hub package transfers with strict foreign key constraints and status states.",
      "Feature engineering transit duration, route distance, and hub congestion variables to train a lightweight delay estimator.",
    ],
    outcomes: [
      "Engineered 12+ API endpoints for driver, warehouse, and shipment lifecycle management.",
      "Implemented end-to-end delay estimation pipeline providing real-time risk scores on dispatch creation.",
    ],
    tech: ["FastAPI", "React", "PostgreSQL", "Python", "Scikit-learn", "SQLAlchemy", "Docker"],
  },
  {
    slug: "teamflow",
    title: "TeamFlow",
    tagline: "Collaborative team workspace with real-time Kanban boards",
    category: "Full-Stack",
    status: "Live",
    accent: "#06B6D4",
    featured: true,
    myRole: "Frontend & Full-Stack Developer",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01/TeamFlow",
    liveUrl: "https://teamflow-lac-seven.vercel.app/",
    problem:
      "Small engineering and student teams often struggle with heavy, overly complex project management tools that slow down rapid sprint coordination and task status updates.",
    solution:
      "Built a streamlined collaborative workspace featuring real-time Kanban boards, instant status synchronization via Supabase channels, and role-based board permissions.",
    description:
      "A responsive, full-stack collaborative workspace allowing teams to organize projects, assign tasks, and track sprints in real time with Supabase.",
    whatItDoes:
      "Allows team members to create project boards, manage task columns (To Do, In Progress, Done), assign team collaborators, configure priority tags, and observe instant board updates through real-time database subscriptions.",
    architecture:
      "React SPA built with Vite and Tailwind CSS -> Supabase Realtime WebSocket client -> Hosted PostgreSQL tables with Row Level Security policies.",
    highlights: [
      "Engineered real-time Kanban task management board utilizing Supabase live websocket subscriptions",
      "Integrated secure authentication with role-based member permissions across shared workspace boards",
      "Built clean, responsive UI with Tailwind CSS, custom task filtering, and optimistic state updates",
      "Deployed production client on Vercel with automated continuous deployment from GitHub",
    ],
    challenges: [
      "Managing real-time state synchronization across concurrent active users without race conditions on drag-and-drop operations.",
      "Configuring role-based access rules (Admin, Member, Viewer) with Supabase Auth to ensure secure board isolation.",
    ],
    outcomes: [
      "Created responsive Kanban workflow with instant board synchronization and optimistic UI updates.",
      "Successfully deployed and actively hosted on Vercel with automated continuous deployment.",
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "JavaScript"],
  },
  {
    slug: "conference-flow",
    title: "Conference Review Management System",
    tagline: "Academic paper submission and peer review workflow system",
    category: "Full-Stack",
    status: "Code Ready",
    accent: "#8B5CF6",
    featured: false,
    myRole: "Backend Developer",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01/conference-review-system",
    liveUrl: null,
    problem:
      "Managing academic conference submissions, reviewer assignments, double-blind reviews, and final acceptance decisions manually causes review bottlenecks and tracking errors.",
    solution:
      "Engineered a Flask and MySQL web system that separates author, reviewer, and conference chair workflows with structured evaluation criteria.",
    description:
      "A web platform streamlining the academic conference review lifecycle with dedicated portals for authors, reviewers, and conference chairs.",
    whatItDoes:
      "Automates the academic paper review process: authors submit manuscripts, conference chairs assign papers to qualified reviewers based on track topics, reviewers submit rubric-scored evaluations, and chairs render acceptance decisions.",
    architecture:
      "Python Flask server with Jinja2 templates and REST routes -> MySQL relational database with foreign keys connecting papers, tracks, reviewers, and evaluations.",
    highlights: [
      "Developed modular Flask backend architecture with Jinja2 templating and REST routing",
      "Architected relational MySQL database schema ensuring referential integrity across submissions, reviews, and users",
      "Created triple-role access control separating Author, Reviewer, and Conference Chair permissions",
      "Implemented structured review rubric scoring and paper acceptance decision pipeline",
    ],
    challenges: [
      "Enforcing double-blind review protocols so reviewers cannot see author identities or conflicting track submissions.",
      "Designing normalized MySQL tables to handle multi-reviewer assignments per paper and aggregate scores.",
    ],
    outcomes: [
      "Delivered complete 3-role portal for manuscript submission, blind review scoring, and acceptance decisions.",
      "Implemented robust input sanitization, form validation, and relational integrity across all database tables.",
    ],
    tech: ["Python", "Flask", "MySQL", "Jinja2", "HTML/CSS", "JavaScript"],
  },
  {
    slug: "netsage-ai",
    title: "NetSage AI",
    tagline: "Network troubleshooting assistant with AI/ML diagnostic checks",
    category: "AI/ML",
    status: "Completed",
    accent: "#6366F1",
    featured: false,
    myRole: "AI/ML Intern (Cisco Virtual Internship)",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01",
    liveUrl: "https://nextsageaigit-cyqypcvuoisfvv8yfxbzvj.streamlit.app/",
    problem:
      "Diagnosing enterprise networking misconfigurations and packet routing anomalies in simulation topologies is time-consuming and prone to human diagnostic oversights.",
    solution:
      "Developed NetSage AI using Streamlit, Scikit-learn, and Cisco Packet Tracer data to automate diagnostic rule checks and provide interactive visual telemetry.",
    description:
      "Developed during Cisco AI/ML virtual internship to provide network-related telemetry analysis, rule checking, and interactive visualization via Streamlit.",
    whatItDoes:
      "Accepts network topology parameters and diagnostic logs, runs automated rule-based checks and predictive evaluations, and renders an interactive troubleshooting assistant dashboard for network engineers.",
    architecture:
      "Streamlit interactive frontend -> Python diagnostic engine evaluating deterministic routing rules and ML anomaly scoring -> Cisco Packet Tracer topology test cases.",
    highlights: [
      "Constructed interactive diagnostics interface with Streamlit for real-time rule inspection",
      "Conducted data preprocessing, feature normalization, and rule-evaluation pipelines for network events",
      "Simulated enterprise topologies and routing configurations in Cisco Packet Tracer",
    ],
    challenges: [
      "Translating complex network diagnostic rules into automated evaluation pipelines.",
      "Designing an intuitive web dashboard that highlights anomalies with clear troubleshooting recommendations.",
    ],
    outcomes: [
      "Built interactive network diagnostic assistant with real-time rule checks.",
      "Successfully presented prototype during Cisco AI/ML internship evaluation.",
    ],
    tech: ["Python", "Streamlit", "Scikit-learn", "Cisco Packet Tracer", "Git"],
  },
  {
    slug: "campushub",
    title: "CampusHub",
    tagline: "College event management and student coordination platform",
    category: "Web",
    status: "Live",
    accent: "#3B82F6",
    featured: false,
    myRole: "Full-Stack Developer",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01/CampusHub",
    liveUrl: "https://campushub-mitaoe.vercel.app/",
    problem:
      "Campus student announcements, club registrations, and hackathon schedules are often scattered across disparate chat groups and physical notice boards.",
    solution:
      "Created a centralized portal where students can discover upcoming college technical symposiums, register for club activities, receive event updates, and track participation schedules.",
    description:
      "A student-centric portal designed to centralize college event announcements, student club registrations, and campus updates.",
    whatItDoes:
      "Provides a single hub where students can discover upcoming college technical symposiums, register for club activities, receive event updates, and track participation schedules.",
    architecture:
      "React SPA frontend with Tailwind CSS -> Express.js REST API service -> MongoDB collections for events, clubs, and registrations.",
    highlights: [
      "Designed full-stack application with React frontend and Node.js / Express REST API services",
      "Integrated MongoDB database collections for event metadata, participant registrations, and club profiles",
      "Implemented responsive mobile-friendly layouts with clean event filtering and RSVP notifications",
    ],
    challenges: [
      "Handling concurrent event registrations and preventing duplicate sign-ups with unique index constraints.",
    ],
    outcomes: [
      "Centralized event discovery interface for campus student clubs with live deployment.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
  },
  {
    slug: "cineflix",
    title: "CineFlix",
    tagline: "Movie discovery application with trailers and watchlists",
    category: "Web",
    status: "Live",
    accent: "#EF4444",
    featured: false,
    myRole: "Frontend Developer",
    teamSize: null,
    githubUrl: "https://github.com/sakshishewale01",
    liveUrl: "https://teamflow-lac-seven.vercel.app/",
    problem:
      "Movie enthusiasts need a fast, distraction-free interface to browse trending titles, watch official trailers, and manage personal watchlists.",
    solution:
      "Engineered a responsive movie browsing web app featuring real-time search, TMDB API data, curated genre rows, and Firebase authentication.",
    description:
      "A responsive movie browsing web app featuring real-time search, TMDB API data, curated genre rows, and Firebase authentication.",
    whatItDoes:
      "Fetches real-time movie releases and high-definition media from TMDB API, enabling users to explore trending rows, watch trailer previews, and save favorites.",
    architecture:
      "React client with custom hooks -> TMDB REST API endpoints -> Firebase Authentication for personalized watchlist persistence.",
    highlights: [
      "Integrated TMDB REST API with custom caching and responsive image rendering",
      "Implemented Firebase authentication and user-specific watchlist storage",
      "Engineered animated carousel rows and modal trailer players with smooth transitions",
    ],
    challenges: [
      "Optimizing image loading and preventing cumulative layout shifts across dynamic movie poster grids.",
    ],
    outcomes: [
      "High-performance client browsing experience with fluid trailer playback modals.",
    ],
    tech: ["React", "Tailwind CSS", "Firebase", "TMDB API", "JavaScript"],
  },
]
