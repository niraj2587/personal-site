export default function Footer() {
  return (
    <footer className="py-8 border-t border-slate-800/60">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Niraj Desai
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:mail@nirajjd.com"
            className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
          >
            mail@nirajjd.com
          </a>
          <a
            href="https://linkedin.com/in/nirajjd"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-100 text-sm transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}
