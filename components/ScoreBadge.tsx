interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const getColorClass = (score: number) => {
    if (score >= 7) return 'bg-palette-blue text-white';
    if (score >= 5) return 'bg-palette-yellow text-gray-900';
    return 'bg-palette-red text-white';
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  };

  return (
    <span
      className={`inline-block font-semibold rounded-sm ${getColorClass(score)} ${sizeClasses[size]}`}
    >
      {score.toFixed(1)}/10
    </span>
  );
}
