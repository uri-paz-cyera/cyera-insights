'use client';

import Link from 'next/link';
import { mockSources, getAllInsightsWithDetails } from '@/lib/mock-data';
import { Header } from '@/components/Header';
import { formatDate } from '@/lib/insights-utils';

export default function SessionsPage() {
  const allInsights = getAllInsightsWithDetails();

  // Get sources with insight counts
  const sourcesWithInsights = mockSources.map(source => {
    const insightCount = allInsights.filter(i => i.sourceId === source.id).length;
    return { ...source, insightCount };
  });

  const sourceTypeLabels: Record<string, string> = {
    slack: 'Slack',
    zoom: 'Zoom',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            All Sources <span className="text-gray-500 font-normal">({mockSources.length})</span>
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Slack channels and Zoom meetings where insights were captured
          </p>
        </div>

        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by channel or meeting name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex items-center gap-2 text-sm">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2 rounded" />
              💬 Slack
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2 rounded" />
              📹 Zoom
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sourcesWithInsights.map(source => (
            <Link
              key={source.id}
              href={`/sources/${source.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">
                    {source.type === 'slack' ? '💬' : '📹'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate mb-1">
                    {source.type === 'slack' ? source.channelName : source.meetingName}
                  </h3>
                  <span className="inline-block px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700">
                    {sourceTypeLabels[source.type]}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{source.insightCount} insight{source.insightCount !== 1 ? 's' : ''}</span>
                <span>{formatDate(source.timestamp)}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
