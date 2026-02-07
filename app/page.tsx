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
  if (score >= 5) return '#D97706'
  return '#EA580C'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigé'
  return 'Fragile'
}

const criteria = [
  { key: 'coherence', label: 'Cohérence' },
  { key: 'solidite', label: 'Solidité' },
  { key: 'robustesse', label: 'Robustesse' },
  { key: 'pragmatisme', label: 'Pragmatisme' },
  { key: 'detail', label: 'Détail' },
] as const

export default function HomePage() {
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const maxScore = sortedCandidates[0]?.globalScore ?? 10
  const averageScore = (sortedCandidates.reduce((total, candidate) => total + candidate.globalScore, 0) / sortedCandidates.length).toFixed(1)

  const allBestMeasures = candidatesData
    .flatMap((candidate) =>
      candidate.bestMeasures.map((measure) => ({
        ...measure,
        candidate: candidate.name,
        slug: candidate.slug,
        photo: candidate.photo,
      })),
    )
    .slice(0, 6)

  const allWorstMeasures = candidatesData
    .flatMap((candidate) =>
      candidate.worstMeasures.map((measure) => ({
        ...measure,
        candidate: candidate.name,
        slug: candidate.slug,
        photo: candidate.photo,
      })),
    )
    .slice(0, 6)

  return (
    <div className="site-shell min-h-screen">
      <nav className="site-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg font-bold text-slate-900">Paris 2026</span>
            <span className="kicker">Labo indépendant</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#candidats" className="text-sm text-slate-500 hover:text-slate-900 hidden sm:block">
              Candidats
            </a>
            <Link href="/methodologie" className="text-sm text-slate-500 hover:text-slate-900">
              Méthodologie
            </Link>
            <Link href="/hero" className="text-sm text-slate-500 hover:text-slate-900">
              Hero
            </Link>
          </div>
        </div>
      </nav>

      <header className="relative overflow-hidden border-b border-slate-200/60">
        <div className="absolute -left-14 top-10 w-40 h-40 rounded-full bg-sky-200/40 blur-2xl" />
        <div className="absolute right-0 top-4 w-44 h-44 rounded-full bg-amber-200/50 blur-2xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="hero-panel floating-in p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute -right-12 -top-10 w-32 h-32 rounded-full border border-slate-200/70" />
            <div className="absolute right-16 top-8 w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="absolute right-8 top-16 w-2 h-2 rounded-full bg-sky-500/70" />

            <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
              <div>
                <span className="kicker mb-4">Analyse publique non partisane</span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Un labo indépendant qui publie l&apos;évaluation IA des programmes 2026.
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  Nous ne vendons rien ici. Nous publions une lecture structurée de robustesse, cohérence et sérieux,
                  à partir des programmes officiels, avec la même grille pour tous les candidats.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="soft-chip">Corpus: programmes officiels</span>
                  <span className="soft-chip">Traitement identique pour tous</span>
                  <span className="soft-chip">Méthodologie publique</span>
                  <span className="soft-chip">Mise à jour février 2026</span>
                </div>
              </div>

              <div className="playful-dash bg-white/75 p-4 sm:p-5">
                <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500 font-semibold mb-3">Indicateurs du labo</div>
                <div className="space-y-2.5">
                  <div className="score-pill flex items-center justify-between">
                    <span className="text-xs text-slate-500">Candidats étudiés</span>
                    <span className="text-sm font-bold text-slate-900">{sortedCandidates.length}</span>
                  </div>
                  <div className="score-pill flex items-center justify-between">
                    <span className="text-xs text-slate-500">Critères publics</span>
                    <span className="text-sm font-bold text-slate-900">5</span>
                  </div>
                  <div className="score-pill flex items-center justify-between">
                    <span className="text-xs text-slate-500">Moyenne globale</span>
                    <span className="text-sm font-bold text-slate-900">{averageScore}/10</span>
                  </div>
                  <div className="score-pill flex items-center justify-between">
                    <span className="text-xs text-slate-500">Affiliation politique</span>
                    <span className="text-sm font-bold text-slate-900">Aucune</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="playful-dash bg-white/60 mt-7 sm:mt-8 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {sortedCandidates.map((candidate) => (
                  <Link key={candidate.slug} href={`/candidats/${candidate.slug}`} className="group flex flex-col items-center gap-1.5">
                    <div
                      className="relative w-14 h-14 sm:w-[70px] sm:h-[70px] rounded-full p-[3px] transition-transform group-hover:scale-105"
                      style={{ background: `linear-gradient(140deg, ${candidate.politicalColor}, ${candidate.politicalColor}77)` }}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                        <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="70px" />
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                      {candidate.name.split(' ').pop()}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section id="classement" className="mb-10 sm:mb-14 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Classement général</h2>
              <p className="text-sm text-slate-500 mt-2">Résultat de la grille IA appliquée de manière homogène.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] font-semibold">
              <span className="soft-chip text-palette-blue">Solide 7+</span>
              <span className="soft-chip text-palette-yellow">Mitigé 5-7</span>
              <span className="soft-chip text-palette-red">Fragile {'<'}5</span>
            </div>
          </div>
          <div className="space-y-3">
            {sortedCandidates.map((candidate, index) => (
              <CandidateCard key={candidate.slug} candidate={candidate} rank={index + 1} />
            ))}
          </div>
        </section>

        <section className="panel-card p-5 sm:p-8 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Comparatif par critère</h2>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            Lecture transversale des performances sur cohérence, solidité, robustesse, pragmatisme et détail.
          </p>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr>
                  <th className="text-left text-xs text-slate-500 pb-4 w-32">Critères</th>
                  {sortedCandidates.map((candidate) => (
                    <th key={candidate.slug} className="pb-4 text-center px-1">
                      <Link href={`/candidats/${candidate.slug}`} className="group inline-flex flex-col items-center gap-1">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                          <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="40px" />
                        </div>
                        <span className="text-[11px] text-slate-600 font-medium group-hover:text-slate-900 truncate max-w-[88px]">
                          {candidate.name.split(' ').pop()}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((criterion) => (
                  <tr key={criterion.key} className="border-t border-slate-200/70">
                    <td className="text-xs sm:text-sm font-semibold text-slate-700 py-3 pr-3">{criterion.label}</td>
                    {sortedCandidates.map((candidate) => {
                      const score = candidate.scores[criterion.key]
                      return (
                        <td key={candidate.slug} className="py-3 px-1 text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-sm sm:text-base font-bold" style={{ color: getScoreHex(score) }}>
                              {score.toFixed(1)}
                            </span>
                            <div className="w-full max-w-[62px] h-1.5 rounded-full bg-slate-200/60">
                              <div
                                className="h-1.5 rounded-full"
                                style={{ width: `${(score / 10) * 100}%`, backgroundColor: getScoreHex(score) }}
                              />
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-300/70">
                  <td className="text-xs sm:text-sm font-bold text-slate-900 py-3 pr-3 uppercase tracking-[0.12em]">Global</td>
                  {sortedCandidates.map((candidate) => (
                    <td key={candidate.slug} className="text-center py-3 px-1">
                      <span className="text-lg sm:text-xl font-bold" style={{ color: getScoreHex(candidate.globalScore) }}>
                        {candidate.globalScore}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel-card p-5 sm:p-8 mb-10 sm:mb-14">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Scores globaux</h2>
            <span className="text-xs uppercase tracking-[0.12em] text-slate-500 font-semibold">Visualisation normalisée</span>
          </div>
          <div className="space-y-4">
            {sortedCandidates.map((candidate, index) => (
              <div key={candidate.slug} className="playful-dash bg-white/72 p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs font-bold text-slate-400 w-5">#{index + 1}</span>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-white">
                    <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="36px" />
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-slate-900 w-28 sm:w-36 truncate">
                    {candidate.name.split(' ').pop()}
                  </span>

                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 h-6 rounded-full bg-slate-200/60 overflow-hidden">
                      <div
                        className="h-full rounded-full flex items-center"
                        style={{
                          width: `${(candidate.globalScore / maxScore) * 100}%`,
                          backgroundColor: getScoreHex(candidate.globalScore),
                        }}
                      >
                        <span className="text-[11px] font-semibold text-white ml-3">{candidate.globalScore}/10</span>
                      </div>
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-[0.12em] hidden sm:inline ${getScoreColor(candidate.globalScore)}`}>
                      {getScoreLabel(candidate.globalScore)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="panel-card p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-5 rounded-full bg-palette-blue" />
              <h2 className="text-xl font-bold text-slate-900">Mesures les plus solides</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5 ml-4">Extraits jugés robustes dans le corpus analysé.</p>
            <div className="space-y-3">
              {allBestMeasures.map((measure, index) => (
                <Link key={`${measure.slug}-${index}`} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="playful-dash bg-white/70 p-3 sm:p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shrink-0">
                        <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-palette-blue">{measure.title}</div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">{measure.detail}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel-card p-5 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-5 rounded-full bg-palette-red" />
              <h2 className="text-xl font-bold text-slate-900">Mesures fragiles</h2>
            </div>
            <p className="text-xs text-slate-500 mb-5 ml-4">Points nécessitant chiffrage, faisabilité ou clarification.</p>
            <div className="space-y-3">
              {allWorstMeasures.map((measure, index) => (
                <Link key={`${measure.slug}-${index}`} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="playful-dash bg-white/70 p-3 sm:p-3.5">
                    <div className="flex items-start gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-white shrink-0">
                        <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="32px" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 group-hover:text-palette-red">{measure.title}</span>
                          {measure.type === 'unrealistic' && (
                            <span className="text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded bg-palette-red/10 text-palette-red font-bold">
                              irréaliste
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2">{measure.detail}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="candidats" className="mb-10 sm:mb-14 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Les candidats</h2>
          <p className="text-sm text-slate-500 mt-2 mb-6">Positionnement politique et lien vers les programmes originaux.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.slug} className="panel-card overflow-hidden">
                <div className="h-1.5" style={{ backgroundColor: candidate.politicalColor }} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-white shrink-0">
                      <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="44px" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{candidate.name}</h3>
                      <div className="text-xs text-slate-500 truncate">{candidate.party}</div>
                    </div>
                    <span className={`ml-auto text-lg font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{candidate.politicalLine}</p>

                  <div className="flex items-center justify-between">
                    <a
                      href={candidate.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold"
                      style={{ color: candidate.politicalColor }}
                    >
                      Programme officiel →
                    </a>
                    <Link href={`/candidats/${candidate.slug}`} className="text-xs text-slate-500 hover:text-slate-900">
                      Analyse complète
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-5 sm:p-8 mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Comment lire les résultats</h2>
            <Link href="/methodologie" className="text-sm text-palette-blue font-semibold hover:underline">
              Voir la méthodologie complète →
            </Link>
          </div>

          <div className="note-grid">
            {[
              { name: 'Cohérence', desc: 'Vision sans contradiction interne', color: '#3B82F6' },
              { name: 'Solidité', desc: 'Arguments et contraintes explicites', color: '#3B82F6' },
              { name: 'Robustesse', desc: 'Résistance aux aléas', color: '#D97706' },
              { name: 'Pragmatisme', desc: 'Applicabilité municipale', color: '#D97706' },
              { name: 'Détail', desc: 'Niveau de précision opérationnelle', color: '#EA580C' },
            ].map((criterion, index) => (
              <div key={criterion.name} className="playful-dash bg-white/74 p-3.5 sm:p-4">
                <div
                  className="w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center mb-2"
                  style={{ backgroundColor: criterion.color }}
                >
                  {index + 1}
                </div>
                <div className="text-sm font-semibold text-slate-900">{criterion.name}</div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">{criterion.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <footer className="pt-8 pb-2 border-t border-slate-200/70">
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Labo indépendant sans affiliation politique. Analyse IA appliquée à des sources publiques.
            <br />Objectif: rendre la comparaison des programmes plus transparente et vérifiable.
          </p>
        </footer>
      </main>
    </div>
  )
}
