import { getCandidateBySlug, candidatesData } from '@/lib/data'
import { getAnalyseBySlug } from '@/lib/analysesData'
import ScoreRadar from '@/components/ScoreRadar'
import AnalyseComplete from '@/components/AnalyseComplete'
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
  if (score >= 5) return '#EAB308'
  return '#EF4444'
}

function getGlobalScoreBg(score: number): string {
  if (score >= 7) return 'bg-palette-blue/5 border-palette-blue/20'
  if (score >= 5) return 'bg-palette-yellow/5 border-palette-yellow/20'
  return 'bg-palette-red/5 border-palette-red/20'
}

export default function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = getCandidateBySlug(params.slug)
  const analyseContent = getAnalyseBySlug(params.slug)

  if (!candidate) {
    notFound()
  }

  // Find rank
  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const rank = sorted.findIndex(c => c.slug === candidate.slug) + 1

  // Navigation
  const prevCandidate = rank > 1 ? sorted[rank - 2] : null
  const nextCandidate = rank < sorted.length ? sorted[rank] : null

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block underline underline-offset-4">
            &larr; Retour au classement
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-4 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-medium ${getScoreColor(candidate.globalScore)}`}>#{rank}</span>
                <span className="text-xs text-gray-400">{candidate.party}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight">{candidate.name}</h1>
            </div>
            <div className={`text-right border rounded-sm px-4 py-3 ${getGlobalScoreBg(candidate.globalScore)}`}>
              <div className={`text-4xl sm:text-5xl font-light ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</div>
              <div className="text-xs text-gray-400 mt-1">/10</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Verdict */}
        <div className={`mb-10 sm:mb-16 p-5 sm:p-6 border rounded-sm ${getGlobalScoreBg(candidate.globalScore)}`}>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Verdict</div>
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{candidate.verdict}</p>
        </div>

        {/* Score Details */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6 sm:mb-8">Detail des criteres</h2>
          <ScoreRadar scores={candidate.scores} />
        </div>

        {/* Thematic Scores */}
        {candidate.thematicScores.length > 0 && (
          <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6 sm:mb-8">Scores thematiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {candidate.thematicScores.map((ts) => (
                <div key={ts.theme} className="border border-gray-200 p-3 sm:p-4 text-center">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{ts.theme}</div>
                  <div className={`text-2xl font-light ${getScoreColor(ts.score)}`}>{ts.score.toFixed(1)}</div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(ts.score / 10) * 100}%`,
                          backgroundColor: getBarColor(ts.score)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Best Measures */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">Meilleures mesures</h2>
          <p className="text-xs text-gray-500 mb-6">Les propositions les plus solides et innovantes du programme</p>
          <div className="space-y-3">
            {candidate.bestMeasures.map((measure, index) => (
              <div key={index} className="border-l-4 border-palette-blue pl-4 sm:pl-6 py-3">
                <div className="text-sm font-medium text-gray-900">{measure.title}</div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{measure.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Worst Measures */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">Mesures les plus problematiques</h2>
          <p className="text-xs text-gray-500 mb-6">Les propositions jugees irrealistes, insuffisantes ou juridiquement fragiles</p>
          <div className="space-y-3">
            {candidate.worstMeasures.map((measure, index) => (
              <div key={index} className={`border-l-4 pl-4 sm:pl-6 py-3 ${measure.type === 'unrealistic' ? 'border-palette-red' : 'border-palette-yellow'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{measure.title}</span>
                  {measure.type === 'unrealistic' && (
                    <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded-sm">irrealiste</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{measure.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths & Weaknesses side by side */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {/* Strengths */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Points forts</h2>
              <ul className="space-y-4">
                {candidate.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed text-sm">
                    <span className="text-palette-blue mt-0.5 font-bold">+</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Points faibles</h2>
              <ul className="space-y-4">
                {candidate.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed text-sm">
                    <span className="text-palette-red mt-0.5 font-bold">&minus;</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contradictions */}
        {candidate.contradictions.length > 0 && (
          <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Contradictions internes</h2>
            <div className="space-y-3">
              {candidate.contradictions.map((contradiction, index) => (
                <div key={index} className="border-l-4 border-palette-yellow pl-4 sm:pl-6 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{contradiction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blind Spots */}
        {candidate.blindSpots.length > 0 && (
          <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Angles morts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {candidate.blindSpots.map((spot, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600 py-2">
                  <span className="text-gray-400">&middot;</span>
                  <span>{spot}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problematic Measures (legacy) */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Mesures necessitant clarification</h2>
          <div className="space-y-3">
            {candidate.problematicMeasures.map((measure, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4 sm:pl-6 py-2">
                <p className="text-sm text-gray-700 leading-relaxed">{measure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Synthesis */}
        <div className={`p-6 sm:p-8 mb-10 sm:mb-16 border rounded-sm ${getGlobalScoreBg(candidate.globalScore)}`}>
          <h2 className="text-xl font-normal text-gray-900 mb-4">Synthese</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Le programme de {candidate.name} ({candidate.party}) obtient une note globale de{' '}
            <span className={`font-medium ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}/10</span>.{' '}
            {candidate.verdict}
          </p>
        </div>

        {/* Full Analysis */}
        {analyseContent && <AnalyseComplete content={analyseContent} />}

        {/* Navigation between candidates */}
        <div className="mt-10 sm:mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          {prevCandidate ? (
            <Link
              href={`/candidats/${prevCandidate.slug}`}
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4"
            >
              &larr; #{rank - 1} {prevCandidate.name}
            </Link>
          ) : <div />}
          {nextCandidate ? (
            <Link
              href={`/candidats/${nextCandidate.slug}`}
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4 text-right"
            >
              #{rank + 1} {nextCandidate.name} &rarr;
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}
