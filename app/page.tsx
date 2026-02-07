import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
import Link from 'next/link'

export default function HomePage() {
  // Sort candidates by global score descending
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)

  // Calculate stats
  const avgScore = (candidatesData.reduce((sum, c) => sum + c.globalScore, 0) / candidatesData.length).toFixed(1)
  const topScore = sortedCandidates[0]
  const criteriaMeans = {
    coherence: (candidatesData.reduce((s, c) => s + c.scores.coherence, 0) / candidatesData.length).toFixed(1),
    solidite: (candidatesData.reduce((s, c) => s + c.scores.solidite, 0) / candidatesData.length).toFixed(1),
    robustesse: (candidatesData.reduce((s, c) => s + c.scores.robustesse, 0) / candidatesData.length).toFixed(1),
    pragmatisme: (candidatesData.reduce((s, c) => s + c.scores.pragmatisme, 0) / candidatesData.length).toFixed(1),
    detail: (candidatesData.reduce((s, c) => s + c.scores.detail, 0) / candidatesData.length).toFixed(1),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Paris 2026 : Analyse IA
                </h1>
              </div>
              <p className="text-cyan-200/70 text-sm">Évaluation objective des programmes électoraux</p>
            </div>
            <Link 
              href="/methodologie"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20 backdrop-blur-sm"
            >
              Méthodologie
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-cyan-400 text-sm font-medium mb-2">Score moyen</div>
            <div className="text-5xl font-bold text-white mb-1">{avgScore}<span className="text-2xl text-white/50">/10</span></div>
            <div className="text-white/60 text-sm">Sur {candidatesData.length} candidats analysés</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30">
            <div className="text-green-300 text-sm font-medium mb-2">Meilleur programme</div>
            <div className="text-2xl font-bold text-white mb-1">{topScore.name}</div>
            <div className="text-3xl font-bold text-green-400">{topScore.globalScore}/10</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-purple-300 text-sm font-medium mb-2">Critère le plus fort (moyenne)</div>
            <div className="text-white text-lg font-semibold">
              {Object.entries(criteriaMeans).reduce((a, b) => parseFloat(a[1]) > parseFloat(b[1]) ? a : b)[0]}
            </div>
            <div className="text-3xl font-bold text-purple-400">
              {Object.entries(criteriaMeans).reduce((a, b) => parseFloat(a[1]) > parseFloat(b[1]) ? a : b)[1]}/10
            </div>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 mb-12 border border-blue-400/30">
          <h2 className="text-2xl font-bold text-white mb-4">
            🎯 Analyse 100% objective
          </h2>
          <p className="text-white/80 leading-relaxed text-lg mb-4">
            L'intelligence artificielle a analysé les programmes des 6 principaux candidats à la mairie de Paris 
            selon <span className="text-cyan-400 font-semibold">5 critères objectifs</span> : cohérence, solidité, robustesse, pragmatisme et niveau de détail.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
            <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
              <div className="text-xs text-white/60 mb-1">Cohérence</div>
              <div className="text-lg font-bold text-cyan-400">{criteriaMeans.coherence}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
              <div className="text-xs text-white/60 mb-1">Solidité</div>
              <div className="text-lg font-bold text-cyan-400">{criteriaMeans.solidite}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
              <div className="text-xs text-white/60 mb-1">Robustesse</div>
              <div className="text-lg font-bold text-cyan-400">{criteriaMeans.robustesse}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
              <div className="text-xs text-white/60 mb-1">Pragmatisme</div>
              <div className="text-lg font-bold text-cyan-400">{criteriaMeans.pragmatisme}</div>
            </div>
            <div className="bg-black/30 rounded-lg p-3 text-center border border-white/10">
              <div className="text-xs text-white/60 mb-1">Détail</div>
              <div className="text-lg font-bold text-cyan-400">{criteriaMeans.detail}</div>
            </div>
          </div>
        </div>

        {/* Ranking Title */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">📊 Classement des candidats</h2>
          <p className="text-white/60">Cliquez sur une carte pour voir l'analyse complète</p>
        </div>

        {/* Ranking Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {sortedCandidates.map((candidate, index) => (
            <CandidateCard 
              key={candidate.slug} 
              candidate={candidate} 
              rank={index + 1} 
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center text-sm text-white/60">
            <p className="mb-2">
              Analyse réalisée par IA sur la base des programmes officiels des candidats.
            </p>
            <p>
              Aucune affiliation politique. Méthodologie transparente et reproductible.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}