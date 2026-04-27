# Cyera Product Intelligence System

An internal tool for aggregating and analyzing user feedback from Slack and Zoom to help product teams make data-driven decisions.

## 🎯 Overview

This is a **READ-ONLY** system that automatically extracts insights from customer conversations across multiple channels. It helps product teams understand:

- What users are saying about Cyera
- Who is saying it (customer / prospect / internal field)
- What features are being discussed
- How important and urgent the feedback is

## 🔌 Data Sources

### Slack
- Customer feedback channels
- Sales insights
- Support escalations
- Enterprise customer discussions

### Zoom
- Customer calls and quarterly reviews
- Feature discovery sessions
- Internal team syncs

Each insight includes full source attribution with links back to original messages/recordings.

## 🧠 Insight Structure

Every auto-generated insight contains:

1. **Insight** - Clear statement of user need/problem
2. **Quotes** - 1-3 supporting quotes with speaker attribution
3. **Sentiment** - Positive / Neutral / Negative
4. **Importance** - Low / Medium / High (based on urgency, repetition, customer value)
5. **Speaker Metadata**:
   - Name
   - Type: Customer / Prospect / Internal (Field)
   - If customer: Company, ARR, Industry
   - If internal: Role (Sales / CSM / Support / SE)
6. **Feature Tags** - Product features (not generic tags)
7. **Source** - Slack or Zoom with context

## ✨ Key Features

### Advanced Natural Language Search

Search using natural language queries:

```
"negative feedback about access control from enterprise customers"
"feature requests from fintech companies"
"high importance issues from sales team"
"customer feedback arr > 100000"
```

### Powerful Filtering

Filter by:
- Source (Slack / Zoom)
- Sentiment (Positive / Neutral / Negative)
- Importance (Low / Medium / High)
- Feature tags
- Speaker type (Customer / Prospect / Internal)
- Internal role (if applicable)
- Industry
- ARR range
- Date range

### Feature Prioritization Dashboard

Automatic prioritization using weighted formula:

```
Score = Avg Importance × Total ARR × (1 + Negative Sentiment Weight × 0.5)
```

Ranks features by:
- Number of mentions
- ARR impact
- Importance scores
- Negative sentiment weight

### Drill-Down Views

Click any insight to see:
- All supporting quotes with full speaker context
- Company details (ARR, industry, tier)
- Links to original Slack threads or Zoom recordings
- Related insights (same feature tags)

## 📊 Use Cases

### 1. Feature Prioritization
**Goal:** Decide which features to build next

**How:**
1. Go to `/prioritization` page
2. Review features ranked by weighted score
3. Click to see all related insights
4. Filter by customer vs internal feedback

**Result:** Data-driven feature roadmap based on customer value

### 2. Customer Discovery
**Goal:** Find customers to validate a feature idea

**How:**
1. Filter by specific feature tag
2. Add filter for customer type
3. Sort by highest ARR
4. Review companies and contact details

**Result:** List of relevant customers for outreach

### 3. Field Intelligence
**Goal:** Understand what the field is hearing

**How:**
1. Filter speaker type = "Internal"
2. Select specific roles (Sales / CSM / Support)
3. Review recent insights
4. Check sentiment trends

**Result:** Aggregated field intelligence for product decisions

### 4. Sentiment Analysis
**Goal:** Track how customers feel about features

**How:**
1. Filter by specific feature
2. Review sentiment breakdown
3. Read negative feedback quotes
4. Check ARR impact

**Result:** Feature health assessment

### 5. Industry/Persona Analysis
**Goal:** Understand what different segments care about

**How:**
1. Filter by industry or company tier
2. Review top features mentioned
3. Compare sentiment across segments

