# Example Queries for Product Intelligence System

This document shows example SQL queries for common product intelligence use cases. These would be used when the system is backed by PostgreSQL.

## Schema Overview

```sql
-- Core tables
insights (id, title, sentiment, importance, source_id, created_at)
quotes (id, text, insight_id, speaker_id, source_id, timestamp)
speakers (id, name, type, company_id, internal_role, email)
companies (id, name, arr, industry, tier)
sources (id, type, channel_name, meeting_name, message_url, recording_url, timestamp)
feature_tags (id, name, category, color)
insight_feature_tags (insight_id, feature_tag_id)
```

## Use Case 1: Feature Prioritization

### Get features ranked by ARR impact and importance

```sql
WITH feature_metrics AS (
  SELECT 
    ft.id,
    ft.name,
    COUNT(DISTINCT i.id) as mention_count,
    SUM(CASE WHEN s.type = 'customer' THEN COALESCE(c.arr, 0) ELSE 0 END) as total_arr,
    AVG(
      CASE 
        WHEN i.importance = 'high' THEN 3
        WHEN i.importance = 'medium' THEN 2
        ELSE 1
      END
    ) as avg_importance,
    SUM(CASE WHEN i.sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
    SUM(CASE WHEN i.sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral_count,
    SUM(CASE WHEN i.sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count
  FROM feature_tags ft
  JOIN insight_feature_tags ift ON ft.id = ift.feature_tag_id
  JOIN insights i ON ift.insight_id = i.id
  JOIN quotes q ON q.insight_id = i.id
  JOIN speakers s ON q.speaker_id = s.id
  LEFT JOIN companies c ON s.company_id = c.id
  GROUP BY ft.id, ft.name
)
SELECT 
  name,
  mention_count,
  total_arr,
  ROUND(avg_importance, 2) as avg_importance,
  positive_count,
  neutral_count,
  negative_count,
  -- Weighted priority score
  ROUND(
    avg_importance * total_arr * (1 + (negative_count::float / mention_count) * 0.5),
    0
  ) as priority_score
FROM feature_metrics
ORDER BY priority_score DESC;
```

## Use Case 2: Customer Discovery for Feature Validation

### Find customers who mentioned a specific feature

```sql
SELECT DISTINCT
  c.name as company_name,
  c.arr,
  c.industry,
  c.tier,
  s.name as speaker_name,
  s.email,
  i.title as insight,
  i.sentiment,
  i.importance,
  i.created_at
FROM companies c
JOIN speakers s ON s.company_id = c.id
JOIN quotes q ON q.speaker_id = s.id
JOIN insights i ON q.insight_id = i.id
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
WHERE 
  ft.name = 'Access Control'
  AND s.type = 'customer'
  AND c.arr > 100000
ORDER BY c.arr DESC;
```

## Use Case 3: Field Intelligence Summary

### Get what sales/CSM/support teams are hearing

```sql
SELECT 
  s.internal_role,
  COUNT(DISTINCT i.id) as insight_count,
  COUNT(DISTINCT q.id) as quote_count,
  ft.name as feature,
  i.sentiment,
  COUNT(*) as mentions
FROM insights i
JOIN quotes q ON q.insight_id = i.id
JOIN speakers s ON q.speaker_id = s.id
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
WHERE 
  s.type = 'internal'
  AND i.created_at >= NOW() - INTERVAL '30 days'
GROUP BY s.internal_role, ft.name, i.sentiment
ORDER BY s.internal_role, mentions DESC;
```

## Use Case 4: Sentiment Analysis by Feature

### Track sentiment trends for a specific feature

```sql
SELECT 
  DATE_TRUNC('week', i.created_at) as week,
  i.sentiment,
  COUNT(*) as count,
  SUM(CASE WHEN s.type = 'customer' THEN COALESCE(c.arr, 0) ELSE 0 END) as arr_impact
FROM insights i
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
JOIN quotes q ON q.insight_id = i.id
JOIN speakers sp ON q.speaker_id = sp.id
LEFT JOIN companies c ON sp.company_id = c.id
WHERE 
  ft.name = 'Data Classification'
  AND i.created_at >= NOW() - INTERVAL '90 days'
GROUP BY week, i.sentiment
ORDER BY week DESC, i.sentiment;
```

