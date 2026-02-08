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
          background: '#d97706',
          borderRadius: '50%',
        }}
      >
        <span style={{ fontSize: 100, lineHeight: 1 }}>
          🗼
        </span>
      </div>
    ),
    { ...size },
  )
}
