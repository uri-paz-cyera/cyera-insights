import { Importance } from '@/types';

interface ImportanceBadgeProps {
  importance: Importance;
  variant?: 'compact' | 'full';
}

export function ImportanceBadge({ importance, variant = 'compact' }: ImportanceBadgeProps) {
  if (variant === 'full') {
    // Visual slider-like display
    const position = importance === 'low' ? 16.67 : importance === 'medium' ? 50 : 83.33;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Importance</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full mb-3">
          <div
            className="absolute h-2 bg-[#1e2952] rounded-full transition-all"
            style={{ width: `${position}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#1e2952] border-4 border-white rounded-full shadow-md transition-all"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-medium text-[#1e2952]">Low</span>
          <span className="text-sm font-medium text-[#1e2952]">Medium</span>
          <span className="text-sm font-medium text-[#1e2952]">High</span>
        </div>
      </div>
    );
  }

  // Compact badge display
  const colors = {
    low: 'bg-gray-400 text-white',
    medium: 'bg-gray-600 text-white',
    high: 'bg-gray-900 text-white',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${colors[importance]}`}
    >
      {labels[importance]}
    </span>
  );
}
