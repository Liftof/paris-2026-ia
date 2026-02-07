import Link from 'next/link'

export default function MethodologiePage() {
  return (
    <div className="site-shell min-h-screen">
      <nav className="site-nav sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg font-bold text-slate-900">Paris 2026</span>
            <span className="kicker">IA</span>
          </Link>
          <Link href="/#classement" className="text-sm text-slate-500 hover:text-slate-900">
            Classement
          </Link>
        </div>
      </nav>

      <header className="border-b border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 inline-block mb-6">
            ← Retour à l&apos;accueil
          </Link>
          <div className="hero-panel p-6 sm:p-10">
            <span className="kicker mb-4">Méthodologie publique</span>
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">Comment l&apos;IA évalue les programmes</h1>
            <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-3xl leading-relaxed">
              Même grille, même niveau d&apos;exigence, et une restitution claire pour comparer les projets municipaux.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">Approche generale</h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Cette analyse automatisée vise à comparer les programmes avec une logique constante. L&apos;objectif n&apos;est
            pas de prendre parti, mais d&apos;aider à lire plus vite les points solides, les zones floues et les risques.
          </p>
        </section>

        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Pourquoi utiliser l&apos;IA ici ?</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                title: 'Neutralité de traitement',
                description: 'Tous les candidats passent sur la même grille de lecture, dans le même ordre.',
              },
              {
                title: 'Régularité des notes',
                description: 'Les critères sont appliqués de façon homogène, sans effet de fatigue de lecture.',
              },
              {
                title: 'Lecture à grande échelle',
                description: 'L&apos;outil agrège rapidement des informations longues et hétérogènes.',
              },
              {
                title: 'Transparence',
                description: 'Les notes sont rattachees a des criteres explicites et consultables.',
              },
            ].map((item) => (
              <div key={item.title} className="playful-dash bg-white/72 p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Les 5 critères</h2>
          <div className="space-y-3">
            {[
              {
                title: '1. Cohérence',
                detail:
                  'Le programme raconte-t-il une vision claire, sans mesures qui se contredisent ? ',
                color: 'bg-palette-blue',
              },
              {
                title: '2. Solidité',
                detail:
                  'Les annonces sont-elles argumentées avec des hypothèses réalistes (budget, compétence, exécution) ? ',
                color: 'bg-palette-blue',
              },
              {
                title: '3. Robustesse',
                detail:
                  'Le projet tient-il dans des scénarios moins favorables (retards, coûts, arbitrages) ? ',
                color: 'bg-palette-yellow',
              },
              {
                title: '4. Pragmatisme',
                detail:
                  'Les mesures peuvent-elles être lancées concrètement par une municipalité ? ',
                color: 'bg-palette-yellow',
              },
              {
                title: '5. Détail',
                detail:
                  'Le niveau de précision est-il suffisant pour juger la mise en oeuvre ? ',
                color: 'bg-palette-red',
              },
            ].map((criterion) => (
              <div key={criterion.title} className="playful-dash bg-white/72 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className={`w-2 h-7 rounded-full shrink-0 mt-0.5 ${criterion.color}`} />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900">{criterion.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">{criterion.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Pondération des notes</h2>
          <p className="text-sm text-slate-600 mb-4">Chaque critère compte pour 20% de la note globale.</p>
          <div className="note-grid">
            {['Cohérence', 'Solidité', 'Robustesse', 'Pragmatisme', 'Détail'].map((criterion) => (
              <div key={criterion} className="playful-dash bg-white/72 p-3 text-center">
                <div className="text-xs text-slate-500">{criterion}</div>
                <div className="text-lg font-bold text-slate-900 mt-1">20%</div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">Lecture des scores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="playful-dash bg-blue-50/70 p-4 text-center">
              <div className="text-2xl font-bold text-palette-blue">7+</div>
              <div className="text-xs font-semibold text-palette-blue mt-1">Solide</div>
              <div className="text-[11px] text-slate-500 mt-1">Programme structuré et crédible</div>
            </div>
            <div className="playful-dash bg-yellow-50/70 p-4 text-center">
              <div className="text-2xl font-bold text-palette-yellow">5-7</div>
              <div className="text-xs font-semibold text-palette-yellow mt-1">Mitigé</div>
              <div className="text-[11px] text-slate-500 mt-1">Des points forts, mais aussi des manques</div>
            </div>
            <div className="playful-dash bg-red-50/70 p-4 text-center">
              <div className="text-2xl font-bold text-palette-red">{'<'}5</div>
              <div className="text-xs font-semibold text-palette-red mt-1">Fragile</div>
              <div className="text-[11px] text-slate-500 mt-1">Réalisme ou précision insuffisants</div>
            </div>
          </div>
        </section>

        <section className="panel-card p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Transparence</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Les scores ne remplacent pas le débat politique. Ils servent à structurer la lecture, en rendant visibles
            les assumptions, les incohérences et les zones à clarifier.
          </p>
        </section>
      </main>
    </div>
  )
}
