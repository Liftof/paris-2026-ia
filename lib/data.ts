import candidatesDataJson from './candidatesData.json'
import { Candidate } from '@/types/candidate'

export const candidatesData = candidatesDataJson as unknown as Candidate[]

export function getCandidateBySlug(slug: string): Candidate | undefined {
  return candidatesData.find(candidate => candidate.slug === slug)
}
