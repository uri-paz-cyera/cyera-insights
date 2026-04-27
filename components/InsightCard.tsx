import Link from 'next/link';
import { InsightWithDetails } from '@/types';
import { SentimentBadge } from './SentimentBadge';
import { ImportanceBadge } from './ImportanceBadge';
import { Avatar } from './Avatar';
import {
  formatDate,
  formatCurrency,
  getSourceIcon,
  getSpeakerTypeLabel,
  getInternalRoleLabel,
} from '@/lib/insights-utils';

interface InsightCardProps {
  insight: InsightWithDetails;
}

export function InsightCard({ insight }: InsightCardProps) {
  // Get the first quote with speaker details
  const primaryQuote = insight.quotesWithSpeakers[0];
  const speaker = primaryQuote?.speaker;
  const company = primaryQuote?.company;

  return (
    <Link
      href={`/insights/${insight.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      {/* Header with badges and source */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <SentimentBadge sentiment={insight.sentiment} />
          <ImportanceBadge importance={insight.importance} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg" title={insight.source.type}>
            {getSourceIcon(insight.source.type)}
          </span>
          {insight.metadata.totalARR > 0 && (
            <span className="text-sm font-semibold text-blue-600">
              {formatCurrency(insight.metadata.totalARR)}
            </span>
          )}
        </div>
      </div>

      {/* Insight Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-snug line-clamp-2">
        {insight.title}
      </h3>

      {/* Primary Quote */}
      {primaryQuote && (
        <div className="border-l-3 border-l-4 border-blue-500 pl-4 mb-4 bg-gray-50 py-3 rounded-r">
          <p className="text-sm text-gray-700 italic mb-2 line-clamp-2">
            &ldquo;{primaryQuote.text}&rdquo;
          </p>
          <div className="flex items-center gap-2 text-xs">
            <Avatar name={speaker?.name || 'Unknown'} size="sm" />
            <span className="font-medium text-gray-900">{speaker?.name}</span>
            <span className="text-gray-400">•</span>
            <span
              className={`px-2 py-0.5 rounded ${
                speaker?.type === 'customer'
                  ? 'bg-green-100 text-green-700'
                  : speaker?.type === 'internal'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
              }`}
            >
              {speaker?.type === 'internal' && speaker.internalRole
                ? getInternalRoleLabel(speaker.internalRole)
                : getSpeakerTypeLabel(speaker?.type || '')}
            </span>
            {company && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{company.name}</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Additional quotes indicator */}
      {insight.quotes.length > 1 && (
        <p className="text-xs text-gray-500 mb-3">
          +{insight.quotes.length - 1} more quote{insight.quotes.length - 1 !== 1 ? 's' : ''}
        </p>
      )}

      {/* Feature Tags */}
      {insight.featureTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {insight.featureTags.map(tag => (
            <span
              key={tag.id}
              className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: tag.color + '20',
                color: tag.color,
                border: `1px solid ${tag.color}40`,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div>
          {insight.source.type === 'slack' && (
            <span>#{insight.source.channelName}</span>
          )}
          {insight.source.type === 'zoom' && (
            <span>{insight.source.meetingName}</span>
          )}
        </div>
        <span>{formatDate(insight.createdAt)}</span>
      </div>
    </Link>
  );
}
