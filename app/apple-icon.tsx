import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e63946',
          borderRadius: 36,
        }}
      >
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          P26
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.7)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginTop: 6,
          }}
        >
          LABO IA
        </span>
      </div>
    ),
    { ...size },
  )
}
