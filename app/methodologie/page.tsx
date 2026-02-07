import Link from 'next/link'

export default function MethodologiePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-block">
            ← Retour au classement
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Méthodologie</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              Une approche scientifique et transparente
            </h2>
            <p className="text-blue-800 leading-relaxed">
              Cette analyse utilise l'intelligence artificielle pour évaluer objectivement les programmes 
              des candidats à la mairie de Paris 2026. L'IA garantit une neutralité totale et une rigueur 
              méthodologique constante dans l'évaluation.
            </p>
          </div>

          {/* Why AI */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pourquoi l'Intelligence Artificielle ?</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                L'utilisation de l'IA présente plusieurs avantages majeurs pour cette analyse :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Neutralité absolue</strong> : L'IA n'a aucune affiliation politique et évalue tous les programmes selon les mêmes critères</li>
                <li><strong>Cohérence méthodologique</strong> : Chaque programme est analysé avec la même grille de lecture</li>
                <li><strong>Capacité d'analyse</strong> : L'IA peut traiter des volumes importants de données et identifier des patterns complexes</li>
                <li><strong>Transparence</strong> : Les critères sont explicites et l'analyse est reproductible</li>
              </ul>
            </div>
          </section>

          {/* Criteria */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Les 5 critères d'évaluation</h2>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Cohérence</h3>
                <p className="text-gray-700">
                  Évalue si les différentes propositions du programme s'articulent logiquement entre elles, 
                  sans contradictions internes. Un programme cohérent présente une vision unifiée où chaque 
                  mesure renforce les autres.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Solidité</h3>
                <p className="text-gray-700">
                  Mesure la robustesse des propositions face aux contraintes réelles : budget municipal, 
                  compétences légales de la mairie, faisabilité technique. Les mesures solides sont 
                  réalistes et bien fondées.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Robustesse</h3>
                <p className="text-gray-700">
                  Analyse la capacité du programme à résister aux aléas et aux changements de contexte. 
                  Un programme robuste anticipe les difficultés et propose des solutions adaptables.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Pragmatisme</h3>
                <p className="text-gray-700">
                  Évalue le caractère concret et applicable des mesures proposées. Les propositions 
                  pragmatiques sont précises, chiffrées et accompagnées de plans de mise en œuvre.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">5. Niveau de détail</h3>
                <p className="text-gray-700">
                  Mesure la précision et l'exhaustivité du programme. Un niveau de détail élevé 
                  témoigne d'un travail approfondi et d'une vraie compréhension des enjeux.
                </p>
              </div>
            </div>
          </section>

          {/* Calculation */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Calcul des notes</h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Chaque critère est noté sur 10 points. La note globale est la moyenne pondérée des 5 critères :
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cohérence : 20%</li>
                <li>Solidité : 20%</li>
                <li>Robustesse : 20%</li>
                <li>Pragmatisme : 20%</li>
                <li>Niveau de détail : 20%</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Cette pondération équilibrée garantit qu'aucun aspect n'est survalorisé par rapport aux autres.
              </p>
            </div>
          </section>

          {/* Transparency */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transparence totale</h2>
            <div className="bg-green-50 rounded-lg p-6">
              <p className="text-green-800">
                Cette analyse se veut totalement transparente. Les critères d'évaluation sont publics, 
                la méthodologie est documentée, et les résultats sont présentés sans filtre. 
                L'objectif est d'éclairer le débat démocratique avec des données objectives et vérifiables.
              </p>
              <p className="text-green-800 mt-4">
                Aucune affiliation politique, aucun financement partisan. Juste des faits et une analyse rigoureuse.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}