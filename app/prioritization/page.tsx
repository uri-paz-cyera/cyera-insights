'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { getAllInsightsWithDetails } from '@/lib/mock-data';
import { calculateFeaturePriorities, formatCurrency } from '@/lib/insights-utils';

export default function PrioritizationPage() {
  const allInsights = useMemo(() => getAllInsightsWithDetails(), []);
  const featurePriorities = useMemo(
    () => calculateFeaturePriorities(allInsights),
    [allInsights]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Feature Prioritization</h1>
          <p className="text-gray-600">
            Features ranked by importance, ARR impact, and negative sentiment weight
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mentions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ARR Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Importance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sentiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {featurePriorities.map((priority, index) => {
                const totalSentiment =
                  priority.sentimentBreakdown.positive +
                  priority.sentimentBreakdown.neutral +
                  priority.sentimentBreakdown.negative;
                const negativePercent =
                  (priority.sentimentBreakdown.negative / totalSentiment) * 100;

                return (
                  <tr key={priority.featureTag.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-400">#{index + 1}</span>
                        <div>
                          <div className="font-medium text-gray-900">
                            {priority.featureTag.name}
                          </div>
                          {priority.featureTag.category && (
                            <div className="text-xs text-gray-500">
                              {priority.featureTag.category}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-gray-900">
                        {priority.mentionCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-blue-600">
                        {formatCurrency(priority.totalARR)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[80px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(priority.avgImportance / 3) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {priority.avgImportance.toFixed(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[120px]">
                            <div
                              className="bg-green-500 h-1.5 rounded-full"
                              style={{
                                width: `${(priority.sentimentBreakdown.positive / totalSentiment) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-6">
                            {priority.sentimentBreakdown.positive}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[120px]">
                            <div
                              className="bg-gray-400 h-1.5 rounded-full"
                              style={{
                                width: `${(priority.sentimentBreakdown.neutral / totalSentiment) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-6">
                            {priority.sentimentBreakdown.neutral}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-1.5 max-w-[120px]">
                            <div
                              className="bg-red-500 h-1.5 rounded-full"
                              style={{
                                width: `${negativePercent}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-6">
                            {priority.sentimentBreakdown.negative}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/?feature=${priority.featureTag.id}`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Insights →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Prioritization Logic Explanation */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Prioritization Formula</h3>
          <p className="text-sm text-blue-800">
            Features are ranked by: <span className="font-mono">Avg Importance × Total ARR × (1 +
            Negative Sentiment Weight × 0.5)</span>
          </p>
          <p className="text-xs text-blue-700 mt-1">
            This weights high-importance features from high-ARR customers with negative sentiment
            more heavily.
          </p>
        </div>
      </main>
    </div>
  );
}
