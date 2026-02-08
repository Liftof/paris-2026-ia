import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="pt-8 sm:pt-10 pb-6 sm:pb-8 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-4 sm:mb-5">
          <Link href="/methodologie" className="text-xs text-ink-3 hover:text-ink transition-colors">Méthodologie</Link>
          <Link href="/comparateur" className="text-xs text-ink-3 hover:text-ink transition-colors">Comparateur</Link>
          <Link href="/faq" className="text-xs text-ink-3 hover:text-ink transition-colors">FAQ</Link>
          <Link href="/a-propos" className="text-xs text-ink-3 hover:text-ink transition-colors">À propos</Link>
        </div>
        <p className="text-xs text-ink-3 text-center leading-relaxed">
          Un projet de{' '}
          <a href="https://x.com/pierbapt" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-accent transition-colors">
            Pierre-Baptiste Borges
          </a>
          {' '}&middot;{' '}
          <a href="https://x.com/pierbapt" target="_blank" rel="noopener noreferrer" className="text-ink-3 hover:text-accent transition-colors">
            @pierbapt
          </a>
        </p>
        <p className="text-xs text-ink-4 text-center mt-2">
          Labo indépendant sans affiliation politique. Analyse IA appliquée à des sources publiques.
        </p>
      </div>
    </footer>
  )
}
