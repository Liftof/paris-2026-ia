'use client'

import { useState } from 'react'
import { candidatesData } from '@/lib/data'
import type { Candidate } from '@/types/candidate'
import Image from 'next/image'
import Link from 'next/link'

const criteriaLabels: { key: keyof Candidate['scores']; label: string }[] = [
  { key: 'coherence', label: 'Coherence' },
  { key: 'solidite', label: 'Solidite' },
  { key: 'robustesse', label: 'Robustesse' },
  { key: 'pragmatisme', label: 'Pragmatisme' },
  { key: 'detail', label: 'Detail' },
]

function getScoreHex(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#D97706'
  return '#EA580C'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigue'
  return 'Fragile'
}

function ComparisonBar({ scoreA, scoreB, label }: { scoreA: number; scoreB: number; label: string }) {
  const winner = scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'tie'
  return (
    <div className="py-3 border-b border-slate-200/50 last:border-b-0">
      <div className="text-xs font-semibold text-slate-500 text-center mb-2">{label}</div>
      <div className="flex items-center gap-3">
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-bold ${winner === 'A' ? '' : 'opacity-50'}`}
              style={{ color: getScoreHex(scoreA) }}
            >
              {scoreA.toFixed(1)}
            </span>
            <div className="w-24 sm:w-32 h-2.5 rounded-full bg-slate-200/60 overflow-hidden">
              <div
                className="h-full rounded-full float-right"
                style={{ width: `${(scoreA / 10) * 100}%`, backgroundColor: getScoreHex(scoreA) }}
              />
            </div>
          </div>
        </div>
        <div className="w-8 text-center">
          {winner === 'A' && <span className="text-[10px] font-bold text-palette-blue">&#9664;</span>}
          {winner === 'B' && <span className="text-[10px] font-bold text-palette-blue">&#9654;</span>}
          {winner === 'tie' && <span className="text-[10px] font-bold text-slate-400">=</span>}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-24 sm:w-32 h-2.5 rounded-full bg-slate-200/60 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${(scoreB / 10) * 100}%`, backgroundColor: getScoreHex(scoreB) }}
              />
            </div>
            <span
              className={`text-sm font-bold ${winner === 'B' ? '' : 'opacity-50'}`}
              style={{ color: getScoreHex(scoreB) }}
            >
              {scoreB.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparateurPage() {
  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const [slugA, setSlugA] = useState(sorted[0]?.slug ?? '')
  const [slugB, setSlugB] = useState(sorted[1]?.slug ?? '')

  const candidateA = candidatesData.find((c) => c.slug === slugA)
  const candidateB = candidatesData.find((c) => c.slug === slugB)

  const winsA = candidateA && candidateB
    ? criteriaLabels.filter((c) => candidateA.scores[c.key] > candidateB.scores[c.key]).length
    : 0
  const winsB = candidateA && candidateB
    ? criteriaLabels.filter((c) => candidateB.scores[c.key] > candidateA.scores[c.key]).length
    : 0

  return (
    <div className="site-shell min-h-screen">
      <nav className="site-nav">
        <div className="site-nav-pill">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Paris 2026</span>
            <span className="kicker !text-[9px] !py-0.5 !px-2">Labo</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link href="/#classement" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Classement
            </Link>
            <Link href="/comparateur" className="text-xs font-semibold text-palette-blue transition-colors">
              Comparer
            </Link>
            <Link href="/methodologie" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Methodo
            </Link>
          </div>
        </div>
      </nav>

      <header className="border-b border-slate-200/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 inline-block mb-6">
            &larr; Retour
          </Link>
          <div className="hero-panel p-6 sm:p-8">
            <span className="kicker mb-3">Comparateur</span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">Face-a-face</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Comparez deux candidats critere par critere, theme par theme.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div>
            <label className="text-[11px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-2 block">
              Candidat A
            </label>
            <select
              value={slugA}
              onChange={(e) => setSlugA(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-palette-blue/30"
            >
              {sorted.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.globalScore}/10)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] uppercase tracking-[0.12em] text-slate-500 font-semibold mb-2 block">
              Candidat B
            </label>
            <select
              value={slugB}
              onChange={(e) => setSlugB(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-white/80 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-palette-blue/30"
            >
              {sorted.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.globalScore}/10)
                </option>
              ))}
            </select>
          </div>
        </div>

        {candidateA && candidateB && (
          <>
            {/* Candidate headers */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
              {[candidateA, candidateB].map((c) => (
                <Link key={c.slug} href={`/candidats/${c.slug}`} className="group panel-card p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-14 h-14 rounded-full p-[2px] shrink-0"
                      style={{ background: `linear-gradient(140deg, ${c.politicalColor}, ${c.politicalColor}77)` }}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                        <Image src={c.photo} alt={c.name} fill className="object-cover" sizes="56px" />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-palette-blue truncate">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-slate-500">{c.party}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/50">
                    <span className="text-3xl font-bold" style={{ color: getScoreHex(c.globalScore) }}>
                      {c.globalScore}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-[0.12em] font-bold"
                      style={{ color: getScoreHex(c.globalScore) }}
                    >
                      {getScoreLabel(c.globalScore)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Score summary */}
            <div className="panel-card p-4 sm:p-6 mb-8 text-center">
              <div className="flex items-center justify-center gap-4 sm:gap-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: getScoreHex(candidateA.globalScore) }}>
                    {winsA}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {winsA > 1 ? 'criteres gagnes' : 'critere gagne'}
                  </div>
                </div>
                <div className="text-slate-300 text-lg font-bold">VS</div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold" style={{ color: getScoreHex(candidateB.globalScore) }}>
                    {winsB}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {winsB > 1 ? 'criteres gagnes' : 'critere gagne'}
                  </div>
                </div>
              </div>
            </div>

            {/* Criteria comparison */}
            <section className="panel-card p-5 sm:p-7 mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Comparaison par critere</h2>
              <p className="text-xs text-slate-500 mb-4">Chaque barre represente la note sur 10.</p>

              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-semibold text-slate-700">{candidateA.name.split(' ').pop()}</span>
                <span className="text-xs font-semibold text-slate-700">{candidateB.name.split(' ').pop()}</span>
              </div>

              {criteriaLabels.map((c) => (
                <ComparisonBar
                  key={c.key}
                  label={c.label}
                  scoreA={candidateA.scores[c.key]}
                  scoreB={candidateB.scores[c.key]}
                />
              ))}

              <div className="pt-3 mt-2 border-t-2 border-slate-300/50">
                <ComparisonBar label="NOTE GLOBALE" scoreA={candidateA.globalScore} scoreB={candidateB.globalScore} />
              </div>
            </section>

            {/* Thematic comparison */}
            {candidateA.thematicScores.length > 0 && candidateB.thematicScores.length > 0 && (
              <section className="panel-card p-5 sm:p-7 mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Scores thematiques</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {candidateA.thematicScores.map((themeA, i) => {
                    const themeB = candidateB.thematicScores[i]
                    if (!themeB) return null
                    const winner = themeA.score > themeB.score ? 'A' : themeB.score > themeA.score ? 'B' : 'tie'
                    return (
                      <div key={themeA.theme} className="playful-dash bg-white/72 p-3 text-center">
                        <div className="text-[11px] text-slate-500 font-medium mb-2">{themeA.theme}</div>
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`text-sm font-bold ${winner === 'A' ? '' : 'opacity-40'}`}
                            style={{ color: getScoreHex(themeA.score) }}
                          >
                            {themeA.score.toFixed(1)}
                          </span>
                          <span className="text-[10px] text-slate-300">vs</span>
                          <span
                            className={`text-sm font-bold ${winner === 'B' ? '' : 'opacity-40'}`}
                            style={{ color: getScoreHex(themeB.score) }}
                          >
                            {themeB.score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Strengths comparison */}
            <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {[candidateA, candidateB].map((c) => (
                <div key={c.slug} className="panel-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                      <Image src={c.photo} alt={c.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Points forts</h3>
                  </div>
                  <ul className="space-y-2">
                    {c.strengths.slice(0, 4).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="text-palette-blue font-bold mt-0.5">+</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Weaknesses comparison */}
            <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8">
              {[candidateA, candidateB].map((c) => (
                <div key={c.slug} className="panel-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                      <Image src={c.photo} alt={c.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Points faibles</h3>
                  </div>
                  <ul className="space-y-2">
                    {c.weaknesses.slice(0, 4).map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                        <span className="text-palette-red font-bold mt-0.5">&minus;</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Best measures comparison */}
            <section className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {[candidateA, candidateB].map((c) => (
                <div key={c.slug} className="panel-card p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                      <Image src={c.photo} alt={c.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Mesures phares</h3>
                  </div>
                  <div className="space-y-2">
                    {c.bestMeasures.slice(0, 3).map((m, i) => (
                      <div key={i} className="playful-dash bg-white/72 p-3">
                        <div className="text-xs font-semibold text-slate-900">{m.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{m.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  )
}
