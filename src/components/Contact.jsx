import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-violet-400 text-center mb-4">
        Contact Me
      </h2>

      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
        I'm currently looking for internship and software development
        opportunities. Feel free to connect with me through any of the
        platforms below.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Email */}
        <a
          href="mailto:SakshiShewale1706@gmail.com"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-violet-500 hover:-translate-y-2 transition duration-300"
        >
          <FaEnvelope className="text-4xl text-violet-400 mb-4" />

          <h3 className="text-xl font-semibold mb-2">
            Email
          </h3>

          <p className="text-slate-400 text-sm break-all">
            SakshiShewale1706@gmail.com
          </p>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sakshi-shewale05"
          target="_blank"
          rel="noreferrer"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-violet-500 hover:-translate-y-2 transition duration-300"
        >
          <FaLinkedin className="text-4xl text-violet-400 mb-4" />

          <h3 className="text-xl font-semibold mb-2">
            LinkedIn
          </h3>

          <p className="text-slate-400 text-sm">
            Connect Professionally
          </p>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/sakshishewale01"
          target="_blank"
          rel="noreferrer"
          className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-violet-500 hover:-translate-y-2 transition duration-300"
        >
          <FaGithub className="text-4xl text-violet-400 mb-4" />

          <h3 className="text-xl font-semibold mb-2">
            GitHub
          </h3>

          <p className="text-slate-400 text-sm">
            View My Projects
          </p>
        </a>

        {/* Location */}
        <div
          className="bg-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-violet-500 hover:-translate-y-2 transition duration-300"
        >
          <FaMapMarkerAlt className="text-4xl text-violet-400 mb-4" />

          <h3 className="text-xl font-semibold mb-2">
            Location
          </h3>

          <p className="text-slate-400 text-sm">
            Maharashtra, India
          </p>
        </div>

      </div>

      {/* CTA Section */}

      <div className="mt-16 bg-gradient-to-r from-violet-900/40 to-slate-900 border border-violet-500 rounded-3xl p-10 text-center">

        <h3 className="text-3xl font-bold mb-4">
          Let's Build Something Amazing Together
        </h3>

        <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
          Whether it's an internship opportunity, collaboration,
          project discussion, or networking, I'd love to connect
          and explore new possibilities.
        </p>

        <a
          href="mailto:SakshiShewale1706@gmail.com"
          className="inline-block bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-xl font-semibold transition"
        >
          Get In Touch
        </a>

      </div>
    </section>
  );
}