**Result:** Segment-specific product insights

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Data:** Mock data (ready for PostgreSQL)
- **Architecture:** Server + Client Components

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Main insights explorer
│   ├── insights/[id]/page.tsx      # Insight detail page
│   ├── prioritization/page.tsx     # Feature prioritization dashboard
│   └── about/page.tsx              # Documentation
├── components/
│   ├── Header.tsx                  # Navigation
│   ├── FiltersSidebar.tsx          # Advanced filters
│   ├── InsightCard.tsx             # Insight display card
│   ├── SentimentBadge.tsx          # Sentiment indicator
│   └── ImportanceBadge.tsx         # Importance indicator
├── lib/
│   ├── mock-data.ts                # Sample Slack/Zoom data
│   └── insights-utils.ts           # Search, filter, sort logic
└── types/
    └── index.ts                    # TypeScript definitions
```

## 📋 Data Model

```typescript
// Core entities
Insight {
  id, title, sentiment, importance
  quotes: Quote[]
  featureTags: FeatureTag[]
  source: Source
  metadata: { sourceType, ARR, companies, roles }
}

Quote {
  id, text, timestamp
  speaker: Speaker
  source: Source
}

Speaker {
  id, name, type (customer/prospect/internal)
  company?: Company
  internalRole?: InternalRole
}

Company {
  id, name, arr, industry, tier
}

Source {
  id, type (slack/zoom)
  channelName / meetingName
  messageUrl / recordingUrl
}

FeatureTag {
  id, name, category, color
}
```

## 🔍 Example Queries

### Find high-value customer feedback on access control
```
Filters:
- Feature: "Access Control"
- Speaker Type: "Customer"
- ARR Range: > $100,000
- Sort: Highest ARR
```

### See what sales team is hearing about DSPM
```
Filters:
- Feature: "DSPM"
- Speaker Type: "Internal"
- Internal Role: "Sales"
- Sort: Most Recent
```

### Track negative sentiment on policy engine
```
Filters:
- Feature: "Policy Engine"
- Sentiment: "Negative"
- Importance: "High"
- Sort: Most Important
```

### Find fintech customer feature requests
```
Search: "fintech feature request"
OR
Filters:
- Industry: "Financial Services"
- Importance: "High"
```

## 📊 Mock Data

The system includes realistic mock data:

- **10 insights** across 10 product features
- **12 quotes** from various speakers
- **10 speakers** (customers, prospects, internal)
- **6 companies** (SMB → Enterprise, $45K - $320K ARR)
- **7 sources** (Slack channels + Zoom meetings)
- **10 feature tags** (Data Classification, Access Control, DSPM, etc.)

Data represents realistic scenarios:
- Customer feedback from Zoom calls
- Internal field intelligence from Slack
- Support escalations
- Sales deal insights

## 🎨 Design Principles

1. **Source Attribution** - Always link back to original conversation
2. **Speaker Context** - Know who said what and why it matters
3. **Evidence-Based** - Every insight backed by direct quotes
4. **Read-Only** - No manual editing, only automated extraction
5. **Actionable** - Designed for product decision-making

## 🔐 Access Control

- **Internal Only** - Cyera product and GTM teams
- **Source Links** - Require appropriate Slack/Zoom permissions
- **Data Privacy** - Customer data handled per company policy

## 🚧 Future Enhancements

### Near-Term
- [ ] Real Slack API integration
- [ ] Real Zoom API integration
- [ ] PostgreSQL backend
- [ ] LLM pipeline for automated extraction
- [ ] Email alerts for high-priority insights
- [ ] Export to CSV/PDF

### Medium-Term
- [ ] Trend detection over time
- [ ] Automated insight clustering
- [ ] Weekly digests by feature area
- [ ] Integration with Jira/Linear
- [ ] Custom dashboard builder

### Long-Term
- [ ] Predictive feature impact scoring
- [ ] Cross-source conversation threading
- [ ] Automated follow-up suggestions
- [ ] Voice-to-insight pipeline
- [ ] Multi-language support

## 📝 License

Internal tool for Cyera teams only.

## 🤝 Support

For questions or feedback:
- Product team: product@cyera.io
- Technical issues: Report in #product-intelligence Slack channel

---

**Remember:** This is a READ-ONLY system. All insights are automatically generated. Focus on exploration and decision-making, not data entry.
