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

  const getScoreColor = (score: number) => {
    if (score >= 7) return 'bg-green-100 text-green-800'
    if (score >= 5.5) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
                ← Retour au classement
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold text-lg ${getScoreColor(candidate.globalScore)}`}>
              {candidate.globalScore}/10
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Score Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Détail des critères</h2>
            <ScoreRadar scores={candidate.scores} />
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Points forts</h2>
            <ul className="space-y-3">
              {candidate.strengths.map((strength, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2 mt-0.5">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Points faibles</h2>
            <ul className="space-y-3">
              {candidate.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2 mt-0.5">✗</span>
                  <span className="text-gray-700">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Problematic Measures */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mesures problématiques</h2>
            <div className="space-y-3">
              {candidate.problematicMeasures.map((measure, index) => (
                <div key={index} className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
                  <p className="text-gray-700">{measure}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Synthèse de l'analyse</h2>
          <p className="text-blue-800 leading-relaxed">
            Le programme de {candidate.name} obtient une note globale de {candidate.globalScore}/10. 
            L'analyse révèle {candidate.globalScore >= 7 ? 'un programme globalement solide et bien structuré' : 
            candidate.globalScore >= 5.5 ? 'un programme présentant des aspects positifs mais également des lacunes importantes' :
            'un programme nécessitant des améliorations significatives sur plusieurs critères fondamentaux'}.
          </p>
        </div>
      </main>
    </div>
  )
}