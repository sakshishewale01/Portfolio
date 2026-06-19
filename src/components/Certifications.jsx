export default function Certifications() {
  const certifications = [
    "Python Programming",
    "Data Visualization using Tableau",
    "Web Development Fundamentals",
    "Git & GitHub",
    "Data Structures and Algorithms (In Progress)",
  ];

  return (
    <section
      id="certifications"
      className="max-w-6xl mx-auto px-6 py-20"
    >
      <h2 className="text-4xl font-bold text-violet-400 mb-10">
        Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-violet-500 transition"
          >
            📜 {cert}
          </div>
        ))}
      </div>
    </section>
  );
}