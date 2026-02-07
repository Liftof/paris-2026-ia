import { getCandidateBySlug, candidatesData } from '@/lib/data'
import ScoreRadar from '@/components/ScoreRadar'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return candidatesData.map((candidate) => ({
    slug: candidate.slug,
  }))
}

export default function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = getCandidateBySlug(params.slug)

  if (!candidate) {
    notFound()
  }

  const getScoreGradient = (score: number) => {
    if (score >= 7) return 'from-green-500 to-emerald-500'
    if (score >= 5.5) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-3 inline-flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour au classement
              </Link>
              <h1 className="text-4xl font-bold text-white mt-2">{candidate.name}</h1>
            </div>
            <div className={`px-6 py-3 rounded-2xl font-bold text-2xl text-white bg-gradient-to-r ${getScoreGradient(candidate.globalScore)} shadow-xl`}>
              {candidate.globalScore}<span className="text-lg opacity-70">/10</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Score Details */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              📊 Détail des critères
            </h2>
            <ScoreRadar scores={candidate.scores} />
          </div>

          {/* Strengths */}
          <div className="bg-green-500/10 backdrop-blur-md rounded-2xl p-8 border border-green-400/30">
            <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-2">
              ✓ Points forts
            </h2>
            <ul className="space-y-4">
              {candidate.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 bg-black/20 p-4 rounded-lg border border-green-400/20">
                  <span className="text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="text-white/90">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-red-500/10 backdrop-blur-md rounded-2xl p-8 border border-red-400/30">
            <h2 className="text-2xl font-bold text-red-300 mb-6 flex items-center gap-2">
              ✗ Points faibles
            </h2>
            <ul className="space-y-4">
              {candidate.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 bg-black/20 p-4 rounded-lg border border-red-400/20">
                  <span className="text-red-400 text-xl flex-shrink-0">✗</span>
                  <span className="text-white/90">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problematic Measures */}
          <div className="bg-orange-500/10 backdrop-blur-md rounded-2xl p-8 border border-orange-400/30">
            <h2 className="text-2xl font-bold text-orange-300 mb-6 flex items-center gap-2">
              ⚠️ Mesures problématiques
            </h2>
            <div className="space-y-4">
              {candidate.problematicMeasures.map((measure, index) => (
                <div key={index} className="bg-black/20 border-l-4 border-orange-400 p-4 rounded-lg">
                  <p className="text-white/90">{measure}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            🎯 Synthèse de l'analyse
          </h2>
          <p className="text-white/80 leading-relaxed text-lg">
            Le programme de <span className="text-cyan-400 font-semibold">{candidate.name}</span> obtient une note globale de <span className={`font-bold text-2xl bg-gradient-to-r ${getScoreGradient(candidate.globalScore)} bg-clip-text text-transparent`}>{candidate.globalScore}/10</span>. 
            L'analyse révèle {candidate.globalScore >= 7 ? 'un programme globalement solide et bien structuré, avec une vision claire et des mesures concrètes.' : 
            candidate.globalScore >= 5.5 ? 'un programme présentant des aspects positifs mais également des lacunes importantes nécessitant des clarifications.' :
            'un programme nécessitant des améliorations significatives sur plusieurs critères fondamentaux pour être pleinement réalisable.'}.
          </p>
        </div>
      </main>
    </div>
  )
}