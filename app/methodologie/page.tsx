import Header from '@/components/Header';

export default function MethodologiePage() {
  return (
    <div>
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Méthodologie de l'Analyse
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pourquoi une analyse par IA ?
          </h2>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              Dans un contexte politique polarisé, l'intelligence artificielle offre une perspective 
              unique : celle d'une analyse <strong>objective et non-partisane</strong>. L'IA n'a pas 
              d'opinions politiques, pas de préférences idéologiques, pas d'intérêts électoraux.
            </p>
            <p className="mb-4">
              Elle évalue uniquement la <strong>qualité technique</strong> des propositions selon 
              des critères mesurables et appliqués de manière identique à tous les candidats.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Les 5 Critères d'Évaluation
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                1. Cohérence Interne (20%)
              </h3>
              <p className="text-gray-700 mb-3">
                Les différentes propositions du programme sont-elles compatibles entre elles ? 
                Y a-t-il des contradictions flagrantes ?
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-600">
                  <strong>Exemple :</strong> Promettre à la fois de réduire massivement les impôts 
                  ET d'augmenter fortement les dépenses publiques serait incohérent.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                2. Solidité Technique (20%)
              </h3>
              <p className="text-gray-700 mb-3">
                Les propositions sont-elles techniquement réalisables ? S'appuient-elles sur 
                des données factuelles et des expertises reconnues ?
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-600">
                  <strong>Exemple :</strong> Une proposition avec des chiffrages précis, des exemples 
                  de villes où cela fonctionne, et un calendrier réaliste obtient une bonne note.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                3. Robustesse Budgétaire (20%)
              </h3>
              <p className="text-gray-700 mb-3">
                Les propositions sont-elles financièrement viables ? Le candidat identifie-t-il 
                clairement comment financer ses mesures ?
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-600">
                  <strong>Exemple :</strong> Un programme qui détaille les sources de financement 
                  (économies, nouvelles recettes, réallocations) est mieux noté qu'un programme 
                  sans chiffrage.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                4. Pragmatisme (20%)
              </h3>
              <p className="text-gray-700 mb-3">
                Les propositions tiennent-elles compte des contraintes réelles (juridiques, 
                institutionnelles, sociales) ? Le candidat anticipe-t-il les obstacles ?
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-600">
                  <strong>Exemple :</strong> Reconnaître qu'une mesure nécessite l'accord de l'État 
                  ou de la Région montre du pragmatisme. Ignorer ces contraintes est pénalisé.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">
                5. Détail & Précision (20%)
              </h3>
              <p className="text-gray-700 mb-3">
                Le programme est-il suffisamment détaillé ? Les propositions sont-elles précises 
                ou restent-elles vagues et générales ?
              </p>
              <div className="bg-gray-50 rounded p-4">
                <p className="text-sm text-gray-600">
                  <strong>Exemple :</strong> "Créer 6 500 places en crèche d'ici 2032" est plus 
                  précis que "Améliorer l'accueil des jeunes enfants".
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment sont calculées les notes ?
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>
                <strong>Analyse systématique :</strong> L'IA parcourt l'intégralité du programme 
                et identifie toutes les propositions.
              </li>
              <li>
                <strong>Évaluation par critère :</strong> Chaque proposition est évaluée selon 
                les 5 critères, générant des sous-notes.
              </li>
              <li>
                <strong>Agrégation :</strong> Les sous-notes sont moyennées pour obtenir une 
                note par critère (sur 10).
              </li>
              <li>
                <strong>Note finale :</strong> La moyenne pondérée des 5 critères donne la 
                note globale du programme.
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Limites de l'analyse
          </h2>
          <div className="bg-amber-50 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-2">
              ⚠️ Ce que l'IA ne peut pas évaluer
            </h3>
            <ul className="list-disc list-inside space-y-2 text-amber-800">
              <li>La <strong>désirabilité politique</strong> des propositions (l'IA ne juge pas si une mesure est souhaitable)</li>
              <li>La <strong>personnalité</strong> ou le <strong>charisme</strong> des candidats</li>
              <li>L'<strong>historique</strong> et le <strong>bilan</strong> passé des candidats</li>
              <li>Les <strong>valeurs</strong> et <strong>idéologies</strong> sous-jacentes</li>
              <li>La <strong>capacité de leadership</strong> et de négociation</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Transparence totale
          </h2>
          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              Cette analyse se veut <strong>100% transparente</strong>. Les critères sont publics, 
              la méthodologie est explicite, et les résultats sont présentés sans filtre.
            </p>
            <p className="mb-4">
              L'objectif n'est pas de dire aux électeurs pour qui voter, mais de leur fournir 
              une <strong>grille de lecture objective</strong> pour évaluer la qualité technique 
              des programmes proposés.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <p className="text-blue-900 font-semibold">
                🗳️ Le vote reste un choix personnel qui dépend de vos valeurs, priorités et 
                vision pour Paris. Cette analyse n'est qu'un outil parmi d'autres pour éclairer 
                votre décision.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2026 - Analyse réalisée par une IA non-partisane
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Les données proviennent des programmes officiels des candidats
          </p>
        </div>
      </footer>
    </div>
  );
}