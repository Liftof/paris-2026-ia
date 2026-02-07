import CandidateCard from '@/components/CandidateCard'
import { candidatesData } from '@/lib/data'
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

  // Find best & worst per criterion
  const bestCoherence = [...candidatesData].sort((a, b) => b.scores.coherence - a.scores.coherence)[0]
  const bestSolidite = [...candidatesData].sort((a, b) => b.scores.solidite - a.scores.solidite)[0]
  const bestRobustesse = [...candidatesData].sort((a, b) => b.scores.robustesse - a.scores.robustesse)[0]
  const bestPragmatisme = [...candidatesData].sort((a, b) => b.scores.pragmatisme - a.scores.pragmatisme)[0]
  const bestDetail = [...candidatesData].sort((a, b) => b.scores.detail - a.scores.detail)[0]

  // Collect all best measures across candidates
  const allBestMeasures = candidatesData.flatMap(c =>
    c.bestMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug }))
  ).slice(0, 6)

  // Collect all worst/unrealistic measures
  const allWorstMeasures = candidatesData.flatMap(c =>
    c.worstMeasures.map(m => ({ ...m, candidate: c.name, slug: c.slug }))
  ).slice(0, 6)

  // Score distribution
  const highScorers = candidatesData.filter(c => c.globalScore >= 7).length
  const midScorers = candidatesData.filter(c => c.globalScore >= 5 && c.globalScore < 7).length
  const lowScorers = candidatesData.filter(c => c.globalScore < 5).length

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mb-2 tracking-tight">
                Programmes Paris 2026
              </h1>
              <p className="text-gray-500 text-sm">Analyse algorithmique comparative des 6 candidats</p>
            </div>
            <Link
              href="/methodologie"
              className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
            >
              Methodologie
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 border border-gray-200 mb-12 sm:mb-16">
          <div className="bg-white p-6 sm:p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Score moyen</div>
            <div className={`text-4xl sm:text-5xl font-light ${getScoreColor(parseFloat(avgScore))}`}>{avgScore}</div>
            <div className="text-xs text-gray-400 mt-2">/10</div>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Candidats</div>
            <div className="text-4xl sm:text-5xl font-light text-gray-900">{candidatesData.length}</div>
            <div className="text-xs text-gray-400 mt-2">analyses</div>
          </div>
          <div className="bg-white p-6 sm:p-8">
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-3">Criteres</div>
            <div className="text-4xl sm:text-5xl font-light text-gray-900">5</div>
            <div className="text-xs text-gray-400 mt-2">objectifs</div>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Repartition des scores</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            <div className="border-l-4 border-palette-blue pl-4 py-2">
              <div className="text-3xl font-light text-palette-blue">{highScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score &ge; 7/10</div>
              <div className="text-xs text-gray-400">solide</div>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 py-2">
              <div className="text-3xl font-light text-palette-yellow">{midScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score 5-7/10</div>
              <div className="text-xs text-gray-400">mitige</div>
            </div>
            <div className="border-l-4 border-palette-red pl-4 py-2">
              <div className="text-3xl font-light text-palette-red">{lowScorers}</div>
              <div className="text-xs text-gray-500 mt-1">score &lt; 5/10</div>
              <div className="text-xs text-gray-400">insuffisant</div>
            </div>
          </div>

          {/* Criteria means with colored bars */}
          <h3 className="text-lg font-normal text-gray-900 mb-4">Scores moyens par critere</h3>
          <div className="space-y-3">
            {[
              { label: 'Coherence', value: parseFloat(criteriaMeans.coherence), best: bestCoherence },
              { label: 'Solidite', value: parseFloat(criteriaMeans.solidite), best: bestSolidite },
              { label: 'Robustesse', value: parseFloat(criteriaMeans.robustesse), best: bestRobustesse },
              { label: 'Pragmatisme', value: parseFloat(criteriaMeans.pragmatisme), best: bestPragmatisme },
              { label: 'Detail', value: parseFloat(criteriaMeans.detail), best: bestDetail },
            ].map(criterion => (
              <div key={criterion.label} className="flex items-center gap-3 sm:gap-4">
                <span className="text-xs uppercase tracking-wider text-gray-500 w-24 sm:w-28 shrink-0">{criterion.label}</span>
                <div className="flex-1 bg-gray-100 h-3 rounded-full">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${(criterion.value / 10) * 100}%`,
                      backgroundColor: getBarColor(criterion.value)
                    }}
                  />
                </div>
                <span className={`text-sm font-medium w-8 text-right ${getScoreColor(criterion.value)}`}>
                  {criterion.value.toFixed(1)}
                </span>
                <span className="hidden sm:inline text-[10px] text-gray-400 w-32 truncate">
                  Meilleur : {criterion.best.name.split(' ').pop()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Measures Across All Candidates */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">Meilleures mesures identifiees</h2>
          <p className="text-xs text-gray-500 mb-6">Les propositions les plus solides et innovantes tous candidats confondus</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allBestMeasures.map((measure, i) => (
              <Link key={i} href={`/candidats/${measure.slug}`} className="block">
                <div className="border border-gray-200 p-4 hover:border-palette-blue/30 transition-colors group">
                  <div className="flex items-start gap-3">
                    <span className="text-palette-blue text-lg mt-0.5">+</span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 group-hover:text-palette-blue transition-colors">{measure.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{measure.detail}</div>
                      <div className="text-[10px] text-gray-400 mt-2">{measure.candidate}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Worst / Unrealistic Measures */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">Mesures les plus problematiques</h2>
          <p className="text-xs text-gray-500 mb-6">Les propositions jugees irrealistes, insuffisamment financees ou juridiquement fragiles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allWorstMeasures.map((measure, i) => (
              <Link key={i} href={`/candidats/${measure.slug}`} className="block">
                <div className="border border-gray-200 p-4 hover:border-palette-red/30 transition-colors group">
                  <div className="flex items-start gap-3">
                    <span className={`text-lg mt-0.5 ${measure.type === 'unrealistic' ? 'text-palette-red' : 'text-palette-yellow'}`}>
                      {measure.type === 'unrealistic' ? '!' : '-'}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-palette-red transition-colors">{measure.title}</span>
                        {measure.type === 'unrealistic' && (
                          <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-palette-red/10 text-palette-red rounded-sm">irrealiste</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">{measure.detail}</div>
                      <div className="text-[10px] text-gray-400 mt-2">{measure.candidate}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12 sm:mb-16 pb-12 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">A propos de cette analyse</h2>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 mb-8">
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-4">Methodologie</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                Chaque programme est evalue selon cinq criteres quantifiables :
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-palette-blue mt-0.5">1</span>
                  <span><strong>Coherence :</strong> Articulation logique des propositions entre elles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-blue mt-0.5">2</span>
                  <span><strong>Solidite :</strong> Qualite des justifications et robustesse technique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-yellow mt-0.5">3</span>
                  <span><strong>Robustesse :</strong> Realisme financier et budgetaire</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-yellow mt-0.5">4</span>
                  <span><strong>Pragmatisme :</strong> Faisabilite operationnelle et calendrier</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-palette-red mt-0.5">5</span>
                  <span><strong>Detail :</strong> Precision des mesures et indicateurs</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-normal text-gray-900 mb-4">Principes</h3>
              <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                Cette plateforme fournit une analyse factuelle et non-partisane des programmes electoraux pour les municipales parisiennes 2026.
              </p>
              <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 space-y-2">
                <p><strong>Independance :</strong> Aucune affiliation politique</p>
                <p><strong>Transparence :</strong> Methodologie publique et reproductible</p>
                <p><strong>Sources :</strong> Programmes officiels publies par les candidats</p>
                <p><strong>Mise a jour :</strong> Fevrier 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ranking */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-2">Classement</h2>
          <p className="text-xs text-gray-500 mb-6">Cliquez sur un candidat pour voir l'analyse detaillee</p>
          <div className="space-y-3 sm:space-y-4">
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
        <footer className="pt-8 sm:pt-12 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            Analyse realisee par algorithme sur la base des programmes officiels publies.
            Aucune affiliation politique. Fevrier 2026.
          </p>
        </footer>
      </main>
    </div>
  )
}
