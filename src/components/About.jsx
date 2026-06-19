export default function About() {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 py-20"
    >
      <h2 className="text-4xl font-bold text-violet-400 mb-8">
        About Me
      </h2>

      <div className="bg-slate-900 p-8 rounded-2xl border border-slate-700">
        <p className="text-slate-300 text-lg leading-8">
          I am <span className="text-violet-400 font-semibold">Sakshi Shewale</span>,
          a third-year B.Tech Computer Engineering student at
          <span className="text-violet-400 font-semibold">
            {" "}MIT Academy of Engineering
          </span>
          with a CGPA of <span className="text-green-400 font-semibold">8.88</span>.
          I am passionate about software development and continuously strive to
          strengthen my problem-solving and programming skills.
        </p>

        <p className="text-slate-300 text-lg leading-8 mt-6">
          My primary interests lie in
          <span className="text-violet-400 font-semibold">
            {" "}Full Stack Development, Data Structures & Algorithms,
            and Software Engineering
          </span>.
          I enjoy building practical applications that solve real-world problems
          and provide meaningful value to users.
        </p>

        <p className="text-slate-300 text-lg leading-8 mt-6">
          Currently, I am focused on mastering
          <span className="text-violet-400 font-semibold">
            {" "}React.js, Node.js, Express.js, MongoDB,
            and DSA in C++
          </span>,
          while working on projects that strengthen both my technical knowledge
          and development experience.
        </p>

        <p className="text-slate-300 text-lg leading-8 mt-6">
          My goal is to become a skilled Software Engineer and contribute to
          building scalable, impactful products while continuously learning and
          growing in the field of technology.
        </p>
      </div>
    </section>
  );
}