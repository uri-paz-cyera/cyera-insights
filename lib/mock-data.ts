import {
  Company,
  Speaker,
  Source,
  Quote,
  FeatureTag,
  Insight,
  InsightWithDetails,
  QuoteWithSpeaker,
} from '@/types';

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: 'comp1',
    name: 'Acme Financial Services',
    arr: 250000,
    industry: 'Financial Services',
    tier: 'enterprise',
  },
  {
    id: 'comp2',
    name: 'TechCorp Industries',
    arr: 150000,
    industry: 'Technology',
    tier: 'enterprise',
  },
  {
    id: 'comp3',
    name: 'HealthSecure Inc',
    arr: 80000,
    industry: 'Healthcare',
    tier: 'mid_market',
  },
  {
    id: 'comp4',
    name: 'RetailChain Co',
    arr: 45000,
    industry: 'Retail',
    tier: 'smb',
  },
  {
    id: 'comp5',
    name: 'Global Manufacturing',
    arr: 320000,
    industry: 'Manufacturing',
    tier: 'enterprise',
  },
  {
    id: 'comp6',
    name: 'DataVault Systems',
    arr: 120000,
    industry: 'Technology',
    tier: 'mid_market',
  },
];

// Mock Speakers
export const mockSpeakers: Speaker[] = [
  // Customers
  {
    id: 'spk1',
    name: 'Sarah Chen',
    type: 'customer',
    companyId: 'comp1',
    email: 'sarah.chen@acmefinancial.com',
  },
  {
    id: 'spk2',
    name: 'Michael Rodriguez',
    type: 'customer',
    companyId: 'comp2',
    email: 'michael.r@techcorp.com',
  },
  {
    id: 'spk3',
    name: 'Dr. Emily Watson',
    type: 'customer',
    companyId: 'comp3',
    email: 'e.watson@healthsecure.com',
  },
  {
    id: 'spk4',
    name: 'James Miller',
    type: 'customer',
    companyId: 'comp5',
    email: 'jmiller@globalmanuf.com',
  },
  // Internal - Sales
  {
    id: 'spk5',
    name: 'David Kim',
    type: 'internal',
    internalRole: 'sales',
    email: 'david.kim@cyera.io',
  },
  {
    id: 'spk6',
    name: 'Lisa Anderson',
    type: 'internal',
    internalRole: 'sales',
    email: 'lisa.anderson@cyera.io',
  },
  // Internal - CSM
  {
    id: 'spk7',
    name: 'Tom Harris',
    type: 'internal',
    internalRole: 'csm',
    email: 'tom.harris@cyera.io',
  },
  // Internal - SE
  {
    id: 'spk8',
    name: 'Rachel Park',
    type: 'internal',
    internalRole: 'se',
    email: 'rachel.park@cyera.io',
  },
  // Internal - Support
  {
    id: 'spk9',
    name: 'Alex Thompson',
    type: 'internal',
    internalRole: 'support',
    email: 'alex.thompson@cyera.io',
  },
  // Non-customer
  {
    id: 'spk10',
    name: 'Jennifer Scott',
    type: 'non_customer',
    companyId: 'comp4',
    email: 'jscott@retailchain.com',
  },
];

