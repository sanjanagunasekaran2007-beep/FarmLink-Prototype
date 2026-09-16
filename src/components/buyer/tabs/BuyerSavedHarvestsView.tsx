import { Bookmark, BookmarkX, Store, MapPin, Send } from 'lucide-react';
import { HarvestItem, BuyerTab } from '@/types';

interface BuyerSavedHarvestsViewProps {
  harvests: HarvestItem[];
  savedHarvestCodes: string[];
  onNavigateTab: (tab: BuyerTab) => void;
  onViewHarvest: (harvest: HarvestItem) => void;
  onToggleSave: (harvestCode: string) => void;
  onExpressInterest: (harvest: HarvestItem) => void;
}

export const BuyerSavedHarvestsView = ({
  harvests,
  savedHarvestCodes,
  onNavigateTab,
  onViewHarvest,
  onToggleSave,
  onExpressInterest,
}: BuyerSavedHarvestsViewProps) => {
  const savedItems = harvests.filter((h) =>
    savedHarvestCodes.includes(h.harvestCode || h.id)
  );

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              Saved Harvests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-gold text-farm-text text-xs font-bold">
              {savedItems.length} Shortlisted
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-0.5">
            Your shortlisted farm lots saved for evaluation and procurement comparison
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('browse')}
          className="px-4 py-2.5 rounded-2xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Store className="w-4 h-4 text-farm-brand" />
          <span>Browse More Crops</span>
        </button>
      </div>

      {/* Content */}
      {savedItems.length === 0 ? (
        <div className="p-12 text-center bg-farm-surface rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="w-14 h-14 rounded-full bg-farm-surface text-farm-terracotta mx-auto flex items-center justify-center border border-farm-border">
            <Bookmark className="w-6 h-6 text-farm-gold" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-bold text-base text-farm-text">
              No Saved Harvests Yet
            </h3>
            <p className="text-xs text-farm-text-secondary leading-relaxed">
              Save harvests here to review them later. Click the bookmark icon on any harvest card while browsing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('browse')}
            className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center gap-2 mx-auto cursor-pointer border border-farm-brand"
          >
            <Store className="w-4 h-4 text-farm-gold" />
            <span>Browse Available Harvests</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden flex flex-col justify-between hover:border-farm-brand transition-all"
            >
              {/* Image */}
              <div className="relative h-36 bg-farm-surface-secondary overflow-hidden">
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
                  {item.grade || 'Grade A'}
                </span>

                <button
                  type="button"
                  onClick={() => onToggleSave(item.harvestCode || item.id)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-farm-surface text-farm-danger hover:bg-farm-surface flex items-center justify-center shadow-subtle cursor-pointer"
                  title="Remove from saved"
                >
                  <BookmarkX className="w-4 h-4" />
                </button>
              </div>

              {/* Details */}
              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-base text-farm-text">
                      {item.cropName}
                    </h3>
                    <span className="text-[10px] text-farm-text-secondary font-mono">
                      {item.harvestCode || item.id}
                    </span>
                  </div>

                  <p className="text-xs text-farm-text-secondary truncate">
                    {item.variety || item.category} &bull; {item.farmingMethod || 'Conventional'}
                  </p>

                  <div className="flex items-center gap-1 text-[11px] text-farm-text-secondary mt-1">
                    <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                    <span className="truncate">{item.pickupLocation || `${item.district}, ${item.state}`}</span>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-2.5 bg-farm-surface rounded-2xl border border-farm-border flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-farm-text-secondary block">Available</span>
                    <span className="text-xs font-bold text-farm-text">
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase text-farm-brand block">Expected Price</span>
                    <span className="text-xs font-bold text-farm-brand">
                      ₹{item.expectedPrice}/{item.unit === 'Quintals' ? 'kg' : 'kg'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onViewHarvest(item)}
                    className="flex-1 py-2 rounded-xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onExpressInterest(item)}
                    className="px-3 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover flex items-center gap-1 cursor-pointer border border-farm-brand"
                  >
                    <Send className="w-3 h-3 text-farm-gold" />
                    <span>Interest</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
