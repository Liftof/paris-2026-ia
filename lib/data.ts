import { CandidatesData } from '@/types';

export async function getCandidatesData(): Promise<CandidatesData> {
  const response = await fetch('/candidates_data.json');
  const data = await response.json();
  return data;
}