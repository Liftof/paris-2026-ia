'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FeedbackWidget() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('feedback-dismissed')) {
      setDismissed(true)
      return
    }
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  function handleDismiss() {
    setDismissed(true)
    sessionStorage.setItem('feedback-dismissed', '1')
  }

  if (dismissed) return null

  return (
    <div
      className={`hidden lg:block fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="relative bg-white border border-[var(--border)] shadow-lg rounded-lg p-4 pr-8 max-w-[280px]">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-ink-4 hover:text-ink-2 transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-[11px] text-ink-3 leading-relaxed mb-3">
          Une incoh&eacute;rence ou une question &agrave; remonter ?
        </p>

        <a
          href="https://x.com/pierbapt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-[var(--border)]">
            <Image src="/authors/pierbapt.jpg" alt="@pierbapt" fill className="object-cover" sizes="32px" />
          </div>
          <div>
            <div className="text-xs font-semibold text-ink group-hover:text-accent transition-colors">
              &Eacute;crivez-moi sur X
            </div>
            <div className="text-[11px] text-ink-4 font-mono">@pierbapt</div>
          </div>
          <svg className="w-3.5 h-3.5 text-ink-4 group-hover:text-accent transition-colors ml-auto shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>
    </div>
  )
}
