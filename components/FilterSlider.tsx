'use client';

import { Sentiment, Importance } from '@/types';

interface SentimentFilterSliderProps {
  type: 'sentiment';
  selected: Sentiment[];
  onChange: (values: Sentiment[]) => void;
}

interface ImportanceFilterSliderProps {
  type: 'importance';
  selected: Importance[];
  onChange: (values: Importance[]) => void;
}

type FilterSliderProps = SentimentFilterSliderProps | ImportanceFilterSliderProps;

export function FilterSlider(props: FilterSliderProps) {
  if (props.type === 'sentiment') {
    const { selected, onChange } = props;
    const toggle = (value: Sentiment) => {
      if (selected.includes(value)) {
        onChange(selected.filter(v => v !== value));
      } else {
        onChange([...selected, value]);
      }
    };

    return (
      <div>
        <div className="flex items-center gap-2 mb-3">
          <h4 className="text-xs font-medium text-gray-700">Sentiment</h4>
        </div>

        {/* Visual Slider Track */}
        <div className="relative h-2 bg-gray-200 rounded-full mb-3">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-400 to-green-500 rounded-full opacity-30" />
          {/* Active indicators */}
          {selected.includes('negative') && (
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-red-500 rounded-l-full opacity-60" />
          )}
          {selected.includes('neutral') && (
            <div className="absolute left-1/3 top-0 bottom-0 w-1/3 bg-orange-400 opacity-60" />
          )}
          {selected.includes('positive') && (
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-green-500 rounded-r-full opacity-60" />
          )}
        </div>

        {/* Interactive Icons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => toggle('negative')}
            className={`flex flex-col items-center transition-all ${
              selected.includes('negative')
                ? 'opacity-100 scale-110'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                selected.includes('negative')
                  ? 'border-2 border-red-500 bg-red-50'
                  : 'border-2 border-gray-300'
              }`}
            >
              <span className="text-2xl">😞</span>
            </div>
          </button>
          <button
            onClick={() => toggle('neutral')}
            className={`flex flex-col items-center transition-all ${
              selected.includes('neutral')
                ? 'opacity-100 scale-110'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                selected.includes('neutral')
                  ? 'border-2 border-orange-500 bg-orange-50'
                  : 'border-2 border-gray-300'
              }`}
            >
              <span className="text-2xl">😐</span>
            </div>
          </button>
          <button
            onClick={() => toggle('positive')}
            className={`flex flex-col items-center transition-all ${
              selected.includes('positive')
                ? 'opacity-100 scale-110'
                : 'opacity-40 hover:opacity-70'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                selected.includes('positive')
                  ? 'border-2 border-green-500 bg-green-50'
                  : 'border-2 border-gray-300'
              }`}
            >
              <span className="text-2xl">😊</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Importance filter
  const { selected, onChange } = props;
  const toggle = (value: Importance) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  // Calculate progress bar width based on selected values
  const getProgressWidth = () => {
    if (selected.length === 0) return 0;
    if (selected.includes('high')) return 100;
    if (selected.includes('medium')) return 50;
    if (selected.includes('low')) return 16.67;
    return 0;
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h4 className="text-xs font-medium text-gray-700">Importance</h4>
      </div>

      {/* Visual Slider Track */}
      <div className="relative h-2 bg-gray-200 rounded-full mb-3">
        {selected.length > 0 && (
          <div
            className="absolute left-0 top-0 bottom-0 bg-[#1e2952] rounded-full transition-all"
            style={{ width: `${getProgressWidth()}%` }}
          />
        )}
        {/* Active position indicators */}
        {selected.includes('low') && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#1e2952] border-2 border-white rounded-full shadow-md"
            style={{ left: '16.67%' }}
          />
        )}
        {selected.includes('medium') && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#1e2952] border-2 border-white rounded-full shadow-md"
            style={{ left: '50%' }}
          />
        )}
        {selected.includes('high') && (
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#1e2952] border-2 border-white rounded-full shadow-md"
            style={{ left: '83.33%' }}
          />
        )}
      </div>

      {/* Interactive Labels */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={() => toggle('low')}
          className={`text-xs font-medium transition-all ${
            selected.includes('low')
              ? 'text-[#1e2952] scale-110'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Low
        </button>
        <button
          onClick={() => toggle('medium')}
          className={`text-xs font-medium transition-all ${
            selected.includes('medium')
              ? 'text-[#1e2952] scale-110'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => toggle('high')}
          className={`text-xs font-medium transition-all ${
            selected.includes('high')
              ? 'text-[#1e2952] scale-110'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          High
        </button>
      </div>
    </div>
  );
}
