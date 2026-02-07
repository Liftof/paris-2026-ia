'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

function getScoreColor(value: number): string {
  if (value >= 7) return '#3B82F6'
  if (value >= 5) return '#D97706'
  return '#EA580C'
}

function getScoreBg(value: number): string {
  if (value >= 7) return 'bg-blue-50/70'
  if (value >= 5) return 'bg-yellow-50/70'
  return 'bg-red-50/70'
}

export default function ScoreRadar({ scores }: ScoreRadarProps) {
  const criteria = [
    { key: 'coherence', label: 'Cohérence', value: scores.coherence },
    { key: 'solidite', label: 'Solidité', value: scores.solidite },
    { key: 'robustesse', label: 'Robustesse', value: scores.robustesse },
    { key: 'pragmatisme', label: 'Pragmatisme', value: scores.pragmatisme },
    { key: 'detail', label: 'Détail', value: scores.detail },
  ]

  return (
    <div className="space-y-4">
      {criteria.map((criterion) => (
        <div key={criterion.key} className={`playful-dash p-4 ${getScoreBg(criterion.value)}`}>
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs sm:text-sm uppercase tracking-[0.12em] text-slate-600 font-semibold">{criterion.label}</span>
            <span className="text-2xl font-semibold" style={{ color: getScoreColor(criterion.value) }}>
              {criterion.value.toFixed(1)}
              <span className="text-sm text-slate-500">/10</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200/70">
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{ width: `${(criterion.value / 10) * 100}%`, backgroundColor: getScoreColor(criterion.value) }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
