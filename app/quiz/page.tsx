'use client'

import { useState } from 'react'
import { candidatesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

const themes = [
  { key: 'Logement', icon: '\u{1F3E0}', description: 'Logement social, loyers, renovation' },
  { key: 'Transport', icon: '\u{1F68C}', description: 'Mobilite, velo, transports en commun' },
  { key: 'Securite', icon: '\u{1F6E1}\uFE0F', description: 'Police municipale, incivilites, nuit' },
  { key: 'Ecologie', icon: '\u{1F33F}', description: 'Vegetalisation, energie, alimentation' },
  { key: 'Budget', icon: '\u{1F4B0}', description: 'Fiscalite, dette, financement' },
]

function getScoreHex(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#D97706'
  return '#EA580C'
}

type Step = 'intro' | 'priorities' | 'importance' | 'results'

export default function QuizPage() {
  const [step, setStep] = useState<Step>('intro')
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [weights, setWeights] = useState<Record<string, number>>({})

  function toggleTheme(theme: string) {
    setSelectedThemes((prev) => {
      if (prev.includes(theme)) return prev.filter((t) => t !== theme)
      if (prev.length >= 3) return prev
      return [...prev, theme]
    })
  }

  function goToImportance() {
    const initialWeights: Record<string, number> = {}
    selectedThemes.forEach((t) => {
      initialWeights[t] = 3
    })
    setWeights(initialWeights)
    setStep('importance')
  }

  function computeResults() {
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0)
    const criteriaWeight = 0.4
    const thematicWeight = 0.6

    const results = candidatesData.map((candidate) => {
      const criteriaAvg = candidate.globalScore

      let thematicScore = 0
      let thematicTotal = 0
      selectedThemes.forEach((theme) => {
        const w = weights[theme] ?? 3
        const ts = candidate.thematicScores.find(
          (t) =>
            t.theme.toLowerCase().includes(theme.toLowerCase().slice(0, 4)) ||
            (theme === 'Budget' && t.theme.toLowerCase().includes('budget'))
        )
        if (ts) {
          thematicScore += ts.score * w
          thematicTotal += w
        }
      })

      const weightedThematic = thematicTotal > 0 ? thematicScore / thematicTotal : criteriaAvg
      const finalScore = criteriaAvg * criteriaWeight + weightedThematic * thematicWeight

      return {
        ...candidate,
        personalScore: Math.round(finalScore * 10) / 10,
      }
    })

    return results.sort((a, b) => b.personalScore - a.personalScore)
  }

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
            <Link href="/quiz" className="text-xs font-semibold text-palette-blue transition-colors">
              Quiz
            </Link>
            <Link href="/methodologie" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Methodo
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* INTRO */}
        {step === 'intro' && (
          <div className="text-center animate-fade-in">
            <div className="hero-panel p-8 sm:p-12 mb-8">
              <span className="kicker mb-4">Quiz citoyen</span>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mt-4">
                Quel programme correspond a vos priorites ?
              </h1>
              <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-xl mx-auto leading-relaxed">
                Selectionnez vos themes prioritaires, et decouvrez quel candidat y repond le mieux selon notre analyse IA.
              </p>
              <button
                onClick={() => setStep('priorities')}
                className="mt-8 px-8 py-3.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                Commencer le quiz
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="soft-chip">30 secondes</span>
              <span className="soft-chip">Anonyme</span>
              <span className="soft-chip">Aucune donnee collectee</span>
            </div>
          </div>
        )}

        {/* STEP 1: Select priorities */}
        {step === 'priorities' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2">Etape 1/2</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Choisissez vos 3 priorites
              </h2>
              <p className="text-sm text-slate-500 mt-2">Quels sujets comptent le plus pour vous ?</p>
            </div>

            <div className="space-y-3">
              {themes.map((theme) => {
                const isSelected = selectedThemes.includes(theme.key)
                const isDisabled = !isSelected && selectedThemes.length >= 3
                return (
                  <button
                    key={theme.key}
                    onClick={() => toggleTheme(theme.key)}
                    disabled={isDisabled}
                    className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-palette-blue bg-blue-50/60 shadow-md'
                        : isDisabled
                          ? 'border-slate-200/50 bg-white/40 opacity-40 cursor-not-allowed'
                          : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-sm cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{theme.icon}</span>
                      <div className="flex-1">
                        <div className={`text-sm font-bold ${isSelected ? 'text-palette-blue' : 'text-slate-900'}`}>
                          {theme.key}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{theme.description}</div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'border-palette-blue bg-palette-blue' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep('intro')}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                &larr; Retour
              </button>
              <button
                onClick={goToImportance}
                disabled={selectedThemes.length < 3}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  selectedThemes.length === 3
                    ? 'bg-slate-900 text-white hover:bg-slate-700'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Suivant ({selectedThemes.length}/3)
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Weight importance */}
        {step === 'importance' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-2">Etape 2/2</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Classez leur importance
              </h2>
              <p className="text-sm text-slate-500 mt-2">De 1 (important) a 5 (essentiel).</p>
            </div>

            <div className="space-y-4">
              {selectedThemes.map((themeKey) => {
                const theme = themes.find((t) => t.key === themeKey)!
                const value = weights[themeKey] ?? 3
                return (
                  <div key={themeKey} className="panel-card p-4 sm:p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{theme.icon}</span>
                      <span className="text-sm font-bold text-slate-900">{theme.key}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 w-14">Important</span>
                      <input
                        type="range"
                        min={1}
                        max={5}
                        value={value}
                        onChange={(e) => setWeights((prev) => ({ ...prev, [themeKey]: parseInt(e.target.value) }))}
                        className="flex-1 h-2 rounded-full appearance-none bg-slate-200 accent-palette-blue cursor-pointer"
                      />
                      <span className="text-[11px] text-slate-400 w-14 text-right">Essentiel</span>
                    </div>
                    <div className="flex justify-center mt-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              level <= value ? 'bg-palette-blue' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setStep('priorities')}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                &larr; Retour
              </button>
              <button
                onClick={() => setStep('results')}
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-all"
              >
                Voir mes resultats
              </button>
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <span className="kicker mb-3">Resultats</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
                Votre classement personnalise
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Pondere selon vos priorites : {selectedThemes.join(', ')}.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {computeResults().map((candidate, index) => {
                const maxScore = computeResults()[0]?.personalScore ?? 10
                return (
                  <Link
                    key={candidate.slug}
                    href={`/candidats/${candidate.slug}`}
                    className="group panel-card p-4 sm:p-5 block hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`text-lg font-bold w-8 text-center ${
                          index === 0 ? 'text-palette-blue' : 'text-slate-400'
                        }`}
                      >
                        #{index + 1}
                      </span>
                      <div
                        className="relative w-12 h-12 rounded-full p-[2px] shrink-0"
                        style={{
                          background:
                            index === 0
                              ? `linear-gradient(140deg, ${candidate.politicalColor}, #3B82F6)`
                              : `linear-gradient(140deg, ${candidate.politicalColor}, ${candidate.politicalColor}77)`,
                        }}
                      >
                        <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                          <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="48px" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-palette-blue truncate">
                          {candidate.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{candidate.party}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold" style={{ color: getScoreHex(candidate.personalScore) }}>
                          {candidate.personalScore}
                        </div>
                        <div className="text-[10px] text-slate-400">/10</div>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-200/60 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(candidate.personalScore / maxScore) * 100}%`,
                          backgroundColor: getScoreHex(candidate.personalScore),
                        }}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="panel-card p-5 sm:p-6 text-center mb-6">
              <p className="text-xs text-slate-500 leading-relaxed">
                Ce classement est base sur les scores thematiques ponderes selon vos priorites.
                Il ne constitue pas une recommandation de vote.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  setStep('intro')
                  setSelectedThemes([])
                  setWeights({})
                }}
                className="px-6 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-white/80 transition-colors"
              >
                Recommencer
              </button>
              <Link
                href="/comparateur"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
              >
                Comparer deux candidats
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
