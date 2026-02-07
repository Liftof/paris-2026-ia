'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  // Simplified version - just show scores as bars
  const criteria = [
    { key: 'coherence', label: 'Cohérence', value: scores.coherence },
    { key: 'solidite', label: 'Solidité', value: scores.solidite },
    { key: 'robustesse', label: 'Robustesse', value: scores.robustesse },
    { key: 'pragmatisme', label: 'Pragmatisme', value: scores.pragmatisme },
    { key: 'detail', label: 'Détail', value: scores.detail }
  ]

  const getBarColor = (score: number) => {
    if (score >= 7) return 'bg-green-500'
    if (score >= 5.5) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-4">
      {criteria.map(criterion => (
        <div key={criterion.key}>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">{criterion.label}</span>
            <span className="text-sm font-bold text-gray-900">{criterion.value.toFixed(1)}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${getBarColor(criterion.value)} transition-all duration-500`}
              style={{ width: `${(criterion.value / 10) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}