import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquentes sur l\'analyse IA des programmes des candidats à la mairie de Paris 2026. Méthode, limites et transparence.',
  openGraph: {
    title: 'FAQ — Paris 2026 Labo IA',
    description: 'Questions fréquentes sur l\'analyse IA des programmes des candidats à la mairie de Paris 2026.',
  },
}

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

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Qui est derrière ce projet ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Ce projet est un laboratoire indépendant, sans affiliation politique ni financement partisan.
                Il est porté par{' '}
                <a href="https://x.com/pierbapt" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent transition-colors">
                  Pierre-Baptiste Borges
                </a>
                {' '}dans une démarche citoyenne de transparence sur les programmes électoraux.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Quel modèle d&apos;IA est utilisé ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                L&apos;analyse est réalisée par un agent d&apos;analyse politique non-partisan basé sur{' '}
                <span className="font-semibold text-ink">Anthropic Claude Opus 4.6</span>,
                conçu pour évaluer les programmes selon 5 critères objectifs et identiques pour tous les candidats.
                Le modèle n&apos;a pas accès aux sondages ni aux préférences politiques.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Les candidats ont-ils été consultés ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Non. L&apos;analyse porte exclusivement sur les programmes publiés publiquement. Aucun candidat n&apos;a été consulté, contacté ou impliqué dans le processus d&apos;évaluation.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Comment les scores sont-ils calculés ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed mb-4">
                Chaque programme est évalué sur 5 critères (cohérence, solidité, robustesse, pragmatisme, détail), chacun noté sur 10. La note globale est la moyenne équipondérée de ces 5 notes.
              </p>
              <Link
                href="/methodologie"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-ink text-white text-xs font-semibold hover:bg-ink-2 transition-colors"
              >
                Voir la méthodologie complète &rarr;
              </Link>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Pourquoi tel candidat a une note basse ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Une note basse reflète la qualité du programme écrit, pas la valeur du candidat. Un programme peut être stratégiquement vague, manquer de chiffrages, ou contenir des propositions hors compétence municipale. Le rapport PDF détaillé explique chaque note.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">L&apos;IA peut-elle se tromper ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Oui. L&apos;IA évalue la qualité formelle et la cohérence des programmes, mais ne peut pas juger la sincérité des candidats ni anticiper le contexte politique futur. C&apos;est un outil de lecture, pas un oracle.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Mes données sont-elles collectées ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Non. Le site ne collecte aucune donnée personnelle. Aucun cookie de tracking n&apos;est utilisé.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Puis-je télécharger les rapports ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Oui. Chaque page candidat propose un bouton &laquo;Rapport PDF&raquo; pour télécharger l&apos;analyse complète. Les rapports sont également accessibles depuis la page Méthodologie.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">À quelle fréquence le site est-il mis à jour ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Le site est mis à jour quand un candidat publie un programme significativement nouveau ou modifié. La dernière mise à jour date de février 2026.
              </p>
            </div>
          </details>

          <details className="group panel-card overflow-hidden">
            <summary className="p-5 sm:p-6 cursor-pointer list-none flex items-start gap-3 hover:bg-surface-alt/50 transition-colors">
              <span className="text-accent font-bold mt-0.5 shrink-0 text-sm group-open:rotate-90 transition-transform">&#9654;</span>
              <span className="text-sm sm:text-base font-semibold text-ink">Comment signaler une erreur ?</span>
            </summary>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-6">
              <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">
                Si vous identifiez une erreur factuelle dans l&apos;analyse, vous pouvez nous contacter. Toute correction sera documentée et tracée dans un changelog public.
              </p>
            </div>
          </details>

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

        <SiteFooter />
      </main>
    </div>
  )
}
