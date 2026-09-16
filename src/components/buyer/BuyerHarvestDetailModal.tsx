import { X, Sprout, MapPin, Calendar, CheckCircle2, Bookmark, Send, ShieldCheck, AlertCircle } from 'lucide-react';
import { HarvestItem } from '@/types';

interface BuyerHarvestDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: HarvestItem | null;
  isSaved: boolean;
  onToggleSave: (harvestCode: string) => void;
  onExpressInterest: (harvest: HarvestItem) => void;
}

export const BuyerHarvestDetailModal = ({
  isOpen,
  onClose,
  harvest,
  isSaved,
  onToggleSave,
  onExpressInterest,
}: BuyerHarvestDetailModalProps) => {
  if (!isOpen || !harvest) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-2xl shadow-elevated overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-terracotta border border-farm-border flex items-center justify-center text-white">
              <Sprout className="w-5 h-5 text-farm-text-secondary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                  {harvest.cropName} {harvest.variety ? `(${harvest.variety})` : ''}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-farm-brand text-farm-gold border border-farm-brand">
                  {harvest.harvestCode || harvest.id}
                </span>
              </div>
              <p className="text-xs text-white/70 font-medium">
                Verified Farmer Harvest Lot &bull; Direct Farmgate Procurement
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Top Banner Image or Crop Hero */}
          {harvest.imageUrl ? (
            <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-farm-border relative">
              <img
                src={harvest.imageUrl}
                alt={harvest.cropName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-farm-brand/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                {harvest.category} &bull; {harvest.grade || 'Grade A'}
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-farm-surface border border-farm-border flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center font-display font-bold text-xl">
                {harvest.cropName[0]}
              </div>
              <div>
                <h3 className="text-base font-bold text-farm-text">{harvest.cropName}</h3>
                <p className="text-xs text-farm-text-secondary">{harvest.category} &bull; {harvest.variety || 'Standard Lot'}</p>
              </div>
            </div>
          )}

          {/* Key Lot Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Available Lot</span>
              <span className="text-base sm:text-lg font-display font-bold text-farm-text">
                {harvest.quantity} {harvest.unit}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-farm-brand-soft border border-farm-border">
              <span className="text-[10px] font-bold text-farm-brand uppercase block">Expected Price</span>
              <span className="text-base sm:text-lg font-display font-bold text-farm-brand">
                ₹{harvest.expectedPrice}/{harvest.unit === 'Quintals' ? 'kg' : harvest.unit === 'Kilograms' ? 'kg' : 'unit'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Quality Grade</span>
              <span className="text-base sm:text-lg font-display font-bold text-farm-terracotta">
                {harvest.grade || 'Grade A'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Farming Method</span>
              <span className="text-sm sm:text-base font-bold text-farm-text">
                {harvest.farmingMethod || 'Conventional'}
              </span>
            </div>
          </div>

          {/* Grower & Location Details */}
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-farm-border">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-farm-brand" />
                <span className="text-xs font-bold text-farm-brand uppercase tracking-wider">
                  Grower Credentials & Origin
                </span>
              </div>
              <span className="text-[10px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-full border border-farm-border flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Verified Producer
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-farm-text">
              <div>
                <span className="text-farm-text-secondary block text-[11px]">Farm Location</span>
                <span className="font-bold flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                  <span>{harvest.pickupLocation || `${harvest.village || ''}, ${harvest.district || ''}, ${harvest.state || ''}`}</span>
                </span>
              </div>

              <div>
                <span className="text-farm-text-secondary block text-[11px]">Harvest & Dispatch Readiness</span>
                <span className="font-bold flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-farm-brand shrink-0" />
                  <span>{harvest.availableFrom || harvest.harvestDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          {harvest.description && (
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-farm-text uppercase tracking-wider">
                Produce Description & Handling Notes
              </h4>
              <p className="text-xs text-farm-text-secondary leading-relaxed bg-farm-surface p-3.5 rounded-2xl border border-farm-border">
                {harvest.description}
              </p>
            </div>
          )}

          {/* Demo Disclaimer */}
          <div className="p-3 bg-farm-surface-secondary rounded-2xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-text-secondary">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
            <span>
              Demo harvest listing for prototype testing. Expressing interest connects you to simulated trade workflows.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-farm-surface-secondary border-t border-farm-border flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSave(harvest.harvestCode || harvest.id)}
            className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
              isSaved
                ? 'bg-farm-gold text-farm-text border-farm-terracotta'
                : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved in Shortlist' : 'Save Harvest'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface cursor-pointer"
            >
              Back to Listings
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExpressInterest(harvest);
              }}
              className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
              id="detail-express-interest-btn"
            >
              <Send className="w-4 h-4 text-farm-gold" />
              <span>Express Interest</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