## Use Case 5: Industry-Specific Insights

### Understand what healthcare customers care about

```sql
SELECT 
  ft.name as feature,
  COUNT(DISTINCT i.id) as insights,
  COUNT(DISTINCT c.id) as companies,
  SUM(c.arr) as total_arr,
  STRING_AGG(DISTINCT i.title, ' | ') as insight_titles
FROM insights i
JOIN quotes q ON q.insight_id = i.id
JOIN speakers s ON q.speaker_id = s.id
JOIN companies c ON s.company_id = c.id
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
WHERE 
  c.industry = 'Healthcare'
  AND s.type = 'customer'
GROUP BY ft.name
ORDER BY insights DESC, total_arr DESC;
```

## Use Case 6: High-Priority Customer Issues

### Get urgent customer feedback requiring immediate attention

```sql
SELECT 
  i.id,
  i.title,
  i.sentiment,
  i.importance,
  c.name as company,
  c.arr,
  s.name as speaker,
  src.type as source_type,
  COALESCE(src.channel_name, src.meeting_name) as source_location,
  COALESCE(src.message_url, src.recording_url) as source_link,
  STRING_AGG(ft.name, ', ') as features,
  i.created_at
FROM insights i
JOIN sources src ON i.source_id = src.id
JOIN quotes q ON q.insight_id = i.id
JOIN speakers s ON q.speaker_id = s.id
JOIN companies c ON s.company_id = c.id
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
WHERE 
  i.importance = 'high'
  AND i.sentiment = 'negative'
  AND s.type = 'customer'
  AND c.tier = 'enterprise'
GROUP BY i.id, c.name, c.arr, s.name, src.type, src.channel_name, src.meeting_name, src.message_url, src.recording_url
ORDER BY c.arr DESC, i.created_at DESC;
```

## Use Case 7: Source-Specific Analysis

### Compare insights from Slack vs Zoom

```sql
SELECT 
  src.type as source,
  COUNT(DISTINCT i.id) as insights,
  AVG(
    CASE 
      WHEN i.importance = 'high' THEN 3
      WHEN i.importance = 'medium' THEN 2
      ELSE 1
    END
  ) as avg_importance,
  SUM(CASE WHEN i.sentiment = 'positive' THEN 1 ELSE 0 END) as positive,
  SUM(CASE WHEN i.sentiment = 'neutral' THEN 1 ELSE 0 END) as neutral,
  SUM(CASE WHEN i.sentiment = 'negative' THEN 1 ELSE 0 END) as negative,
  SUM(CASE WHEN s.type = 'customer' THEN COALESCE(c.arr, 0) ELSE 0 END) as total_arr
FROM insights i
JOIN sources src ON i.source_id = src.id
JOIN quotes q ON q.insight_id = i.id
JOIN speakers s ON q.speaker_id = s.id
LEFT JOIN companies c ON s.company_id = c.id
GROUP BY src.type;
```

## Use Case 8: Most Active Companies

### Find companies providing the most feedback

```sql
SELECT 
  c.name,
  c.arr,
  c.industry,
  c.tier,
  COUNT(DISTINCT i.id) as insights_mentioned_in,
  COUNT(DISTINCT q.id) as quotes_provided,
  COUNT(DISTINCT s.id) as speakers,
  STRING_AGG(DISTINCT ft.name, ', ') as features_discussed,
  MAX(i.created_at) as last_feedback_date
FROM companies c
JOIN speakers s ON s.company_id = c.id
JOIN quotes q ON q.speaker_id = s.id
JOIN insights i ON q.insight_id = i.id
JOIN insight_feature_tags ift ON i.id = ift.insight_id
JOIN feature_tags ft ON ift.feature_tag_id = ft.id
WHERE 
  s.type = 'customer'
  AND i.created_at >= NOW() - INTERVAL '90 days'
GROUP BY c.id, c.name, c.arr, c.industry, c.tier
ORDER BY insights_mentioned_in DESC, c.arr DESC;
```

