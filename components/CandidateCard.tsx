import Link from 'next/link'
import { Candidate } from '@/types/candidate'

interface CandidateCardProps {
  candidate: Candidate
  rank: number
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const getScoreGradient = (score: number) => {
    if (score >= 7) return 'from-green-500 to-emerald-500'
    if (score >= 5.5) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getBorderColor = (score: number) => {
    if (score >= 7) return 'border-green-400/50'
    if (score >= 5.5) return 'border-yellow-400/50'
    return 'border-red-400/50'
  }

  const getRankEmoji = (rank: number) => {
    const emojis = ['🥇', '🥈', '🥉']
    return emojis[rank - 1] || `#${rank}`
  }

  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 cursor-pointer border ${getBorderColor(candidate.globalScore)} hover:bg-white/20 transition-all hover:scale-[1.02] group`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{getRankEmoji(rank)}</span>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{candidate.name}</h3>
              <p className="text-xs text-white/50 mt-1">{candidate.problematicMeasures.length} mesures analysées</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-r ${getScoreGradient(candidate.globalScore)} shadow-lg`}>
            {candidate.globalScore}<span className="text-sm opacity-70">/10</span>
          </div>
        </div>
        
        {/* Mini scores bar */}
        <div className="mb-4 bg-black/30 rounded-lg p-3 border border-white/10">
          <div className="flex justify-between text-xs text-white/60 mb-2">
            <span>Détail des critères</span>
          </div>
          <div className="flex gap-2">
            {[
              { label: 'Coh', value: candidate.scores.coherence },
              { label: 'Sol', value: candidate.scores.solidite },
              { label: 'Rob', value: candidate.scores.robustesse },
              { label: 'Prag', value: candidate.scores.pragmatisme },
              { label: 'Dét', value: candidate.scores.detail }
            ].map((item, idx) => (
              <div key={idx} className="flex-1">
                <div className="text-xs text-white/70 mb-1 text-center">{item.label}</div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${getScoreGradient(item.value)}`}
                    style={{ width: `${(item.value / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-orange-300 mb-2">⚠️ Points de vigilance :</p>
            <div className="flex flex-wrap gap-2">
              {candidate.problematicMeasures.slice(0, 2).map((measure, index) => (
                <span key={index} className="inline-block bg-orange-500/20 text-orange-200 text-xs px-3 py-1 rounded-full border border-orange-400/30">
                  {measure.length > 45 ? measure.substring(0, 45) + '...' : measure}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-end pt-2">
            <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300 flex items-center gap-1">
              Voir l'analyse complète 
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}