// Mock Sources
export const mockSources: Source[] = [
  // Slack sources
  {
    id: 'src1',
    type: 'slack',
    channelName: '#customer-feedback',
    channelId: 'C123ABC',
    threadTs: '1703001234.123456',
    messageUrl: 'https://cyera.slack.com/archives/C123ABC/p1703001234123456',
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: 'src2',
    type: 'slack',
    channelName: '#sales-insights',
    channelId: 'C456DEF',
    threadTs: '1703087634.789012',
    messageUrl: 'https://cyera.slack.com/archives/C456DEF/p1703087634789012',
    timestamp: '2024-01-16T14:20:00Z',
  },
  {
    id: 'src3',
    type: 'slack',
    channelName: '#enterprise-customers',
    channelId: 'C789GHI',
    threadTs: '1703174034.345678',
    messageUrl: 'https://cyera.slack.com/archives/C789GHI/p1703174034345678',
    timestamp: '2024-01-17T09:15:00Z',
  },
  // Zoom sources
  {
    id: 'src4',
    type: 'zoom',
    meetingName: 'Acme Financial - Quarterly Review',
    meetingId: '123-456-789',
    recordingUrl: 'https://zoom.us/rec/share/abc123',
    transcriptUrl: 'https://zoom.us/rec/transcript/abc123',
    timestamp: '2024-01-18T15:00:00Z',
  },
  {
    id: 'src5',
    type: 'zoom',
    meetingName: 'TechCorp - Feature Discovery Call',
    meetingId: '987-654-321',
    recordingUrl: 'https://zoom.us/rec/share/def456',
    transcriptUrl: 'https://zoom.us/rec/transcript/def456',
    timestamp: '2024-01-19T11:00:00Z',
  },
  {
    id: 'src6',
    type: 'zoom',
    meetingName: 'Sales Team Sync - Week 3',
    meetingId: '555-444-333',
    recordingUrl: 'https://zoom.us/rec/share/ghi789',
    transcriptUrl: 'https://zoom.us/rec/transcript/ghi789',
    timestamp: '2024-01-20T10:00:00Z',
  },
  {
    id: 'src7',
    type: 'slack',
    channelName: '#support-escalations',
    channelId: 'C999XYZ',
    threadTs: '1703347234.901234',
    messageUrl: 'https://cyera.slack.com/archives/C999XYZ/p1703347234901234',
    timestamp: '2024-01-21T16:45:00Z',
  },
];

// Mock Feature Tags
export const mockFeatureTags: FeatureTag[] = [
  { id: 'ft1', name: 'Data Classification', category: 'Core', color: '#3B82F6' },
  { id: 'ft2', name: 'Access Control', category: 'Security', color: '#EF4444' },
  { id: 'ft3', name: 'DSPM', category: 'Core', color: '#10B981' },
  { id: 'ft4', name: 'Policy Engine', category: 'Governance', color: '#F59E0B' },
  { id: 'ft5', name: 'Compliance Reporting', category: 'Compliance', color: '#8B5CF6' },
  { id: 'ft6', name: 'Data Discovery', category: 'Core', color: '#06B6D4' },
  { id: 'ft7', name: 'Alerting', category: 'Operations', color: '#EC4899' },
  { id: 'ft8', name: 'Integration APIs', category: 'Platform', color: '#6366F1' },
  { id: 'ft9', name: 'Dashboard', category: 'UI', color: '#14B8A6' },
  { id: 'ft10', name: 'Data Lineage', category: 'Core', color: '#F97316' },
];

// Mock Quotes
export const mockQuotes: Quote[] = [
  {
    id: 'q1',
    text: 'The data classification is great, but we need more granular control over custom sensitivity labels for our financial data',
    speakerId: 'spk1',
    sourceId: 'src4',
    timestamp: '2024-01-18T15:12:00Z',
  },
  {
    id: 'q2',
    text: 'Our compliance team is asking for automated quarterly reports - this would save us 40+ hours per quarter',
    speakerId: 'spk1',
    sourceId: 'src4',
    timestamp: '2024-01-18T15:18:00Z',
  },
  {
    id: 'q3',
    text: 'I have three customers this week asking about real-time alerting for policy violations. It\'s becoming a common request',
    speakerId: 'spk5',
    sourceId: 'src2',
    timestamp: '2024-01-16T14:25:00Z',
  },
  {
    id: 'q4',
    text: 'The integration with our existing SIEM was smooth, but the API rate limits are too restrictive for our use case',
    speakerId: 'spk2',
    sourceId: 'src5',
    timestamp: '2024-01-19T11:15:00Z',
  },
  {
    id: 'q5',
    text: 'We love the data discovery capabilities - found shadow databases we didn\'t even know existed!',
    speakerId: 'spk2',
    sourceId: 'src5',
    timestamp: '2024-01-19T11:22:00Z',
  },
  {
    id: 'q6',
    text: 'Customer just told me they can\'t go to production without better access control granularity. Deal at risk.',
    speakerId: 'spk6',
    sourceId: 'src3',
    timestamp: '2024-01-17T09:20:00Z',
  },
  {
    id: 'q7',
    text: 'The dashboard is visually impressive but our security team finds it hard to drill down into specific data stores',
    speakerId: 'spk3',
    sourceId: 'src1',
    timestamp: '2024-01-15T10:35:00Z',
  },
  {
    id: 'q8',
    text: 'Data lineage feature is exactly what we needed for our audit trail requirements',
    speakerId: 'spk4',
    sourceId: 'src6',
    timestamp: '2024-01-20T10:15:00Z',
  },
  {
    id: 'q9',
    text: 'Support ticket volume is up 30% around policy engine configuration - customers find it confusing',
    speakerId: 'spk9',
    sourceId: 'src7',
    timestamp: '2024-01-21T16:50:00Z',
  },
  {
    id: 'q10',
    text: 'Every enterprise deal requires custom compliance reporting. We need to productize this',
    speakerId: 'spk5',
    sourceId: 'src6',
    timestamp: '2024-01-20T10:30:00Z',
  },
  {
    id: 'q11',
    text: 'The DSPM capabilities are best-in-class, but the learning curve is steep for new users',
    speakerId: 'spk8',
    sourceId: 'src6',
    timestamp: '2024-01-20T10:45:00Z',
  },
  {
    id: 'q12',
    text: 'We\'re evaluating your platform but need better API documentation before we can commit',
    speakerId: 'spk10',
    sourceId: 'src2',
    timestamp: '2024-01-16T14:40:00Z',
  },
];

