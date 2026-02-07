'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  const criteria = [
    { key: 'coherence', label: 'Cohérence', value: scores.coherence, emoji: '🧩' },
    { key: 'solidite', label: 'Solidité', value: scores.solidite, emoji: '🏗️' },
    { key: 'robustesse', label: 'Robustesse', value: scores.robustesse, emoji: '💪' },
    { key: 'pragmatisme', label: 'Pragmatisme', value: scores.pragmatisme, emoji: '⚙️' },
    { key: 'detail', label: 'Détail', value: scores.detail, emoji: '📝' }
  ]

  const getBarGradient = (score: number) => {
    if (score >= 7) return 'from-green-500 to-emerald-500'
    if (score >= 5.5) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  return (
    <div className="space-y-5">
      {criteria.map(criterion => (
        <div key={criterion.key} className="bg-black/20 rounded-xl p-4 border border-white/10">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{criterion.emoji}</span>
              <span className="text-sm font-medium text-white/90">{criterion.label}</span>
            </div>
            <span className="text-lg font-bold text-cyan-400">{criterion.value.toFixed(1)}<span className="text-sm text-white/50">/10</span></span>
          </div>
          <div className="relative">
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <div 
                className={`h-4 rounded-full bg-gradient-to-r ${getBarGradient(criterion.value)} transition-all duration-700 shadow-lg`}
                style={{ width: `${(criterion.value / 10) * 100}%` }}
              />
            </div>
            {/* Percentage label */}
            <div className="absolute -top-6 right-0 text-xs text-white/50">
              {Math.round((criterion.value / 10) * 100)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}