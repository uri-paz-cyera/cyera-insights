import Link from 'next/link';
import { getAllInsightsWithDetails } from '@/lib/mock-data';
import { Header } from '@/components/Header';
import { SentimentBadge } from '@/components/SentimentBadge';
import { ImportanceBadge } from '@/components/ImportanceBadge';
import { Avatar } from '@/components/Avatar';
import {
  formatDateTime,
  formatCurrency,
  getSourceIcon,
  getSpeakerTypeLabel,
  getInternalRoleLabel,
} from '@/lib/insights-utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const allInsights = getAllInsightsWithDetails();
  return allInsights.map(insight => ({
    id: insight.id,
  }));
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { id } = await params;
  const allInsights = getAllInsightsWithDetails();
  const insight = allInsights.find(i => i.id === id);

  if (!insight) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto p-6">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Insight not found</h1>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              Back to insights
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Find related insights (same feature tags)
  const relatedInsights = allInsights.filter(
    i =>
      i.id !== insight.id &&
      i.featureTags.some(tag => insight.featureTags.some(t => t.id === tag.id))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <div className="mb-6">
          <Link
            href="/"
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
            Back to insights
          </Link>
        </div>

        {/* Main Insight Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <SentimentBadge sentiment={insight.sentiment} />
              <ImportanceBadge importance={insight.importance} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl" title={insight.source.type}>
                {getSourceIcon(insight.source.type)}
              </span>
              {insight.metadata.totalARR > 0 && (
                <div className="text-right">
                  <div className="text-sm text-gray-500">ARR Impact</div>
                  <div className="text-xl font-bold text-blue-600">
                    {formatCurrency(insight.metadata.totalARR)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {insight.title}
          </h1>

          {/* Feature Tags */}
          {insight.featureTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {insight.featureTags.map(tag => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium"
                  style={{
                    backgroundColor: tag.color + '20',
                    color: tag.color,
                    border: `1.5px solid ${tag.color}40`,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Source Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Source</h3>
            <div className="space-y-2 text-sm">
              {insight.source.type === 'slack' && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Channel:</span>
                    <span className="font-medium text-gray-900">
                      #{insight.source.channelName}
                    </span>
                  </div>
                  {insight.source.messageUrl && (
                    <a
                      href={insight.source.messageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
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
                </>
              )}
              {insight.source.type === 'zoom' && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Meeting:</span>
                    <span className="font-medium text-gray-900">
                      {insight.source.meetingName}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    {insight.source.recordingUrl && (
                      <a
                        href={insight.source.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
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
                    {insight.source.transcriptUrl && (
                      <a
                        href={insight.source.transcriptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
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
                </>
              )}
              <div className="text-gray-500">{formatDateTime(insight.source.timestamp)}</div>
            </div>
          </div>

          {/* All Quotes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Supporting Evidence ({insight.quotesWithSpeakers.length})
            </h3>
            <div className="space-y-4">
              {insight.quotesWithSpeakers.map(quote => (
                <div key={quote.id} className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-r">
                  <p className="text-gray-800 mb-3 leading-relaxed">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Avatar name={quote.speaker.name} size="sm" />
                        <span className="font-semibold text-gray-900">{quote.speaker.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            quote.speaker.type === 'customer'
                              ? 'bg-green-100 text-green-700'
                              : quote.speaker.type === 'internal'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {quote.speaker.type === 'internal' && quote.speaker.internalRole
                            ? getInternalRoleLabel(quote.speaker.internalRole)
                            : getSpeakerTypeLabel(quote.speaker.type)}
                        </span>
                      </div>
                      {quote.company && (
                        <div className="text-sm text-gray-600">
                          {quote.company.name}
                          {quote.company.arr && (
                            <span className="ml-2 text-blue-600 font-medium">
                              {formatCurrency(quote.company.arr)} ARR
                            </span>
                          )}
                          {quote.company.industry && (
                            <span className="ml-2 text-gray-500">• {quote.company.industry}</span>
                          )}
                        </div>
                      )}
                    </div>
                    {quote.timestamp && (
                      <div className="text-xs text-gray-500">{formatDateTime(quote.timestamp)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Companies */}
        {insight.relatedCompanies.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Companies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insight.relatedCompanies.map(company => (
                <div key={company.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="font-semibold text-gray-900 mb-1">{company.name}</div>
                  <div className="text-sm text-gray-600">
                    {company.industry && <span>{company.industry}</span>}
                    {company.tier && (
                      <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
                        {company.tier}
                      </span>
                    )}
                  </div>
                  {company.arr && (
                    <div className="mt-2 text-sm font-medium text-blue-600">
                      {formatCurrency(company.arr)} ARR
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Insights */}
        {relatedInsights.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Insights</h3>
            <div className="space-y-3">
              {relatedInsights.map(related => (
                <Link
                  key={related.id}
                  href={`/insights/${related.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <SentimentBadge sentiment={related.sentiment} />
                        <ImportanceBadge importance={related.importance} />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{related.title}</h4>
                      <div className="flex flex-wrap gap-1">
                        {related.featureTags.map(tag => (
                          <span
                            key={tag.id}
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: tag.color + '20',
                              color: tag.color,
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
