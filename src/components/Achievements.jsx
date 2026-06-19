import ideathon1 from "../assets/ideathon1.jpg";
import ideathon2 from "../assets/ideathon2.jpg";
import ideathon3 from "../assets/ideathon3.jpg";

export default function Achievements() {
  const photos = [ideathon1, ideathon2, ideathon3];

  return (
    <section
      id="achievements"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      {/* Heading */}

      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-violet-400 mb-4">
          Achievements
        </h2>

        <p className="text-slate-400 max-w-3xl mx-auto">
          A showcase of academic and technical accomplishments that
          reflect my passion for innovation, technology, and
          problem-solving.
        </p>
      </div>

      {/* Main Achievement Card */}

      <div
        className="
          bg-slate-900
          border border-slate-700
          rounded-3xl
          overflow-hidden
          hover:border-violet-500
          transition-all
          duration-300
          shadow-2xl
        "
      >
        {/* Banner */}

        <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 p-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white">
            🏆 Trust AI Ideathon Finalist
          </h3>

          <p className="text-slate-200 mt-3">
            Recognized among the top teams for presenting an
            innovative AI-driven solution to solve real-world
            challenges.
          </p>
        </div>

        {/* Content */}

        <div className="p-8">

          {/* Description */}

          <div className="mb-10">
            <h4 className="text-2xl font-semibold text-violet-400 mb-4">
              Achievement Overview
            </h4>

            <p className="text-slate-300 leading-8">
              Successfully reached the Final Round of an Trust AI Ideathon
              competition by developing and presenting an innovative
              technology solution. The competition involved idea
              validation, AI-driven problem solving, teamwork,
              presentation skills, and interaction with judges and
              industry experts.
            </p>
          </div>

          {/* Skills Demonstrated */}

          <div className="mb-10">
            <h4 className="text-2xl font-semibold text-violet-400 mb-4">
              Skills Demonstrated
            </h4>

            <div className="flex flex-wrap gap-3">
              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Artificial Intelligence
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Innovation
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Problem Solving
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Team Collaboration
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Presentation Skills
              </span>

              <span className="bg-violet-600 px-4 py-2 rounded-full">
                Critical Thinking
              </span>
            </div>
          </div>

          {/* Photo Gallery */}

          <div>
            <h4 className="text-2xl font-semibold text-violet-400 mb-6">
              Event Gallery
            </h4>

            <div className="grid md:grid-cols-3 gap-6">

              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="
                    overflow-hidden
                    rounded-2xl
                    border border-slate-700
                    hover:border-violet-500
                    transition-all
                    duration-300
                    group
                  "
                >
                  <img
                    src={photo}
                    alt={`Ideathon ${index + 1}`}
                    className="
                      w-full
                      h-72
                      object-cover
                      group-hover:scale-110
                      transition-all
                      duration-500
                    "
                  />
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* Additional Achievement Stats */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-violet-400">
            Finalist
          </h3>
          <p className="text-slate-400 mt-2">
            AI Ideathon Competition
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-violet-400">
            AI
          </h3>
          <p className="text-slate-400 mt-2">
            Innovation Focus
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-violet-400">
            Team
          </h3>
          <p className="text-slate-400 mt-2">
            Collaborative Solution
          </p>
        </div>

      </div>
    </section>
  );
}