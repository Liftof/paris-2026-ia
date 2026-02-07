import Link from 'next/link'

export default function MethodologiePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">Paris 2026</span>
            <span className="text-xs bg-palette-blue/10 text-palette-blue px-2 py-0.5 rounded-full font-medium">IA</span>
          </Link>
          <Link href="/#classement" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            Classement
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-900 transition-colors mb-6 inline-block">
            &larr; Retour à l&apos;accueil
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 tracking-tight">Méthodologie</h1>
          <p className="text-gray-500 mt-2 text-base">Comment l&apos;IA évalue les programmes des candidats</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Intro */}
        <div className="bg-blue-50 border border-palette-blue/20 p-5 sm:p-6 mb-8 sm:mb-12 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Une approche algorithmique et transparente
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Cette analyse utilise l&apos;intelligence artificielle pour évaluer objectivement les programmes
            des candidats à la mairie de Paris 2026. L&apos;IA garantit une neutralité totale et une rigueur
            méthodologique constante dans l&apos;évaluation.
          </p>
        </div>

        {/* Why AI */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Pourquoi l&apos;Intelligence Artificielle ?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-sm font-semibold text-gray-900 mb-2">Neutralité absolue</div>
              <p className="text-xs text-gray-600 leading-relaxed">L&apos;IA n&apos;a aucune affiliation politique et évalue tous les programmes selon les mêmes critères.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-sm font-semibold text-gray-900 mb-2">Cohérence méthodologique</div>
              <p className="text-xs text-gray-600 leading-relaxed">Chaque programme est analysé avec la même grille de lecture, sans biais humain.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-sm font-semibold text-gray-900 mb-2">Capacité d&apos;analyse</div>
              <p className="text-xs text-gray-600 leading-relaxed">L&apos;IA traite des volumes importants de données et identifie des patterns complexes.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5">
              <div className="text-sm font-semibold text-gray-900 mb-2">Transparence</div>
              <p className="text-xs text-gray-600 leading-relaxed">Les critères sont explicites et l&apos;analyse est reproductible par quiconque.</p>
            </div>
          </div>
        </div>

        {/* 5 Criteria */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Les 5 critères d&apos;évaluation</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-palette-blue pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">1. Cohérence</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les différentes propositions s&apos;articulent-elles logiquement entre elles, sans contradictions internes ?
                Un programme cohérent présente une vision unifiée où chaque mesure renforce les autres.
              </p>
            </div>
            <div className="border-l-4 border-palette-blue pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">2. Solidité</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les propositions sont-elles robustes face aux contraintes réelles : budget municipal,
                compétences légales de la mairie, faisabilité technique ?
              </p>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">3. Robustesse</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Le programme résiste-t-il aux aléas et aux changements de contexte ?
                Un programme robuste anticipe les difficultés et propose des solutions adaptables.
              </p>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">4. Pragmatisme</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les mesures proposées sont-elles concrètes et applicables ?
                Les propositions pragmatiques sont précisées, chiffrées et accompagnées de plans de mise en oeuvre.
              </p>
            </div>
            <div className="border-l-4 border-palette-red pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">5. Niveau de détail</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Quel est le niveau de précision et d&apos;exhaustivité du programme ?
                Un détail élevé témoigne d&apos;un travail approfondi et d&apos;une vraie compréhension des enjeux.
              </p>
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Calcul des notes</h2>
          <div className="bg-gray-50 rounded-lg p-5 sm:p-6">
            <p className="text-sm text-gray-700 mb-4">
              Chaque critère est noté sur 10 points. La note globale est la moyenne pondérée des 5 critères :
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {['Cohérence', 'Solidité', 'Robustesse', 'Pragmatisme', 'Détail'].map(c => (
                <div key={c} className="text-center bg-white rounded-lg border border-gray-200 p-3">
                  <div className="text-xs text-gray-500">{c}</div>
                  <div className="text-lg font-bold text-gray-900 mt-1">20%</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Cette pondération équilibrée garantit qu&apos;aucun aspect n&apos;est surévalué par rapport aux autres.
            </p>
          </div>
        </div>

        {/* Color Legend */}
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Lecture des scores</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-palette-blue">7+</div>
              <div className="text-xs font-semibold text-palette-blue mt-1">Solide</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Programme bien construit et crédible</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-palette-yellow">5-7</div>
              <div className="text-xs font-semibold text-palette-yellow mt-1">Mitigé</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Points positifs mais lacunes importantes</div>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-palette-red">&lt;5</div>
              <div className="text-xs font-semibold text-palette-red mt-1">Insuffisant</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Améliorations significatives nécessaires</div>
            </div>
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-xl">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Transparence totale</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Cette analyse se veut totalement transparente. Les critères d&apos;évaluation sont publics,
            la méthodologie est documentée, et les résultats sont présentés sans filtre.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Aucune affiliation politique, aucun financement partisan.
            L&apos;objectif est d&apos;éclairer le débat démocratique avec des données objectives et vérifiables.
          </p>
        </div>
      </main>
    </div>
  )
}
