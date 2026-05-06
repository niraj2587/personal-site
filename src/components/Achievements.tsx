import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'

export default function Achievements() {
  const ref = useReveal()

  return (
    <section id="achievements" className="py-28 max-w-6xl mx-auto px-6">
      <p className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">Achievements</p>
      <h2 className="text-4xl font-bold text-slate-100 mb-16">Key Highlights</h2>

      <div ref={ref} className="section-reveal">
        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {resume.achievements.map((item, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                <span className="text-blue-400 font-bold text-sm font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-slate-100 font-semibold mb-2 text-sm">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
            Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {resume.education.map((edu, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex gap-4 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-slate-200 font-semibold text-sm mb-1">{edu.degree}</p>
                  <p className="text-slate-500 text-xs">
                    {edu.school} · {edu.year}
                  </p>
                  {edu.gpa && (
                    <p className="text-slate-600 text-xs mt-1">GPA: {edu.gpa}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
