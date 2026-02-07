import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

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

export default function HomePage() {
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)

  const avgScore = (candidatesData.reduce((sum, c) => sum + c.globalScore, 0) / candidatesData.length).toFixed(1)
  const criteriaMeans = {
    coherence: (candidatesData.reduce((s, c) => s + c.scores.coherence, 0) / candidatesData.length).toFixed(1),
    solidite: (candidatesData.reduce((s, c) => s + c.scores.solidite, 0) / candidatesData.length).toFixed(1),
    robustesse: (candidatesData.reduce((s, c) => s + c.scores.robustesse, 0) / candidatesData.length).toFixed(1),
    pragmatisme: (candidatesData.reduce((s, c) => s + c.scores.pragmatisme, 0) / candidatesData.length).toFixed(1),
    detail: (candidatesData.reduce((s, c) => s + c.scores.detail, 0) / candidatesData.length).toFixed(1),
  }

  const bestCoherence = [...candidatesData].sort((a, b) => b.scores.coherence - a.scores.coherence)[0]
  const bestSolidite = [...candidatesData].sort((a, b) => b.scores.solidite - a.scores.solidite)[0]
  const bestRobustesse = [...candidatesData].sort((a, b) => b.scores.robustesse - a.scores.robustesse)[0]
  const bestPragmatisme = [...candidatesData].sort((a, b) => b.scores.pragmatisme - a.scores.pragmatisme)[0]
  const bestDetail = [...candidatesData].sort((a, b) => b.scores.detail - a.scores.detail)[0]

  const allBestMeasures = candidatesData.flatMap(c =>
    c.bestMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug }))
  ).slice(0, 6)

  const allWorstMeasures = candidatesData.flatMap(c =>
    c.worstMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug }))
  ).slice(0, 6)

  const highScorers = candidatesData.filter(c => c.globalScore >= 7).length
  const midScorers = candidatesData.filter(c => c.globalScore >= 5 && c.globalScore < 7).length
  const lowScorers = candidatesData.filter(c => c.globalScore < 5).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">Paris 2026</span>
            <span className="text-xs bg-palette-blue/10 text-palette-blue px-2 py-0.5 rounded-full font-medium">IA</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/methodologie" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Méthodologie
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Qui a le meilleur programme pour Paris&nbsp;?
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed mb-8">
              L&apos;intelligence artificielle analyse les programmes des 6 candidats à la mairie de Paris 2026.
              Une évaluation objective, transparente et non-partisane.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#classement" className="bg-palette-blue text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Voir le classement
              </a>
              <Link href="/methodologie" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                Comment ça marche
              </Link>
            </div>
          </div>

          {/* Candidate faces row */}
          <div className="mt-12 flex items-center gap-3 sm:gap-4">
            {sortedCandidates.map((candidate, i) => (
              <Link key={candidate.slug} href={`/candidats/${candidate.slug}`} className="group relative">
                <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 transition-transform group-hover:scale-110 ${
                  i === 0 ? 'border-palette-blue' : i < 3 ? 'border-gray-300' : 'border-gray-200'
                }`}>
                  <Image
                    src={candidate.photo}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-gray-400">
                  {candidate.name.split(' ').pop()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-14">
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">Score moyen</div>
            <div className={`text-3xl sm:text-4xl font-bold ${getScoreColor(parseFloat(avgScore))}`}>{avgScore}</div>
            <div className="text-xs text-gray-400 mt-1">/10</div>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">Candidats</div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">{candidatesData.length}</div>
            <div className="text-xs text-gray-400 mt-1">analysés</div>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">Critères</div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-400 mt-1">objectifs</div>
          </div>
          <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="text-xs uppercase tracking-wider text-gray-400 mb-2">Analyse</div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-900">IA</div>
            <div className="text-xs text-gray-400 mt-1">non-partisane</div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Répartition des scores</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-palette-blue">{highScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score &ge; 7/10</div>
              <div className="text-xs font-medium text-palette-blue mt-0.5">Solide</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-palette-yellow">{midScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score 5-7/10</div>
              <div className="text-xs font-medium text-palette-yellow mt-0.5">Mitigé</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-palette-red">{lowScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score &lt; 5/10</div>
              <div className="text-xs font-medium text-palette-red mt-0.5">Insuffisant</div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-4">Scores moyens par critère</h3>
          <div className="space-y-3">
            {[
              { label: 'Cohérence', value: parseFloat(criteriaMeans.coherence), best: bestCoherence },
              { label: 'Solidité', value: parseFloat(criteriaMeans.solidite), best: bestSolidite },
              { label: 'Robustesse', value: parseFloat(criteriaMeans.robustesse), best: bestRobustesse },
              { label: 'Pragmatisme', value: parseFloat(criteriaMeans.pragmatisme), best: bestPragmatisme },
              { label: 'Détail', value: parseFloat(criteriaMeans.detail), best: bestDetail },
            ].map(criterion => (
              <div key={criterion.label} className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs font-medium text-gray-600 w-24 sm:w-28 shrink-0">{criterion.label}</span>
                <div className="flex-1 bg-gray-100 h-3 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${(criterion.value / 10) * 100}%`,
                      backgroundColor: getBarColor(criterion.value)
                    }}
                  />
                </div>
                <span className={`text-sm font-bold w-8 text-right ${getScoreColor(criterion.value)}`}>
                  {criterion.value.toFixed(1)}
                </span>
                <span className="hidden sm:inline text-[10px] text-gray-400 w-32 truncate">
                  Meilleur : {criterion.best.name.split(' ').pop()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Measures */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Meilleures mesures identifiées</h2>
          <p className="text-sm text-gray-500 mb-6">Les propositions les plus solides et innovantes, tous candidats confondus</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allBestMeasures.map((measure, i) => (
              <Link key={i} href={`/candidats/${measure.slug}`} className="block">
                <div className="border border-gray-100 rounded-lg p-4 hover:border-palette-blue/40 hover:shadow-sm transition-all group">
                  <div className="flex items-start gap-3">
                    <span className="text-palette-blue text-lg mt-0.5 font-bold">+</span>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 group-hover:text-palette-blue transition-colors">{measure.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{measure.detail}</div>
                      <div className="text-[11px] text-gray-400 mt-2 font-medium">{measure.candidate}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Worst Measures */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Mesures les plus problématiques</h2>
          <p className="text-sm text-gray-500 mb-6">Les propositions jugées irréalistes, insuffisamment financées ou juridiquement fragiles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allWorstMeasures.map((measure, i) => (
              <Link key={i} href={`/candidats/${measure.slug}`} className="block">
                <div className="border border-gray-100 rounded-lg p-4 hover:border-palette-red/30 hover:shadow-sm transition-all group">
                  <div className="flex items-start gap-3">
                    <span className={`text-lg mt-0.5 font-bold ${measure.type === 'unrealistic' ? 'text-palette-red' : 'text-palette-yellow'}`}>
                      {measure.type === 'unrealistic' ? '!' : '-'}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900 group-hover:text-palette-red transition-colors">{measure.title}</span>
                        {measure.type === 'unrealistic' && (
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded font-bold">irréaliste</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{measure.detail}</div>
                      <div className="text-[11px] text-gray-400 mt-2 font-medium">{measure.candidate}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* About / How it works */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">5 critères objectifs</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Chaque programme est évalué selon cinq critères quantifiables :
              </p>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-palette-blue w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                  <span><strong>Cohérence :</strong> Articulation logique des propositions entre elles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 text-palette-blue w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                  <span><strong>Solidité :</strong> Qualité des justifications et robustesse technique</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-yellow-100 text-palette-yellow w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                  <span><strong>Robustesse :</strong> Réalisme financier et budgétaire</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-yellow-100 text-palette-yellow w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                  <span><strong>Pragmatisme :</strong> Faisabilité opérationnelle et calendrier</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-red-100 text-palette-red w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">5</span>
                  <span><strong>Détail :</strong> Précision des mesures et indicateurs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-4">Principes</h3>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                Cette plateforme fournit une analyse factuelle et non-partisane des programmes électoraux pour les municipales parisiennes 2026.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">Indépendance</p>
                  <p className="text-gray-500 text-xs">Aucune affiliation politique</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">Transparence</p>
                  <p className="text-gray-500 text-xs">Méthodologie publique et reproductible</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-gray-900 mb-1">Sources</p>
                  <p className="text-gray-500 text-xs">Programmes officiels publiés par les candidats</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Candidates Profiles */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-10 sm:mb-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Les candidats</h2>
          <p className="text-sm text-gray-500 mb-6">Découvrez le positionnement politique de chaque candidat et accédez à leur programme officiel</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedCandidates.map((candidate) => (
              <div key={candidate.slug} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all group">
                <div className="h-1.5" style={{ backgroundColor: candidate.politicalColor }} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2" style={{ borderColor: candidate.politicalColor }}>
                      <Image
                        src={candidate.photo}
                        alt={candidate.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{candidate.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: candidate.politicalColor }} />
                        <span className="text-xs text-gray-500">{candidate.party}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{candidate.politicalLine}</p>
                  <div className="flex items-center justify-between">
                    <a
                      href={candidate.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium hover:underline transition-colors"
                      style={{ color: candidate.politicalColor }}
                    >
                      Voir le programme &rarr;
                    </a>
                    <Link href={`/candidats/${candidate.slug}`} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">
                      Notre analyse
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking */}
        <div id="classement" className="mb-10 sm:mb-14 scroll-mt-20">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Classement</h2>
          <p className="text-sm text-gray-500 mb-6">Cliquez sur un candidat pour voir l&apos;analyse détaillée</p>
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
