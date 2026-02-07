import Link from 'next/link'
import SiteNav from '@/components/SiteNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos | Paris 2026 - Analyse IA',
  description: 'Qui se cache derrière Paris 2026 IA ? Démarche, motivations et contact.',
}

export default function AProposPage() {
  return (
    <div className="site-shell min-h-screen">
      <SiteNav />

      <header className="border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <span className="kicker mb-3">À propos</span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-1">
            Qui est derri&egrave;re ce projet ?
          </h1>
          <p className="text-base sm:text-lg text-ink-3 mt-4 max-w-3xl leading-relaxed">
            Une d&eacute;marche citoyenne, ind&eacute;pendante et transparente pour &eacute;clairer le d&eacute;bat municipal parisien.
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-ink flex items-center justify-center shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-white">PB</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink">Pierre-Baptiste Borges</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <a
                  href="https://x.com/pierbapt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @pierbapt
                </a>
                <a
                  href="mailto:pierrebaptiste.borges@gmail.com"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  pierrebaptiste.borges@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">La d&eacute;marche</h2>
          <div className="space-y-4 text-sm sm:text-base text-ink-2 leading-relaxed">
            <p>
              Les &eacute;lections municipales de 2026 &agrave; Paris sont un moment d&eacute;cisif. Six candidats, six visions, des dizaines
              de propositions &mdash; mais comment comparer objectivement des programmes qui ne parlent pas toujours de la m&ecirc;me chose,
              pas avec le m&ecirc;me niveau de d&eacute;tail, pas avec les m&ecirc;mes hypoth&egrave;ses ?
            </p>
            <p>
              Ce projet est n&eacute; d&apos;un constat simple : <strong>le citoyen m&eacute;rite mieux qu&apos;un d&eacute;bat de postures.</strong>{' '}
              Il m&eacute;rite une lecture structur&eacute;e, document&eacute;e et v&eacute;rifiable des programmes qu&apos;on lui propose.
            </p>
            <p>
              L&apos;id&eacute;e est donc de faire passer chaque programme par la m&ecirc;me grille d&apos;analyse IA &mdash; sans pr&eacute;f&eacute;rence
              politique, sans biais m&eacute;diatique, sans int&eacute;r&ecirc;t commercial. Cinq crit&egrave;res publics (coh&eacute;rence,
              solidit&eacute;, robustesse, pragmatisme, d&eacute;tail), cinq domaines th&eacute;matiques (logement, transport, s&eacute;curit&eacute;,
              &eacute;cologie, budget), et un rapport complet t&eacute;l&eacute;chargeable pour chaque candidat.
            </p>
            <p>
              <strong>Ce site ne recommande aucun vote.</strong> Il ne dit pas qui a raison ni qui a tort. Il pose des questions
              concr&egrave;tes : est-ce chiffr&eacute; ? est-ce r&eacute;alisable &agrave; l&apos;&eacute;chelle municipale ? est-ce coh&eacute;rent
              avec le reste du programme ? Et il rend les r&eacute;ponses accessibles &agrave; tous.
            </p>
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">Pourquoi ce projet ?</h2>
          <div className="space-y-3">
            {[
              {
                title: 'Transparence',
                detail: 'Trop souvent, les programmes \u00e9lectoraux sont lus \u00e0 travers le prisme des m\u00e9dias ou des partis. Ici, la grille est publique, les rapports sont t\u00e9l\u00e9chargeables, et chacun peut v\u00e9rifier.',
              },
              {
                title: '\u00c9quit\u00e9',
                detail: 'Chaque candidat passe exactement le m\u00eame protocole. Pas de favoritisme, pas de traitement diff\u00e9renci\u00e9. Le premier candidat analys\u00e9 est trait\u00e9 avec la m\u00eame rigueur que le dernier.',
              },
              {
                title: 'Accessibilit\u00e9',
                detail: 'Les programmes font parfois 30+ pages. Le citoyen n\u2019a pas toujours le temps de tout lire. Ce site synth\u00e9tise, compare et met en \u00e9vidence les forces et faiblesses de chacun.',
              },
              {
                title: 'Ind\u00e9pendance',
                detail: 'Aucun financement partisan. Aucune affiliation politique. Aucun service \u00e0 vendre. Ce projet est port\u00e9 par une conviction : un d\u00e9bat \u00e9clair\u00e9 est un d\u00e9bat meilleur.',
              },
            ].map((item) => (
              <div key={item.title} className="playful-dash p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-ink mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">Ce que ce projet n&apos;est pas</h2>
          <div className="space-y-2.5">
            {[
              'Un site de recommandation de vote',
              'Un outil au service d\u2019un parti ou d\u2019un candidat',
              'Une entreprise ou un service commercial',
              'Un sondage d\u2019opinion ou de popularit\u00e9',
              'Un substitut au d\u00e9bat d\u00e9mocratique',
            ].map((item, i) => (
              <div key={i} className="playful-dash p-3.5 flex items-start gap-3">
                <span className="text-score-fragile font-bold mt-0.5">&times;</span>
                <p className="text-xs sm:text-sm text-ink-3">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-4">Contact</h2>
          <p className="text-sm text-ink-3 leading-relaxed mb-5">
            Pour toute question, demande de pr&eacute;cision, signalement d&apos;erreur ou proposition de collaboration,
            n&apos;h&eacute;sitez pas &agrave; me contacter directement.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="mailto:pierrebaptiste.borges@gmail.com"
              className="group playful-dash p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-ink group-hover:text-accent">Email</div>
                <div className="text-xs text-ink-3">pierrebaptiste.borges@gmail.com</div>
              </div>
            </a>
            <a
              href="https://x.com/pierbapt"
              target="_blank"
              rel="noopener noreferrer"
              className="group playful-dash p-4 flex items-center gap-3 hover:shadow-sm transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-ink group-hover:text-accent">X (Twitter)</div>
                <div className="text-xs text-ink-3">@pierbapt</div>
              </div>
            </a>
          </div>
        </section>

        <section className="panel-card p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-bold text-ink mb-3">Remerciements</h2>
          <p className="text-sm text-ink-3 leading-relaxed">
            Merci &agrave; tous ceux qui prennent le temps de lire, comparer et s&apos;informer avant de voter.
            La d&eacute;mocratie fonctionne mieux quand les citoyens ont les outils pour comprendre ce qu&apos;on leur propose.
          </p>
          <p className="text-xs text-ink-4 mt-4">
            Merci &agrave; Tom Godignon pour son aide dans la conception de la m&eacute;thode d&apos;analyse.
          </p>
        </section>
      </main>
    </div>
  )
}
