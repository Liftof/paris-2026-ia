interface AnalyseCompleteProps {
  content: string
}

export default function AnalyseComplete({ content }: AnalyseCompleteProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 p-8">
      <h2 className="text-2xl font-normal text-gray-900 mb-6">Analyse complète</h2>
      <div className="prose prose-sm max-w-none">
        <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-gray-700 bg-white p-6 border border-gray-200 overflow-x-auto">
{content}
        </pre>
      </div>
    </div>
  )
}
