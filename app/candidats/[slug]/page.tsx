import { getCandidateBySlug, candidatesData } from '@/lib/data'
import { getAnalyseBySlug } from '@/lib/analysesData'
import ScoreRadar from '@/components/ScoreRadar'
import AnalyseComplete from '@/components/AnalyseComplete'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return candidatesData.map((candidate) => ({
    slug: candidate.slug,
  }))
}

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-palette-blue'
  if (score >= 5) return 'text-palette-yellow'
  return 'text-palette-red'
}

function getBarColor(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#D97706'
  return '#EA580C'
}

function getGlobalScoreBg(score: number): string {
  if (score >= 7) return 'bg-blue-50/70 border-palette-blue/25'
  if (score >= 5) return 'bg-yellow-50/70 border-palette-yellow/25'
  return 'bg-red-50/70 border-palette-red/25'
}

export default async function CandidatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)
  const analyseContent = getAnalyseBySlug(slug)

  if (!candidate) {
    notFound()
  }

  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const rank = sorted.findIndex((entry) => entry.slug === candidate.slug) + 1

  const prevCandidate = rank > 1 ? sorted[rank - 2] : null
  const nextCandidate = rank < sorted.length ? sorted[rank] : null

  return (
    <div className="site-shell min-h-screen">
      <nav className="site-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg font-bold text-slate-900">Paris 2026</span>
            <span className="kicker">Labo indépendant</span>
          </Link>
          <Link href="/methodologie" className="text-sm text-slate-500 hover:text-slate-900">
            Méthodologie
          </Link>
        </div>
      </nav>

      <header className="border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link href="/#classement" className="text-sm text-slate-500 hover:text-slate-900 inline-block mb-6">
            ← Retour au classement
          </Link>

          <div className="hero-panel p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] shrink-0"
                style={{ background: `linear-gradient(140deg, ${candidate.politicalColor}, ${candidate.politicalColor}77)` }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                  <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="112px" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="kicker">#{rank}</span>
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-[0.12em]">{candidate.party}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{candidate.name}</h1>
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">{candidate.politicalLine}</p>
              </div>

              <div className={`border rounded-xl px-5 py-4 ${getGlobalScoreBg(candidate.globalScore)} self-start sm:self-center`}>
                <div className={`text-4xl sm:text-5xl font-bold text-center ${getScoreColor(candidate.globalScore)}`}>
                  {candidate.globalScore}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 text-center">/10 global</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className={`panel-card p-5 sm:p-6 mb-8 sm:mb-10 ${getGlobalScoreBg(candidate.globalScore)}`}>
          <div className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold mb-2">Lecture du labo</div>
          <p className="text-sm sm:text-base text-slate-800 leading-relaxed">{candidate.verdict}</p>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Détail des critères</h2>
          <ScoreRadar scores={candidate.scores} />
        </section>

        {candidate.thematicScores.length > 0 && (
          <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Scores thématiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {candidate.thematicScores.map((themeScore) => (
                <div key={themeScore.theme} className="playful-dash bg-white/72 p-3 sm:p-4 text-center">
                  <div className="text-xs text-slate-500 mb-2 font-medium">{themeScore.theme}</div>
                  <div className={`text-2xl font-bold ${getScoreColor(themeScore.score)}`}>{themeScore.score.toFixed(1)}</div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-200/70">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${(themeScore.score / 10) * 100}%`, backgroundColor: getBarColor(themeScore.score) }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Mesures solides</h2>
            <p className="text-xs text-slate-500 mb-5">Propositions jugées cohérentes et robustes.</p>
            <div className="space-y-3">
              {candidate.bestMeasures.map((measure, index) => (
                <div key={index} className="playful-dash bg-white/72 p-3.5">
                  <div className="text-sm font-semibold text-slate-900">{measure.title}</div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Points fragiles</h2>
            <p className="text-xs text-slate-500 mb-5">Mesures jugées irréalistes ou insuffisamment étayées.</p>
            <div className="space-y-3">
              {candidate.worstMeasures.map((measure, index) => (
                <div key={index} className="playful-dash bg-white/72 p-3.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-semibold text-slate-900">{measure.title}</span>
                    {measure.type === 'unrealistic' && (
                      <span className="text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded font-bold">
                        irréaliste
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Points forts</h2>
            <ul className="space-y-3">
              {candidate.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="text-palette-blue mt-0.5 font-bold text-lg">+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Points faibles</h2>
            <ul className="space-y-3">
              {candidate.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <span className="text-palette-red mt-0.5 font-bold text-lg">−</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {candidate.contradictions.length > 0 && (
          <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Contradictions internes</h2>
            <div className="space-y-3">
              {candidate.contradictions.map((contradiction, index) => (
                <div key={index} className="playful-dash bg-white/72 p-3.5">
                  <p className="text-sm text-slate-700 leading-relaxed">{contradiction}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {candidate.blindSpots.length > 0 && (
          <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Angles morts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {candidate.blindSpots.map((spot, index) => (
                <div key={index} className="playful-dash bg-white/72 p-3 text-sm text-slate-600">
                  {spot}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">Mesures à clarifier</h2>
          <div className="space-y-3">
            {candidate.problematicMeasures.map((measure, index) => (
              <div key={index} className="playful-dash bg-white/72 p-3.5">
                <p className="text-sm text-slate-700 leading-relaxed">{measure}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`panel-card p-6 sm:p-8 mb-8 sm:mb-10 ${getGlobalScoreBg(candidate.globalScore)}`}>
          <h2 className="text-lg font-bold text-slate-900 mb-3">Synthèse</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Le programme de {candidate.name} ({candidate.party}) obtient une note globale de{' '}
            <span className={`font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}/10</span>. {candidate.verdict}
          </p>
        </section>

        {analyseContent && <AnalyseComplete content={analyseContent} />}

        <section className="mt-10 sm:mt-14 pt-8 border-t border-slate-200/70 flex flex-col sm:flex-row justify-between gap-4">
          {prevCandidate ? (
            <Link
              href={`/candidats/${prevCandidate.slug}`}
              className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 group"
            >
              <span className="text-slate-300 group-hover:text-slate-500">←</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                <Image src={prevCandidate.photo} alt={prevCandidate.name} fill className="object-cover" sizes="32px" />
              </div>
              <span>#{rank - 1} {prevCandidate.name}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextCandidate ? (
            <Link
              href={`/candidats/${nextCandidate.slug}`}
              className="flex items-center gap-3 text-sm text-slate-500 hover:text-slate-900 text-right group"
            >
              <span>#{rank + 1} {nextCandidate.name}</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                <Image src={nextCandidate.photo} alt={nextCandidate.name} fill className="object-cover" sizes="32px" />
              </div>
              <span className="text-slate-300 group-hover:text-slate-500">→</span>
            </Link>
          ) : (
            <div />
          )}
        </section>
      </main>
    </div>
  )
}
