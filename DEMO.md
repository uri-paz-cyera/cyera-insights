# Cyera Insights - Demo Guide

## 🚀 Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📍 Navigation Guide

### Main Pages

1. **Insights Explorer** (`/`)
   - Main page showing all insights
   - Search, filter, and sort capabilities
   - Card-based layout

2. **Sessions List** (`/sessions`)
   - Grid of all customer conversations
   - Click any card to view details

3. **Session Detail** (`/sessions/s1`)
   - Full customer profile
   - Session summary
   - Related insights
   - Example: http://localhost:3000/sessions/s1

4. **About** (`/about`)
   - Tool overview and documentation
   - Use cases and features

## 🎯 Feature Demonstration

### 1. Search Functionality
**Try these searches:**
- "performance" → Shows insights about performance issues
- "designer" → Shows insights about designer needs
- "staging" → Shows staging environment insights

### 2. Filter by Sentiment
**Left sidebar → Sentiment:**
- Check "Negative" → See pain points (5 insights)
- Check "Positive" → See successes (0 insights in mock data)
- Check "Neutral" → See observations (2 insights)

### 3. Filter by Importance
**Left sidebar → Importance:**
- Check "High" → Critical issues (4 insights)
- Check "Medium" → Normal priority (3 insights)
- Uncheck all → See empty state

### 4. Filter by Tags
**Left sidebar → Tags:**
- Check "Performance" → Performance-related insights
- Check "Developer" → Developer experience insights
- Check "Designer" → Designer needs
- Combine multiple tags for AND filtering

### 5. Filter by Features
**Left sidebar → Features:**
- "Performance Optimization" → 1 insight
- "Visual Editor" → 1 insight
- "Code Examples" → 3 insights
- "Staging Environment" → 2 insights

### 6. Filter by Customer Segment
**Left sidebar → Industry:**
- "Technology" → 4 insights
- "Enterprise" → 2 insights
- "Design" → 1 insight

**Left sidebar → Role:**
- "Developer" → 2 insights
- "CTO" → 2 insights
- "Designer" → 1 insight

### 7. Sort Options
**Top bar → Sort dropdown:**
1. **Most Important** (default)
   - High importance first
   - Shows critical issues at top

2. **Most Recent**
   - Newest insights first
   - Masa (Dec 25) → Mikhail (Dec 28)

3. **Highest ARR**
   - Enterprise customers first
   - Robert ($150k) at top

4. **Most Negative**
   - Pain points first
   - Bad sentiment at top

5. **Most Positive**
   - Successes first
   - Good sentiment at top

## 🎓 Workflow Examples

### Use Case 1: Feature Prioritization
**Goal:** Find which features need attention

1. Go to main page
2. Filter by "High" importance
3. Look at sentiment badges
4. Note which features are mentioned
5. Check customer ARR for business impact

**Result:** See that "Performance Optimization", "Staging Environment", and "Visual Editor" are high-priority issues affecting enterprise customers.

### Use Case 2: Customer Discovery
**Goal:** Find customers for feature validation

1. Filter by specific feature (e.g., "Staging Environment")
2. Check customer metadata (role, ARR, industry)
3. Click customer name to see full session
4. Review all insights from that customer

**Result:** Robert McCormick (CTO, $150k ARR) has strong needs around staging.

### Use Case 3: Persona Analysis
**Goal:** Understand what designers need

1. Filter by "Designer" tag
2. Filter by "Designer" role
3. Review insights and quotes
4. Note common themes

**Result:** Designers want UI editing without depending on developers.

### Use Case 4: Sentiment Analysis
**Goal:** Track feature satisfaction

1. Filter by specific feature
2. Check sentiment distribution
3. Read supporting quotes

**Result:** "Performance Optimization" has negative sentiment with specific evidence.

### Use Case 5: Deep Discovery
**Goal:** Understand customer context

1. Start with an insight card
2. Click customer name
3. View full session page
4. Read summary and all insights
5. Expand "Full Interview" if needed

**Result:** Full context of customer conversation and all extracted insights.

## 💡 Things to Notice

