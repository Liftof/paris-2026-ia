'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

function getScoreColor(value: number): string {
  if (value >= 7) return '#3B82F6'    // palette blue
  if (value >= 5) return '#EAB308'    // palette yellow
  return '#EF4444'                     // palette red
}

function getScoreBg(value: number): string {
  if (value >= 7) return 'bg-palette-blue/10'
  if (value >= 5) return 'bg-palette-yellow/10'
  return 'bg-palette-red/10'
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
    <div className="space-y-5">
      {criteria.map(criterion => (
        <div key={criterion.key} className={`p-4 rounded-sm ${getScoreBg(criterion.value)}`}>
          <div className="flex justify-between items-baseline mb-2">
            <span className="text-sm uppercase tracking-wider text-gray-600 font-medium">{criterion.label}</span>
            <span className="text-2xl font-light" style={{ color: getScoreColor(criterion.value) }}>
              {criterion.value.toFixed(1)}<span className="text-sm text-gray-400">/10</span>
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-200/50 h-2 rounded-full">
              <div
                className="h-2 rounded-full transition-all duration-700"
                style={{
                  width: `${(criterion.value / 10) * 100}%`,
                  backgroundColor: getScoreColor(criterion.value)
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
