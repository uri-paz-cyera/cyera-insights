// Product Intelligence System - Core Types

export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Importance = 'low' | 'medium' | 'high';
export type SourceType = 'slack' | 'zoom';

export type SpeakerType = 'customer' | 'non_customer' | 'internal';
export type InternalRole = 'sales' | 'csm' | 'support' | 'se' | 'product' | 'engineering';

export interface Company {
  id: string;
  name: string;
  arr?: number; // Annual Recurring Revenue in USD
  industry?: string;
  tier?: 'enterprise' | 'mid_market' | 'smb';
}

export interface Speaker {
  id: string;
  name: string;
  type: SpeakerType;
  // If customer or non-customer
  companyId?: string;
  // If internal
  internalRole?: InternalRole;
  email?: string;
}

export interface Source {
  id: string;
  type: SourceType;
  // For Slack
  channelName?: string;
  channelId?: string;
  threadTs?: string;
  messageUrl?: string;
  // For Zoom
  meetingName?: string;
  meetingId?: string;
  recordingUrl?: string;
  transcriptUrl?: string;
  // Common
  timestamp: string;
}

export interface Quote {
  id: string;
  text: string;
  speakerId: string;
  sourceId: string;
  timestamp?: string;
}

export interface FeatureTag {
  id: string;
  name: string;
  category?: string;
  color?: string;
}

export interface Insight {
  id: string;
  title: string;
  sentiment: Sentiment;
  importance: Importance;
  quotes: Quote[];
  featureTags: FeatureTag[];
  sourceId: string;
  createdAt: string;
  // Computed from quotes and speakers
  speakerIds: string[];
  // For easy filtering
  metadata: {
    sourceType: SourceType;
    hasCustomerFeedback: boolean;
    hasInternalFeedback: boolean;
    customerCompanyIds: string[];
    internalRoles: InternalRole[];
    totalARR: number;
  };
}

// Extended types with populated relations
export interface QuoteWithSpeaker extends Quote {
  speaker: Speaker;
  company?: Company;
}

export interface InsightWithDetails extends Insight {
  quotesWithSpeakers: QuoteWithSpeaker[];
  source: Source;
  relatedCompanies: Company[];
}

// Filter state
export interface FilterState {
  search: string;
  sourceTypes: SourceType[];
  sentiment: Sentiment[];
  importance: Importance[];
  featureTags: string[];
  speakerTypes: SpeakerType[];
  internalRoles: InternalRole[];
  industries: string[];
  tenants: string[]; // Company IDs
  quarters: string[]; // e.g., "2024-Q1", "2024-Q2"
  arrRange?: {
    min: number;
    max: number;
  };
  dateRange?: {
    from: string;
    to: string;
  };
}

export type SortOption =
  | 'most_important'
  | 'most_recent'
  | 'highest_arr'
  | 'most_negative'
  | 'most_positive'
  | 'most_mentions';

// For prioritization dashboard
export interface FeaturePriority {
  featureTag: FeatureTag;
  mentionCount: number;
  totalARR: number;
  avgImportance: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  insights: Insight[];
}
