import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Projects() {
  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-violet-400 text-center mb-4">
        Featured Project
      </h2>

      <p className="text-center text-slate-400 mb-12">
        A project focused on solving real challenges faced by college students.
      </p>

      <div
        className="
          bg-slate-900
          border border-slate-700
          rounded-3xl
          overflow-hidden
          hover:border-violet-500
          transition-all
          duration-300
          shadow-xl
        "
      >
        {/* Top Banner */}

        <div className="bg-gradient-to-r from-violet-700 to-purple-900 p-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            Peer Academic Exchange Platform
          </h3>

          <p className="text-slate-200 mt-3">
            Connecting students for note sharing, doubt solving,
            project collaboration, and skill exchange.
          </p>
        </div>

        {/* Content */}

        <div className="p-8">

          {/* Problem */}

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-violet-400 mb-3">
              Problem Statement
            </h4>

            <p className="text-slate-300 leading-8">
              Students often struggle to find quality notes,
              project teammates, study partners, and academic
              guidance within their college network. Valuable
              knowledge remains isolated among a few students,
              making collaboration difficult.
            </p>
          </div>

          {/* Features */}

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-violet-400 mb-4">
              Key Features
            </h4>

            <div className="grid md:grid-cols-2 gap-4">

              <div className="bg-slate-800 p-4 rounded-xl">
                📚 Note Sharing System
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                ❓ Doubt Discussion Forum
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                🤝 Project Collaboration
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                🎯 Skill Exchange Network
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                👤 Student Profiles
              </div>

              <div className="bg-slate-800 p-4 rounded-xl">
                🔐 Authentication & Security
              </div>

            </div>
          </div>

          {/* Tech Stack */}

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-violet-400 mb-4">
              Tech Stack
            </h4>

            <div className="flex flex-wrap gap-3">

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                React.js
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Node.js
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Express.js
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                MongoDB
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Tailwind CSS
              </span>

            </div>
          </div>

          {/* Future Scope */}

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-violet-400 mb-3">
              Future Scope
            </h4>

            <p className="text-slate-300 leading-8">
              AI-powered doubt solving, recommendation systems,
              internship matching, event management, real-time
              chat, and cross-college academic collaboration.
            </p>
          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4">

            <a
              href="https://github.com/sakshishewale01"
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-2
                bg-violet-600
                hover:bg-violet-700
                px-6 py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              <FaGithub />
              View Code
            </a>

            <a
              href="#"
              className="
                flex items-center gap-2
                border border-violet-500
                hover:bg-violet-500
                px-6 py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              <FaExternalLinkAlt />
              Live Demo
            </a>

          </div>

        </div>
      </div>
    </section>
  );
}