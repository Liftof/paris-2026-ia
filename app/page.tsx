import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-palette-blue'
  if (score >= 5) return 'text-palette-yellow'
  return 'text-palette-red'
}

function getScoreHex(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#EAB308'
  return '#EF4444'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigé'
  return 'Insuffisant'
}

export default function HomePage() {
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const maxScore = sortedCandidates[0].globalScore

  const allBestMeasures = candidatesData.flatMap(c =>
    c.bestMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug, photo: c.photo }))
  ).slice(0, 6)

  const allWorstMeasures = candidatesData.flatMap(c =>
    c.worstMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug, photo: c.photo }))
  ).slice(0, 6)

  const criteria = ['coherence', 'solidite', 'robustesse', 'pragmatisme', 'detail'] as const
  const criteriaLabels: Record<string, string> = {
    coherence: 'Cohérence',
    solidite: 'Solidité',
    robustesse: 'Robustesse',
    pragmatisme: 'Pragmatisme',
    detail: 'Détail',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">Paris 2026</span>
            <span className="text-xs bg-palette-blue/10 text-palette-blue px-2 py-0.5 rounded-full font-medium">IA</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#candidats" className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
              Candidats
            </a>
            <Link href="/methodologie" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Méthodologie
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative border-b border-gray-200 overflow-hidden">
        {/* Subtle Paris background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{ backgroundImage: 'url(/paris-bg.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Qui a le meilleur programme pour Paris&nbsp;?
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-10">
              L&apos;IA analyse les programmes des 6 candidats aux municipales 2026.
              Évaluation objective, transparente et non-partisane.
            </p>
          </div>

          {/* Candidate faces with political color rings */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 mt-2 mb-2">
            {sortedCandidates.map((candidate) => (
              <Link key={candidate.slug} href={`/candidats/${candidate.slug}`} className="group flex flex-col items-center gap-2">
                <div
                  className="relative w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full p-[3px] transition-transform group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${candidate.politicalColor}, ${candidate.politicalColor}88)` }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    <div className="relative w-full h-full">
                      <Image
                        src={candidate.photo}
                        alt={candidate.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="72px"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] sm:text-xs font-medium text-gray-700 group-hover:text-gray-900">
                    {candidate.name.split(' ').pop()}
                  </div>
                  <div className={`text-[10px] sm:text-xs font-bold ${getScoreColor(candidate.globalScore)}`}>
                    {candidate.globalScore}/10
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ===== SECTION 1: CLASSEMENT ===== */}
        <div id="classement" className="mb-10 sm:mb-14 scroll-mt-20">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Classement général</h2>
              <p className="text-sm text-gray-500 mt-1">Note globale sur 10 — cliquez pour l&apos;analyse détaillée</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-palette-blue" /> Solide (&ge;7)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-palette-yellow" /> Mitigé (5-7)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-palette-red" /> Insuffisant (&lt;5)</span>
            </div>
          </div>
          <div className="space-y-3">
            {sortedCandidates.map((candidate, index) => (
              <CandidateCard
                key={candidate.slug}
                candidate={candidate}
                rank={index + 1}
              />
            ))}
          </div>
        </div>

        {/* ===== SECTION 2: COMPARATIF VISUEL ===== */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Comparatif par critère</h2>
          <p className="text-sm text-gray-500 mb-8">Comment chaque candidat performe sur les 5 critères d&apos;évaluation</p>

          {/* Visual comparison grid */}
          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left text-xs font-medium text-gray-400 pb-4 w-28" />
                  {sortedCandidates.map(c => (
                    <th key={c.slug} className="text-center pb-4 px-1">
                      <Link href={`/candidats/${c.slug}`} className="group">
                        <div
                          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full mx-auto mb-1.5 p-[2px]"
                          style={{ background: c.politicalColor }}
                        >
                          <div className="w-full h-full rounded-full overflow-hidden">
                            <div className="relative w-full h-full">
                              <Image src={c.photo} alt={c.name} fill className="object-cover rounded-full" sizes="40px" />
                            </div>
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-medium text-gray-600 group-hover:text-gray-900 truncate max-w-[80px] mx-auto">
                          {c.name.split(' ').pop()}
                        </div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(criterion => (
                  <tr key={criterion} className="border-t border-gray-100">
                    <td className="text-xs font-medium text-gray-600 py-3 pr-4">{criteriaLabels[criterion]}</td>
                    {sortedCandidates.map(c => {
                      const score = c.scores[criterion]
                      return (
                        <td key={c.slug} className="text-center py-3 px-1">
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className="text-sm sm:text-base font-bold"
                              style={{ color: getScoreHex(score) }}
                            >
                              {score.toFixed(1)}
                            </span>
                            <div className="w-full max-w-[60px] bg-gray-100 h-1.5 rounded-full mx-auto">
                              <div
                                className="h-1.5 rounded-full"
                                style={{
                                  width: `${(score / 10) * 100}%`,
                                  backgroundColor: getScoreHex(score)
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                {/* Global score row */}
                <tr className="border-t-2 border-gray-200">
                  <td className="text-xs font-bold text-gray-900 py-3 pr-4 uppercase tracking-wider">Global</td>
                  {sortedCandidates.map(c => (
                    <td key={c.slug} className="text-center py-3 px-1">
                      <span
                        className="text-lg sm:text-xl font-bold"
                        style={{ color: getScoreHex(c.globalScore) }}
                      >
                        {c.globalScore}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== SECTION 3: PODIUM VISUEL (score bars) ===== */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Scores globaux</h2>
          <div className="space-y-4">
            {sortedCandidates.map((candidate, i) => (
              <div key={candidate.slug} className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2.5 w-36 sm:w-44 shrink-0">
                  <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                  <div
                    className="relative w-8 h-8 rounded-full p-[2px] shrink-0"
                    style={{ background: candidate.politicalColor }}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image src={candidate.photo} alt={candidate.name} fill className="object-cover rounded-full" sizes="32px" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">{candidate.name.split(' ').pop()}</span>
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 h-6 sm:h-7 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full flex items-center transition-all"
                      style={{
                        width: `${(candidate.globalScore / maxScore) * 100}%`,
                        backgroundColor: getScoreHex(candidate.globalScore),
                      }}
                    >
                      <span className="text-white text-xs font-bold ml-3 drop-shadow-sm">
                        {candidate.globalScore}/10
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider w-16 text-right hidden sm:block ${getScoreColor(candidate.globalScore)}`}>
                    {getScoreLabel(candidate.globalScore)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTION 4: MEILLEURES & PIRES MESURES ===== */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          {/* Best */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-5 rounded-full bg-palette-blue" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Meilleures mesures</h2>
            </div>
            <p className="text-xs text-gray-500 mb-5 ml-4">Les propositions les plus solides, tous candidats confondus</p>
            <div className="space-y-3">
              {allBestMeasures.map((measure, i) => (
                <Link key={i} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-gray-200">
                      <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="28px" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-palette-blue transition-colors">{measure.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{measure.detail}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Worst */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-5 rounded-full bg-palette-red" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Mesures problématiques</h2>
            </div>
            <p className="text-xs text-gray-500 mb-5 ml-4">Les propositions jugées irréalistes ou insuffisantes</p>
            <div className="space-y-3">
              {allWorstMeasures.map((measure, i) => (
                <Link key={i} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-red-50/50 transition-colors">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 mt-0.5 border border-gray-200">
                      <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="28px" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-palette-red transition-colors">{measure.title}</span>
                        {measure.type === 'unrealistic' && (
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded font-bold">irréaliste</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{measure.detail}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SECTION 5: LES CANDIDATS (profils politiques) ===== */}
        <div id="candidats" className="scroll-mt-20 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Les candidats</h2>
          <p className="text-sm text-gray-500 mb-6">Positionnement politique et accès aux programmes officiels</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.slug} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
                <div className="h-1" style={{ backgroundColor: candidate.politicalColor }} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="relative w-11 h-11 rounded-full p-[2px] shrink-0"
                      style={{ background: candidate.politicalColor }}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <div className="relative w-full h-full">
                          <Image src={candidate.photo} alt={candidate.name} fill className="object-cover rounded-full" sizes="44px" />
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900">{candidate.name}</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: candidate.politicalColor }} />
                        <span className="text-xs text-gray-500 truncate">{candidate.party}</span>
                      </div>
                    </div>
                    <div className={`ml-auto text-lg font-bold shrink-0 ${getScoreColor(candidate.globalScore)}`}>
                      {candidate.globalScore}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{candidate.politicalLine}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={candidate.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold hover:underline transition-colors"
                      style={{ color: candidate.politicalColor }}
                    >
                      Programme officiel &rarr;
                    </a>
                    <Link href={`/candidats/${candidate.slug}`} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">
                      Analyse IA
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTION 6: COMMENT ÇA MARCHE ===== */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Comment ça marche ?</h2>
            <Link href="/methodologie" className="text-sm text-palette-blue font-medium hover:underline">
              Méthodologie complète &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { name: 'Cohérence', desc: 'Logique interne du programme', color: '#3B82F6' },
              { name: 'Solidité', desc: 'Justifications et robustesse technique', color: '#3B82F6' },
              { name: 'Robustesse', desc: 'Réalisme financier et budgétaire', color: '#EAB308' },
              { name: 'Pragmatisme', desc: 'Faisabilité et calendrier', color: '#EAB308' },
              { name: 'Détail', desc: 'Précision des mesures', color: '#EF4444' },
            ].map((c, i) => (
              <div key={c.name} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.color }}>
                  {i + 1}
                </div>
                <div className="text-xs font-semibold text-gray-900">{c.name}</div>
                <div className="text-[10px] text-gray-500 mt-0.5 leading-snug hidden sm:block">{c.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-6 text-xs text-gray-500">
            <span>Non-partisan</span>
            <span>Open source</span>
            <span>Basé sur les programmes officiels</span>
            <span>Février 2026</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 sm:pt-10 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Analyse réalisée par intelligence artificielle sur la base des programmes officiels publiés.
            <br />Aucune affiliation politique. Février 2026.
          </p>
        </footer>
      </main>
    </div>
  )
}
