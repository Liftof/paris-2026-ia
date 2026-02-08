'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const candidates = [
  { name: 'Bournazel', photo: '/candidates/bournazel.jpg' },
  { name: 'Chikirou', photo: '/candidates/chikirou.jpg' },
  { name: 'Grégoire', photo: '/candidates/gregoire.jpg' },
  { name: 'Dati', photo: '/candidates/dati.jpg' },
  { name: 'Knafo', photo: '/candidates/knafo.jpg' },
  { name: 'Mariani', photo: '/candidates/mariani.jpg' },
]

interface Bubble {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  candidateIndex: number
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function HeroFaces() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<Bubble[]>([])
  const rafRef = useRef<number>(0)
  const [positions, setPositions] = useState<Bubble[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Skip animation if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const rect = container.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    // Fewer and smaller bubbles on mobile
    const isMobile = w < 640
    const bubblesPerCandidate = isMobile ? 1 : 2
    const minSize = isMobile ? 36 : 48
    const maxSize = isMobile ? 56 : 72

    const bubbles: Bubble[] = []
    for (let i = 0; i < candidates.length; i++) {
      for (let j = 0; j < bubblesPerCandidate; j++) {
        const size = randomBetween(minSize, maxSize)
        bubbles.push({
          x: randomBetween(size, w - size),
          y: randomBetween(size, h - size),
          vx: randomBetween(-0.4, 0.4) || 0.2,
          vy: randomBetween(-0.4, 0.4) || 0.2,
          size,
          candidateIndex: i,
        })
      }
    }
    bubblesRef.current = bubbles
    setPositions([...bubbles])

    let lastTime = performance.now()

    function animate(now: number) {
      const dt = Math.min((now - lastTime) / 16, 3) // cap delta to avoid jumps
      lastTime = now

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      for (const bubble of bubblesRef.current) {
        bubble.x += bubble.vx * dt
        bubble.y += bubble.vy * dt

        // Bounce off walls
        if (bubble.x <= 0) {
          bubble.x = 0
          bubble.vx = Math.abs(bubble.vx)
        }
        if (bubble.x >= w - bubble.size) {
          bubble.x = w - bubble.size
          bubble.vx = -Math.abs(bubble.vx)
        }
        if (bubble.y <= 0) {
          bubble.y = 0
          bubble.vy = Math.abs(bubble.vy)
        }
        if (bubble.y >= h - bubble.size) {
          bubble.y = h - bubble.size
          bubble.vy = -Math.abs(bubble.vy)
        }
      }

      setPositions([...bubblesRef.current])
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {positions.map((bubble, i) => (
        <div
          key={i}
          className="absolute pointer-events-auto cursor-default"
          style={{
            transform: `translate(${bubble.x}px, ${bubble.y}px)`,
            width: bubble.size,
            height: bubble.size,
            willChange: 'transform',
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden transition-all duration-500"
            style={{
              filter: hoveredIndex === i ? 'grayscale(0%)' : 'grayscale(100%)',
              opacity: hoveredIndex === i ? 0.85 : 0.08,
              transform: hoveredIndex === i ? 'scale(1.2)' : 'scale(1)',
            }}
          >
            <Image
              src={candidates[bubble.candidateIndex].photo}
              alt=""
              fill
              className="object-cover"
              sizes={`${bubble.size}px`}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
