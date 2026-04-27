import { Sentiment } from '@/types';

interface SentimentBadgeProps {
  sentiment: Sentiment;
  variant?: 'compact' | 'full';
}

export function SentimentBadge({ sentiment, variant = 'compact' }: SentimentBadgeProps) {
  if (variant === 'full') {
    // Visual slider-like display
    const position = sentiment === 'negative' ? 0 : sentiment === 'neutral' ? 50 : 100;

    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Sentiment</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full mb-3">
          <div
            className="absolute h-2 bg-gradient-to-r from-red-500 via-gray-400 to-green-500 rounded-full"
            style={{ width: '100%' }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-[#1e2952] border-4 border-white rounded-full shadow-md transition-all"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <span className="text-2xl">😞</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">😐</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl">😊</span>
          </div>
        </div>
      </div>
    );
  }

  // Compact badge display
  const colors = {
    negative: 'bg-red-100 text-red-700',
    neutral: 'bg-gray-100 text-gray-700',
    positive: 'bg-green-100 text-green-700',
  };

  const labels = {
    negative: 'Negative',
    neutral: 'Neutral',
    positive: 'Positive',
  };

  const emojis = {
    negative: '😞',
    neutral: '😐',
    positive: '😊',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium ${colors[sentiment]}`}
    >
      <span>{emojis[sentiment]}</span>
      {labels[sentiment]}
    </span>
  );
}
