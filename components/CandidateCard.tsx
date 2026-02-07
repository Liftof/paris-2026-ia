import Link from 'next/link'
import { Candidate } from '@/types/candidate'

interface CandidateCardProps {
  candidate: Candidate
  rank: number
}

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-palette-blue'
  if (score >= 5) return 'text-palette-yellow'
  return 'text-palette-red'
}

function getGlobalScoreStyle(score: number): string {
  if (score >= 7) return 'text-palette-blue'
  if (score >= 5) return 'text-palette-yellow'
  return 'text-palette-red'
}

function getRankStyle(rank: number): string {
  if (rank === 1) return 'text-palette-blue'
  if (rank === 2) return 'text-palette-blue/70'
  if (rank === 3) return 'text-palette-yellow'
  return 'text-gray-400'
}

function getBarColor(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#EAB308'
  return '#EF4444'
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className="border border-gray-200 hover:border-gray-400 transition-all group hover:shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-white gap-4">
          <div className="flex items-start gap-4 md:gap-6 flex-1 w-full md:w-auto">
            <div className={`text-2xl font-light w-8 ${getRankStyle(rank)}`}>
              {rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <h3 className="text-lg md:text-xl font-normal text-gray-900 group-hover:text-black transition-colors">
                  {candidate.name}
                </h3>
                <span className="text-xs text-gray-400 mt-0.5 sm:mt-0">{candidate.party}</span>
              </div>
              {/* Mini score bars on mobile, inline scores on desktop */}
              <div className="hidden md:flex flex-wrap gap-6 mt-3 text-xs text-gray-500">
                {[
                  { label: 'Coherence', value: candidate.scores.coherence },
                  { label: 'Solidite', value: candidate.scores.solidite },
                  { label: 'Robustesse', value: candidate.scores.robustesse },
                  { label: 'Pragmatisme', value: candidate.scores.pragmatisme },
                  { label: 'Detail', value: candidate.scores.detail },
                ].map(s => (
                  <div key={s.label}>
                    <span className="uppercase tracking-wider">{s.label}</span>
                    <span className={`ml-2 font-medium ${getScoreColor(s.value)}`}>{s.value.toFixed(1)}</span>
                  </div>
                ))}
              </div>
              {/* Mobile: mini bars */}
              <div className="md:hidden mt-3 space-y-1.5">
                {[
                  { label: 'COH', value: candidate.scores.coherence },
                  { label: 'SOL', value: candidate.scores.solidite },
                  { label: 'ROB', value: candidate.scores.robustesse },
                  { label: 'PRA', value: candidate.scores.pragmatisme },
                  { label: 'DET', value: candidate.scores.detail },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 w-7">{s.label}</span>
                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full">
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${(s.value / 10) * 100}%`,
                          backgroundColor: getBarColor(s.value)
                        }}
                      />
                    </div>
                    <span className={`text-[10px] font-medium w-6 text-right ${getScoreColor(s.value)}`}>
                      {s.value.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right md:ml-4 self-end md:self-center">
            <div className={`text-4xl font-light ${getGlobalScoreStyle(candidate.globalScore)}`}>
              {candidate.globalScore}
            </div>
            <div className="text-xs text-gray-400 mt-1">/10</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
