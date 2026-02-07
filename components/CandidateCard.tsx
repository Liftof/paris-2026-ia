import Link from 'next/link'
import { Candidate } from '@/types/candidate'

interface CandidateCardProps {
  candidate: Candidate
  rank: number
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className="border border-gray-200 hover:border-gray-400 transition-colors group">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 bg-white gap-4">
          <div className="flex items-baseline gap-4 md:gap-6 flex-1">
            <div className="text-2xl font-light text-gray-400 w-8">
              {rank}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-normal text-gray-900 group-hover:text-black transition-colors">
                {candidate.name}
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-6 mt-3 text-xs text-gray-500">
                <div>
                  <span className="uppercase tracking-wider">Cohérence</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.scores.coherence.toFixed(1)}</span>
                </div>
                <div>
                  <span className="uppercase tracking-wider">Solidité</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.scores.solidite.toFixed(1)}</span>
                </div>
                <div>
                  <span className="uppercase tracking-wider">Robustesse</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.scores.robustesse.toFixed(1)}</span>
                </div>
                <div>
                  <span className="uppercase tracking-wider">Pragmatisme</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.scores.pragmatisme.toFixed(1)}</span>
                </div>
                <div>
                  <span className="uppercase tracking-wider">Détail</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.scores.detail.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-light text-gray-900">
              {candidate.globalScore}
            </div>
            <div className="text-xs text-gray-400 mt-1">/10</div>
          </div>
        </div>
      </div>
    </Link>
  )
}