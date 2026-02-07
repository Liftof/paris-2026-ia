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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-16">
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
          <h2 className="text-2xl font-light text-gray-900 mb-6">À propos de cette analyse</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-4">Méthodologie</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                Cette analyse évalue les programmes électoraux selon cinq critères quantifiables établis par des spécialistes de la politique publique :
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  <span><strong>Cohérence interne :</strong> Articulation logique des propositions entre elles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  <span><strong>Solidité argumentative :</strong> Qualité des justifications et références</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  <span><strong>Robustesse budgétaire :</strong> Réalisme financier et sources de financement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  <span><strong>Pragmatisme :</strong> Faisabilité opérationnelle et calendrier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">→</span>
                  <span><strong>Niveau de détail :</strong> Précision des mesures et indicateurs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-4">Objectifs</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                Cette plateforme vise à fournir une analyse factuelle et non-partisane des programmes électoraux pour les élections municipales parisiennes de 2026.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600">
                <p className="mb-2"><strong>Indépendance :</strong> Aucune affiliation politique</p>
                <p className="mb-2"><strong>Transparence :</strong> Méthodologie publique et reproductible</p>
                <p className="mb-2"><strong>Sources :</strong> Programmes officiels publiés par les candidats</p>
                <p><strong>Mise à jour :</strong> Février 2026</p>
              </div>
            </div>
          </div>
          
          <h3 className="text-lg font-normal text-gray-900 mb-6">Scores moyens par critère</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Cohérence</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.coherence}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Solidité</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.solidite}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Robustesse</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.robustesse}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Pragmatisme</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.pragmatisme}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-xs text-gray-500 mb-2">Détail</div>
              <div className="text-2xl font-light text-gray-900">{criteriaMeans.detail}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
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