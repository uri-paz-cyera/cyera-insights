'use client';

import { useState, useMemo } from 'react';
import { FilterState, SortOption } from '@/types';
import { getAllInsightsWithDetails, mockCompanies } from '@/lib/mock-data';
import {
  searchInsights,
  filterInsights,
  sortInsights,
  getUniqueIndustries,
  getUniqueInternalRoles,
  getUniqueTenants,
  getUniqueQuarters,
} from '@/lib/insights-utils';
import { Header } from '@/components/Header';
import { FiltersSidebar } from '@/components/FiltersSidebar';
import { InsightCard } from '@/components/InsightCard';

export default function InsightsPage() {
  const allInsights = useMemo(() => getAllInsightsWithDetails(), []);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    sourceTypes: [],
    sentiment: [],
    importance: [],
    featureTags: [],
    speakerTypes: [],
    internalRoles: [],
    industries: [],
    tenants: [],
    quarters: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>('most_important');

  // Get available filter options
  const availableIndustries = useMemo(() => getUniqueIndustries(allInsights), [allInsights]);
  const availableInternalRoles = useMemo(
    () => getUniqueInternalRoles(allInsights),
    [allInsights]
  );
  const availableTenantIds = useMemo(() => getUniqueTenants(allInsights), [allInsights]);
  const availableTenants = useMemo(
    () =>
      availableTenantIds
        .map(id => {
          const company = mockCompanies.find(c => c.id === id);
          return company ? { id: company.id, name: company.name } : null;
        })
        .filter((t): t is { id: string; name: string } => t !== null),
    [availableTenantIds]
  );
  const availableQuarters = useMemo(() => getUniqueQuarters(allInsights), [allInsights]);

  // Apply search, filters, and sorting
  const searchedInsights = useMemo(
    () => searchInsights(allInsights, filters.search),
    [allInsights, filters.search]
  );
  const filteredInsights = useMemo(
    () => filterInsights(searchedInsights, filters),
    [searchedInsights, filters]
  );
  const sortedInsights = useMemo(
    () => sortInsights(filteredInsights, sortOption),
    [filteredInsights, sortOption]
  );

  // Calculate stats
  const stats = useMemo(() => {
    const customerInsights = sortedInsights.filter(i => i.metadata.hasCustomerFeedback);
    const internalInsights = sortedInsights.filter(i => i.metadata.hasInternalFeedback);
    const totalARR = sortedInsights.reduce((sum, i) => sum + i.metadata.totalARR, 0);

    return {
      total: sortedInsights.length,
      customer: customerInsights.length,
      internal: internalInsights.length,
      totalARR,
    };
  }, [sortedInsights]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <FiltersSidebar
          filters={filters}
          onFilterChange={setFilters}
          availableIndustries={availableIndustries}
          availableInternalRoles={availableInternalRoles}
          availableTenants={availableTenants}
          availableQuarters={availableQuarters}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            {/* Search and Controls */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  User Insights{' '}
                  <span className="text-gray-500 font-normal">({stats.total})</span>
                </h1>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Insights"
                  value={filters.search}
                  onChange={e => setFilters({ ...filters, search: e.target.value })}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {filters.search && (
                  <button
                    onClick={() => setFilters({ ...filters, search: '' })}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sort Controls */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {filters.search && (
                    <span>
                      Search results for: <span className="font-medium">{filters.search}</span>
                    </span>
                  )}
                </div>
                <select
                  value={sortOption}
                  onChange={e => setSortOption(e.target.value as SortOption)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="most_important">Most Important</option>
                  <option value="most_recent">Most Recent</option>
                  <option value="highest_arr">Highest ARR Impact</option>
                  <option value="most_negative">Most Negative</option>
                  <option value="most_positive">Most Positive</option>
                  <option value="most_mentions">Most Mentions</option>
                </select>
              </div>
            </div>

            {/* Insights Grid */}
            {sortedInsights.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-2">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No insights found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sortedInsights.map(insight => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
