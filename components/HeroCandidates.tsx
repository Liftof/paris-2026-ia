'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CandidateInfo {
  slug: string
  name: string
  photo: string
  politicalColor: string
  globalScore: number
}

const rotations = [-8, 5, -4, 7, -6, 3]

export default function HeroCandidates({ candidates }: { candidates: CandidateInfo[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <div className="flex items-center -space-x-3">
      {candidates.map((c, i) => (
        <Link
          key={c.slug}
          href={`/candidats/${c.slug}`}
          className="relative group block"
          style={{ zIndex: hoveredSlug === c.slug ? 20 : 10 - i }}
          onMouseEnter={() => setHoveredSlug(c.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          <div
            className="relative transition-all duration-300 ease-out"
            style={{
              transform: hoveredSlug === c.slug
                ? 'rotate(0deg) scale(1.18) translateY(-6px)'
                : `rotate(${rotations[i]}deg)`,
            }}
          >
            <div
              className="w-14 h-14 sm:w-[68px] sm:h-[68px] rounded-full p-[3px] shadow-md transition-shadow duration-300"
              style={{
                background: c.politicalColor,
                boxShadow: hoveredSlug === c.slug
                  ? `0 8px 24px ${c.politicalColor}44, 0 2px 8px rgba(0,0,0,0.12)`
                  : '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-white">
                <div
                  className="relative w-full h-full transition-all duration-500"
                  style={{
                    filter: hoveredSlug === c.slug ? 'grayscale(0%)' : 'grayscale(100%)',
                  }}
                >
                  <Image
                    src={c.photo}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="68px"
                  />
                </div>
              </div>
            </div>
            {/* Name tooltip on hover */}
            <div
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-200 pointer-events-none"
              style={{
                opacity: hoveredSlug === c.slug ? 1 : 0,
                transform: hoveredSlug === c.slug
                  ? 'translateX(-50%) translateY(0)'
                  : 'translateX(-50%) translateY(-4px)',
              }}
            >
              <span className="text-[10px] font-semibold text-ink bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-[var(--border)]">
                {c.name.split(' ').pop()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
