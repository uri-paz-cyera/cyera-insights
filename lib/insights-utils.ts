import { InsightWithDetails, FilterState, SortOption, FeaturePriority } from '@/types';
import { mockFeatureTags, getCompanyById } from '@/lib/mock-data';

// Advanced natural language search
export function searchInsights(
  insights: InsightWithDetails[],
  searchQuery: string
): InsightWithDetails[] {
  if (!searchQuery.trim()) return insights;

  const query = searchQuery.toLowerCase();

  // Parse common patterns
  const patterns = {
    sentiment: /(positive|negative|neutral)/gi,
    importance: /(high|medium|low)\s+importance/gi,
    speakerType: /(customer|internal|field|sales|support|csm|se)/gi,
    industry: /(financial|healthcare|technology|retail|manufacturing)/gi,
    source: /(slack|zoom)/gi,
    arrThreshold: /arr\s*>\s*(\d+)/gi,
  };

  return insights.filter(insight => {
    // Basic text matching
    const textMatch =
      insight.title.toLowerCase().includes(query) ||
      insight.quotesWithSpeakers.some(q => q.text.toLowerCase().includes(query)) ||
      insight.featureTags.some(tag => tag.name.toLowerCase().includes(query)) ||
      insight.relatedCompanies.some(
        c => c.name.toLowerCase().includes(query) || c.industry?.toLowerCase().includes(query)
      ) ||
      insight.quotesWithSpeakers.some(
        q =>
          q.speaker.name.toLowerCase().includes(query) ||
          (q.speaker.internalRole && q.speaker.internalRole.toLowerCase().includes(query))
      );

    if (textMatch) return true;

    // Pattern-based matching
    // Check sentiment
    const sentimentMatches = query.match(patterns.sentiment);
    if (sentimentMatches && !sentimentMatches.some(s => s === insight.sentiment)) {
      return false;
    }

    // Check importance
    if (query.includes('high importance') && insight.importance !== 'high') return false;
    if (query.includes('medium importance') && insight.importance !== 'medium') return false;
    if (query.includes('low importance') && insight.importance !== 'low') return false;

    // Check speaker type
    if (query.includes('customer') && !insight.metadata.hasCustomerFeedback) return false;
    if (query.includes('internal') && !insight.metadata.hasInternalFeedback) return false;
    if (query.includes('field') && !insight.metadata.hasInternalFeedback) return false;

    // Check ARR threshold
    const arrMatch = query.match(/arr\s*>\s*(\d+)/i);
    if (arrMatch) {
      const threshold = parseInt(arrMatch[1]);
      if (insight.metadata.totalARR <= threshold) return false;
    }

    return false;
  });
}

// Filter insights based on filter state
export function filterInsights(
  insights: InsightWithDetails[],
  filters: FilterState
): InsightWithDetails[] {
  return insights.filter(insight => {
    // Source type filter
    if (filters.sourceTypes.length > 0 && !filters.sourceTypes.includes(insight.metadata.sourceType)) {
      return false;
    }

    // Sentiment filter
    if (filters.sentiment.length > 0 && !filters.sentiment.includes(insight.sentiment)) {
      return false;
    }

    // Importance filter
    if (filters.importance.length > 0 && !filters.importance.includes(insight.importance)) {
      return false;
    }

    // Feature tags filter
    if (filters.featureTags.length > 0) {
      const insightTagIds = insight.featureTags.map(t => t.id);
      const hasMatchingTag = filters.featureTags.some(tagId => insightTagIds.includes(tagId));
      if (!hasMatchingTag) return false;
    }

    // Speaker type filter
    if (filters.speakerTypes.length > 0) {
      const hasCustomer = filters.speakerTypes.includes('customer');
      const hasNonCustomer = filters.speakerTypes.includes('non_customer');
      const hasInternal = filters.speakerTypes.includes('internal');

      const matchesFilter =
        (hasCustomer && insight.metadata.hasCustomerFeedback) ||
        (hasInternal && insight.metadata.hasInternalFeedback) ||
        (hasNonCustomer &&
          insight.quotesWithSpeakers.some(q => q.speaker.type === 'non_customer'));

      if (!matchesFilter) return false;
    }

    // Internal roles filter
    if (filters.internalRoles.length > 0) {
      const hasMatchingRole = filters.internalRoles.some(role =>
        insight.metadata.internalRoles.includes(role)
      );
      if (!hasMatchingRole && insight.metadata.hasInternalFeedback) return false;
    }

    // Industries filter
    if (filters.industries.length > 0) {
      const hasMatchingIndustry = insight.relatedCompanies.some(
        company => company.industry && filters.industries.includes(company.industry)
      );
      if (!hasMatchingIndustry && insight.relatedCompanies.length > 0) return false;
    }

    // ARR range filter
    if (filters.arrRange) {
      const arr = insight.metadata.totalARR;
      if (arr < filters.arrRange.min || arr > filters.arrRange.max) {
        return false;
      }
    }

    // Date range filter
    if (filters.dateRange) {
      const insightDate = new Date(insight.createdAt);
      const fromDate = new Date(filters.dateRange.from);
      const toDate = new Date(filters.dateRange.to);
      if (insightDate < fromDate || insightDate > toDate) {
        return false;
      }
    }

    // Tenants (companies) filter
    if (filters.tenants.length > 0) {
      const hasMatchingTenant = insight.metadata.customerCompanyIds.some(companyId =>
        filters.tenants.includes(companyId)
      );
      if (!hasMatchingTenant && insight.metadata.customerCompanyIds.length > 0) {
        return false;
      }
    }

    // Quarter filter
    if (filters.quarters.length > 0) {
      const insightQuarter = getQuarterFromDate(insight.createdAt);
      if (!filters.quarters.includes(insightQuarter)) {
        return false;
      }
    }

    return true;
  });
}

