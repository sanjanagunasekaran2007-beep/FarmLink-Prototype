import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Send, 
  Package, 
  Truck, 
  ShieldCheck, 
  Store,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { BuyerProfile } from '@/types';

interface BuyerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyer: BuyerProfile | null;
  onExpressInterest: (buyer: BuyerProfile) => void;
}

export const BuyerProfileModal: React.FC<BuyerProfileModalProps> = ({
  isOpen,
  onClose,
  buyer,
  onExpressInterest,
}) => {
  if (!isOpen || !buyer) return null;

  const getBuyerTypeColor = (type: BuyerProfile['buyerType']) => {
    switch (type) {
      case 'Wholesale Buyer':
        return { bg: '#DCEAF2', text: '#245B5A', border: '#B6D3E3' };
      case 'Retailer':
        return { bg: '#F3D6C4', text: '#C66B45', border: '#E8BCA6' };
      case 'Food Processing Company':
        return { bg: '#F6E7B8', text: '#694708', border: '#E4CC8B' };
      case 'Exporter':
        return { bg: '#DCE8D7', text: '#164A36', border: '#BFD4B8' };
      case 'FPO':
        return { bg: '#F3EBDD', text: '#8A5A3B', border: '#D5C9B5' };
      default:
        return { bg: '#F3EBDD', text: '#17211C', border: '#D5C9B5' };
    }
  };

  const typeStyle = getBuyerTypeColor(buyer.buyerType);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-2xl bg-farm-surface rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-farm-border bg-farm-surface shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-farm-surface-secondary border border-farm-border text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
                title="Back to Buyers"
                id="buyer-modal-back-btn"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-farm-brand" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                    Buyer Profile
                  </h3>
                </div>
                <p className="text-xs text-farm-text-secondary">
                  Verified enterprise &amp; wholesale buyer on FarmLink Mandi Network
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
            {/* Top Identity Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold border"
                      style={{
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        borderColor: typeStyle.border,
                      }}
                    >
                      {buyer.buyerType}
                    </span>

                    {buyer.isVerified ? (
                      <span className="px-2.5 py-0.5 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong text-[11px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-farm-brand" />
                        <span>Verified Buyer</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-md bg-farm-gold-soft text-farm-gold border border-farm-gold/40 text-[11px] font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-farm-gold" />
                        <span>Verification Pending</span>
                      </span>
                    )}

                    {buyer.distanceKm !== undefined && (
                      <span className="px-2 py-0.5 rounded-md bg-farm-surface-secondary text-farm-terracotta border border-farm-border text-[11px] font-bold">
                        ~{buyer.distanceKm} km away
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-display font-bold text-farm-text">
                    {buyer.name}
                  </h2>

                  <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary font-medium">
                    <MapPin className="w-3.5 h-3.5 text-farm-terracotta" />
                    <span>{buyer.location}</span>
                  </div>
                </div>

                <div className="sm:text-right bg-farm-surface-secondary p-3 rounded-xl border border-farm-border shrink-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary">
                    Procurement Activity
                  </div>
                  <div className="text-lg font-display font-bold text-farm-brand">
                    {buyer.tradeCount} Completed Trades
                  </div>
                  <div className="text-[11px] font-bold text-farm-brand">
                    {buyer.escrowRating}
                  </div>
                </div>
              </div>

              {/* Status banner */}
              <div className="p-3 rounded-xl bg-farm-eucalyptus-soft border border-farm-info/40 flex items-center gap-2 text-xs font-semibold text-farm-info">
                <Sparkles className="w-4 h-4 text-farm-brand shrink-0" />
                <span>{buyer.contactStatus}</span>
              </div>
            </div>

            {/* About & Operating Scope */}
            <div className="bg-farm-surface rounded-2xl border border-farm-border p-5 space-y-2 shadow-subtle">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
                About the Buyer
              </h3>
              <p className="text-xs sm:text-sm text-farm-text-secondary leading-relaxed">
                {buyer.about}
              </p>
            </div>

            {/* Requirements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Crops Required */}
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-farm-terracotta" />
                  <span>Crops Currently Required</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {buyer.cropsRequired.map((crop) => (
                    <span
                      key={crop}
                      className="px-2.5 py-1 rounded-lg bg-farm-terracotta-soft text-farm-terracotta text-xs font-bold border border-farm-terracotta/40"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Requirement */}
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Lot Size Requirement</span>
                </div>
                <div className="text-base font-display font-bold text-farm-text">
                  {buyer.quantityRequirement}
                </div>
                <div className="text-[11px] text-farm-text-secondary">
                  Category: <strong>{buyer.quantityCategory} Volume</strong>
                </div>
              </div>

              {/* Pickup / Delivery Preference */}
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Logistics &amp; Transport</span>
                </div>
                <div className="text-sm font-bold text-farm-text">
                  {buyer.pickupPreference}
                </div>
                <div className="text-[11px] text-farm-text-secondary">
                  Logistics coordinator assigned upon order confirmation
                </div>
              </div>

              {/* Operating Areas */}
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-farm-terracotta" />
                  <span>Operating Procurement Districts</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {buyer.operatingAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 rounded-md bg-farm-surface-secondary text-farm-text text-[11px] font-semibold border border-farm-border"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong space-y-2 shadow-subtle">
              <div className="text-[10px] font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-farm-brand" />
                <span>Verification &amp; Security Credentials</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {buyer.badges.map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-lg bg-farm-surface text-farm-brand text-xs font-bold border border-farm-border-strong"
                  >
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Prototype Disclaimer */}
            <div className="p-3.5 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 flex items-start gap-2.5 text-xs text-farm-gold">
              <Info className="w-4 h-4 text-farm-gold shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Notice:</strong> Demo buyer profile. Expressing interest connects your listed harvest directly with this buyer for demonstration purposes.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-6 border-t border-farm-border bg-farm-surface flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text font-display font-bold text-xs sm:text-sm hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Buyers</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onExpressInterest(buyer);
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
              id="buyer-modal-express-interest-btn"
            >
              <Send className="w-4 h-4 text-farm-gold" />
              <span>Express Interest</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
