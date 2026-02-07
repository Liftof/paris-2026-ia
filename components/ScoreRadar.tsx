'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  const criteria = [
    { key: 'coherence', label: 'Cohérence', value: scores.coherence },
    { key: 'solidite', label: 'Solidité', value: scores.solidite },
    { key: 'robustesse', label: 'Robustesse', value: scores.robustesse },
    { key: 'pragmatisme', label: 'Pragmatisme', value: scores.pragmatisme },
    { key: 'detail', label: 'Détail', value: scores.detail }
  ]

  return (
    <div className="space-y-6">
      {criteria.map(criterion => (
        <div key={criterion.key}>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm uppercase tracking-wider text-gray-500">{criterion.label}</span>
            <span className="text-2xl font-light text-gray-900">{criterion.value.toFixed(1)}<span className="text-sm text-gray-400">/10</span></span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 h-2">
              <div 
                className="h-2 bg-gray-900 transition-all duration-700"
                style={{ width: `${(criterion.value / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}