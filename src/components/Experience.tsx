import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'

const companyColor: Record<string, string> = {
  Salesforce: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Oracle: 'bg-red-500/10 text-red-400 border-red-500/20',
  'E*TRADE': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Wells Fargo': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
}

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="py-28 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">Experience</p>
        <h2 className="text-4xl font-bold text-slate-100 mb-16">Work History</h2>

        <div ref={ref} className="section-reveal relative">
          {/* Timeline spine */}
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-slate-700/40 to-transparent" />

          <div className="space-y-10">
            {resume.experience.map((job, i) => (
              <div key={i} className="relative pl-12">
                {/* Dot */}
                <div className="absolute left-3 top-5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 ring-4 ring-blue-500/10" />

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all group">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100 mb-2 group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${
                            companyColor[job.company] ?? 'bg-slate-700/50 text-slate-400 border-slate-700'
                          }`}
                        >
                          {job.company}
                        </span>
                        <span className="text-xs text-slate-600">{job.team}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-mono text-slate-400">{job.period}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{job.location}</p>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {job.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                        <span className="text-blue-500 mt-1.5 shrink-0 text-xs">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
