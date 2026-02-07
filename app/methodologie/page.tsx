import Link from 'next/link'
import { candidatesData } from '@/lib/data'
import SiteNav from '@/components/SiteNav'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Méthodologie',
  description: 'Comment l\'IA analyse les programmes des candidats à la mairie de Paris 2026. 5 critères, protocole identique, rapports PDF téléchargeables.',
  openGraph: {
    title: 'Méthodologie — Paris 2026 Labo IA',
    description: 'Comment l\'IA analyse les programmes des candidats à la mairie de Paris 2026. 5 critères, protocole identique.',
  },
}

export default function MethodologiePage() {
  const sortedCandidates = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)

  return (
    <div className="site-shell min-h-screen">
      <SiteNav />

      <header className="border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
          <div className="hero-panel p-6 sm:p-10">
            <span className="kicker mb-4">M&eacute;thodologie publique</span>
            <h1 className="text-3xl sm:text-5xl font-bold text-ink">Comment l&apos;IA juge les programmes</h1>
            <p className="text-base sm:text-lg text-ink-3 mt-4 max-w-3xl leading-relaxed">
              Cette d&eacute;marche est celle d&apos;un labo ind&eacute;pendant: m&ecirc;me protocole, m&ecirc;mes crit&egrave;res, m&ecirc;mes exigences pour tous.
              Chaque rapport suit une structure identique pour garantir l&apos;&eacute;quit&eacute; du traitement.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <span className="soft-chip">6 candidats analys&eacute;s</span>
              <span className="soft-chip">5 crit&egrave;res publics</span>
              <span className="soft-chip">5 domaines th&eacute;matiques</span>
              <span className="soft-chip">Rapports PDF t&eacute;l&eacute;chargeables</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-12">

        {/* Position du projet */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Position du projet</h2>
          <p className="text-sm sm:text-base text-ink-2 leading-relaxed mb-4">
            Le site ne vend pas un service. Il publie une analyse comparative non partisane des programmes municipaux 2026.
            L&apos;objectif est de rendre le d&eacute;bat plus lisible, pas de recommander un vote.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="playful-dash bg-white p-3 text-center">
              <div className="text-2xl mb-1">&#9878;</div>
              <div className="text-xs font-semibold text-ink">Non partisan</div>
              <div className="text-[11px] text-ink-3 mt-0.5">Aucune affiliation politique</div>
            </div>
            <div className="playful-dash bg-white p-3 text-center">
              <div className="text-2xl mb-1">&#128270;</div>
              <div className="text-xs font-semibold text-ink">Transparent</div>
              <div className="text-[11px] text-ink-3 mt-0.5">Crit&egrave;res et rapports publics</div>
            </div>
            <div className="playful-dash bg-white p-3 text-center">
              <div className="text-2xl mb-1">&#128200;</div>
              <div className="text-xs font-semibold text-ink">Reproductible</div>
              <div className="text-[11px] text-ink-3 mt-0.5">M&ecirc;me grille pour tous</div>
            </div>
          </div>
        </section>

        {/* Pourquoi l'IA */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Pourquoi utiliser l&apos;IA ?</h2>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              {
                title: 'Neutralit\u00e9 de traitement',
                description: 'Tous les candidats passent sur la m\u00eame grille de lecture, dans le m\u00eame ordre. L\u2019IA ne conna\u00eet pas les sondages et n\u2019a pas de pr\u00e9f\u00e9rence politique.',
              },
              {
                title: 'R\u00e9gularit\u00e9 d\u2019\u00e9valuation',
                description: 'La m\u00e9thode \u00e9vite les variations humaines de fatigue, d\u2019attention ou de biais cognitifs. Le 6\u00e8me candidat est \u00e9valu\u00e9 avec la m\u00eame rigueur que le premier.',
              },
              {
                title: 'Capacit\u00e9 de synth\u00e8se',
                description: 'Le syst\u00e8me consolide rapidement des corpus longs et h\u00e9t\u00e9rog\u00e8nes: programmes de 30+ pages, propositions d\u00e9taill\u00e9es, chiffrages budg\u00e9taires.',
              },
              {
                title: 'Tra\u00e7abilit\u00e9',
                description: 'Chaque score est reli\u00e9 \u00e0 des crit\u00e8res explicites. Le rapport d\u00e9taill\u00e9 (PDF) permet de v\u00e9rifier le raisonnement derri\u00e8re chaque note.',
              },
            ].map((item) => (
              <div key={item.title} className="playful-dash bg-white p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Corpus analysé */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Corpus analys&eacute;</h2>
          <p className="text-sm text-ink-3 mb-5 leading-relaxed">
            L&apos;analyse repose exclusivement sur des sources publiques. Aucune information privil&eacute;gi&eacute;e ni d&eacute;claration off-the-record n&apos;est utilis&eacute;e.
          </p>
          <div className="space-y-2.5">
            {[
              { label: 'Programmes officiels', detail: 'Documents publi\u00e9s par les \u00e9quipes de campagne sur leurs sites et r\u00e9seaux' },
              { label: 'Propositions d\u00e9taill\u00e9es', detail: 'Mesures chiffr\u00e9es, calendriers, dispositifs concrets annonc\u00e9s publiquement' },
              { label: 'Engagements th\u00e9matiques', detail: 'Prises de position sur logement, transport, s\u00e9curit\u00e9, \u00e9cologie, budget' },
            ].map((item) => (
              <div key={item.label} className="playful-dash bg-white p-3.5 flex items-start gap-3">
                <span className="w-2 h-2 rounded-sm bg-score-solid mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-ink">{item.label}</div>
                  <div className="text-xs text-ink-3 mt-0.5">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Processus d'analyse */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Processus d&apos;analyse</h2>
          <p className="text-sm text-ink-3 mb-5 leading-relaxed">
            Chaque candidat passe par exactement les m&ecirc;mes &eacute;tapes, dans le m&ecirc;me ordre, avec le m&ecirc;me prompt d&apos;analyse.
          </p>
          <div className="space-y-3">
            {[
              {
                step: '1',
                title: 'Collecte du corpus',
                detail: 'R\u00e9cup\u00e9ration du programme officiel et des propositions d\u00e9taill\u00e9es du candidat.',
                color: '#3B82F6',
              },
              {
                step: '2',
                title: '\u00c9valuation par crit\u00e8re (5 notes)',
                detail: 'L\u2019agent IA \u00e9value coh\u00e9rence, solidit\u00e9, robustesse, pragmatisme et d\u00e9tail. Chaque note est justifi\u00e9e par des points forts, points de tension et exemples concrets.',
                color: '#3B82F6',
              },
              {
                step: '3',
                title: 'Analyse th\u00e9matique (5 domaines)',
                detail: 'Logement, Transport, S\u00e9curit\u00e9, \u00c9cologie, Budget/Fiscalit\u00e9. Pour chaque th\u00e8me: forces et faiblesses identifi\u00e9es.',
                color: '#D97706',
              },
              {
                step: '4',
                title: 'Points d\u2019attention critiques',
                detail: 'Identification des propositions irr\u00e9alistes, contradictions internes et angles morts du programme.',
                color: '#D97706',
              },
              {
                step: '5',
                title: 'Synth\u00e8se et verdict',
                detail: 'Note globale (moyenne \u00e9quipond\u00e9r\u00e9e des 5 crit\u00e8res), verdict en une phrase, 3 forces et 3 faiblesses principales.',
                color: '#EA580C',
              },
              {
                step: '6',
                title: 'G\u00e9n\u00e9ration du rapport PDF',
                detail: 'Le rapport complet est format\u00e9 et mis \u00e0 disposition en t\u00e9l\u00e9chargement sur la page du candidat.',
                color: '#EA580C',
              },
            ].map((item) => (
              <div key={item.step} className="playful-dash bg-white p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-ink">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-3 leading-relaxed mt-1">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Les 5 critères */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Les 5 crit&egrave;res d&apos;&eacute;valuation</h2>
          <div className="space-y-3">
            {[
              {
                title: '1. Coh\u00e9rence interne',
                detail: 'Le programme pr\u00e9sente-t-il une logique d\u2019ensemble sans contradiction interne ?',
                example: 'Exemple: un candidat qui promet densification massive et 300 ha de jardins cr\u00e9e une tension de coh\u00e9rence.',
                color: 'bg-score-solid',
              },
              {
                title: '2. Solidit\u00e9 technique',
                detail: 'Les propositions reposent-elles sur des hypoth\u00e8ses cr\u00e9dibles (budget, droit, ex\u00e9cution) ?',
                example: 'Exemple: des chiffrages pr\u00e9cis (900M\u20ac r\u00e9novation logements) vs. des promesses sans budget.',
                color: 'bg-score-solid',
              },
              {
                title: '3. Robustesse budg\u00e9taire',
                detail: 'Le plan reste-t-il tenable en cas d\u2019al\u00e9as, de hausse des taux ou de contraintes impr\u00e9vues ?',
                example: 'Exemple: un plan d\u2019\u00e9conomies de 4Mds\u20ac document\u00e9 vs. aucun chiffrage global du programme.',
                color: 'bg-score-mixed',
              },
              {
                title: '4. Pragmatisme',
                detail: 'Les mesures sont-elles actionnables \u00e0 l\u2019\u00e9chelle municipale, dans les comp\u00e9tences de la mairie ?',
                example: 'Exemple: \u00abm\u00e9tro 24h/24\u00bb rel\u00e8ve de la R\u00e9gion, pas de la mairie = hors comp\u00e9tence.',
                color: 'bg-score-mixed',
              },
              {
                title: '5. D\u00e9tail et pr\u00e9cision',
                detail: 'Le niveau de pr\u00e9cision permet-il une lecture op\u00e9rationnelle (calendriers, co\u00fbts, modalit\u00e9s) ?',
                example: 'Exemple: \u00ab300 capteurs acoustiques M\u00e9duses\u00bb = pr\u00e9cis vs. \u00abun grand plan de mise \u00e0 l\u2019abri\u00bb = flou.',
                color: 'bg-score-fragile',
              },
            ].map((criterion) => (
              <div key={criterion.title} className="playful-dash bg-white p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className={`w-1 h-6 rounded-sm shrink-0 mt-0.5 ${criterion.color}`} />
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-ink">{criterion.title}</h3>
                    <p className="text-xs sm:text-sm text-ink-3 leading-relaxed mt-1">{criterion.detail}</p>
                    <p className="text-[11px] text-ink-4 italic mt-2">{criterion.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Les 5 domaines thématiques */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Les 5 domaines th&eacute;matiques</h2>
          <p className="text-sm text-ink-3 mb-5 leading-relaxed">
            Au-del&agrave; des 5 crit&egrave;res transversaux, chaque programme est analys&eacute; sur 5 domaines cl&eacute;s de la politique municipale parisienne.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                theme: 'Logement',
                icon: '\u{1F3E0}',
                points: ['Logement social et priv\u00e9', 'Lutte contre la sp\u00e9culation', 'R\u00e9novation \u00e9nerg\u00e9tique', 'Encadrement des loyers'],
              },
              {
                theme: 'Transport',
                icon: '\u{1F68C}',
                points: ['R\u00e9seau cyclable', 'Transports en commun', 'Stationnement', 'Plan de circulation'],
              },
              {
                theme: 'S\u00e9curit\u00e9',
                icon: '\u{1F6E1}',
                points: ['Police municipale', 'Vid\u00e9oprotection', 'Lutte contre les incivilit\u00e9s', 'S\u00e9curit\u00e9 nocturne'],
              },
              {
                theme: '\u00c9cologie',
                icon: '\u{1F33F}',
                points: ['V\u00e9g\u00e9talisation', 'Transition \u00e9nerg\u00e9tique', 'Qualit\u00e9 de l\u2019air', 'Alimentation durable'],
              },
              {
                theme: 'Budget / Fiscalit\u00e9',
                icon: '\u{1F4B0}',
                points: ['Plan de financement', 'Endettement', 'Fiscalit\u00e9 locale', 'Subventions \u00c9tat/R\u00e9gion'],
              },
            ].map((domain) => (
              <div key={domain.theme} className="playful-dash bg-white p-4">
                <div className="text-2xl mb-2">{domain.icon}</div>
                <h3 className="text-sm font-bold text-ink mb-2">{domain.theme}</h3>
                <ul className="space-y-1">
                  {domain.points.map((point) => (
                    <li key={point} className="text-[11px] text-ink-3 flex items-start gap-1.5">
                      <span className="text-ink-4 mt-0.5">&bull;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Structure du rapport */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Structure de chaque rapport</h2>
          <p className="text-sm text-ink-3 mb-5 leading-relaxed">
            Chaque candidat re&ccedil;oit un rapport d&apos;analyse complet (PDF t&eacute;l&eacute;chargeable) qui suit toujours la m&ecirc;me structure.
          </p>
          <div className="space-y-2.5">
            {[
              { section: 'R\u00e9sum\u00e9 ex\u00e9cutif', detail: 'Note globale, 3 forces principales, 3 faiblesses principales, verdict en 1 phrase.' },
              { section: 'Analyse par crit\u00e8re', detail: '5 sections d\u00e9taill\u00e9es (coh\u00e9rence, solidit\u00e9, robustesse, pragmatisme, d\u00e9tail) avec note, points forts, points de tension et exemples concrets.' },
              { section: 'Analyse th\u00e9matique', detail: 'Logement, Transport, S\u00e9curit\u00e9, \u00c9cologie, Budget \u2014 avec forces et faiblesses pour chaque domaine.' },
              { section: 'Points d\u2019attention critiques', detail: 'Propositions irr\u00e9alistes, contradictions internes, angles morts identifi\u00e9s dans le programme.' },
              { section: 'Contexte municipal', detail: 'Comparaison avec Hidalgo, propositions en rupture, mesures hors comp\u00e9tences municipales.' },
              { section: 'Conclusion', detail: 'Justification de la note, cr\u00e9dibilit\u00e9 et applicabilit\u00e9 globale du programme.' },
              { section: 'Annexes', detail: 'Inventaire d\u00e9taill\u00e9 de toutes les propositions class\u00e9es par domaine, analyse de faisabilit\u00e9.' },
            ].map((item, index) => (
              <div key={item.section} className="playful-dash bg-white p-3.5 flex items-start gap-3">
                <span className="text-[11px] font-bold text-ink-4 w-4 mt-0.5 shrink-0">{index + 1}.</span>
                <div>
                  <div className="text-sm font-semibold text-ink">{item.section}</div>
                  <div className="text-xs text-ink-3 mt-0.5 leading-relaxed">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pondération */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Pond&eacute;ration des notes</h2>
          <p className="text-sm text-ink-3 mb-4">Chaque crit&egrave;re compte pour 20% de la note globale. Pas de surpond&eacute;ration, pas de biais.</p>
          <div className="note-grid">
            {['Coh\u00e9rence', 'Solidit\u00e9', 'Robustesse', 'Pragmatisme', 'D\u00e9tail'].map((criterion) => (
              <div key={criterion} className="playful-dash bg-white p-3 text-center">
                <div className="text-xs text-ink-3">{criterion}</div>
                <div className="text-lg font-bold text-ink mt-1">20%</div>
              </div>
            ))}
          </div>
          <div className="mt-4 playful-dash bg-surface-alt p-3.5">
            <p className="text-xs text-ink-3 leading-relaxed">
              <span className="font-semibold">Note globale</span> = (Coh&eacute;rence + Solidit&eacute; + Robustesse + Pragmatisme + D&eacute;tail) &divide; 5.
              L&apos;&eacute;quipond&eacute;ration &eacute;vite de privil&eacute;gier un angle (ex: technique vs. politique).
            </p>
          </div>
        </section>

        {/* Lecture des scores */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">Lecture des scores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="playful-dash bg-surface-alt p-4 text-center">
              <div className="text-2xl font-bold text-score-solid">7+</div>
              <div className="text-xs font-semibold text-score-solid mt-1">Solide</div>
              <div className="text-[11px] text-ink-3 mt-1">Programme coh&eacute;rent, cr&eacute;dible, document&eacute;</div>
            </div>
            <div className="playful-dash bg-surface-alt p-4 text-center">
              <div className="text-2xl font-bold text-score-mixed">5-7</div>
              <div className="text-xs font-semibold text-score-mixed mt-1">Mitig&eacute;</div>
              <div className="text-[11px] text-ink-3 mt-1">Avanc&eacute;es notables mais limites structurelles</div>
            </div>
            <div className="playful-dash bg-surface-alt p-4 text-center">
              <div className="text-2xl font-bold text-score-fragile">{'<'}5</div>
              <div className="text-xs font-semibold text-score-fragile mt-1">Fragile</div>
              <div className="text-[11px] text-ink-3 mt-1">Insuffisances de r&eacute;alisme ou de pr&eacute;cision</div>
            </div>
          </div>
        </section>

        {/* Rapports téléchargeables */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Rapports t&eacute;l&eacute;chargeables</h2>
          <p className="text-sm text-ink-3 mb-5 leading-relaxed">
            L&apos;int&eacute;gralit&eacute; de l&apos;analyse de chaque candidat est disponible en PDF. Consultez-les pour v&eacute;rifier le raisonnement derri&egrave;re chaque note.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sortedCandidates.map((candidate) => (
              <Link
                key={candidate.slug}
                href={`/candidats/${candidate.slug}`}
                className="group playful-dash bg-white p-3.5 flex items-center gap-3 hover:shadow-sm transition-colors"
              >
                <div className="w-2 h-8 rounded-full shrink-0" style={{ backgroundColor: candidate.politicalColor }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink group-hover:text-score-solid truncate">{candidate.name}</div>
                  <div className="text-[11px] text-ink-3">{candidate.party}</div>
                </div>
                <span className="text-xs font-bold" style={{ color: candidate.globalScore >= 7 ? '#3B82F6' : candidate.globalScore >= 5 ? '#D97706' : '#EA580C' }}>
                  {candidate.globalScore}/10
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Limites */}
        <section className="panel-card p-5 sm:p-7 mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-ink mb-3">Limites de l&apos;analyse</h2>
          <div className="space-y-2.5">
            {[
              'L\u2019IA \u00e9value les programmes tels que publi\u00e9s, pas les intentions r\u00e9elles ni le bilan pass\u00e9 des candidats.',
              'Les notes refl\u00e8tent la qualit\u00e9 du programme \u00e9crit, pas la capacit\u00e9 personnelle du candidat \u00e0 gouverner.',
              'L\u2019analyse ne prend pas en compte les coalitions, alliances ou dynamiques politiques de second tour.',
              'Les scores ne mesurent pas l\u2019adh\u00e9sion populaire ni l\u2019opinion des \u00e9lecteurs.',
              'Certaines propositions peuvent \u00eatre strat\u00e9giquement floues par choix politique \u2014 cela impacte la note mais ne pr\u00e9juge pas de la sinc\u00e9rit\u00e9.',
            ].map((limit, index) => (
              <div key={index} className="playful-dash bg-white p-3.5 flex items-start gap-3">
                <span className="text-score-mixed mt-0.5 font-bold">!</span>
                <p className="text-xs sm:text-sm text-ink-3 leading-relaxed">{limit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparence */}
        <section className="panel-card p-5 sm:p-7">
          <h2 className="text-lg sm:text-xl font-bold text-ink mb-3">Transparence</h2>
          <p className="text-sm text-ink-2 leading-relaxed">
            Les scores ne remplacent pas le d&eacute;bat d&eacute;mocratique. Ils structurent la lecture et rendent explicites les zones
            de solidit&eacute;, les contradictions et les points &agrave; clarifier. Chaque citoyen est invit&eacute; &agrave; t&eacute;l&eacute;charger
            les rapports complets et &agrave; se forger sa propre opinion.
          </p>
        </section>
      </main>
    </div>
  )
}
