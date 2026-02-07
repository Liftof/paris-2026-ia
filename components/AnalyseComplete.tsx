interface AnalyseCompleteProps {
  content: string
}

export default function AnalyseComplete({ content }: AnalyseCompleteProps) {
  return (
    <section className="panel-card p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Analyse complete</h2>
        <span className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">Version texte brute</span>
      </div>
      <pre className="playful-dash whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-700 bg-white/72 p-4 sm:p-6 overflow-x-auto">
        {content}
      </pre>
    </section>
  )
}
