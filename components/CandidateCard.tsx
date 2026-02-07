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

function getRankStyle(rank: number): string {
  if (rank === 1) return 'bg-palette-blue text-white'
  if (rank === 2) return 'bg-palette-blue/80 text-white'
  if (rank === 3) return 'bg-palette-yellow text-slate-900'
  return 'bg-slate-200 text-slate-600'
}

function getBarColor(score: number): string {
  if (score >= 7) return '#3B82F6'
  if (score >= 5) return '#D97706'
  return '#EA580C'
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <article className="panel-card hover:border-slate-300 transition-all group overflow-hidden">
        <div className="h-1" style={{ backgroundColor: candidate.politicalColor }} />
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-5 flex-1 w-full md:w-auto">
              <div className={`text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${getRankStyle(rank)}`}>
                {rank}
              </div>

              <div
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-full p-[2px] shrink-0"
                style={{ background: `linear-gradient(135deg, ${candidate.politicalColor}, ${candidate.politicalColor}77)` }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
                  <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="64px" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 group-hover:text-palette-blue transition-colors">
                    {candidate.name}
                  </h3>
                  <span className="text-xs text-slate-500 mt-0.5 sm:mt-0">{candidate.party}</span>
                </div>

                <div className="hidden md:flex flex-wrap gap-5 mt-2 text-xs text-slate-500">
                  {[
                    { label: 'Cohérence', value: candidate.scores.coherence },
                    { label: 'Solidité', value: candidate.scores.solidite },
                    { label: 'Robustesse', value: candidate.scores.robustesse },
                    { label: 'Pragmatisme', value: candidate.scores.pragmatisme },
                    { label: 'Détail', value: candidate.scores.detail },
                  ].map((score) => (
                    <div key={score.label}>
                      <span className="uppercase tracking-[0.12em] text-[10px]">{score.label}</span>
                      <span className={`ml-1.5 font-semibold ${getScoreColor(score.value)}`}>{score.value.toFixed(1)}</span>
                    </div>
                  ))}
                </div>

                <div className="md:hidden mt-3 space-y-1.5">
                  {[
                    { label: 'COH', value: candidate.scores.coherence },
                    { label: 'SOL', value: candidate.scores.solidite },
                    { label: 'ROB', value: candidate.scores.robustesse },
                    { label: 'PRA', value: candidate.scores.pragmatisme },
                    { label: 'DET', value: candidate.scores.detail },
                  ].map((score) => (
                    <div key={score.label} className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400 w-7">{score.label}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200/70">
                        <div
                          className="h-1.5 rounded-full"
                          style={{ width: `${(score.value / 10) * 100}%`, backgroundColor: getBarColor(score.value) }}
                        />
                      </div>
                      <span className={`text-[10px] font-semibold w-7 text-right ${getScoreColor(score.value)}`}>
                        {score.value.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="self-end md:self-center text-right md:ml-4">
              <div className={`text-4xl font-bold ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</div>
              <div className="text-xs text-slate-500 mt-0.5">/10</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
