import Link from 'next/link'
import SiteNav from '@/components/SiteNav'

const faqs = [
  {
    question: 'Qui est derrière ce projet ?',
    answer:
      'Ce projet est un laboratoire indépendant, sans affiliation politique ni financement partisan. Il est porté par une démarche citoyenne de transparence sur les programmes électoraux.',
  },
  {
    question: 'Quel modèle d\'IA est utilisé ?',
    answer:
      'L\'analyse est réalisée par un agent d\'analyse politique non-partisan, conçu pour évaluer les programmes selon 5 critères objectifs et identiques pour tous les candidats. Le modèle n\'a pas accès aux sondages ni aux préférences politiques.',
  },
  {
    question: 'Les candidats ont-ils été consultés ?',
    answer:
      'Non. L\'analyse porte exclusivement sur les programmes publiés publiquement. Aucun candidat n\'a été consulté, contacté ou impliqué dans le processus d\'évaluation.',
  },
  {
    question: 'Comment les scores sont-ils calculés ?',
    answer:
      'Chaque programme est évalué sur 5 critères (cohérence, solidité, robustesse, pragmatisme, détail), chacun noté sur 10. La note globale est la moyenne équipondérée de ces 5 notes. Voir la page Méthodologie pour le détail complet.',
  },
  {
    question: 'Pourquoi tel candidat a une note basse ?',
    answer:
      'Une note basse reflète la qualité du programme écrit, pas la valeur du candidat. Un programme peut être stratégiquement vague, manquer de chiffrages, ou contenir des propositions hors compétence municipale. Le rapport PDF détaillé explique chaque note.',
  },
  {
    question: 'L\'IA peut-elle se tromper ?',
    answer:
      'Oui. L\'IA évalue la qualité formelle et la cohérence des programmes, mais ne peut pas juger la sincérité des candidats ni anticiper le contexte politique futur. C\'est un outil de lecture, pas un oracle.',
  },
  {
    question: 'Mes données sont-elles collectées ?',
    answer:
      'Non. Le site ne collecte aucune donnée personnelle. Aucun cookie de tracking n\'est utilisé.',
  },
  {
    question: 'Puis-je télécharger les rapports ?',
    answer:
      'Oui. Chaque page candidat propose un bouton "Rapport PDF" pour télécharger l\'analyse complète. Les rapports sont également accessibles depuis la page Méthodologie.',
  },
  {
    question: 'À quelle fréquence le site est-il mis à jour ?',
    answer:
      'Le site est mis à jour quand un candidat publie un programme significativement nouveau ou modifié. La dernière mise à jour date de février 2026.',
  },
  {
    question: 'Comment signaler une erreur ?',
    answer:
      'Si vous identifiez une erreur factuelle dans l\'analyse, vous pouvez nous contacter. Toute correction sera documentée et tracée dans un changelog public.',
  },
]

export default function FAQPage() {
  return (
    <div className="site-shell min-h-screen">
      <SiteNav />

      <header className="border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <span className="kicker mb-3">FAQ</span>
          <h1 className="text-2xl sm:text-4xl font-bold text-ink mt-1">Questions fréquentes</h1>
          <p className="text-sm sm:text-base text-ink-3 mt-2">
            Tout ce que vous devez savoir sur le projet, la méthode et les limites.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details key={index} className="group panel-card overflow-hidden">
              <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
                <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">
                  &#9654;
                </span>
                <span className="text-sm sm:text-base font-semibold text-ink">{faq.question}</span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
                <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="panel-card p-5 sm:p-6 mt-8 text-center">
          <p className="text-xs text-ink-3 mb-3">Vous ne trouvez pas votre réponse ?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/methodologie"
              className="px-5 py-2.5 rounded-lg border border-[var(--border)] text-xs font-semibold text-ink hover:shadow-sm transition-shadow"
            >
              Voir la méthodologie
            </Link>
            <Link
              href="/a-propos"
              className="px-5 py-2.5 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-ink-2 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
