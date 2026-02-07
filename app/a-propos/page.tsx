import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A propos | Paris 2026 - Analyse IA',
  description: 'Qui se cache derriere Paris 2026 IA ? Demarche, motivations et contact.',
}

export default function AProposPage() {
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
            <Link href="/a-propos" className="text-xs font-semibold text-palette-blue transition-colors">
              A propos
            </Link>
          </div>
        </div>
      </nav>

      <header className="border-b border-slate-200/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 inline-block mb-6">
            &larr; Retour
          </Link>
          <div className="hero-panel p-6 sm:p-10">
            <span className="kicker mb-4">A propos</span>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">
              Qui est derri&egrave;re ce projet ?
            </h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-3xl leading-relaxed">
              Une d&eacute;marche citoyenne, ind&eacute;pendante et transparente pour &eacute;clairer le d&eacute;bat municipal parisien.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Qui suis-je */}
        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-palette-blue to-blue-400 flex items-center justify-center shrink-0">
              <span className="text-2xl sm:text-3xl font-bold text-white">PB</span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Pierre-Baptiste Borges</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <a
                  href="https://x.com/pierbapt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  @pierbapt
                </a>
                <a
                  href="mailto:pierrebaptiste.borges@gmail.com"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
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

        {/* La démarche */}
        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">La d&eacute;marche</h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
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

        {/* Pourquoi ce projet */}
        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Pourquoi ce projet ?</h2>
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
              <div key={item.title} className="playful-dash bg-white/72 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ce que ce projet n'est pas */}
        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Ce que ce projet n&apos;est pas</h2>
          <div className="space-y-2.5">
            {[
              'Un site de recommandation de vote',
              'Un outil au service d\u2019un parti ou d\u2019un candidat',
              'Une entreprise ou un service commercial',
              'Un sondage d\u2019opinion ou de popularit\u00e9',
              'Un substitut au d\u00e9bat d\u00e9mocratique',
            ].map((item, i) => (
              <div key={i} className="playful-dash bg-white/72 p-3.5 flex items-start gap-3">
                <span className="text-palette-red font-bold mt-0.5">&times;</span>
                <p className="text-xs sm:text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="panel-card p-6 sm:p-8 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Contact</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            Pour toute question, demande de pr&eacute;cision, signalement d&apos;erreur ou proposition de collaboration,
            n&apos;h&eacute;sitez pas &agrave; me contacter directement.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href="mailto:pierrebaptiste.borges@gmail.com"
              className="group playful-dash bg-white/72 p-4 flex items-center gap-3 hover:bg-white/90 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-palette-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 group-hover:text-palette-blue">Email</div>
                <div className="text-xs text-slate-500">pierrebaptiste.borges@gmail.com</div>
              </div>
            </a>
            <a
              href="https://x.com/pierbapt"
              target="_blank"
              rel="noopener noreferrer"
              className="group playful-dash bg-white/72 p-4 flex items-center gap-3 hover:bg-white/90 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-palette-blue" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900 group-hover:text-palette-blue">X (Twitter)</div>
                <div className="text-xs text-slate-500">@pierbapt</div>
              </div>
            </a>
          </div>
        </section>

        {/* Remerciements */}
        <section className="panel-card p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Remerciements</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Merci &agrave; tous ceux qui prennent le temps de lire, comparer et s&apos;informer avant de voter.
            La d&eacute;mocratie fonctionne mieux quand les citoyens ont les outils pour comprendre ce qu&apos;on leur propose.
          </p>
        </section>
      </main>
    </div>
  )
}
