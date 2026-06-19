export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-violet-400">
          Sakshi.dev
        </h1>

        <ul className="hidden md:flex gap-6 text-slate-300">

          <li>
            <a href="#home" className="hover:text-violet-400">
              Home
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-violet-400">
              About
            </a>
          </li>

          <li>
            <a href="#education" className="hover:text-violet-400">
              Education
            </a>
          </li>

          <li>
            <a href="#skills" className="hover:text-violet-400">
              Skills
            </a>
          </li>

          <li>
            <a href="#projects" className="hover:text-violet-400">
              Projects
            </a>
          </li>

          <li>
            <a href="#achievements" className="hover:text-violet-400">
              Achievements
            </a>
          </li>

          <li>
            <a href="#certifications" className="hover:text-violet-400">
              Certifications
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-violet-400">
              Contact
            </a>
          </li>

        </ul>

      </div>
    </nav>
  );
}