import Link from 'next/link'
import { Candidate } from '@/types/candidate'

interface CandidateCardProps {
  candidate: Candidate
  rank: number
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 7) return 'bg-green-100 text-green-800'
    if (score >= 5.5) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getRankEmoji = (rank: number) => {
    const emojis = ['🥇', '🥈', '🥉']
    return emojis[rank - 1] || `#${rank}`
  }

  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-400">{getRankEmoji(rank)}</span>
            <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
          </div>
          <div className={`px-3 py-1 rounded-full font-bold ${getScoreColor(candidate.globalScore)}`}>
            {candidate.globalScore}/10
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Exemples de mesures problématiques :</p>
            <div className="flex flex-wrap gap-2">
              {candidate.problematicMeasures.slice(0, 2).map((measure, index) => (
                <span key={index} className="inline-block bg-orange-50 text-orange-700 text-xs px-3 py-1 rounded-full">
                  {measure.length > 50 ? measure.substring(0, 50) + '...' : measure}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-end">
            <span className="text-blue-600 text-sm font-medium hover:text-blue-800">
              Voir l'analyse complète →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}