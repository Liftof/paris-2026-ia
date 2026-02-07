import candidatesDataJson from './candidatesData.json'
import { Candidate } from '@/types/candidate'

export const candidatesData: Candidate[] = candidatesDataJson

export function getCandidateBySlug(slug: string): Candidate | undefined {
  return candidatesData.find(candidate => candidate.slug === slug)
}