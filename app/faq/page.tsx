import Link from 'next/link'

const faqs = [
  {
    question: 'Qui est derriere ce projet ?',
    answer:
      'Ce projet est un laboratoire independant, sans affiliation politique ni financement partisan. Il est porte par une demarche citoyenne de transparence sur les programmes electoraux.',
  },
  {
    question: 'Quel modele d\'IA est utilise ?',
    answer:
      'L\'analyse est realisee par un agent d\'analyse politique non-partisan, concu pour evaluer les programmes selon 5 criteres objectifs et identiques pour tous les candidats. Le modele n\'a pas acces aux sondages ni aux preferences politiques.',
  },
  {
    question: 'Les candidats ont-ils ete consultes ?',
    answer:
      'Non. L\'analyse porte exclusivement sur les programmes publies publiquement. Aucun candidat n\'a ete consulte, contacte ou implique dans le processus d\'evaluation.',
  },
  {
    question: 'Comment les scores sont-ils calcules ?',
    answer:
      'Chaque programme est evalue sur 5 criteres (coherence, solidite, robustesse, pragmatisme, detail), chacun note sur 10. La note globale est la moyenne equiponderee de ces 5 notes. Voir la page Methodologie pour le detail complet.',
  },
  {
    question: 'Pourquoi tel candidat a une note basse ?',
    answer:
      'Une note basse reflete la qualite du programme ecrit, pas la valeur du candidat. Un programme peut etre strategiquement vague, manquer de chiffrages, ou contenir des propositions hors competence municipale. Le rapport PDF detaille explique chaque note.',
  },
  {
    question: 'L\'IA peut-elle se tromper ?',
    answer:
      'Oui. L\'IA evalue la qualite formelle et la coherence des programmes, mais ne peut pas juger la sincerite des candidats ni anticiper le contexte politique futur. C\'est un outil de lecture, pas un oracle.',
  },
  {
    question: 'Mes donnees sont-elles collectees ?',
    answer:
      'Non. Le site ne collecte aucune donnee personnelle. Le quiz citoyen fonctionne entierement dans votre navigateur, sans envoi au serveur. Aucun cookie de tracking n\'est utilise.',
  },
  {
    question: 'Puis-je telecharger les rapports ?',
    answer:
      'Oui. Chaque page candidat propose un bouton "Rapport PDF" pour telecharger l\'analyse complete. Les rapports sont egalement accessibles depuis la page Methodologie.',
  },
  {
    question: 'A quelle frequence le site est-il mis a jour ?',
    answer:
      'Le site est mis a jour quand un candidat publie un programme significativement nouveau ou modifie. La derniere mise a jour date de fevrier 2026.',
  },
  {
    question: 'Comment signaler une erreur ?',
    answer:
      'Si vous identifiez une erreur factuelle dans l\'analyse, vous pouvez nous contacter. Toute correction sera documentee et tracee dans un changelog public.',
  },
]

export default function FAQPage() {
  return (
    <div className="site-shell min-h-screen">
      <nav className="site-nav">
        <div className="site-nav-pill">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Paris 2026</span>
            <span className="kicker !text-[9px] !py-0.5 !px-2">Labo</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-5">
            <Link href="/#classement" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Classement
            </Link>
            <Link href="/methodologie" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
              Methodo
            </Link>
            <Link href="/faq" className="text-xs font-semibold text-palette-blue transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </nav>

      <header className="border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 inline-block mb-6">
            &larr; Retour
          </Link>
          <div className="hero-panel p-6 sm:p-8">
            <span className="kicker mb-3">FAQ</span>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900">Questions frequentes</h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Tout ce que vous devez savoir sur le projet, la methode et les limites.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="group panel-card overflow-hidden">
              <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-white/40 transition-colors">
                <span className="text-palette-blue font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">
                  &#9654;
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-900">{faq.question}</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="panel-card p-5 sm:p-6 mt-8 text-center">
          <p className="text-xs text-slate-500 mb-3">Vous ne trouvez pas votre reponse ?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/methodologie"
              className="px-5 py-2 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white/80 transition-colors"
            >
              Voir la methodologie
            </Link>
            <Link
              href="/quiz"
              className="px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Faire le quiz citoyen
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
