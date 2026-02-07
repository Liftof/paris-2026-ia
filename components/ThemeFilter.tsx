'use client'

import { useState } from 'react'
import { candidatesData } from '@/lib/data'
import CandidateCard from '@/components/CandidateCard'

const themeFilters = [
  { key: 'global', label: 'Global' },
  { key: 'logement', label: 'Logement' },
  { key: 'transport', label: 'Transport' },
  { key: 'securite', label: 'Securite' },
  { key: 'ecologie', label: 'Ecologie' },
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
      <div className="flex flex-wrap gap-1.5 mb-5">
        {themeFilters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              activeFilter === filter.key
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white/70 text-slate-500 border border-slate-200/60 hover:border-slate-300 hover:text-slate-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {sortedCandidates.map((candidate, index) => (
          <CandidateCard key={candidate.slug} candidate={candidate} rank={index + 1} />
        ))}
      </div>
      {activeFilter !== 'global' && (
        <p className="text-[11px] text-slate-400 mt-3 text-center">
          Classement par score thematique &laquo;{themeFilters.find((f) => f.key === activeFilter)?.label}&raquo;
        </p>
      )}
    </div>
  )
}