// Mock Insights
export const mockInsights: Insight[] = [
  {
    id: 'i1',
    title: 'Enterprise customers need more granular custom sensitivity labels for financial data',
    sentiment: 'neutral',
    importance: 'high',
    quotes: [mockQuotes[0]],
    featureTags: [mockFeatureTags[0]], // Data Classification
    sourceId: 'src4',
    createdAt: '2024-01-18T15:30:00Z',
    speakerIds: ['spk1'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: true,
      hasInternalFeedback: false,
      customerCompanyIds: ['comp1'],
      internalRoles: [],
      totalARR: 250000,
    },
  },
  {
    id: 'i2',
    title: 'Automated compliance reporting could save significant time for customers',
    sentiment: 'positive',
    importance: 'high',
    quotes: [mockQuotes[1], mockQuotes[9]],
    featureTags: [mockFeatureTags[4]], // Compliance Reporting
    sourceId: 'src4',
    createdAt: '2024-01-18T15:30:00Z',
    speakerIds: ['spk1', 'spk5'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: true,
      hasInternalFeedback: true,
      customerCompanyIds: ['comp1'],
      internalRoles: ['sales'],
      totalARR: 250000,
    },
  },
  {
    id: 'i3',
    title: 'Real-time alerting for policy violations is a common customer request',
    sentiment: 'neutral',
    importance: 'high',
    quotes: [mockQuotes[2]],
    featureTags: [mockFeatureTags[6], mockFeatureTags[3]], // Alerting, Policy Engine
    sourceId: 'src2',
    createdAt: '2024-01-16T14:30:00Z',
    speakerIds: ['spk5'],
    metadata: {
      sourceType: 'slack',
      hasCustomerFeedback: false,
      hasInternalFeedback: true,
      customerCompanyIds: [],
      internalRoles: ['sales'],
      totalARR: 0,
    },
  },
  {
    id: 'i4',
    title: 'API rate limits are blocking integration use cases for high-volume customers',
    sentiment: 'negative',
    importance: 'high',
    quotes: [mockQuotes[3], mockQuotes[11]],
    featureTags: [mockFeatureTags[7]], // Integration APIs
    sourceId: 'src5',
    createdAt: '2024-01-19T11:30:00Z',
    speakerIds: ['spk2', 'spk10'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: true,
      hasInternalFeedback: false,
      customerCompanyIds: ['comp2', 'comp4'],
      internalRoles: [],
      totalARR: 195000,
    },
  },
  {
    id: 'i5',
    title: 'Data discovery capabilities exceeding customer expectations',
    sentiment: 'positive',
    importance: 'medium',
    quotes: [mockQuotes[4]],
    featureTags: [mockFeatureTags[5]], // Data Discovery
    sourceId: 'src5',
    createdAt: '2024-01-19T11:30:00Z',
    speakerIds: ['spk2'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: true,
      hasInternalFeedback: false,
      customerCompanyIds: ['comp2'],
      internalRoles: [],
      totalARR: 150000,
    },
  },
  {
    id: 'i6',
    title: 'Lack of granular access control is blocking production deployment and putting deal at risk',
    sentiment: 'negative',
    importance: 'high',
    quotes: [mockQuotes[5]],
    featureTags: [mockFeatureTags[1]], // Access Control
    sourceId: 'src3',
    createdAt: '2024-01-17T09:30:00Z',
    speakerIds: ['spk6'],
    metadata: {
      sourceType: 'slack',
      hasCustomerFeedback: false,
      hasInternalFeedback: true,
      customerCompanyIds: [],
      internalRoles: ['sales'],
      totalARR: 0,
    },
  },
  {
    id: 'i7',
    title: 'Dashboard lacks drill-down capabilities for detailed data store analysis',
    sentiment: 'negative',
    importance: 'medium',
    quotes: [mockQuotes[6]],
    featureTags: [mockFeatureTags[8]], // Dashboard
    sourceId: 'src1',
    createdAt: '2024-01-15T10:45:00Z',
    speakerIds: ['spk3'],
    metadata: {
      sourceType: 'slack',
      hasCustomerFeedback: true,
      hasInternalFeedback: false,
      customerCompanyIds: ['comp3'],
      internalRoles: [],
      totalARR: 80000,
    },
  },
  {
    id: 'i8',
    title: 'Data lineage feature meeting audit trail requirements perfectly',
    sentiment: 'positive',
    importance: 'medium',
    quotes: [mockQuotes[7]],
    featureTags: [mockFeatureTags[9]], // Data Lineage
    sourceId: 'src6',
    createdAt: '2024-01-20T10:20:00Z',
    speakerIds: ['spk4'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: true,
      hasInternalFeedback: false,
      customerCompanyIds: ['comp5'],
      internalRoles: [],
      totalARR: 320000,
    },
  },
  {
    id: 'i9',
    title: 'Policy engine configuration causing confusion and increasing support load',
    sentiment: 'negative',
    importance: 'high',
    quotes: [mockQuotes[8]],
    featureTags: [mockFeatureTags[3]], // Policy Engine
    sourceId: 'src7',
    createdAt: '2024-01-21T17:00:00Z',
    speakerIds: ['spk9'],
    metadata: {
      sourceType: 'slack',
      hasCustomerFeedback: false,
      hasInternalFeedback: true,
      customerCompanyIds: [],
      internalRoles: ['support'],
      totalARR: 0,
    },
  },
  {
    id: 'i10',
    title: 'DSPM capabilities are industry-leading but have steep learning curve',
    sentiment: 'neutral',
    importance: 'medium',
    quotes: [mockQuotes[10]],
    featureTags: [mockFeatureTags[2]], // DSPM
    sourceId: 'src6',
    createdAt: '2024-01-20T11:00:00Z',
    speakerIds: ['spk8'],
    metadata: {
      sourceType: 'zoom',
      hasCustomerFeedback: false,
      hasInternalFeedback: true,
      customerCompanyIds: [],
      internalRoles: ['se'],
      totalARR: 0,
    },
  },
];

// Helper functions
export function getCompanyById(id: string): Company | undefined {
  return mockCompanies.find(c => c.id === id);
}

export function getSpeakerById(id: string): Speaker | undefined {
  return mockSpeakers.find(s => s.id === id);
}

export function getSourceById(id: string): Source | undefined {
  return mockSources.find(s => s.id === id);
}

export function getQuoteWithSpeaker(quote: Quote): QuoteWithSpeaker {
  const speaker = getSpeakerById(quote.speakerId)!;
  const company = speaker.companyId ? getCompanyById(speaker.companyId) : undefined;
  return { ...quote, speaker, company };
}

export function getInsightWithDetails(insight: Insight): InsightWithDetails {
  const quotesWithSpeakers = insight.quotes.map(getQuoteWithSpeaker);
  const source = getSourceById(insight.sourceId)!;
  const relatedCompanies = insight.metadata.customerCompanyIds
    .map(getCompanyById)
    .filter((c): c is Company => c !== undefined);

  return {
    ...insight,
    quotesWithSpeakers,
    source,
    relatedCompanies,
  };
}

export function getAllInsightsWithDetails(): InsightWithDetails[] {
  return mockInsights.map(getInsightWithDetails);
}
