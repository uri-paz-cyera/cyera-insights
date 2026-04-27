'use client';

import { useState } from 'react';
import { Sentiment, Importance } from '@/types';

interface InsightSlidersProps {
  sentiment: Sentiment;
  importance: Importance;
  onSentimentChange?: (sentiment: Sentiment) => void;
  onImportanceChange?: (importance: Importance) => void;
  readonly?: boolean;
}

export function InsightSliders({
  sentiment,
  importance,
  onSentimentChange,
  onImportanceChange,
  readonly = false,
}: InsightSlidersProps) {
  // Convert sentiment to slider value (0 = negative, 50 = neutral, 100 = positive)
  const sentimentToValue = (s: Sentiment): number => {
    switch (s) {
      case 'negative':
        return 0;
      case 'neutral':
        return 50;
      case 'positive':
        return 100;
    }
  };

  // Convert slider value to sentiment
  const valueToSentiment = (value: number): Sentiment => {
    if (value < 33) return 'negative';
    if (value < 67) return 'neutral';
    return 'positive';
  };

  // Convert importance to slider value (0 = low, 50 = medium, 100 = high)
  const importanceToValue = (i: Importance): number => {
    switch (i) {
      case 'low':
        return 0;
      case 'medium':
        return 50;
      case 'high':
        return 100;
    }
  };

  // Convert slider value to importance
  const valueToImportance = (value: number): Importance => {
    if (value < 33) return 'low';
    if (value < 67) return 'medium';
    return 'high';
  };

  const [sentimentValue, setSentimentValue] = useState(sentimentToValue(sentiment));
  const [importanceValue, setImportanceValue] = useState(importanceToValue(importance));

  const handleSentimentChange = (value: number) => {
    setSentimentValue(value);
    if (onSentimentChange) {
      onSentimentChange(valueToSentiment(value));
    }
  };

  const handleImportanceChange = (value: number) => {
    setImportanceValue(value);
    if (onImportanceChange) {
      onImportanceChange(valueToImportance(value));
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Sentiment Slider */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">Sentiment</label>
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs text-gray-600">?</span>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sentimentValue}
            onChange={e => handleSentimentChange(Number(e.target.value))}
            disabled={readonly}
            className="sentiment-slider w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                #1e2952 0%,
                #1e2952 ${sentimentValue}%,
                #d1d5db ${sentimentValue}%,
                #d1d5db 100%)`,
            }}
          />
          <style jsx>{`
            .sentiment-slider::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #1e2952;
              border: 4px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              cursor: pointer;
            }
            .sentiment-slider::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #1e2952;
              border: 4px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              cursor: pointer;
            }
            .sentiment-slider:disabled {
              cursor: not-allowed;
              opacity: 0.7;
            }
          `}</style>
        </div>

        {/* Sentiment Icons */}
        <div className="flex items-center justify-between px-1">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-red-400 flex items-center justify-center">
              <span className="text-2xl">😞</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-orange-400 flex items-center justify-center">
              <span className="text-2xl">😐</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-2 border-green-400 flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Importance Slider */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <label className="text-sm font-medium text-gray-700">Importance</label>
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-xs text-gray-600">?</span>
          </div>
        </div>

        {/* Slider Track */}
        <div className="relative mb-4">
          <input
            type="range"
            min="0"
            max="100"
            value={importanceValue}
            onChange={e => handleImportanceChange(Number(e.target.value))}
            disabled={readonly}
            className="importance-slider w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right,
                #1e2952 0%,
                #1e2952 ${importanceValue}%,
                #d1d5db ${importanceValue}%,
                #d1d5db 100%)`,
            }}
          />
          <style jsx>{`
            .importance-slider::-webkit-slider-thumb {
              appearance: none;
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #1e2952;
              border: 4px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              cursor: pointer;
            }
            .importance-slider::-moz-range-thumb {
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #1e2952;
              border: 4px solid white;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              cursor: pointer;
            }
            .importance-slider:disabled {
              cursor: not-allowed;
              opacity: 0.7;
            }
          `}</style>
        </div>

        {/* Importance Labels */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-medium text-[#1e2952]">Low</span>
          <span className="text-sm font-medium text-[#1e2952]">Medium</span>
          <span className="text-sm font-medium text-[#1e2952]">High</span>
        </div>
      </div>
    </div>
  );
}
