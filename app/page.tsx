import { candidatesData } from '@/lib/data'
import ThemeFilter from '@/components/ThemeFilter'
import HeroFaces from '@/components/HeroFaces'
import HeroCandidates from '@/components/HeroCandidates'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Image from 'next/image'
import Link from 'next/link'

function getScoreHex(score: number): string {
  if (score >= 7) return '#16a34a'
  if (score >= 5) return '#d97706'
  return '#dc2626'
}

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-score-solid'
  if (score >= 5) return 'text-score-mixed'
  return 'text-score-fragile'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigé'
  return 'Fragile'
}

const measureTags: Record<string, { label: string; bg: string; text: string }> = {
  costed: { label: 'chiffré', bg: 'bg-blue-500/10', text: 'text-blue-600' },
  realistic: { label: 'réaliste', bg: 'bg-score-solid/10', text: 'text-score-solid' },
  unlikely: { label: 'peu probable', bg: 'bg-score-mixed/10', text: 'text-score-mixed' },
  unrealistic: { label: 'irréaliste', bg: 'bg-score-fragile/10', text: 'text-score-fragile' },
  out_of_scope: { label: 'hors compétence', bg: 'bg-purple-500/10', text: 'text-purple-600' },
}

function MeasureTag({ type }: { type: string }) {
  const tag = measureTags[type]
  if (!tag) return null
  return (
    <span className={`text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded font-bold ${tag.bg} ${tag.text}`}>
      {tag.label}
    </span>
  )
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
      <SiteNav />

      <header className="border-b border-[var(--border)] relative overflow-hidden">
        <HeroFaces />
        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-24 relative z-10">
          <div className="floating-in max-w-3xl">
            <span className="kicker mb-5">Municipales Paris 2026</span>
            <h1 className="headline-xl mt-3">
              Les programmes passés au crible de l&apos;IA.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-3 max-w-2xl leading-relaxed">
              6 candidats. 5 critères. Une grille identique.
              On ne recommande personne &mdash; on publie une lecture structurée
              de chaque programme, avec la même rigueur pour tous.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="soft-chip">Programmes officiels</span>
              <span className="soft-chip">Traitement identique</span>
              <span className="soft-chip">Méthodologie publique</span>
              <span className="soft-chip">Dernière MAJ : 13 février</span>
            </div>
          </div>

          <div className="mt-12">
            <HeroCandidates candidates={sortedCandidates.map(c => ({
              slug: c.slug,
              name: c.name,
              photo: c.photo,
              politicalColor: c.politicalColor,
              globalScore: c.globalScore,
            }))} />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-16">
        <section className="mb-10 sm:mb-14">
          <div className="panel-card border-l-4 border-l-accent p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Mise à jour</span>
                  <span className="text-[10px] text-ink-4">13 février 2026</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-ink">Droit de réponse &mdash; Emmanuel Grégoire</h3>
                <p className="text-sm text-ink-3 mt-2 leading-relaxed">
                  L&apos;équipe d&apos;Emmanuel Grégoire nous a transmis des informations complémentaires et rectificatifs
                  concernant notre analyse. Après vérification, plusieurs points ont été corrigés&nbsp;:
                  le périphérique est un projet pluri-mandatures (premier tronçon Porte de Gentilly),
                  les 300 hectares incluent l&apos;ouverture de jardins existants (PLUb),
                  certaines estimations de coûts ont été revues à la baisse,
                  et la section &laquo;&nbsp;Paris Fière&nbsp;&raquo; (culture, innovation, tourisme, droits) a été mieux prise en compte.
                  Ces corrections impactent son score global (6.0 &rarr; 6.6).
                </p>
                <Link href="/candidats/gregoire" className="inline-block mt-3 text-sm font-semibold text-accent hover:underline">
                  Voir l&apos;analyse mise à jour &rarr;
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 panel-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-sm font-bold text-ink">Une erreur ? Des précisions à apporter ?</h3>
              <p className="text-xs text-ink-3 mt-1">
                Candidats, équipes de campagne, citoyens : signalez toute incohérence ou information manquante.
              </p>
            </div>
            <a
              href="https://x.com/pierbapt"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-ink/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Contacter @pierbapt
            </a>
          </div>
        </section>

        <section id="classement" className="mb-14 sm:mb-20 scroll-mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <span className="kicker mb-2">Résultats</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Classement général</h2>
              <p className="text-sm text-ink-3 mt-2">Grille IA appliquée de manière homogène à tous les candidats.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-medium">
              <span className="soft-chip"><span className="w-2 h-2 rounded-full bg-score-solid mr-1.5 inline-block" />Solide 7+</span>
              <span className="soft-chip"><span className="w-2 h-2 rounded-full bg-score-mixed mr-1.5 inline-block" />Mitigé 5-7</span>
              <span className="soft-chip"><span className="w-2 h-2 rounded-full bg-score-fragile mr-1.5 inline-block" />Fragile {'<'}5</span>
            </div>
          </div>
          <ThemeFilter />
        </section>

        <section className="panel-card p-6 sm:p-8 mb-14 sm:mb-20">
          <span className="kicker mb-2">Analyse croisée</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Comparatif par critère</h2>
          <p className="text-sm text-ink-3 mt-2 mb-8">
            Lecture transversale des performances sur les 5 critères d&apos;évaluation.
          </p>

          <div className="overflow-x-auto -mx-2 px-2">
            <table className="w-full min-w-[640px] data-table">
              <thead>
                <tr>
                  <th className="w-32">Critères</th>
                  {sortedCandidates.map((candidate) => (
                    <th key={candidate.slug} className="text-center">
                      <Link href={`/candidats/${candidate.slug}`} className="group inline-flex flex-col items-center gap-1.5">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden">
                          <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="36px" />
                        </div>
                        <span className="text-[10px] text-ink-3 group-hover:text-ink truncate max-w-[80px] normal-case tracking-normal font-medium">
                          {candidate.name.split(' ').pop()}
                        </span>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map((criterion) => (
                  <tr key={criterion.key}>
                    <td className="text-xs font-semibold text-ink-2">{criterion.label}</td>
                    {sortedCandidates.map((candidate) => {
                      const score = candidate.scores[criterion.key]
                      return (
                        <td key={candidate.slug} className="text-center">
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="score-display text-sm" style={{ color: getScoreHex(score) }}>
                              {score.toFixed(1)}
                            </span>
                            <div className="score-bar w-full max-w-[56px]">
                              <div
                                className="score-bar-fill"
                                style={{ width: `${(score / 10) * 100}%`, backgroundColor: getScoreHex(score) }}
                              />
                            </div>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
                <tr className="border-t-2 border-ink/10">
                  <td className="label-mono !text-[10px] py-3">Global</td>
                  {sortedCandidates.map((candidate) => (
                    <td key={candidate.slug} className="text-center py-3">
                      <span className="score-display text-lg" style={{ color: getScoreHex(candidate.globalScore) }}>
                        {candidate.globalScore}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-14 sm:mb-20">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <span className="kicker mb-2">Vue d&apos;ensemble</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Scores globaux</h2>
            </div>
            <span className="label-mono">Normalisé sur 10</span>
          </div>
          <div className="space-y-3">
            {sortedCandidates.map((candidate, index) => (
              <Link key={candidate.slug} href={`/candidats/${candidate.slug}`} className="block group">
                <div className="flex items-center gap-3 sm:gap-4 py-3 border-b border-[var(--border)] last:border-b-0">
                  <span className="score-display text-sm text-ink-4 w-6">#{index + 1}</span>
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0">
                    <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="32px" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-ink w-20 sm:w-36 truncate group-hover:text-accent transition-colors">
                    {candidate.name.split(' ').pop()}
                  </span>

                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 score-bar !h-5">
                      <div
                        className="h-full score-bar-fill flex items-center"
                        style={{
                          width: `${(candidate.globalScore / maxScore) * 100}%`,
                          backgroundColor: getScoreHex(candidate.globalScore),
                        }}
                      >
                        <span className="text-[9px] sm:text-[10px] font-semibold text-white ml-1.5 sm:ml-2.5 score-display whitespace-nowrap">{candidate.globalScore}/10</span>
                      </div>
                    </div>
                    <span className={`label-mono !text-[9px] hidden sm:inline ${getScoreColor(candidate.globalScore)}`}>
                      {getScoreLabel(candidate.globalScore)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-5 mb-14 sm:mb-20">
          <div className="panel-card p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-score-solid" />
              <span className="kicker !text-score-solid">Mesures solides</span>
            </div>
            <h2 className="text-xl font-bold text-ink mt-1">Les plus robustes</h2>
            <p className="text-xs text-ink-3 mb-5 mt-1">Extraits jugés cohérents et documentés.</p>
            <div className="space-y-3">
              {allBestMeasures.map((measure, index) => (
                <Link key={`${measure.slug}-${index}`} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="playful-dash p-3.5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0">
                        <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="28px" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">{measure.title}</span>
                          <MeasureTag type={measure.type} />
                        </div>
                        <div className="text-xs text-ink-3 mt-1 line-clamp-2">{measure.detail}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="panel-card p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-score-fragile" />
              <span className="kicker !text-score-fragile">Points faibles</span>
            </div>
            <h2 className="text-xl font-bold text-ink mt-1">Mesures fragiles</h2>
            <p className="text-xs text-ink-3 mb-5 mt-1">Chiffrage absent, faisabilité douteuse ou hors compétence.</p>
            <div className="space-y-3">
              {allWorstMeasures.map((measure, index) => (
                <Link key={`${measure.slug}-${index}`} href={`/candidats/${measure.slug}`} className="block group">
                  <div className="playful-dash p-3.5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="relative w-7 h-7 rounded-md overflow-hidden shrink-0">
                        <Image src={measure.photo} alt={measure.candidate} fill className="object-cover" sizes="28px" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">{measure.title}</span>
                          <MeasureTag type={measure.type} />
                        </div>
                        <div className="text-xs text-ink-3 mt-1 line-clamp-2">{measure.detail}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="candidats" className="mb-14 sm:mb-20 scroll-mt-24">
          <span className="kicker mb-2">Profils</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Les candidats</h2>
          <p className="text-sm text-ink-3 mt-2 mb-8">Positionnement politique et lien vers les programmes.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCandidates.map((candidate) => (
              <Link key={candidate.slug} href={`/candidats/${candidate.slug}`} className="group">
                <div className="panel-card overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-[3px] rounded-t-[12px]" style={{ backgroundColor: candidate.politicalColor }} />
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-ink truncate group-hover:text-accent transition-colors">{candidate.name}</h3>
                        <div className="text-xs text-ink-3 truncate">{candidate.party}</div>
                      </div>
                      <span className={`score-display text-lg ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</span>
                    </div>

                    <p className="text-xs text-ink-3 leading-relaxed mb-4 line-clamp-2">{candidate.politicalLine}</p>

                    <div className="flex items-center justify-between">
                      <span
                        className="text-xs font-medium"
                        style={{ color: candidate.politicalColor }}
                      >
                        {candidate.party}
                      </span>
                      <span className="text-xs text-ink-4 group-hover:text-accent transition-colors">
                        Analyse &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <span className="kicker mb-2">Méthode</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-ink mt-1">Comment ça marche</h2>
            </div>
            <Link href="/methodologie" className="text-sm text-accent font-medium hover:underline">
              Méthodologie complète &rarr;
            </Link>
          </div>

          <div className="note-grid">
            {[
              { name: 'Cohérence', desc: 'Vision sans contradiction interne' },
              { name: 'Solidité', desc: 'Arguments et contraintes explicites' },
              { name: 'Robustesse', desc: 'Résistance aux aléas budgétaires' },
              { name: 'Pragmatisme', desc: 'Applicabilité à l\'échelle municipale' },
              { name: 'Détail', desc: 'Précision opérationnelle des mesures' },
            ].map((criterion, index) => (
              <div key={criterion.name} className="playful-dash p-4">
                <div className="score-display text-2xl text-ink-4 mb-2">
                  0{index + 1}
                </div>
                <div className="text-sm font-semibold text-ink">{criterion.name}</div>
                <div className="text-xs text-ink-3 mt-1 leading-relaxed">{criterion.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-14 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-ink text-center mb-2">Explorez les outils</h2>
          <p className="text-sm text-ink-3 text-center mb-8">Comparez, analysez, formez-vous une opinion.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link href="/comparateur" className="group playful-dash p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">&#9878;</div>
              <div className="text-sm font-bold text-ink group-hover:text-accent transition-colors">Comparateur</div>
              <div className="text-xs text-ink-3 mt-1">2 candidats face-à-face</div>
            </Link>
            <Link href="/faq" className="group playful-dash p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">&#10067;</div>
              <div className="text-sm font-bold text-ink group-hover:text-accent transition-colors">FAQ</div>
              <div className="text-xs text-ink-3 mt-1">Questions sur le projet</div>
            </Link>
            <Link href="/methodologie" className="group playful-dash p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">&#128269;</div>
              <div className="text-sm font-bold text-ink group-hover:text-accent transition-colors">Méthodologie</div>
              <div className="text-xs text-ink-3 mt-1">Notre protocole détaillé</div>
            </Link>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
