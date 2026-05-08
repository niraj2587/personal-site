import { useReveal } from '../hooks/useReveal'
import { resume } from '../data/resume'

export default function Projects() {
  const ref = useReveal()

  return (
    <section id="projects" className="py-28 bg-slate-900/20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">Projects</p>
        <h2 className="text-4xl font-bold text-slate-100 mb-16">Featured Work</h2>

        <div ref={ref} className="section-reveal grid md:grid-cols-2 gap-5">
          {resume.projects.map((project) => (
            <div
              key={project.name}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-blue-500/30 hover:bg-slate-900/80 transition-all group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 whitespace-nowrap">
                    {project.scale}
                  </span>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      aria-label={`View ${project.name} on GitHub`}
                    >
                      <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-1">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-500 border border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