// Sort insights
export function sortInsights(
  insights: InsightWithDetails[],
  sortOption: SortOption
): InsightWithDetails[] {
  const sorted = [...insights];

  switch (sortOption) {
    case 'most_important':
      return sorted.sort((a, b) => {
        const importanceOrder = { high: 3, medium: 2, low: 1 };
        return importanceOrder[b.importance] - importanceOrder[a.importance];
      });

    case 'most_recent':
      return sorted.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    case 'highest_arr':
      return sorted.sort((a, b) => {
        return b.metadata.totalARR - a.metadata.totalARR;
      });

    case 'most_negative':
      return sorted.sort((a, b) => {
        const sentimentOrder = { negative: 3, neutral: 2, positive: 1 };
        return sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment];
      });

    case 'most_positive':
      return sorted.sort((a, b) => {
        const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
        return sentimentOrder[b.sentiment] - sentimentOrder[a.sentiment];
      });

    case 'most_mentions':
      return sorted.sort((a, b) => {
        return b.quotes.length - a.quotes.length;
      });

    default:
      return sorted;
  }
}

// Get unique values for filters
export function getUniqueIndustries(insights: InsightWithDetails[]): string[] {
  const industries = insights.flatMap(i =>
    i.relatedCompanies.map(c => c.industry).filter((industry): industry is string => !!industry)
  );
  return Array.from(new Set(industries)).sort();
}

export function getUniqueInternalRoles(insights: InsightWithDetails[]): string[] {
  const roles = insights.flatMap(i => i.metadata.internalRoles);
  return Array.from(new Set(roles)).sort();
}

export function getUniqueTenants(insights: InsightWithDetails[]): string[] {
  const companyIds = insights.flatMap(i => i.metadata.customerCompanyIds);
  return Array.from(new Set(companyIds)).sort();
}

export function getUniqueQuarters(insights: InsightWithDetails[]): string[] {
  const quarters = insights.map(i => getQuarterFromDate(i.createdAt));
  return Array.from(new Set(quarters)).sort().reverse(); // Most recent first
}

export function getQuarterFromDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const quarter = Math.floor(month / 3) + 1;
  return `${year}-Q${quarter}`;
}

export function formatQuarterLabel(quarter: string): string {
  return quarter; // e.g., "2024-Q1"
}

// Calculate feature prioritization
export function calculateFeaturePriorities(
  insights: InsightWithDetails[]
): FeaturePriority[] {
  const featureMap = new Map<string, FeaturePriority>();

  insights.forEach(insight => {
    insight.featureTags.forEach(tag => {
      if (!featureMap.has(tag.id)) {
        featureMap.set(tag.id, {
          featureTag: tag,
          mentionCount: 0,
          totalARR: 0,
          avgImportance: 0,
          sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
          insights: [],
        });
      }

      const priority = featureMap.get(tag.id)!;
      priority.mentionCount += 1;
      priority.totalARR += insight.metadata.totalARR;
      priority.sentimentBreakdown[insight.sentiment] += 1;
      priority.insights.push(insight as any); // Simplified for now
    });
  });

  // Calculate average importance
  featureMap.forEach(priority => {
    const importanceScores = { high: 3, medium: 2, low: 1 };
    const totalImportance = priority.insights.reduce(
      (sum, i) => sum + importanceScores[i.importance],
      0
    );
    priority.avgImportance = totalImportance / priority.insights.length;
  });

  return Array.from(featureMap.values()).sort((a, b) => {
    // Sort by weighted score: importance * ARR * negative sentiment weight
    const scoreA =
      a.avgImportance * a.totalARR * (1 + a.sentimentBreakdown.negative * 0.5);
    const scoreB =
      b.avgImportance * b.totalARR * (1 + b.sentimentBreakdown.negative * 0.5);
    return scoreB - scoreA;
  });
}

// Format currency
export function formatCurrency(amount: number): string {
  if (amount === 0) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Format date and time
export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Get source icon
export function getSourceIcon(sourceType: 'slack' | 'zoom'): string {
  return sourceType === 'slack' ? '💬' : '📹';
}

// Get speaker type label
export function getSpeakerTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    customer: 'Customer',
    non_customer: 'Prospect',
    internal: 'Internal',
  };
  return labels[type] || type;
}

// Get internal role label
export function getInternalRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    sales: 'Sales',
    csm: 'CSM',
    support: 'Support',
    se: 'Solutions Engineer',
    product: 'Product',
    engineering: 'Engineering',
  };
  return labels[role] || role;
}
