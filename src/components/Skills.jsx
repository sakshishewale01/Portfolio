import {
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
} from "react-icons/fa";

export default function Skills() {
  const skills = [
    { name: "Java", icon: <FaJava /> },
    { name: "Python", icon: <FaPython /> },
    { name: "C++", icon: "💻" },
    { name: "React.js", icon: <FaReact /> },
    { name: "Node.js", icon: <FaNodeJs /> },
    { name: "MongoDB", icon: "🍃" },
    { name: "MySQL", icon: "🗄️" },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> },
    { name: "DSA", icon: "🧠" },
    { name: "OOP", icon: "⚙️" },
    { name: "Tailwind CSS", icon: "🎨" },
  ];

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-violet-400 text-center mb-4">
        Technical Skills
      </h2>

      <p className="text-slate-400 text-center mb-12">
        Technologies and tools I use to build software applications.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="
              bg-slate-900
              border
              border-slate-700
              rounded-2xl
              p-6
              text-center
              hover:border-violet-500
              hover:-translate-y-2
              transition-all
              duration-300
              shadow-lg
            "
          >
            <div className="text-4xl text-violet-400 mb-4 flex justify-center">
              {skill.icon}
            </div>

            <h3 className="font-medium">
              {skill.name}
            </h3>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-slate-900 border border-slate-700 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-violet-400 mb-4">
          Current Focus
        </h3>

        <p className="text-slate-300 leading-8">
          Currently focused on mastering Data Structures & Algorithms in C++,
          Full Stack Development using React.js and Node.js, and building
          impactful real-world projects that strengthen my software engineering
          skills.
        </p>
      </div>
    </section>
  );
}