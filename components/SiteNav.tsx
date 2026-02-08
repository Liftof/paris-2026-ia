'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const primaryLinks = [
  { href: '/#classement', label: 'Classement' },
  { href: '/comparateur', label: 'Comparer' },
]

const allLinks = [
  { href: '/#classement', label: 'Classement' },
  { href: '/comparateur', label: 'Comparer' },
  { href: '/methodologie', label: 'Méthodologie' },
  { href: '/faq', label: 'FAQ' },
  { href: '/a-propos', label: 'À propos' },
]

export default function SiteNav() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  function isActive(href: string) {
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Close on click outside
  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  return (
    <nav className="site-nav">
      <div className="site-nav-pill">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <span className="text-xs sm:text-sm font-bold text-ink">Paris 2026</span>
          <span className="kicker !text-[9px] sm:!text-[11px]">Labo IA</span>
        </Link>

        {/* Desktop: all links */}
        <div className="hidden sm:flex items-center gap-5">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs font-medium transition-colors ${
                isActive(link.href) ? 'text-accent' : 'text-ink-3 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile: 2 primary links + burger */}
        <div className="flex sm:hidden items-center gap-3">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] font-medium transition-colors ${
                isActive(link.href) ? 'text-accent' : 'text-ink-3 hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Burger button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-ink-3 hover:text-ink transition-colors"
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white/95 backdrop-blur-md border border-[var(--border)] rounded-xl shadow-lg py-1.5 animate-fade-in">
                {allLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      isActive(link.href)
                        ? 'text-accent font-semibold'
                        : 'text-ink-2 hover:text-ink hover:bg-surface-alt/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
