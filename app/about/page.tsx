import { Header } from '@/components/Header';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Product Intelligence System</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              An internal product intelligence system that aggregates and analyzes user feedback from
              Slack conversations and Zoom meetings. The system automatically extracts insights to help
              product teams understand what users are saying, who is saying it, and what features need
              attention.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Sources</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <h3 className="font-medium text-gray-900">Slack</h3>
                  <p className="text-sm text-gray-600">
                    Customer feedback channels, sales insights, support escalations, and enterprise
                    customer discussions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📹</span>
                <div>
                  <h3 className="font-medium text-gray-900">Zoom</h3>
                  <p className="text-sm text-gray-600">
                    Customer calls, quarterly reviews, feature discovery sessions, and internal team
                    syncs
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Insight Structure</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Insight:</span>
                <span className="text-gray-600">Clear statement of user need or problem</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Quotes:</span>
                <span className="text-gray-600">1-3 supporting quotes with speaker attribution</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Sentiment:</span>
                <span className="text-gray-600">Positive / Neutral / Negative</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Importance:</span>
                <span className="text-gray-600">
                  Low / Medium / High (based on urgency, repetition, customer value)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Speaker:</span>
                <span className="text-gray-600">
                  Customer / Prospect / Internal (with role: Sales/CSM/Support/SE)
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">Feature Tags:</span>
                <span className="text-gray-600">
                  Product features (Data Classification, Access Control, DSPM, etc.)
                </span>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Advanced Search</h2>
            <p className="text-gray-700 mb-3">Natural language search supports queries like:</p>
            <div className="bg-gray-50 rounded p-4 space-y-2 text-sm font-mono">
              <div>&quot;negative feedback about access control from enterprise customers&quot;</div>
              <div>&quot;feature requests from fintech companies&quot;</div>
              <div>&quot;high importance issues from sales team&quot;</div>
              <div>&quot;customer feedback arr &gt; 100000&quot;</div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Use Cases</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">Feature Prioritization</h3>
                <p className="text-sm text-gray-600">
                  Rank features by mentions, ARR impact, importance, and negative sentiment weight
                </p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900">Customer Discovery</h3>
                <p className="text-sm text-gray-600">
                  Find relevant customers for feature validation by filtering on tags, ARR, and industry
                </p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-900">Field Intelligence</h3>
                <p className="text-sm text-gray-600">
                  Understand what Sales, CSM, Support, and SE teams are hearing from customers
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-medium text-gray-900">Sentiment Analysis</h3>
                <p className="text-sm text-gray-600">
                  Track positive and negative sentiment trends for each product feature
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Data Model</h2>
            <div className="bg-gray-50 rounded p-4 text-sm font-mono space-y-1">
              <div>
                <strong>Insight</strong> → extracted user need
              </div>
              <div className="ml-4">↓ has many</div>
              <div>
                <strong>Quote</strong> → supporting evidence
              </div>
              <div className="ml-4">↓ belongs to</div>
              <div>
                <strong>Speaker</strong> (Customer/Internal/Prospect)
              </div>
              <div className="ml-4">↓ may belong to</div>
              <div>
                <strong>Company</strong> (ARR, Industry, Tier)
              </div>
              <div className="ml-8">
                <strong>Source</strong> (Slack/Zoom) → <strong>Session</strong>
              </div>
              <div className="ml-8">
                <strong>FeatureTag</strong> → Product features
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Important Notes</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 space-y-2">
              <p className="text-sm text-gray-700">
                <strong>Read-Only System:</strong> All insights are automatically generated from
                conversation analysis. No manual editing.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Source Attribution:</strong> Every insight includes links back to original
                Slack messages or Zoom recordings for full context.
              </p>
              <p className="text-sm text-gray-700">
                <strong>Privacy:</strong> Only accessible to internal Cyera product and GTM teams.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Pages</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">/</span>
                <span className="text-gray-600">Main insights explorer with search and filters</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">/insights/[id]</span>
                <span className="text-gray-600">
                  Drill-down view with all quotes, speakers, and source links
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900 w-32">/prioritization</span>
                <span className="text-gray-600">
                  Feature prioritization dashboard with weighted scoring
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
