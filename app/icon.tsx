import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#e63946',
          borderRadius: 6,
        }}
      >
        <span
          style={{
            fontSize: 17,
            fontWeight: 900,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          P26
        </span>
      </div>
    ),
    { ...size },
  )
}