### Design Details
- **Color-coded sentiment:** Red (bad), Gray (neutral), Green (good)
- **Importance levels:** Light gray → Dark gray → Black
- **Quote styling:** Italics with border-left accent
- **Hover effects:** Cards elevate on hover
- **Clean typography:** Clear hierarchy and readability

### Data Quality
- **Real-world examples:** Based on actual Cyera user research
- **Rich metadata:** ARR, role, industry for segmentation
- **Supporting evidence:** Every insight has customer quotes
- **Temporal data:** Date tracking for trends

### UX Patterns
- **Instant feedback:** Filters apply immediately
- **Result counts:** Always know how many insights match
- **Clear all:** Easy way to reset filters
- **Empty states:** Helpful messaging when no results
- **Breadcrumbs:** Easy navigation back to lists

## 🔍 Data Exploration

### Available Customers
1. **Masa Daraghmeh** (Developer, Cloud) - Cyera on Cyera user
2. **Mikhail Spirin Team** (Engineering, $25k) - Tech Startup
3. **Salman Ahammed** (PM, $50k) - E-commerce
4. **Nathan Arnstein** (Designer, $15k) - Design Agency
5. **Esmond Gunasekara** (Marketing, $30k) - Marketing Firm
6. **Robert McCormick** (CTO, $150k) - Enterprise Corp

### Sample Insights
1. "Users fail to understand what is hurting their performance" (High, Negative)
2. "Designers want to be able to edit the UI without depending on their developer" (High, Negative)
3. "Developers need better debugging tools for backend code" (Medium, Neutral)
4. "Coders want more short and simple code examples" (Medium, Neutral)
5. "IDE environment feels disconnected from reality" (Medium, Negative)
6. "Enterprise customers concerned about code security and access control" (High, Negative)
7. "Teams need staging environments for safe development workflow" (High, Neutral)

### Tags Available
- Performance
- Transparency
- Developer
- Designer
- Capabilities
- UX
- API
- Deployment

## 🎨 Visual Design Notes

### Color Palette
- **Primary:** #1e2952 (Navy blue header)
- **Sentiment Negative:** Red tones (#FF6B6B)
- **Sentiment Neutral:** Gray tones
- **Sentiment Positive:** Green tones (#4ECDC4)
- **Background:** #f5f5f5 (Light gray)
- **Cards:** White with subtle shadows

### Typography
- **Headers:** Font weight 600-700
- **Body:** System fonts (-apple-system, BlinkMacSystemFont, Segoe UI)
- **Size scale:** 12px (xs) → 14px (sm) → 16px (base) → 18-24px (headings)

## 🧪 Testing Scenarios

### Scenario 1: Find all high-priority developer issues
1. Filter: Importance = High
2. Filter: Tags = Developer
3. Result: Should see 2-3 insights

### Scenario 2: Find insights from highest-value customer
1. Sort by: Highest ARR
2. Result: Robert McCormick's insights at top ($150k)

### Scenario 3: Search for specific problem
1. Search: "performance"
2. Result: Performance-related insights with highlighted context

### Scenario 4: View full customer conversation
1. Click any customer name from insight card
2. Navigate to session detail
3. See full context and all related insights

## 📈 Next Steps

### Immediate Improvements
1. Add date range picker
2. Add ARR range slider
3. Implement saved filter presets
4. Add keyboard shortcuts
5. Add bulk export functionality

### Backend Integration
1. Replace mock data with API calls
2. Add pagination for large datasets
3. Implement server-side search
4. Add real-time updates via WebSockets

### Advanced Features
1. Insight clustering algorithm
2. Trend detection over time
3. Automated feature prioritization
4. Dashboard with key metrics
5. Email alerts for new insights

## 🎯 Success Metrics (Future)

Track these to measure tool effectiveness:
- Time to find relevant customer (target: < 30 seconds)
- Feature prioritization confidence (before/after)
- Customer validation coverage (% features validated)
- Insight discoverability (search success rate)
- Decision quality (correlation with outcomes)

---

**Tool is ready for demo!** Start the server and explore: http://localhost:3000
