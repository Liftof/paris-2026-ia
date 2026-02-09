import { ImageResponse } from 'next/og'
import { getCandidateBySlug, candidatesData } from '@/lib/data'

export const alt = 'Paris 2026 — Analyse IA des programmes municipaux'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Cache bust: 2026-02-09

function getScoreHex(score: number): string {
  if (score >= 7) return '#16a34a'
  if (score >= 5) return '#d97706'
  return '#dc2626'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigé'
  return 'Fragile'
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const candidate = getCandidateBySlug(slug)

  if (!candidate) {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#fafafa',
            fontSize: 48,
            fontWeight: 700,
            color: '#171717',
          }}
        >
          Paris 2026 — Labo IA
        </div>
      ),
      { ...size },
    )
  }

  const sorted = [...candidatesData].sort((a, b) => b.globalScore - a.globalScore)
  const rank = sorted.findIndex((c) => c.slug === candidate.slug) + 1
  const scoreColor = getScoreHex(candidate.globalScore)

  const criteria = [
    { label: 'Cohérence', score: candidate.scores.coherence },
    { label: 'Solidité', score: candidate.scores.solidite },
    { label: 'Robustesse', score: candidate.scores.robustesse },
    { label: 'Pragmatisme', score: candidate.scores.pragmatisme },
    { label: 'Détail', score: candidate.scores.detail },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background: '#fafafa',
          padding: '48px 56px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: '#171717' }}>Paris 2026</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#e63946',
              }}
            >
              Labo IA
            </span>
          </div>
          <span style={{ fontSize: 14, color: '#737373' }}>labo-paris.com</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flex: 1, gap: 40 }}>
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#e63946',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                #{rank}
              </span>
              <span style={{ fontSize: 14, color: '#a3a3a3' }}>{candidate.party}</span>
            </div>
            <span style={{ fontSize: 48, fontWeight: 800, color: '#171717', lineHeight: 1.1 }}>{candidate.name}</span>
            <span style={{ fontSize: 16, color: '#737373', marginTop: 12, lineHeight: 1.5 }}>
              {candidate.verdict.slice(0, 140)}...
            </span>

            {/* Criteria bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 'auto' }}>
              {criteria.map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: '#737373', width: 90 }}>{c.label}</span>
                  <div
                    style={{
                      flex: 1,
                      height: 10,
                      borderRadius: 5,
                      background: '#f5f5f5',
                      overflow: 'hidden',
                      display: 'flex',
                    }}
                  >
                    <div
                      style={{
                        width: `${(c.score / 10) * 100}%`,
                        height: '100%',
                        borderRadius: 5,
                        background: getScoreHex(c.score),
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: getScoreHex(c.score), width: 30, textAlign: 'right' }}>
                    {c.score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Score */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 200,
              borderRadius: 24,
              border: `2px solid ${scoreColor}33`,
              background: `${scoreColor}08`,
            }}
          >
            <span style={{ fontSize: 96, fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
              {candidate.globalScore}
            </span>
            <span style={{ fontSize: 18, color: '#a3a3a3', marginTop: 4 }}>/10</span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: scoreColor,
                marginTop: 8,
              }}
            >
              {getScoreLabel(candidate.globalScore)}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
