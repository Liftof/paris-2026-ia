'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/#classement', label: 'Classement', exact: false },
  { href: '/comparateur', label: 'Comparer', hideOnMobile: true },
  { href: '/methodologie', label: 'Méthodo' },
  { href: '/faq', label: 'FAQ', hideOnMobile: true },
  { href: '/a-propos', label: 'À propos', hideOnMobile: true },
]

export default function SiteNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="site-nav">
      <div className="site-nav-pill">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-sm font-bold text-ink">Paris 2026</span>
          <span className="kicker">Labo IA</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors ${
                isActive(link.href) ? 'text-accent' : 'text-ink-3 hover:text-ink'
              } ${link.hideOnMobile ? 'hidden sm:block' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