## Use Case 9: Deal Risk Indicators

### Identify features blocking deals or causing concern

```sql
WITH high_risk_insights AS (
  SELECT 
    i.id,
    i.title,
    ft.name as feature,
    c.name as company,
    c.arr,
    s.internal_role
  FROM insights i
  JOIN quotes q ON q.insight_id = i.id
  JOIN speakers s ON q.speaker_id = s.id
  JOIN insight_feature_tags ift ON i.id = ift.insight_id
  JOIN feature_tags ft ON ift.feature_tag_id = ft.id
  LEFT JOIN companies c ON s.company_id = c.id
  WHERE 
    i.importance = 'high'
    AND i.sentiment = 'negative'
    AND (
      s.internal_role = 'sales'
      OR (s.type = 'customer' AND c.tier = 'enterprise')
    )
    AND (
      LOWER(i.title) LIKE '%block%'
      OR LOWER(i.title) LIKE '%risk%'
      OR LOWER(i.title) LIKE '%concern%'
      OR LOWER(i.title) LIKE '%prevent%'
    )
)
SELECT 
  feature,
  COUNT(*) as risk_mentions,
  SUM(arr) as at_risk_arr,
  STRING_AGG(company || ': ' || title, ' | ') as details
FROM high_risk_insights
GROUP BY feature
ORDER BY at_risk_arr DESC, risk_mentions DESC;
```

## Use Case 10: Competitive Intelligence

### Track what users say about alternatives or comparisons

```sql
SELECT 
  i.title,
  i.sentiment,
  i.importance,
  q.text as quote,
  s.name as speaker,
  c.name as company,
  c.arr,
  src.type as source,
  i.created_at
FROM insights i
JOIN quotes q ON q.insight_id = i.id
JOIN speakers s ON q.speaker_id = s.id
JOIN sources src ON i.source_id = src.id
LEFT JOIN companies c ON s.company_id = c.id
WHERE 
  (
    LOWER(i.title) LIKE '%compet%'
    OR LOWER(i.title) LIKE '%alternative%'
    OR LOWER(q.text) LIKE '%vs %'
    OR LOWER(q.text) LIKE '%compared to%'
    OR LOWER(q.text) LIKE '%better than%'
    OR LOWER(q.text) LIKE '%instead of%'
  )
ORDER BY i.created_at DESC;
```

---

## Performance Optimization Tips

### Indexes

```sql
-- Core indexes for fast querying
CREATE INDEX idx_insights_created_at ON insights(created_at);
CREATE INDEX idx_insights_importance ON insights(importance);
CREATE INDEX idx_insights_sentiment ON insights(sentiment);
CREATE INDEX idx_quotes_insight_id ON quotes(insight_id);
CREATE INDEX idx_quotes_speaker_id ON quotes(speaker_id);
CREATE INDEX idx_speakers_type ON speakers(type);
CREATE INDEX idx_speakers_company_id ON speakers(company_id);
CREATE INDEX idx_companies_arr ON companies(arr);
CREATE INDEX idx_companies_industry ON companies(industry);
CREATE INDEX idx_sources_type ON sources(type);
CREATE INDEX idx_insight_feature_tags_insight_id ON insight_feature_tags(insight_id);
CREATE INDEX idx_insight_feature_tags_feature_tag_id ON insight_feature_tags(feature_tag_id);
```

### Materialized Views for Dashboards

```sql
-- Pre-aggregate feature priorities
CREATE MATERIALIZED VIEW feature_priorities AS
SELECT 
  ft.id,
  ft.name,
  COUNT(DISTINCT i.id) as mention_count,
  SUM(CASE WHEN s.type = 'customer' THEN COALESCE(c.arr, 0) ELSE 0 END) as total_arr,
  -- ... rest of aggregation
FROM feature_tags ft
-- ... joins
GROUP BY ft.id, ft.name;

-- Refresh periodically
REFRESH MATERIALIZED VIEW feature_priorities;
```

---

These queries form the foundation for the product intelligence system's data analysis capabilities. Adapt them based on your specific schema and requirements.
