interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, size = 'md' }: ScoreBadgeProps) {
  const getColorClass = (score: number) => {
    if (score >= 7) return 'bg-accent-green text-white';
    if (score >= 6) return 'bg-blue-500 text-white';
    if (score >= 5) return 'bg-accent-orange text-white';
    return 'bg-red-500 text-white';
  };

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  };

  return (
    <span
      className={`badge font-semibold ${getColorClass(score)} ${sizeClasses[size]}`}
    >
      {score.toFixed(1)}/10
    </span>
  );
}