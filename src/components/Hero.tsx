const stats = [
  { value: '13+', label: 'Years Experience' },
  { value: 'B+', label: 'Datapoints / Min' },
  { value: 'PB+', label: 'Logs / Day' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <p className="text-blue-400 text-xs font-mono tracking-[0.25em] uppercase mb-8 opacity-80">
          San Francisco Bay Area
        </p>

        <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold tracking-tight mb-5 leading-none">
          <span className="bg-gradient-to-br from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Niraj
          </span>
          <br />
          <span className="bg-gradient-to-br from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            Desai
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 font-medium mb-2">
          Principal Software Engineer
        </p>
        <p className="text-sm md:text-base text-slate-400 mb-14 tracking-wide">
          Cloud Infrastructure · Distributed Systems · LLM-Native Observability
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 mb-14">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-1 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#experience"
            className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:scale-105 active:scale-100 motion-reduce:transition-none motion-reduce:hover:scale-100 shadow-lg shadow-blue-900/30"
          >
            View Experience
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-semibold transition-all"
          >
            Resume (PDF)
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-semibold transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow motion-reduce:animate-none">
        <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
