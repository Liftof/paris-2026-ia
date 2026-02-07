import Link from 'next/link'

export default function MethodologiePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 mb-4 inline-block underline underline-offset-4">
            &larr; Retour au classement
          </Link>
          <h1 className="text-3xl sm:text-4xl font-light text-gray-900 mt-4 tracking-tight">Methodologie</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Intro */}
        <div className="bg-palette-blue/5 border border-palette-blue/20 p-5 sm:p-6 mb-10 sm:mb-16 rounded-sm">
          <h2 className="text-lg font-normal text-gray-900 mb-3">
            Une approche algorithmique et transparente
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Cette analyse utilise l'intelligence artificielle pour evaluer objectivement les programmes
            des candidats a la mairie de Paris 2026. L'IA garantit une neutralite totale et une rigueur
            methodologique constante dans l'evaluation.
          </p>
        </div>

        {/* Why AI */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Pourquoi l'Intelligence Artificielle ?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Neutralite absolue</div>
              <p className="text-xs text-gray-600">L'IA n'a aucune affiliation politique et evalue tous les programmes selon les memes criteres.</p>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Coherence methodologique</div>
              <p className="text-xs text-gray-600">Chaque programme est analyse avec la meme grille de lecture, sans biais humain.</p>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Capacite d'analyse</div>
              <p className="text-xs text-gray-600">L'IA traite des volumes importants de donnees et identifie des patterns complexes.</p>
            </div>
            <div className="border border-gray-200 p-4">
              <div className="text-sm font-medium text-gray-900 mb-2">Transparence</div>
              <p className="text-xs text-gray-600">Les criteres sont explicites et l'analyse est reproductible par quiconque.</p>
            </div>
          </div>
        </div>

        {/* 5 Criteria */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Les 5 criteres d'evaluation</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-palette-blue pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-medium text-gray-900 mb-1">1. Coherence</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les differentes propositions s'articulent-elles logiquement entre elles, sans contradictions internes ?
                Un programme coherent presente une vision unifiee ou chaque mesure renforce les autres.
              </p>
            </div>
            <div className="border-l-4 border-palette-blue pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-medium text-gray-900 mb-1">2. Solidite</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les propositions sont-elles robustes face aux contraintes reelles : budget municipal,
                competences legales de la mairie, faisabilite technique ?
              </p>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-medium text-gray-900 mb-1">3. Robustesse</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Le programme resiste-t-il aux aleas et aux changements de contexte ?
                Un programme robuste anticipe les difficultes et propose des solutions adaptables.
              </p>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-medium text-gray-900 mb-1">4. Pragmatisme</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Les mesures proposees sont-elles concretes et applicables ?
                Les propositions pragmatiques sont precisees, chiffrees et accompagnees de plans de mise en oeuvre.
              </p>
            </div>
            <div className="border-l-4 border-palette-red pl-4 sm:pl-6 py-3">
              <h3 className="text-sm font-medium text-gray-900 mb-1">5. Niveau de detail</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Quel est le niveau de precision et d'exhaustivite du programme ?
                Un detail eleve temoigne d'un travail approfondi et d'une vraie comprehension des enjeux.
              </p>
            </div>
          </div>
        </div>

        {/* Calculation */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Calcul des notes</h2>
          <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6">
            <p className="text-sm text-gray-700 mb-4">
              Chaque critere est note sur 10 points. La note globale est la moyenne ponderee des 5 criteres :
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
              {['Coherence', 'Solidite', 'Robustesse', 'Pragmatisme', 'Detail'].map(c => (
                <div key={c} className="text-center border border-gray-200 bg-white p-3">
                  <div className="text-xs text-gray-500">{c}</div>
                  <div className="text-lg font-light text-gray-900 mt-1">20%</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Cette ponderation equilibree garantit qu'aucun aspect n'est surevalorise par rapport aux autres.
            </p>
          </div>
        </div>

        {/* Color Legend */}
        <div className="mb-10 sm:mb-16 pb-10 sm:pb-16 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-light text-gray-900 mb-6">Lecture des scores</h2>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="border-l-4 border-palette-blue pl-4 py-2">
              <div className="text-2xl font-light text-palette-blue">7+</div>
              <div className="text-xs text-gray-500 mt-1">Solide</div>
              <div className="text-[10px] text-gray-400">Programme bien construit et credible</div>
            </div>
            <div className="border-l-4 border-palette-yellow pl-4 py-2">
              <div className="text-2xl font-light text-palette-yellow">5-7</div>
              <div className="text-xs text-gray-500 mt-1">Mitige</div>
              <div className="text-[10px] text-gray-400">Points positifs mais lacunes importantes</div>
            </div>
            <div className="border-l-4 border-palette-red pl-4 py-2">
              <div className="text-2xl font-light text-palette-red">&lt;5</div>
              <div className="text-xs text-gray-500 mt-1">Insuffisant</div>
              <div className="text-[10px] text-gray-400">Ameliorations significatives necessaires</div>
            </div>
          </div>
        </div>

        {/* Transparency */}
        <div className="bg-gray-50 border border-gray-200 p-5 sm:p-6 rounded-sm">
          <h2 className="text-lg font-normal text-gray-900 mb-3">Transparence totale</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">
            Cette analyse se veut totalement transparente. Les criteres d'evaluation sont publics,
            la methodologie est documentee, et les resultats sont presentes sans filtre.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">
            Aucune affiliation politique, aucun financement partisan.
            L'objectif est d'eclairer le debat democratique avec des donnees objectives et verifiables.
          </p>
        </div>
      </main>
    </div>
  )
}
