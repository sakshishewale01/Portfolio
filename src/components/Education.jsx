export default function Education() {
  const education = [
    {
      institute: "MIT Academy of Engineering",
      degree: "Bachelor of Technology - Computer Engineering",
      year: "Aug 2024 – Jun 2028",
      grade: "CGPA: 8.88",
    },
    {
      institute: "Shri T.N. Raundal College, Bhendi",
      degree: "Higher Secondary Certificate (HSC)",
      year: "Jun 2023 – Mar 2024",
      grade: "85.60%",
    },
    {
      institute: "Janata Vidyalaya, Khamkheda",
      degree: "Secondary School Certificate (SSC)",
      year: "Jun 2021 – Apr 2022",
      grade: "95%",
    },
  ];

  return (
    <section
      id="education"
      className="max-w-6xl mx-auto px-6 py-20"
    >
      <h2 className="text-4xl font-bold text-violet-400 mb-10">
        Education
      </h2>

      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={index}
            className="bg-slate-900 p-6 rounded-xl border border-slate-700"
          >
            <h3 className="text-2xl font-semibold">
              {item.institute}
            </h3>

            <p className="text-violet-300 mt-2">
              {item.degree}
            </p>

            <p className="text-slate-400">
              {item.year}
            </p>

            <p className="text-green-400 font-medium mt-2">
              {item.grade}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}