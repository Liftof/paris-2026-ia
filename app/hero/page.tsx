import Link from 'next/link'

export default function HeroShowcasePage() {
  return (
    <div className="site-shell min-h-screen">
      <header className="site-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
            ← Retour accueil
          </Link>
          <span className="kicker">Direction retenue</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="hero-panel p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">Hero retenu: Version 1 (Editorial Glass)</h1>
          <p className="text-slate-600 mt-3 max-w-3xl">
            Cette direction visuelle est maintenant appliquée au site: lumière douce, lisibilité élevée,
            ton sobre et posture de labo indépendant.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="soft-chip">Non commercial</span>
            <span className="soft-chip">Non partisan</span>
            <span className="soft-chip">Analyse publique</span>
            <span className="soft-chip">Responsive</span>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-sky-100 via-white to-amber-100 p-6 sm:p-10">
          <div className="absolute -top-16 -right-10 w-48 h-48 rounded-full bg-blue-300/30 blur-2xl" />
          <div className="absolute -bottom-20 left-4 w-56 h-56 rounded-full bg-amber-300/30 blur-2xl" />
          <div className="relative grid lg:grid-cols-[1fr_280px] gap-8 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500 font-semibold">Version 1 · Editorial Glass</p>
              <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 mt-3 leading-tight">
                Un laboratoire indépendant pour lire les programmes avec la même grille IA.
              </h2>
              <p className="text-slate-600 mt-4 text-base sm:text-lg max-w-2xl">
                Pas de service à vendre: publication d&apos;une analyse comparative sur robustesse, cohérence et sérieux,
                à partir de sources publiques.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
                >
                  Voir le classement
                </Link>
                <Link
                  href="/methodologie"
                  className="px-5 py-2.5 rounded-full border border-slate-300 bg-white/80 text-slate-700 text-sm font-semibold hover:bg-white transition-colors"
                >
                  Lire la méthode
                </Link>
              </div>
            </div>
            <div className="playful-dash bg-white/75 p-4 sm:p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500 font-semibold mb-3">Repères éditoriaux</p>
              <div className="space-y-2">
                <div className="score-pill text-sm text-slate-700">Ton factuel et vérifiable</div>
                <div className="score-pill text-sm text-slate-700">Hiérarchie visuelle claire</div>
                <div className="score-pill text-sm text-slate-700">Contrastes lisibles mobile/desktop</div>
                <div className="score-pill text-sm text-slate-700">Accent sur les critères publics</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
