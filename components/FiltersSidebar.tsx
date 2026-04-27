'use client';

import { FilterState, Sentiment, Importance, SourceType, SpeakerType, InternalRole } from '@/types';
import { mockFeatureTags } from '@/lib/mock-data';
import { FilterSlider } from './FilterSlider';

interface FiltersSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableIndustries: string[];
  availableInternalRoles: string[];
  availableTenants: Array<{ id: string; name: string }>;
  availableQuarters: string[];
}

export function FiltersSidebar({
  filters,
  onFilterChange,
  availableIndustries,
  availableInternalRoles,
  availableTenants,
  availableQuarters,
}: FiltersSidebarProps) {
  const toggleArrayFilter = <T,>(key: keyof FilterState, value: T) => {
    const currentValues = (filters[key] as T[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange({ ...filters, [key]: newValues });
  };

  const sentiments: Sentiment[] = ['positive', 'neutral', 'negative'];
  const importanceLevels: Importance[] = ['low', 'medium', 'high'];
  const sourceTypes: SourceType[] = ['slack', 'zoom'];
  const speakerTypes: SpeakerType[] = ['customer', 'non_customer', 'internal'];

  const hasActiveFilters =
    filters.sourceTypes.length > 0 ||
    filters.sentiment.length > 0 ||
    filters.importance.length > 0 ||
    filters.featureTags.length > 0 ||
    filters.speakerTypes.length > 0 ||
    filters.internalRoles.length > 0 ||
    filters.industries.length > 0 ||
    filters.tenants.length > 0 ||
    filters.quarters.length > 0;

  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={() =>
                onFilterChange({
                  search: filters.search,
                  sourceTypes: [],
                  sentiment: [],
                  importance: [],
                  featureTags: [],
                  speakerTypes: [],
                  internalRoles: [],
                  industries: [],
                  tenants: [],
                  quarters: [],
                })
              }
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Source Type Filter */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Source</h4>
          <div className="space-y-2">
            {sourceTypes.map(sourceType => (
              <label key={sourceType} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.sourceTypes.includes(sourceType)}
                  onChange={() => toggleArrayFilter('sourceTypes', sourceType)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 capitalize flex items-center gap-2">
                  {sourceType === 'slack' ? '💬' : '📹'} {sourceType}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sentiment Filter */}
        <FilterSlider
          type="sentiment"
          selected={filters.sentiment}
          onChange={sentiment => onFilterChange({ ...filters, sentiment })}
        />

        {/* Importance Filter */}
        <FilterSlider
          type="importance"
          selected={filters.importance}
          onChange={importance => onFilterChange({ ...filters, importance })}
        />

        {/* Speaker Type Filter */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Speaker Type</h4>
          <div className="space-y-2">
            {speakerTypes.map(type => (
              <label key={type} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.speakerTypes.includes(type)}
                  onChange={() => toggleArrayFilter('speakerTypes', type)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {type === 'customer'
                    ? 'Customer'
                    : type === 'non_customer'
                      ? 'Prospect'
                      : 'Internal (Field)'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Feature Tags Filter */}
        <div>
          <h4 className="text-xs font-medium text-gray-700 mb-2">Features</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {mockFeatureTags.map(tag => (
              <label key={tag.id} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={filters.featureTags.includes(tag.id)}
                  onChange={() => toggleArrayFilter('featureTags', tag.id)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-700 text-xs">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Industries Filter */}
        {availableIndustries.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Industry</h4>
            <div className="space-y-2">
              {availableIndustries.map(industry => (
                <label key={industry} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.industries.includes(industry)}
                    onChange={() => toggleArrayFilter('industries', industry)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-xs">{industry}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Tenants Filter */}
        {availableTenants.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Tenant</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableTenants.map(tenant => (
                <label key={tenant.id} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.tenants.includes(tenant.id)}
                    onChange={() => toggleArrayFilter('tenants', tenant.id)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-xs">{tenant.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Quarter Filter */}
        {availableQuarters.length > 0 && (
          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-2">Quarter</h4>
            <div className="space-y-2">
              {availableQuarters.map(quarter => (
                <label key={quarter} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={filters.quarters.includes(quarter)}
                    onChange={() => toggleArrayFilter('quarters', quarter)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-xs">{quarter}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
