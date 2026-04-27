'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { InsightSliders } from '@/components/InsightSliders';
import { Sentiment, Importance } from '@/types';

export default function DemoSlidersPage() {
  const [sentiment, setSentiment] = useState<Sentiment>('neutral');
  const [importance, setImportance] = useState<Importance>('medium');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Insight Sliders Demo</h1>
        <p className="text-gray-600 mb-8">
          Interactive sliders for sentiment and importance selection
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <InsightSliders
            sentiment={sentiment}
            importance={importance}
            onSentimentChange={setSentiment}
            onImportanceChange={setImportance}
          />

          {/* Current Values Display */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Selection:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Sentiment:</span>
                <span className="font-semibold text-gray-900 capitalize">{sentiment}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Importance:</span>
                <span className="font-semibold text-gray-900 capitalize">{importance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Example */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Usage</h3>
          <pre className="text-xs text-blue-800 overflow-x-auto">
            {`<InsightSliders
  sentiment="neutral"
  importance="medium"
  onSentimentChange={(s) => setSentiment(s)}
  onImportanceChange={(i) => setImportance(i)}
/>`}
          </pre>
        </div>
      </main>
    </div>
  );
}
