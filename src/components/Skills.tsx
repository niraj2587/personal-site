import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'

const tagColors = [
  'bg-blue-500/10 text-blue-300 border-blue-500/20',
  'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  'bg-violet-500/10 text-violet-300 border-violet-500/20',
  'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  'bg-slate-700/50 text-slate-400 border-slate-700',
]

export default function Skills() {
  const ref = useReveal()

  return (
    <section id="skills" className="py-28 max-w-6xl mx-auto px-6">
      <p className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">Skills</p>
      <h2 className="text-4xl font-bold text-slate-100 mb-16">Technical Stack</h2>

      <div ref={ref} className="section-reveal space-y-10">
        {resume.skills.map((group, i) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className={`px-3.5 py-1.5 rounded-lg text-sm border font-medium transition-colors hover:brightness-125 ${tagColors[i % tagColors.length]}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
