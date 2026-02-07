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
  if (score >= 5) return '#EAB308'
  return '#EF4444'
}

function getGlobalScoreBg(score: number): string {
  if (score >= 7) return 'bg-blue-50 border-palette-blue/20'
  if (score >= 5) return 'bg-yellow-50 border-palette-yellow/20'
  return 'bg-red-50 border-palette-red/20'
}

export default function CandidatePage({ params }: { params: { slug: string } }) {
  const candidate = getCandidateBySlug(params.slug)
  const analyseContent = getAnalyseBySlug(params.slug)

  if (!candidate) {
    notFound()
  }

  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const rank = sorted.findIndex(c => c.slug === candidate.slug) + 1

  const prevCandidate = rank > 1 ? sorted[rank - 2] : null
  const nextCandidate = rank < sorted.length ? sorted[rank] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">Paris 2026</span>
            <span className="text-xs bg-palette-blue/10 text-palette-blue px-2 py-0.5 rounded-full font-medium">IA</span>
          </Link>
          <Link href="/methodologie" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Méthodologie
          </Link>
        </div>
      </nav>

      {/* Candidate Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link href="/#classement" className="text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6 inline-block">
            &larr; Retour au classement
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
            {/* Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 border-4 border-gray-100 shadow-lg">
              <Image
                src={candidate.photo}
                alt={candidate.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className={`text-sm font-bold ${getScoreColor(candidate.globalScore)}`}>#{rank}</span>
                <span className="text-xs text-gray-400 font-medium">{candidate.party}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">{candidate.name}</h1>
            </div>
            <div className={`border rounded-xl px-5 py-4 ${getGlobalScoreBg(candidate.globalScore)} self-start sm:self-center`}>
              <div className={`text-4xl sm:text-5xl font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</div>
              <div className="text-xs text-gray-400 mt-0.5 text-center">/10</div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Verdict */}
        <div className={`mb-8 sm:mb-12 p-5 sm:p-6 border rounded-xl ${getGlobalScoreBg(candidate.globalScore)}`}>
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Verdict</div>
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{candidate.verdict}</p>
        </div>

        {/* Score Details */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Détail des critères</h2>
          <ScoreRadar scores={candidate.scores} />
        </div>

        {/* Thematic Scores */}
        {candidate.thematicScores.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Scores thématiques</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {candidate.thematicScores.map((ts) => (
                <div key={ts.theme} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                  <div className="text-xs text-gray-500 mb-2 font-medium">{ts.theme}</div>
                  <div className={`text-2xl font-bold ${getScoreColor(ts.score)}`}>{ts.score.toFixed(1)}</div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 h-1.5 rounded-full">
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

        {/* Best & Worst Measures */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Meilleures mesures</h2>
            <p className="text-xs text-gray-500 mb-5">Les propositions les plus solides du programme</p>
            <div className="space-y-3">
              {candidate.bestMeasures.map((measure, index) => (
                <div key={index} className="border-l-4 border-palette-blue pl-4 py-2">
                  <div className="text-sm font-semibold text-gray-900">{measure.title}</div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Mesures problématiques</h2>
            <p className="text-xs text-gray-500 mb-5">Les propositions jugées irréalistes ou fragiles</p>
            <div className="space-y-3">
              {candidate.worstMeasures.map((measure, index) => (
                <div key={index} className={`border-l-4 pl-4 py-2 ${measure.type === 'unrealistic' ? 'border-palette-red' : 'border-palette-yellow'}`}>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-900">{measure.title}</span>
                    {measure.type === 'unrealistic' && (
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded font-bold">irréaliste</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{measure.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Points forts</h2>
            <ul className="space-y-3">
              {candidate.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed text-sm">
                  <span className="text-palette-blue mt-0.5 font-bold text-lg">+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Points faibles</h2>
            <ul className="space-y-3">
              {candidate.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed text-sm">
                  <span className="text-palette-red mt-0.5 font-bold text-lg">&minus;</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contradictions */}
        {candidate.contradictions.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Contradictions internes</h2>
            <div className="space-y-3">
              {candidate.contradictions.map((contradiction, index) => (
                <div key={index} className="border-l-4 border-palette-yellow pl-4 py-2">
                  <p className="text-sm text-gray-700 leading-relaxed">{contradiction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Blind Spots */}
        {candidate.blindSpots.length > 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Angles morts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {candidate.blindSpots.map((spot, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-gray-600 py-2">
                  <span className="text-gray-300 font-bold">&middot;</span>
                  <span>{spot}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problematic Measures (legacy) */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">Mesures nécessitant clarification</h2>
          <div className="space-y-3">
            {candidate.problematicMeasures.map((measure, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4 py-2">
                <p className="text-sm text-gray-700 leading-relaxed">{measure}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Synthesis */}
        <div className={`p-6 sm:p-8 mb-8 sm:mb-12 border rounded-xl ${getGlobalScoreBg(candidate.globalScore)}`}>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Synthèse</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Le programme de {candidate.name} ({candidate.party}) obtient une note globale de{' '}
            <span className={`font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}/10</span>.{' '}
            {candidate.verdict}
          </p>
        </div>

        {/* Full Analysis */}
        {analyseContent && <AnalyseComplete content={analyseContent} />}

        {/* Navigation */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          {prevCandidate ? (
            <Link
              href={`/candidats/${prevCandidate.slug}`}
              className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
            >
              <span className="text-gray-300 group-hover:text-gray-500">&larr;</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <Image src={prevCandidate.photo} alt={prevCandidate.name} fill className="object-cover" sizes="32px" />
              </div>
              <span>#{rank - 1} {prevCandidate.name}</span>
            </Link>
          ) : <div />}
          {nextCandidate ? (
            <Link
              href={`/candidats/${nextCandidate.slug}`}
              className="flex items-center gap-3 text-sm text-gray-500 hover:text-gray-900 transition-colors text-right group"
            >
              <span>#{rank + 1} {nextCandidate.name}</span>
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <Image src={nextCandidate.photo} alt={nextCandidate.name} fill className="object-cover" sizes="32px" />
              </div>
              <span className="text-gray-300 group-hover:text-gray-500">&rarr;</span>
            </Link>
          ) : <div />}
        </div>
      </main>
    </div>
  )
}
