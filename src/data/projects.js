/**
 * Comprehensive projects portfolio dataset for case studies & filterable showcase
 * Flagship: Socio3 (Web3 social network)
 */
export const projects = [
  {
    slug: "socio3",
    title: "Socio3",
    tagline: "Decentralized Web3 social network empowering user data sovereignty and verifiable micro-interactions.",
    category: "Web3",
    role: "Full-Stack & Web3 Lead",
    timeline: "3 Months • 2024",
    featured: true,
    image: "/projects/socio3.svg",
    screenshots: [
      "/projects/socio3.svg",
      "/projects/teamflow.svg",
      "/projects/flowgrid.svg",
    ],
    tech: ["React", "Ethereum", "Solidity", "IPFS", "Tailwind CSS", "Ethers.js"],
    githubUrl: "https://github.com/sakshishewale01/socio3",
    liveUrl: "https://socio3.demo.app",

    problem: "Traditional social networks silo user data in centralized relational databases, expose user content to arbitrary censorship, and extract economic value from creator networks without cryptographic attribution or ownership guarantees.",

    solution: "Engineered Socio3 as an open, censorship-resistant social architecture where user identities are self-sovereign Ethereum accounts, media assets are pinned cryptographically to IPFS, and interactions are attested on-chain.",

    architecture: "A decoupled stack featuring Solidity smart contracts for on-chain identity minting, gasless transaction relays implementing EIP-712 meta-transactions to eliminate gas friction for onboarding users, and a lightweight reactive client built with React and Ethers.js.",

    highlights: [
      "Engineered ERC-721 smart contracts supporting decentralized profile minting and on-chain engagement attestations.",
      "Integrated decentralized storage via IPFS for media assets with sub-second retrieval times through dedicated gateway pinning.",
      "Architected gas-efficient transaction relays allowing seamless onboarding for Web2 users without requiring initial ETH balances.",
    ],

    challenges: [
      {
        title: "Gas Optimization on Layer 1",
        description: "Initial post-interaction calls exceeded sustainable gas limits. Solved by moving high-frequency micro-attestations into compressed EIP-712 off-chain signatures verified in batches.",
      },
      {
        title: "IPFS Gateway Latency",
        description: "Public IPFS gateways occasionally caused multi-second image retrieval lag. Addressed by implementing local multi-tier caching with optimistic UI state updates.",
      },
    ],

    outcomes: [
      { label: "Gas Savings", value: "TODO: add metric", note: "Compared to standard per-interaction smart contract mints" },
      { label: "Media Retrieval", value: "< 400ms", note: "Average IPFS asset load time across test gateways" },
      { label: "Transaction Success", value: "TODO: add metric", note: "Meta-transaction relay completion rate" },
    ],
  },

  {
    slug: "teamflow",
    title: "TeamFlow",
    tagline: "Real-time collaborative project workspace with live kanban, sprint telemetry, and async workflows.",
    category: "Full-Stack",
    role: "Full-Stack Developer",
    timeline: "2 Months • 2024",
    featured: false,
    image: "/projects/teamflow.svg",
    screenshots: [
      "/projects/teamflow.svg",
      "/projects/socio3.svg",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/sakshishewale01/teamflow",
    liveUrl: "https://teamflow.demo.app",

    problem: "Remote software engineering teams lose velocity when project management tools lack sub-second multiplayer state synchronization, leading to merge conflicts in task priority and disjointed sprint reviews.",

    solution: "Built a multiplayer engineering workspace featuring full-duplex WebSocket channels for concurrent drag-and-drop board updates, role-based security barriers, and live burn-down chart calculation.",

    architecture: "Event-driven architecture using Node.js and Socket.IO for room-based broadcast messaging, paired with MongoDB compound indexes and atomic updates to ensure deterministic task ordering under concurrent drag operations.",

    highlights: [
      "Implemented low-latency WebSocket communication engine for multiplayer drag-and-drop board state with conflict resolution.",
      "Designed compound access-control hierarchies for organizations, teams, and individual contributors.",
      "Developed interactive burn-down charts and sprint velocity analyzers that update in real-time.",
    ],

    challenges: [
      {
        title: "Race Conditions in Card Reordering",
        description: "Concurrent dragging by multiple users resulted in out-of-order column indexes. Solved by implementing fractional index ordering (LexoRank algorithm).",
      },
      {
        title: "Socket Connection Drops",
        description: "Handled network dropouts with automatic exponential backoff reconnection and client-side pending queue synchronization.",
      },
    ],

    outcomes: [
      { label: "Sync Latency", value: "< 60ms", note: "Multiplayer card movement propagation over WebSockets" },
      { label: "Concurrent Editors", value: "TODO: add metric", note: "Simulated simultaneous drag-and-drop clients per board" },
      { label: "Test Coverage", value: "TODO: add metric", note: "Unit and integration tests across WebSocket events" },
    ],
  },

  {
    slug: "flowgrid",
    title: "FlowGrid",
    tagline: "Distributed workflow automation engine orchestrating complex microservice event pipelines.",
    category: "AI",
    role: "Systems & Backend Architect",
    timeline: "2.5 Months • 2024",
    featured: false,
    image: "/projects/flowgrid.svg",
    screenshots: [
      "/projects/flowgrid.svg",
      "/projects/boldb.svg",
    ],
    tech: ["Go", "React", "gRPC", "Docker", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/sakshishewale01/flowgrid",
    liveUrl: "https://flowgrid.demo.app",

    problem: "Complex machine learning ingestion pipelines and microservice workflows fail unpredictably when orchestrators lack deterministic cycle detection, task retry idempotency, and fine-grained distributed health telemetry.",

    solution: "Developed an asynchronous directed acyclic graph (DAG) workflow orchestrator in Go that validates dependency topological sorts, executes tasks via high-performance gRPC channels, and handles node failover automatically.",

    architecture: "Go concurrent worker pools communicating via Protocol Buffers / gRPC, backed by PostgreSQL for transactional task state and Docker containerization for sandboxed worker execution.",

    highlights: [
      "Built a directed acyclic graph (DAG) scheduler capable of processing parallel task dependencies with Kahn's topological sort.",
      "Implemented heartbeat health-checking and automatic task retry policies with exponential backoff and dead-letter queues.",
      "Designed a real-time reactive graph dashboard visualizing pipeline telemetry, node latencies, and execution logs.",
    ],

    challenges: [
      {
        title: "Deadlock Prevention in Cyclic Graphs",
        description: "Engineered strict compile-time cycle detection validating DAG topology before scheduling any executable worker routine.",
      },
      {
        title: "Worker Crash Recovery",
        description: "Implemented a heartbeat lease mechanism where unresponsive workers release lock ownership to standby nodes after a configurable timeout.",
      },
    ],

    outcomes: [
      { label: "Throughput", value: "10k+ Tasks/min", note: "Processed concurrently across worker pools" },
      { label: "Failover Recovery", value: "< 2.5s", note: "Deadlock-free task reassignment upon worker SIGTERM" },
      { label: "gRPC RPC Latency", value: "TODO: add metric", note: "Average node-to-node dispatch round-trip" },
    ],
  },

  {
    slug: "boldb",
    title: "BolDB",
    tagline: "Lightweight, embedded key-value document store with ACID compliance and B+ tree indexing.",
    category: "Full-Stack",
    role: "Systems Engineer",
    timeline: "2 Months • 2024",
    featured: false,
    image: "/projects/boldb.svg",
    screenshots: [
      "/projects/boldb.svg",
      "/projects/flowgrid.svg",
    ],
    tech: ["C++", "Storage Systems", "Data Structures", "B+ Trees", "Linux"],
    githubUrl: "https://github.com/sakshishewale01/boldb",
    liveUrl: "https://boldb.demo.app",

    problem: "Application developers requiring fast local persistence often face heavyweight database processes that introduce significant operational overhead and slow cold-start read performance.",

    solution: "Designed and implemented BolDB: an embedded, in-process C++ key-value database engine featuring page-aligned disk storage, B+ tree indexing for logarithmic point and range queries, and crash safety via write-ahead logging (WAL).",

    architecture: "Memory-mapped I/O (`mmap`) page buffer management coupled with an append-only commit log (WAL) and slotted page layout on disk, ensuring strict ACID transaction compliance.",

    highlights: [
      "Designed custom 4096-byte page disk layout with B+ tree indexing supporting logarithmic point searches and fast range scans.",
      "Engineered write-ahead logging (WAL) ensuring zero data corruption across simulated unexpected process termination (`kill -9`).",
      "Benchmarked memory-mapped access achieving over 250,000 read operations per second on commodity hardware.",
    ],

    challenges: [
      {
        title: "B+ Tree Node Split & Merge Concurrency",
        description: "Balancing internal nodes during concurrent mutations required fine-grained page latching to prevent write lock starvation.",
      },
      {
        title: "Memory-Mapped Consistency",
        description: "Ensured `msync` calls were executed deterministically during commit boundaries to guarantee non-volatile durability.",
      },
    ],

    outcomes: [
      { label: "Point Queries", value: "250k+ ops/sec", note: "Benchmarked on multi-threaded read workloads" },
      { label: "Crash Recovery", value: "100%", note: "Zero corrupt pages detected across crash fuzz testing" },
      { label: "Binary Footprint", value: "TODO: add metric", note: "Minimal static library size without runtime bloat" },
    ],
  },

  {
    slug: "campusconnect",
    title: "CampusConnect",
    tagline: "Unified university portal connecting students, clubs, and placement drives in real-time.",
    category: "AI",
    role: "Backend & API Engineer",
    timeline: "2 Months • 2024",
    featured: false,
    image: "/projects/campusconnect.svg",
    screenshots: [
      "/projects/campusconnect.svg",
      "/projects/teamflow.svg",
    ],
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "Redis", "Tailwind CSS"],
    githubUrl: "https://github.com/sakshishewale01/campusconnect",
    liveUrl: "https://campusconnect.demo.app",

    problem: "University departments, student organizations, and corporate placement recruitment cell announcements are typically fragmented across messaging groups and bulletin boards, causing missed deadlines and information loss.",

    solution: "Architected a unified campus notification and recruitment ecosystem featuring role-based authentication, Redis Pub/Sub broadcast queues, and asynchronous FastAPI backend microservices.",

    architecture: "FastAPI asynchronous service architecture utilizing PostgreSQL for relational data consistency, Redis for token revocation and broadcast push queues, and responsive React frontend.",

    highlights: [
      "Architected clean REST APIs in FastAPI with JWT authentication and role-based permissions for students, coordinators, and recruiters.",
      "Implemented Redis-backed message queues for instantaneous recruitment alert broadcasts to 10,000+ registered student devices.",
      "Scaled test infrastructure to handle 10,000+ simulated concurrent requests during mock placements.",
    ],

    challenges: [
      {
        title: "High Concurrency Spikes During Placements",
        description: "Sudden surges in concurrent requests during placement announcement releases caused database connection exhaustion. Solved by introducing Redis caching layers and connection pooling.",
      },
      {
        title: "Granular Role Security",
        description: "Implemented compound RBAC decorators ensuring only verified department heads can publish official placement schedules.",
      },
    ],

    outcomes: [
      { label: "Broadcast Latency", value: "< 150ms", note: "Push delivery to 10,000+ subscribed student sessions" },
      { label: "Concurrent Capacity", value: "TODO: add metric", note: "Load-tested requests handled without dropouts" },
      { label: "API Response Time", value: "< 35ms", note: "Average P95 latency on cached announcement endpoints" },
    ],
  },
]
