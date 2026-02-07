'use client';

import { CandidateScores } from '@/types';

interface RadarChartProps {
  scores: CandidateScores;
  size?: number;
}

const criteriaLabels: { [key: string]: string } = {
  coherence: 'Cohérence',
  solidite: 'Solidité',
  robustesse: 'Robustesse',
  pragmatisme: 'Pragmatisme',
  detail: 'Détail',
};

export default function RadarChart({ scores, size = 300 }: RadarChartProps) {
  const center = size / 2;
  const radius = size / 2 - 30;
  const criteria = Object.keys(scores);
  const numCriteria = criteria.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numCriteria - Math.PI / 2;
    const normalizedValue = value / 10;
    const x = center + radius * normalizedValue * Math.cos(angle);
    const y = center + radius * normalizedValue * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = criteria
    .map((criterion, index) => {
      const { x, y } = getCoordinates(scores[criterion as keyof CandidateScores], index);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative">
      <svg width={size} height={size} className="mx-auto">
        {/* Grid circles */}
        {[2, 4, 6, 8, 10].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(radius * level) / 10}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {criteria.map((_, index) => {
          const { x, y } = getCoordinates(10, index);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="#1E40AF"
          fillOpacity="0.2"
          stroke="#1E40AF"
          strokeWidth="2"
        />

        {/* Data points */}
        {criteria.map((criterion, index) => {
          const { x, y } = getCoordinates(scores[criterion as keyof CandidateScores], index);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#1E40AF"
            />
          );
        })}

        {/* Labels */}
        {criteria.map((criterion, index) => {
          const { x, y } = getCoordinates(11, index);
          const label = criteriaLabels[criterion];
          const score = scores[criterion as keyof CandidateScores];
          return (
            <text
              key={index}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs font-medium fill-gray-700"
            >
              {label} ({score})
            </text>
          );
        })}
      </svg>
    </div>
  );
}