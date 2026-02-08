'use client'

import { CandidateScores } from '@/types/candidate'

interface ScoreRadarProps {
  scores: CandidateScores
}

function getScoreHex(value: number): string {
  if (value >= 7) return '#16a34a'
  if (value >= 5) return '#d97706'
  return '#dc2626'
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
    <div className="space-y-0">
      {criteria.map((criterion) => (
        <div key={criterion.key} className="score-pill py-3 sm:py-4 flex items-center gap-2.5 sm:gap-4">
          <span className="label-mono w-20 sm:w-28 shrink-0 !text-[9px] sm:!text-[11px]">{criterion.label}</span>
          <div className="score-bar flex-1">
            <div
              className="score-bar-fill transition-all duration-700"
              style={{ width: `${(criterion.value / 10) * 100}%`, backgroundColor: getScoreHex(criterion.value) }}
            />
          </div>
          <div className="flex items-baseline gap-1 w-16 sm:w-20 justify-end">
            <span className="score-display text-base sm:text-xl" style={{ color: getScoreHex(criterion.value) }}>
              {criterion.value.toFixed(1)}
            </span>
            <span className="text-[10px] sm:text-xs text-ink-4">/10</span>
          </div>
        </div>
      ))}
    </div>
  )
}
