import fs from 'fs'
import path from 'path'

// Analyses loaded at build time
const analyses: Record<string, string> = {}

try {
  const analysesDir = path.join(process.cwd(), 'content', 'analyses')
  const files = fs.readdirSync(analysesDir)
  
  files.forEach(file => {
    if (file.endsWith('-analyse.txt')) {
      const slug = file.replace('-analyse.txt', '')
      const content = fs.readFileSync(path.join(analysesDir, file), 'utf-8')
      analyses[slug] = content
    }
  })
} catch (e) {
  console.warn('Failed to load analyses:', e)
}

export function getAnalyseBySlug(slug: string): string | null {
  return analyses[slug] || null
}
