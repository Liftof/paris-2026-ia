export interface UnrealisticMeasure {
  title: string;
  detail: string;
}

export interface CandidateScores {
  coherence: number;
  solidite: number;
  robustesse: number;
  pragmatisme: number;
  detail: number;
}

export interface Candidate {
  slug: string;
  name: string;
  party: string;
  score: number;
  scores: CandidateScores;
  strengths: string[];
  weaknesses: string[];
  unrealistic_measures: UnrealisticMeasure[];
}

export interface CandidatesData {
  candidates: Candidate[];
  methodology: {
    criteria: {
      [key: string]: string;
    };
    description: string;
  };
}