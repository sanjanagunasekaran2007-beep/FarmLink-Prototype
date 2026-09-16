import { X, Filter, RotateCcw } from 'lucide-react';

export interface BuyerFiltersState {
  category: string;
  grade: string;
  farmingMethod: string;
  quantityRange: string;
  state: string;
  verifiedOnly: boolean;
}

interface BuyerFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: BuyerFiltersState;
  onUpdateFilters: (filters: BuyerFiltersState) => void;
  onClearFilters: () => void;
}

export const BuyerFilterModal = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onClearFilters,
}: BuyerFilterModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-md shadow-elevated overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-brand">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Filter Harvest Listings
              </h2>
              <p className="text-xs text-white/70">Refine produce discovery criteria</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Body */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-farm-text">
          {/* Crop Category */}
          <div>
            <label className="block font-bold uppercase text-[11px] text-farm-text-secondary mb-1.5">
              Crop Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => onUpdateFilters({ ...filters, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
            >
              <option value="All">All Categories</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Grains">Grains & Pulses</option>
              <option value="Fruits">Fruits</option>
              <option value="Spices">Spices & Condiments</option>
            </select>
          </div>

          {/* Location / State */}
          <div>
            <label className="block font-bold uppercase text-[11px] text-farm-text-secondary mb-1.5">
              State / Region
            </label>
            <select
              value={filters.state}
              onChange={(e) => onUpdateFilters({ ...filters, state: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
            >
              <option value="All">All States</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          {/* Quality Grade */}
          <div>
            <label className="block font-bold uppercase text-[11px] text-farm-text-secondary mb-1.5">
              Quality Grade
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {['All', 'Grade A', 'Grade B', 'Grade C'].map((gr) => (
                <button
                  key={gr}
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, grade: gr })}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    filters.grade === gr
                      ? 'bg-farm-brand text-white border-farm-brand'
                      : 'bg-farm-surface text-farm-text-secondary border-farm-border'
                  }`}
                >
                  {gr}
                </button>
              ))}
            </div>
          </div>

          {/* Farming Method */}
          <div>
            <label className="block font-bold uppercase text-[11px] text-farm-text-secondary mb-1.5">
              Farming Method
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {['All', 'Organic', 'Natural farming', 'Conventional'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, farmingMethod: method })}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer truncate ${
                    filters.farmingMethod === method
                      ? 'bg-farm-brand text-white border-farm-brand'
                      : 'bg-farm-surface text-farm-text-secondary border-farm-border'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Range */}
          <div>
            <label className="block font-bold uppercase text-[11px] text-farm-text-secondary mb-1.5">
              Lot Quantity Range
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'All', label: 'All Lot Sizes' },
                { id: 'Small', label: 'Small (< 500 kg)' },
                { id: 'Medium', label: 'Medium (500 - 2,000 kg)' },
                { id: 'Bulk', label: 'Bulk (> 2,000 kg)' },
              ].map((rng) => (
                <button
                  key={rng.id}
                  type="button"
                  onClick={() => onUpdateFilters({ ...filters, quantityRange: rng.id })}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-bold border transition-all cursor-pointer truncate ${
                    filters.quantityRange === rng.id
                      ? 'bg-farm-brand text-white border-farm-brand'
                      : 'bg-farm-surface text-farm-text-secondary border-farm-border'
                  }`}
                >
                  {rng.label}
                </button>
              ))}
            </div>
          </div>

          {/* Verified Farmers Only Toggle */}
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border flex items-center justify-between">
            <div>
              <span className="font-bold text-xs text-farm-text block">Verified Farmers Only</span>
              <span className="text-[11px] text-farm-text-secondary">Show listings from certified producer clusters</span>
            </div>
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) => onUpdateFilters({ ...filters, verifiedOnly: e.target.checked })}
              className="w-4 h-4 rounded text-farm-brand cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface-secondary border-t border-farm-border flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onClearFilters}
            className="px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text-secondary hover:text-farm-text flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer border border-farm-brand"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
