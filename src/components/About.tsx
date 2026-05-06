import { useReveal } from '../hooks/useReveal'

const cards = [
  { label: 'Current Role', value: 'Principal SWE @ Salesforce' },
  { label: 'Focus', value: 'Distributed Systems & AI' },
  { label: 'Location', value: 'San Francisco Bay Area' },
  { label: 'Education', value: 'MS Bioinformatics, NJIT' },
]

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="py-28 max-w-6xl mx-auto px-6">
      <div ref={ref} className="section-reveal grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-400 text-xs font-mono tracking-[0.2em] uppercase mb-4">About</p>
          <h2 className="text-4xl font-bold text-slate-100 mb-6 leading-tight">
            Building systems at<br />the edge of scale
          </h2>
          <p className="text-slate-400 leading-relaxed mb-5">
            Principal Software Engineer with 13+ years building enterprise-scale distributed systems,
            high-throughput data pipelines, and cloud infrastructure. Currently at Salesforce leading
            engineering on two platforms that collectively handle some of the largest monitoring
            workloads in the industry.
          </p>
          <p className="text-slate-400 leading-relaxed">
            My work lives at the intersection of infrastructure and intelligence — designing systems
            that don't just scale, but get smarter. From building Salesforce's first LLM-native
            observability service to architecting petabyte-scale log federation, I focus on the hard
            problems where correctness and performance both matter.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors"
            >
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-2">{card.label}</p>
              <p className="text-slate-200 font-semibold text-sm">{card.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
