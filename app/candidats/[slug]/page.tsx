import { getCandidateBySlug, candidatesData } from '@/lib/data'
import { getAnalyseBySlug } from '@/lib/analysesData'
import ScoreRadar from '@/components/ScoreRadar'
import AnalyseComplete from '@/components/AnalyseComplete'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return candidatesData.map((candidate) => ({
    slug: candidate.slug,
  }))
}

export default function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = getCandidateBySlug(params.slug)
  const analyseContent = getAnalyseBySlug(params.slug)

  if (!candidate) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block underline underline-offset-4">
            ← Retour au classement
          </Link>
          <div className="flex items-end justify-between mt-4">
            <h1 className="text-4xl font-light text-gray-900 tracking-tight">{candidate.name}</h1>
            <div className="text-right">
              <div className="text-5xl font-light text-gray-900">{candidate.globalScore}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Score Details */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Détail des critères</h2>
          <ScoreRadar scores={candidate.scores} />
        </div>

        {/* Strengths */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Points forts</h2>
          <ul className="space-y-4">
            {candidate.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-700 leading-relaxed">
                <span className="text-gray-400 mt-1">+</span>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="mb-16 pb-16 border-b border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Points faibles</h2>
          <ul className="space-y-4">
            {candidate.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start gap-4 text-gray-700 leading-relaxed">
                <span className="text-gray-400 mt-1">−</span>
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Problematic Measures */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Mesures nécessitant clarification</h2>
          <div className="space-y-4">
            {candidate.problematicMeasures.map((measure, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-6 py-2">
                <p className="text-gray-700 leading-relaxed">{measure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="bg-gray-50 border border-gray-200 p-8 mb-16">
          <h2 className="text-xl font-normal text-gray-900 mb-4">Synthèse</h2>
          <p className="text-gray-700 leading-relaxed">
            Le programme de {candidate.name} obtient une note globale de {candidate.globalScore}/10. 
            L'analyse révèle {candidate.globalScore >= 7 ? 'un programme globalement solide et bien structuré, avec une vision claire et des mesures concrètes.' : 
            candidate.globalScore >= 5.5 ? 'un programme présentant des aspects positifs mais également des lacunes importantes nécessitant des clarifications.' :
            'un programme nécessitant des améliorations significatives sur plusieurs critères fondamentaux pour être pleinement réalisable.'}.
          </p>
        </div>

        {/* Full Analysis */}
        {analyseContent && <AnalyseComplete content={analyseContent} />}
      </main>
    </div>
  )
}