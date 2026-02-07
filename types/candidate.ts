export interface CandidateScores {
  coherence: number
  solidite: number
  robustesse: number
  pragmatisme: number
  detail: number
}

export interface Candidate {
  slug: string
  name: string
  globalScore: number
  scores: CandidateScores
  strengths: string[]
  weaknesses: string[]
  problematicMeasures: string[]
}