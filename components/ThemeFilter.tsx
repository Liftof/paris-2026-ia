'use client'

import { useState } from 'react'
import { candidatesData } from '@/lib/data'
import CandidateCard from '@/components/CandidateCard'

const themeFilters = [
  { key: 'global', label: 'Global' },
  { key: 'logement', label: 'Logement' },
  { key: 'transport', label: 'Transport' },
  { key: 'securite', label: 'Sécurité' },
  { key: 'ecologie', label: 'Écologie' },
  { key: 'budget', label: 'Budget' },
]

export default function ThemeFilter() {
  const [activeFilter, setActiveFilter] = useState('global')

  const sortedCandidates = [...candidatesData].sort((a, b) => {
    if (activeFilter === 'global') return b.globalScore - a.globalScore

    const getThemeScore = (c: typeof a) => {
      const ts = c.thematicScores.find((t) =>
        t.theme.toLowerCase().includes(activeFilter.slice(0, 4))
      )
      return ts?.score ?? c.globalScore
    }
    return getThemeScore(b) - getThemeScore(a)
  })

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {themeFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold transition-all rounded-lg ${
              activeFilter === filter.key
                ? 'bg-ink text-white'
                : 'bg-white text-ink-3 border border-[var(--border)] hover:border-ink-4 hover:text-ink'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="space-y-3 stagger-in">
        {sortedCandidates.map((candidate, index) => (
          <CandidateCard key={candidate.slug} candidate={candidate} rank={index + 1} />
        ))}
      </div>
      {activeFilter !== 'global' && (
        <p className="label-mono mt-4 text-center">
          Classement par score thematique &laquo;{themeFilters.find((f) => f.key === activeFilter)?.label}&raquo;
        </p>
      )}
    </div>
  )
}
