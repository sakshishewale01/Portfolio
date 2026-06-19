import profile from "../assets/profile.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-6 md:px-12 py-24"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Left Section */}
        <div>

          <p className="text-violet-400 text-lg font-medium mb-3">
            Hello, I'm
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Sakshi Shewale
          </h1>

          <h2 className="text-2xl md:text-4xl font-semibold text-slate-300 mb-6">
            Aspiring Software Engineer
          </h2>

          <p className="text-slate-400 text-lg leading-8 max-w-xl">
            Third-Year B.Tech Computer Engineering student at
            <span className="text-violet-400 font-medium">
              {" "}MIT Academy of Engineering
            </span>
            {" "}with a CGPA of
            <span className="text-green-400 font-semibold">
              {" "}8.88
            </span>.
            Passionate about Full Stack Development, Data Structures &
            Algorithms, and building software solutions that solve
            real-world problems.
          </p>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4 mt-8">

            <a
  href="/Sakshi_Shewale_Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-xl font-semibold transition shadow-lg"
>
  📄 View Resume
</a>

            <a
              href="https://github.com/sakshishewale01"
              target="_blank"
              rel="noreferrer"
              className="border border-violet-500 hover:bg-violet-500 px-6 py-3 rounded-xl font-semibold transition"
            >
              💻 GitHub
            </a>

            <a
              href="#contact"
              className="border border-violet-500 hover:bg-violet-500 px-6 py-3 rounded-xl font-semibold transition"
            >
              📩 Contact
            </a>

          </div>

          {/* Quick Highlights */}

          <div className="flex flex-wrap gap-8 mt-12">

            

            

            

          </div>

        </div>

        {/* Right Section */}

        <div className="flex justify-center">

          <div className="relative">

            <div className="absolute inset-0 bg-violet-500 blur-3xl opacity-20 rounded-full"></div>

            <img
              src={profile}
              alt="Sakshi Shewale"
              className="relative w-72 h-72 md:w-96 md:h-96 object-cover rounded-full border-4 border-violet-500 shadow-2xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}