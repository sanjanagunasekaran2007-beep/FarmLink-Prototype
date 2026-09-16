import { useState } from 'react';
import { 
  Activity, 
  Search, 
  Clock
} from 'lucide-react';
import { AdminActivityItem, AdminActivityCategory } from '@/types';

interface AdminActivityViewProps {
  activities: AdminActivityItem[];
}

export const AdminActivityView = ({
  activities,
}: AdminActivityViewProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | AdminActivityCategory>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories: Array<'All' | AdminActivityCategory> = [
    'All',
    'Listings',
    'Users',
    'Deliveries',
    'Reviews',
    'Settings',
    'System',
  ];

  const filteredActivities = activities.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesSearch = 
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.relatedModule.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeStyle = (category: AdminActivityCategory) => {
    switch (category) {
      case 'Listings':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Users':
        return { bg: '#F1D8C8', text: '#8A4A28', border: '#B86B45' };
      case 'Deliveries':
        return { bg: '#DDE8F0', text: '#2A5570', border: '#4A7C9D' };
      case 'Reviews':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Settings':
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
      case 'System':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-brand/30 uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Operational Audit Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            Platform Activity Feed (Demo Audit)
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Chronological log of simulated transactions, listings moderation, user lifecycle, and system operations.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text">
          Total Events: <strong className="text-farm-brand">{activities.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-farm-surface p-4 sm:p-5 rounded-2xl border border-farm-border shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <div className="w-full sm:flex-1 relative">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search activity description, module name..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text placeholder-farm-text-muted focus:outline-none focus:border-farm-brand transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-farm-brand text-white border-farm-brand'
                    : 'bg-farm-surface text-farm-text-secondary border-farm-border hover:bg-farm-brand-soft hover:text-farm-text'
                }`}
              >
                {cat === 'All' ? 'All Activity Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border shadow-subtle p-6">
        {filteredActivities.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-farm-text">
              No activities found
            </h3>
            <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
              No matching activity events found for the selected category.
            </p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-farm-surface-secondary">
            {filteredActivities.map((act) => {
              const badgeStyle = getCategoryBadgeStyle(act.category);

              return (
                <div key={act.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-farm-surface border-2 border-farm-brand group-hover:scale-125 transition-transform" />

                  <div className="p-4 rounded-2xl bg-farm-surface/60 border border-farm-border hover:border-farm-brand/40 transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border"
                          style={{
                            backgroundColor: badgeStyle.bg,
                            color: badgeStyle.text,
                            borderColor: badgeStyle.border,
                          }}
                        >
                          {act.category}
                        </span>
                        <span className="text-xs font-semibold text-farm-text-secondary">
                          Module: <strong className="text-farm-text">{act.relatedModule}</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary font-medium">
                        <Clock className="w-3.5 h-3.5 text-farm-brand" />
                        <span>{act.timestamp}</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-farm-text">
                      {act.title}
                    </h4>

                    <p className="text-xs text-farm-text-secondary leading-relaxed">
                      {act.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
