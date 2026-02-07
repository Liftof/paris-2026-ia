import fs from 'fs'
import path from 'path'

export function getAnalyseBySlug(slug: string): string | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'analyses', `${slug}-analyse.txt`)
    const content = fs.readFileSync(filePath, 'utf-8')
    return content
  } catch {
    return null
  }
}

export function parseAnalyse(content: string) {
  const lines = content.split('\n')
  
  // Extract sections
  const sections: { title: string, content: string[] }[] = []
  let currentSection: { title: string, content: string[] } | null = null
  
  for (const line of lines) {
    // Detect section headers (all caps lines or lines with numbers like "1.", "2.", etc.)
    if (line.match(/^[A-Z][A-Z\s]{10,}$/) || line.match(/^\d+\.\s+[A-Z]/)) {
      if (currentSection) {
        sections.push(currentSection)
      }
      currentSection = { title: line.trim(), content: [] }
    } else if (currentSection && line.trim()) {
      currentSection.content.push(line)
    }
  }
  
  if (currentSection) {
    sections.push(currentSection)
  }
  
  return sections
}
