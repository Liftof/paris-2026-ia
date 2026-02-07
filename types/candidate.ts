export interface CandidateScores {
  coherence: number
  solidite: number
  robustesse: number
  pragmatisme: number
  detail: number
}

export interface ThematicScore {
  theme: string
  score: number
}

export interface KeyMeasure {
  title: string
  detail: string
  type: 'best' | 'worst' | 'unrealistic'
}

export interface Candidate {
  slug: string
  name: string
  party: string
  photo: string
  politicalColor: string
  campaignUrl: string
  politicalLine: string
  globalScore: number
  scores: CandidateScores
  strengths: string[]
  weaknesses: string[]
  problematicMeasures: string[]
  verdict: string
  bestMeasures: KeyMeasure[]
  worstMeasures: KeyMeasure[]
  thematicScores: ThematicScore[]
  contradictions: string[]
  blindSpots: string[]
}
