import { getCandidateBySlug, candidatesData } from '@/lib/data'
import ScoreRadar from '@/components/ScoreRadar'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import ShareButtons from '@/components/ShareButtons'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

export function generateStaticParams() {
  return candidatesData.map((candidate) => ({
    slug: candidate.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)
  if (!candidate) return {}
  return {
    title: `${candidate.name} - ${candidate.globalScore}/10 | Paris 2026 IA`,
    description: candidate.verdict.slice(0, 160),
    openGraph: {
      title: `${candidate.name} : ${candidate.globalScore}/10 - Analyse IA Paris 2026`,
      description: candidate.verdict.slice(0, 160),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${candidate.name} : ${candidate.globalScore}/10`,
      description: candidate.verdict.slice(0, 160),
    },
  }
}

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-score-solid'
  if (score >= 5) return 'text-score-mixed'
  return 'text-score-fragile'
}

function getBarColor(score: number): string {
  if (score >= 7) return '#16a34a'
  if (score >= 5) return '#d97706'
  return '#dc2626'
}

function getGlobalScoreBg(score: number): string {
  if (score >= 7) return 'bg-surface-alt border-score-solid/20'
  if (score >= 5) return 'bg-surface-alt border-score-mixed/20'
  return 'bg-surface-alt border-score-fragile/20'
}

export default async function CandidatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)

  if (!candidate) {
    notFound()
  }

  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const rank = sorted.findIndex((entry) => entry.slug === candidate.slug) + 1

  const prevCandidate = rank > 1 ? sorted[rank - 2] : null
  const nextCandidate = rank < sorted.length ? sorted[rank] : null

  return (
    <div className="site-shell min-h-screen">
      <SiteNav />

      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
          <div className="flex items-center justify-end mb-6">
            <ShareButtons candidateName={candidate.name} score={candidate.globalScore} slug={candidate.slug} />
          </div>

          <div className="hero-panel p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl p-[2px] shrink-0"
                style={{ background: `linear-gradient(140deg, ${candidate.politicalColor}, ${candidate.politicalColor}77)` }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="112px" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="kicker">#{rank}</span>
                  <span className="text-xs text-ink-3 font-semibold uppercase tracking-[0.12em]">{candidate.party}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight">{candidate.name}</h1>
                <p className="text-sm sm:text-base text-ink-3 mt-2 max-w-2xl">{candidate.politicalLine}</p>
              </div>

              <div className="flex flex-col items-center gap-3 self-start sm:self-center">
                <div className={`border rounded-xl px-5 py-4 ${getGlobalScoreBg(candidate.globalScore)}`}>
                  <div className={`text-4xl sm:text-5xl font-bold text-center ${getScoreColor(candidate.globalScore)}`}>
                    {candidate.globalScore}
                  </div>
                  <div className="text-xs text-ink-3 mt-0.5 text-center">/10 global</div>
                </div>
                <a
                  href={`/rapports/${candidate.slug}-analyse.pdf`}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-ink text-white hover:bg-ink-2 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Rapport PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <section className={`panel-card p-5 sm:p-6 mb-8 sm:mb-10 ${getGlobalScoreBg(candidate.globalScore)}`}>
          <div className="text-xs uppercase tracking-[0.12em] text-ink-3 font-semibold mb-2">Lecture du labo</div>
          <p className="text-sm sm:text-base text-ink leading-relaxed">{candidate.verdict}</p>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Détail des critères</h2>
          <ScoreRadar scores={candidate.scores} />
        </section>

        {candidate.thematicScores.length > 0 && (
          <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Scores thématiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {candidate.thematicScores.map((themeScore) => (
                <div key={themeScore.theme} className="playful-dash bg-white p-3 sm:p-4 text-center">
                  <div className="text-xs text-ink-3 mb-2 font-medium">{themeScore.theme}</div>
                  <div className={`text-2xl font-bold ${getScoreColor(themeScore.score)}`}>{themeScore.score.toFixed(1)}</div>
                  <div className="mt-2 score-bar-fill bg-surface-alt">
                    <div
                      className="score-bar-fill"
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
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-1">Mesures solides</h2>
            <p className="text-xs text-ink-3 mb-5">Propositions jugées cohérentes et robustes.</p>
            <div className="space-y-3">
              {candidate.bestMeasures.map((measure, index) => (
                <div key={index} className="playful-dash bg-white p-3.5">
                  <div className="text-sm font-semibold text-ink">{measure.title}</div>
                  <p className="text-xs text-ink-3 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-1">Points fragiles</h2>
            <p className="text-xs text-ink-3 mb-5">Mesures jugées irréalistes ou insuffisamment étayées.</p>
            <div className="space-y-3">
              {candidate.worstMeasures.map((measure, index) => (
                <div key={index} className="playful-dash bg-white p-3.5">
                  <div className="flex items-center flex-wrap gap-2">
                    <span className="text-sm font-semibold text-ink">{measure.title}</span>
                    {measure.type === 'unrealistic' && (
                      <span className="text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 bg-score-fragile/10 text-score-fragile rounded font-bold">
                        irréaliste
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-3 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Points forts</h2>
            <ul className="space-y-3">
              {candidate.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-ink-2 leading-relaxed">
                  <span className="text-score-solid mt-0.5 font-bold text-lg">+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-card p-6 sm:p-7">
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Points faibles</h2>
            <ul className="space-y-3">
              {candidate.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-ink-2 leading-relaxed">
                  <span className="text-score-fragile mt-0.5 font-bold text-lg">−</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {candidate.contradictions.length > 0 && (
          <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Contradictions internes</h2>
            <div className="space-y-3">
              {candidate.contradictions.map((contradiction, index) => (
                <div key={index} className="playful-dash bg-white p-3.5">
                  <p className="text-sm text-ink-2 leading-relaxed">{contradiction}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {candidate.blindSpots.length > 0 && (
          <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Angles morts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {candidate.blindSpots.map((spot, index) => (
                <div key={index} className="playful-dash bg-white p-3 text-sm text-ink-3">
                  {spot}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="panel-card p-6 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl font-bold text-ink mb-4">Mesures à clarifier</h2>
          <div className="space-y-3">
            {candidate.problematicMeasures.map((measure, index) => (
              <div key={index} className="playful-dash bg-white p-3.5">
                <p className="text-sm text-ink-2 leading-relaxed">{measure}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`panel-card p-6 sm:p-8 mb-8 sm:mb-10 ${getGlobalScoreBg(candidate.globalScore)}`}>
          <h2 className="text-lg font-bold text-ink mb-3">Synthèse</h2>
          <p className="text-sm text-ink-2 leading-relaxed">
            Le programme de {candidate.name} ({candidate.party}) obtient une note globale de{' '}
            <span className={`font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}/10</span>. {candidate.verdict}
          </p>
        </section>

        <section className="mt-10 sm:mt-14 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row justify-between gap-4">
          {prevCandidate ? (
            <Link
              href={`/candidats/${prevCandidate.slug}`}
              className="flex items-center gap-3 text-sm text-ink-3 hover:text-ink group"
            >
              <span className="text-ink-4 group-hover:text-ink-3">←</span>
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
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
              className="flex items-center gap-3 text-sm text-ink-3 hover:text-ink text-right group"
            >
              <span>#{rank + 1} {nextCandidate.name}</span>
              <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                <Image src={nextCandidate.photo} alt={nextCandidate.name} fill className="object-cover" sizes="32px" />
              </div>
              <span className="text-ink-4 group-hover:text-ink-3">→</span>
            </Link>
          ) : (
            <div />
          )}
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
