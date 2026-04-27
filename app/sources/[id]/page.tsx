import Link from 'next/link';
import { mockSources, getAllInsightsWithDetails } from '@/lib/mock-data';
import { Header } from '@/components/Header';
import { InsightCard } from '@/components/InsightCard';
import { formatDateTime } from '@/lib/insights-utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockSources.map(source => ({
    id: source.id,
  }));
}

export default async function SourceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const source = mockSources.find(s => s.id === id);
  const allInsights = getAllInsightsWithDetails();
  const insights = allInsights.filter(i => i.sourceId === id);

  if (!source) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Source not found</h1>
            <Link href="/sessions" className="text-blue-600 hover:text-blue-700">
              Back to sources
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/sessions"
            className="text-sm text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to sources
          </Link>
        </div>

        {/* Source Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">
                  {source.type === 'slack' ? '💬' : '📹'}
                </span>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-1">
                  {source.type === 'slack' ? 'Slack Channel' : 'Zoom Meeting'}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {source.type === 'slack' ? source.channelName : source.meetingName}
                </h1>
                <div className="text-sm text-gray-600">
                  {formatDateTime(source.timestamp)}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Insights Captured</div>
              <div className="text-3xl font-bold text-blue-600">{insights.length}</div>
            </div>
          </div>

          {/* Source Links */}
          <div className="pt-4 border-t border-gray-100">
            {source.type === 'slack' && source.messageUrl && (
              <a
                href={source.messageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View in Slack
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {source.type === 'zoom' && (
              <div className="flex gap-4">
                {source.recordingUrl && (
                  <a
                    href={source.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Recording
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
                {source.transcriptUrl && (
                  <a
                    href={source.transcriptUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Transcript
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Insights from this source */}
        {insights.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Insights from this {source.type === 'slack' ? 'channel' : 'meeting'}
            </h2>
            <div className="space-y-4">
              {insights.map(insight => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-500">No insights captured from this source yet.</p>
          </div>
        )}
      </main>
    </div>
  );
}
