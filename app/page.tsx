import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
import Link from 'next/link'

export default function HomePage() {
  // Sort candidates by global score descending
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)

  // Calculate stats
  const avgScore = (candidatesData.reduce((sum, c) => sum + c.globalScore, 0) / candidatesData.length).toFixed(1)
  const criteriaMeans = {
    coherence: (candidatesData.reduce((s, c) => s + c.scores.coherence, 0) / candidatesData.length).toFixed(1),
    solidite: (candidatesData.reduce((s, c) => s + c.scores.solidite, 0) / candidatesData.length).toFixed(1),
    robustesse: (candidatesData.reduce((s, c) => s + c.scores.robustesse, 0) / candidatesData.length).toFixed(1),
    pragmatisme: (candidatesData.reduce((s, c) => s + c.scores.pragmatisme, 0) / candidatesData.length).toFixed(1),
    detail: (candidatesData.reduce((s, c) => s + c.scores.detail, 0) / candidatesData.length).toFixed(1),
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-light text-gray-900 mb-2 tracking-tight">
                Programmes Paris 2026
              </h1>
              <p className="text-gray-500 text-sm">Analyse algorithmique comparative</p>
            </div>
            <Link 
              href="/methodologie"
              className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
            >
              Méthodologie
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-16">
          <div className="bg-white p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Score moyen</div>
            <div className="text-5xl font-light text-gray-900">{avgScore}</div>
            <div className="text-xs text-gray-400 mt-2">/10</div>
          </div>
          <div className="bg-white p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Candidats</div>
            <div className="text-5xl font-light text-gray-900">{candidatesData.length}</div>
            <div className="text-xs text-gray-400 mt-2">analysés</div>
          </div>
          <div className="bg-white p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Critères</div>
            <div className="text-5xl font-light text-gray-900">5</div>
            <div className="text-xs text-gray-400 mt-2">objectifs</div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Méthodologie</h2>
          <p className="text-gray-700 leading-relaxed mb-6 max-w-3xl">
            Cette analyse évalue les programmes électoraux selon cinq critères quantifiables : 
            cohérence interne, solidité argumentative, robustesse face aux contraintes, pragmatisme 
            des propositions et niveau de détail opérationnel.
          </p>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Cohérence</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.coherence}</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Solidité</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.solidite}</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Robustesse</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.robustesse}</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Pragmatisme</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.pragmatisme}</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Détail</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.detail}</div>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Classement</h2>
          <div className="space-y-4">
            {sortedCandidates.map((candidate, index) => (
              <CandidateCard 
                key={candidate.slug} 
                candidate={candidate} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-12 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            Analyse réalisée par algorithme sur la base des programmes officiels publiés. 
            Aucune affiliation politique.
          </p>
        </footer>
      </main>
    </div>
  )
}