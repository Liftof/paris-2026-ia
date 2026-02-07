import Link from 'next/link'

const badges = ['Playful', 'Serieux', 'Lisible', 'Responsive']

export default function HeroShowcasePage() {
  return (
    <div className="site-shell min-h-screen">
      <header className="site-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            ← Retour accueil
          </Link>
          <span className="kicker">/hero</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="hero-panel p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">4 propositions de hero</h1>
          <p className="text-slate-600 mt-3 max-w-3xl">
            Cette page compare quatre directions artistiques differentes. Chaque hero garde un niveau de lisibilite eleve
            et une tonalite serieuse.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {badges.map((badge) => (
              <span key={badge} className="soft-chip">
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-100 via-white to-amber-100 p-6 sm:p-10">
            <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-blue-300/30 blur-2xl" />
            <div className="absolute -bottom-20 left-4 w-56 h-56 rounded-full bg-amber-300/30 blur-2xl" />
            <div className="relative grid lg:grid-cols-[1fr_280px] gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-semibold">Version 1 · Editorial Glass</p>
                <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mt-3 leading-tight">
                  Votre campagne merite une direction visuelle claire.
                </h2>
                <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl">
                  Un hero lumineux, rassurant, avec des contrastes propres et des appels a l&apos;action directs.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors">
                    Lancer l&apos;analyse
                  </button>
                  <button className="px-5 py-2.5 rounded-full border border-slate-300 bg-white/80 text-slate-700 text-sm font-semibold hover:bg-white transition-colors">
                    Voir un exemple
                  </button>
                </div>
              </div>
              <div className="playful-dash bg-white/75 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">Indicateurs</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Impact', 'Confiance', 'Clarite', 'Cohesion'].map((item, index) => (
                    <div key={item} className="rounded-xl bg-white border border-slate-200 p-3">
                      <div className="text-[11px] text-slate-500">{item}</div>
                      <div className="text-xl font-bold text-slate-900 mt-1">{82 + index}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-slate-900 bg-slate-950 text-slate-100 p-6 sm:p-10">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative grid lg:grid-cols-[1fr_320px] gap-8 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-sky-300 font-semibold">Version 2 · Data Grid</p>
                <h2 className="text-3xl sm:text-5xl font-bold mt-3 leading-tight">
                  Une lecture immediate des priorites publiques.
                </h2>
                <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-2xl">
                  Style plus analytique, ideal pour un positionnement serieux et axe sur la preuve.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button className="px-5 py-2.5 rounded-md bg-sky-400 text-slate-950 text-sm font-bold hover:bg-sky-300 transition-colors">
                    Comparer les candidats
                  </button>
                  <button className="px-5 py-2.5 rounded-md border border-slate-700 text-slate-200 text-sm font-semibold hover:bg-slate-900 transition-colors">
                    Methodologie
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400 font-semibold mb-3">Score matrix</p>
                <div className="space-y-2">
                  {[
                    ['Coherence', '7.9'],
                    ['Solidite', '7.3'],
                    ['Robustesse', '6.6'],
                    ['Pragmatisme', '6.9'],
                  ].map(([label, score]) => (
                    <div key={label} className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2">
                      <span className="text-xs text-slate-300">{label}</span>
                      <span className="text-sm font-bold text-sky-300">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-orange-200 bg-gradient-to-br from-orange-50 via-rose-50 to-yellow-50 p-6 sm:p-10">
            <div className="absolute top-5 right-5 w-24 h-24 rounded-2xl border-4 border-orange-300/50 rotate-12" />
            <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-rose-300/40" />
            <div className="relative max-w-4xl">
              <p className="text-xs uppercase tracking-[0.16em] text-orange-700 font-semibold">Version 3 · Campaign Poster</p>
              <h2 className="text-3xl sm:text-6xl font-extrabold text-slate-900 mt-3 leading-[1.02]">
                Donnez une voix forte
                <br />
                a votre vision de Paris.
              </h2>
              <p className="text-slate-700 mt-4 text-base sm:text-lg max-w-2xl">
                Hero plus expressif, parfait pour capter vite l&apos;attention sans perdre la clarté du message.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button className="px-6 py-3 rounded-full bg-orange-600 text-white text-sm font-bold hover:bg-orange-500 transition-colors">
                  Decouvrir la demo
                </button>
                <span className="text-sm text-slate-600">Disponible desktop et mobile</span>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white p-6 sm:p-10">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-50 to-transparent" />
            <div className="relative grid lg:grid-cols-[1fr_280px] gap-8 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-teal-700 font-semibold">Version 4 · Premium Minimal</p>
                <h2 className="text-3xl sm:text-5xl font-semibold text-slate-900 mt-3 leading-tight">
                  Sobriete, rythme, precision.
                </h2>
                <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl">
                  Direction epuree qui met le texte au centre, avec des accents discrets pour garder une touche playfull.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="px-5 py-2.5 rounded-lg bg-teal-700 text-white text-sm font-semibold hover:bg-teal-600 transition-colors">
                    Commencer
                  </button>
                  <button className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
              <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-teal-800 font-semibold">Checklist</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li>Typographie lisible</li>
                  <li>Contraste AA</li>
                  <li>CTA principal visible</li>
                  <li>Structure mobile first</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
