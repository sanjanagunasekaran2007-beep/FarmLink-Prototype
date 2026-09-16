import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  MapPin, 
  Bookmark, 
  Send, 
  Calendar 
} from 'lucide-react';
import { HarvestItem } from '@/types';
import { BuyerFilterModal, BuyerFiltersState } from '../BuyerFilterModal';

interface BuyerBrowseHarvestsViewProps {
  harvests: HarvestItem[];
  savedHarvestCodes: string[];
  onViewHarvest: (harvest: HarvestItem) => void;
  onToggleSave: (harvestCode: string) => void;
  onExpressInterest: (harvest: HarvestItem) => void;
}

export const BuyerBrowseHarvestsView = ({
  harvests,
  savedHarvestCodes,
  onViewHarvest,
  onToggleSave,
  onExpressInterest,
}: BuyerBrowseHarvestsViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BuyerFiltersState>({
    category: 'All',
    grade: 'All',
    farmingMethod: 'All',
    quantityRange: 'All',
    state: 'All',
    verifiedOnly: false,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'All',
      grade: 'All',
      farmingMethod: 'All',
      quantityRange: 'All',
      state: 'All',
      verifiedOnly: false,
    });
  };

  // Filtered and searched harvests
  const filteredHarvests = useMemo(() => {
    return harvests.filter((item) => {
      // 1. Search query matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.cropName.toLowerCase().includes(q);
        const matchVariety = item.variety?.toLowerCase().includes(q) || false;
        const matchLocation = `${item.village || ''} ${item.district || ''} ${item.state || ''} ${item.pickupLocation || ''}`.toLowerCase().includes(q);
        const matchCode = item.harvestCode?.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);

        if (!matchName && !matchVariety && !matchLocation && !matchCode) {
          return false;
        }
      }

      // 2. Category
      if (filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }

      // 3. Quality Grade
      if (filters.grade !== 'All' && item.grade !== filters.grade) {
        return false;
      }

      // 4. Farming Method
      if (filters.farmingMethod !== 'All' && item.farmingMethod !== filters.farmingMethod) {
        return false;
      }

      // 5. State / Region
      if (filters.state !== 'All' && item.state !== filters.state) {
        return false;
      }

      // 6. Quantity range
      if (filters.quantityRange === 'Small' && item.quantity >= 500) {
        return false;
      } else if (filters.quantityRange === 'Medium' && (item.quantity < 500 || item.quantity > 2000)) {
        return false;
      } else if (filters.quantityRange === 'Bulk' && item.quantity <= 2000) {
        return false;
      }

      return true;
    });
  }, [harvests, searchQuery, filters]);

  const activeFilterCount = (filters.category !== 'All' ? 1 : 0) +
    (filters.grade !== 'All' ? 1 : 0) +
    (filters.farmingMethod !== 'All' ? 1 : 0) +
    (filters.quantityRange !== 'All' ? 1 : 0) +
    (filters.state !== 'All' ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0);

  return (
    <div className="space-y-5 select-none pb-8">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              Browse Available Harvests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border">
              {filteredHarvests.length} Lots Available
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-0.5">
            Verified agricultural listings &bull; Direct farmgate pickup with guaranteed escrow payment
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-farm-text-secondary bg-farm-surface px-3 py-1 rounded-xl border border-farm-border">
            Demo Marketplace Data
          </span>
        </div>
      </div>

      {/* 2. Search Bar & Filter Controls */}
      <div className="bg-farm-surface p-4 rounded-3xl border border-farm-border shadow-card space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, varieties, farms, or locations..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs sm:text-sm text-farm-text focus:outline-none focus:border-farm-brand"
              id="buyer-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-farm-text-secondary hover:text-farm-text cursor-pointer text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Drawer Button (Mobile & Desktop) */}
          <button
            type="button"
            onClick={() => setIsFilterModalOpen(true)}
            className="w-full sm:w-auto px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center gap-2 cursor-pointer relative shrink-0"
            id="buyer-filter-btn"
          >
            <Filter className="w-4 h-4 text-farm-brand" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-farm-brand text-farm-gold text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Reset Filters */}
          {(activeFilterCount > 0 || searchQuery) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full sm:w-auto px-3 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-danger hover:bg-farm-surface flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Desktop Quick Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-farm-text-secondary uppercase shrink-0 mr-1">
            Category:
          </span>
          {['All', 'Vegetables', 'Grains', 'Fruits', 'Spices'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 border ${
                filters.category === cat
                  ? 'bg-farm-brand text-white border-farm-brand'
                  : 'bg-farm-surface text-farm-text-secondary border-farm-border hover:text-farm-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Listings Grid */}
      {filteredHarvests.length === 0 ? (
        <div className="p-12 text-center bg-farm-surface rounded-3xl border border-farm-border shadow-card space-y-3">
          <div className="w-12 h-12 rounded-full bg-farm-surface text-farm-text-secondary mx-auto flex items-center justify-center border border-farm-border">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-farm-text">No Harvests Found</h3>
            <p className="text-xs text-farm-text-secondary mt-1">
              No active listings match your current search and filter criteria.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredHarvests.map((item) => {
            const isSaved = savedHarvestCodes.includes(item.harvestCode || item.id);

            return (
              <div
                key={item.id}
                className="bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden flex flex-col justify-between hover:border-farm-brand transition-all"
              >
                {/* Crop Image */}
                <div className="relative h-40 bg-farm-surface-secondary overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.cropName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-farm-surface text-farm-brand font-display font-bold text-2xl">
                      {item.cropName}
                    </div>
                  )}

                  <span className="absolute top-2.5 left-2.5 bg-farm-brand/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                    {item.grade || 'Grade A'} &bull; {item.farmingMethod || 'Conventional'}
                  </span>

                  <button
                    type="button"
                    onClick={() => onToggleSave(item.harvestCode || item.id)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-subtle ${
                      isSaved
                        ? 'bg-farm-gold text-farm-text'
                        : 'bg-farm-surface/90 text-farm-text-secondary hover:text-farm-terracotta'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save harvest'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-display font-bold text-base text-farm-text">
                        {item.cropName}
                      </h3>
                      <span className="text-[10px] text-farm-text-secondary font-mono">
                        {item.harvestCode || item.id}
                      </span>
                    </div>

                    <p className="text-xs text-farm-text-secondary">
                      {item.variety || item.category}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-farm-text-secondary mt-1">
                      <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                      <span className="truncate">{item.pickupLocation || `${item.district}, ${item.state}`}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-farm-text-secondary mt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-farm-brand shrink-0" />
                      <span>Ready: {item.availableFrom || item.harvestDate}</span>
                    </div>
                  </div>

                  {/* Lot Specs Box */}
                  <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-farm-text-secondary block">Available Lot</span>
                      <span className="text-xs font-bold text-farm-text">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold uppercase text-farm-brand block">Expected Price</span>
                      <span className="text-sm font-bold text-farm-brand">
                        ₹{item.expectedPrice}/{item.unit === 'Quintals' ? 'kg' : 'kg'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewHarvest(item)}
                      className="flex-1 py-2.5 rounded-xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onExpressInterest(item)}
                      className="px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 flex items-center gap-1.5 cursor-pointer border border-farm-brand"
                    >
                      <Send className="w-3.5 h-3.5 text-farm-gold" />
                      <span>Interest</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter Modal for Mobile */}
      <BuyerFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onUpdateFilters={(upd) => setFilters(upd)}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
};
