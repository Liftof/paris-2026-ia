import Link from 'next/link';
import ScoreBadge from './ScoreBadge';
import { Candidate } from '@/types';

interface CandidateCardProps {
  candidate: Candidate;
  rank: number;
}

export default function CandidateCard({ candidate, rank }: CandidateCardProps) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'border-accent-green border-2';
    if (rank === 2) return 'border-blue-500 border-2';
    if (rank === 3) return 'border-accent-orange border-2';
    return '';
  };

  return (
    <Link href={`/candidats/${candidate.slug}`}>
      <div className={`card hover:scale-105 transition-transform ${getRankStyle(rank)}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.party}</p>
          </div>
          <ScoreBadge score={candidate.score} size="lg" />
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">
            Mesures irréalistes ou incohérentes :
          </h4>
          <div className="space-y-2">
            {candidate.unrealistic_measures.slice(0, 2).map((measure, index) => (
              <div key={index} className="bg-red-50 rounded-lg p-3">
                <p className="font-medium text-sm text-red-900">⚠️ {measure.title}</p>
                <p className="text-xs text-red-700 mt-1">{measure.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Cliquez pour voir l'analyse complète →
        </div>
      </div>
    </Link>
  );
}