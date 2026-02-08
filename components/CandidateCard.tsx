import Link from 'next/link'
import Image from 'next/image'
import { Candidate } from '@/types/candidate'

interface CandidateCardProps {
  candidate: Candidate
  rank: number
}

function getScoreColor(score: number): string {
  if (score >= 7) return 'text-score-solid'
  if (score >= 5) return 'text-score-mixed'
  return 'text-score-fragile'
}

function getScoreHex(score: number): string {
  if (score >= 7) return '#16a34a'
  if (score >= 5) return '#d97706'
  return '#dc2626'
}

function getScoreLabel(score: number): string {
  if (score >= 7) return 'Solide'
  if (score >= 5) return 'Mitigé'
  return 'Fragile'
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <article className="panel-card hover:shadow-md transition-all group overflow-hidden">
        <div className="h-[3px] rounded-t-[12px]" style={{ backgroundColor: candidate.politicalColor }} />
        <div className="p-4 md:p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-5 flex-1 w-full md:w-auto">
              <div className="score-display text-lg sm:text-xl w-7 sm:w-8 text-center shrink-0 text-ink-4">
                {rank}
              </div>

              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg shrink-0 overflow-hidden">
                <Image src={candidate.photo} alt={candidate.name} fill className="object-cover" sizes="56px" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <h3 className="text-base md:text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                    {candidate.name}
                  </h3>
                  <span className="text-xs text-ink-3 mt-0.5 sm:mt-0">{candidate.party}</span>
                </div>

                <div className="hidden md:flex flex-wrap gap-4 mt-2">
                  {[
                    { label: 'COH', value: candidate.scores.coherence },
                    { label: 'SOL', value: candidate.scores.solidite },
                    { label: 'ROB', value: candidate.scores.robustesse },
                    { label: 'PRA', value: candidate.scores.pragmatisme },
                    { label: 'DET', value: candidate.scores.detail },
                  ].map((score) => (
                    <div key={score.label} className="flex items-center gap-1.5">
                      <span className="label-mono !text-[9px]">{score.label}</span>
                      <span className={`score-display text-xs ${getScoreColor(score.value)}`}>{score.value.toFixed(1)}</span>
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
                      <span className="label-mono !text-[9px] w-7">{score.label}</span>
                      <div className="score-bar flex-1">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${(score.value / 10) * 100}%`, backgroundColor: getScoreHex(score.value) }}
                        />
                      </div>
                      <span className={`score-display text-[11px] w-8 text-right ${getScoreColor(score.value)}`}>
                        {score.value.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="self-end md:self-center text-right md:ml-4">
              <div className={`score-display text-3xl ${getScoreColor(candidate.globalScore)}`}>{candidate.globalScore}</div>
              <div className="label-mono !text-[9px] mt-0.5">/10</div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
