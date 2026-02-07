import Link from 'next/link'
import Image from 'next/image'
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
  if (rank === 1) return 'bg-palette-blue text-white'
  if (rank === 2) return 'bg-palette-blue/80 text-white'
  if (rank === 3) return 'bg-palette-yellow text-white'
  return 'bg-gray-200 text-gray-600'
}

function getBarColor(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#EAB308'
  return '#EF4444'
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className="border border-gray-200 hover:border-gray-300 transition-all group hover:shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 bg-white gap-4">
          <div className="flex items-center gap-4 md:gap-5 flex-1 w-full md:w-auto">
            {/* Rank badge */}
            <div className={`text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getRankStyle(rank)}`}>
              {rank}
            </div>

            {/* Photo */}
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0 border-2 border-gray-100">
              <Image
                src={candidate.photo}
                alt={candidate.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-palette-blue transition-colors">
                  {candidate.name}
                </h3>
                <span className="text-xs text-gray-400 mt-0.5 sm:mt-0">{candidate.party}</span>
              </div>
              {/* Desktop: inline scores */}
              <div className="hidden md:flex flex-wrap gap-5 mt-2 text-xs text-gray-500">
                {[
                  { label: 'Cohérence', value: candidate.scores.coherence },
                  { label: 'Solidité', value: candidate.scores.solidite },
                  { label: 'Robustesse', value: candidate.scores.robustesse },
                  { label: 'Pragmatisme', value: candidate.scores.pragmatisme },
                  { label: 'Détail', value: candidate.scores.detail },
                ].map(s => (
                  <div key={s.label}>
                    <span className="uppercase tracking-wider">{s.label}</span>
                    <span className={`ml-1.5 font-semibold ${getScoreColor(s.value)}`}>{s.value.toFixed(1)}</span>
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
                  { label: 'DÉT', value: candidate.scores.detail },
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
            <div className={`text-4xl font-bold ${getGlobalScoreStyle(candidate.globalScore)}`}>
              {candidate.globalScore}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">/10</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
