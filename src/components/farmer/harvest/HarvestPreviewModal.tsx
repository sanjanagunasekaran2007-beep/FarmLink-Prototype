import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  MapPin, 
  Calendar, 
  Package, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  CheckCircle2,
  Leaf,
  Info
} from 'lucide-react';
import { HarvestFormData } from '@/types';

interface HarvestPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: HarvestFormData;
  onEdit: () => void;
  onPublish: () => void;
}

export const HarvestPreviewModal: React.FC<HarvestPreviewModalProps> = ({
  isOpen,
  onClose,
  formData,
  onEdit,
  onPublish,
}) => {
  if (!isOpen) return null;

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
          {/* Header Bar */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-farm-border bg-farm-surface shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onEdit}
                className="w-9 h-9 rounded-xl bg-farm-surface-secondary border border-farm-border text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
                title="Back to editing"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-farm-gold" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                    Buyer Listing Preview
                  </h3>
                </div>
                <p className="text-xs text-farm-text-secondary">
                  Review how wholesale buyers and APMC traders will see your listing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-farm-terracotta-soft text-farm-terracotta border border-farm-terracotta/40 text-[11px] font-bold uppercase tracking-wider">
                Draft Preview
              </span>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Preview Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Buyer Preview Card Container */}
            <div className="bg-farm-surface rounded-2xl border border-farm-border overflow-hidden shadow-subtle">
              {/* Crop Media Section */}
              {formData.imageUrl ? (
                <div className="w-full h-56 sm:h-64 bg-farm-surface-secondary relative overflow-hidden border-b border-farm-border">
                  <img
                    src={formData.imageUrl}
                    alt={formData.cropName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-farm-brand/80 backdrop-blur-none text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-farm-gold" />
                    <span>Verified Fresh Harvest</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-32 bg-farm-surface-secondary flex flex-col items-center justify-center text-farm-text-secondary border-b border-farm-border">
                  <Package className="w-8 h-8 text-farm-terracotta mb-1.5 opacity-60" />
                  <span className="text-xs font-semibold text-farm-terracotta">No crop photo attached</span>
                  <span className="text-[11px] text-farm-text-secondary">Default Mandi listing template applied</span>
                </div>
              )}

              {/* Listing Details */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Title and Badges */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-farm-border">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-farm-brand text-white text-[11px] font-bold">
                        {formData.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong text-[11px] font-bold">
                        {formData.grade}
                      </span>
                      {formData.farmingMethod !== 'Not specified' && (
                        <span className="px-2.5 py-0.5 rounded-md bg-farm-gold-soft text-farm-gold border border-farm-gold/40 text-[11px] font-bold flex items-center gap-1">
                          <Leaf className="w-3 h-3 text-farm-gold" />
                          {formData.farmingMethod}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-display font-bold text-farm-text">
                      {formData.cropName}
                    </h2>

                    {formData.variety && (
                      <p className="text-xs font-semibold text-farm-text-secondary mt-0.5">
                        Variety: <span className="text-farm-text font-bold">{formData.variety}</span>
                      </p>
                    )}
                  </div>

                  {/* Quantity and Price Highlight */}
                  <div className="sm:text-right bg-farm-surface-secondary p-3 rounded-2xl border border-farm-border">
                    <div className="text-xs font-bold text-farm-text-secondary">Expected Price</div>
                    <div className="text-2xl font-display font-bold text-farm-brand">
                      ₹{formData.expectedPrice}
                      <span className="text-xs font-semibold text-farm-text-secondary">/{formData.unit === 'Quintals' ? 'Qtl' : formData.unit}</span>
                    </div>
                    <div className="text-[11px] font-bold text-farm-terracotta">
                      {formData.priceType}
                    </div>
                  </div>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-farm-surface-secondary border border-farm-border">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1 mb-1">
                      <Package className="w-3 h-3 text-farm-gold" />
                      <span>Available Volume</span>
                    </div>
                    <div className="text-base font-bold text-farm-text">
                      {formData.quantity} <span className="text-xs font-semibold text-farm-text-secondary">{formData.unit}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-farm-surface-secondary border border-farm-border">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-farm-brand" />
                      <span>Harvest Date</span>
                    </div>
                    <div className="text-sm font-bold text-farm-text truncate">
                      {formData.harvestDate || 'Immediate'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-farm-surface-secondary border border-farm-border col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1 mb-1">
                      <Calendar className="w-3 h-3 text-farm-brand" />
                      <span>Available From</span>
                    </div>
                    <div className="text-sm font-bold text-farm-text truncate">
                      {formData.availableFrom || formData.harvestDate || 'Ready Now'}
                    </div>
                  </div>
                </div>

                {/* Location Box */}
                <div className="p-3.5 rounded-xl bg-farm-eucalyptus-soft border border-farm-info/40">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-farm-info flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-farm-brand" />
                    <span>Farmgate Collection Point</span>
                  </div>
                  <div className="text-sm font-bold text-farm-text">
                    {formData.pickupLocation}
                  </div>
                  <div className="text-xs text-farm-info font-semibold mt-0.5">
                    {[formData.village, formData.district, formData.state].filter(Boolean).join(', ')}
                  </div>
                </div>

                {/* Description */}
                {formData.description && (
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-farm-text">Produce Notes & Quality Details</div>
                    <p className="text-xs text-farm-text-secondary leading-relaxed bg-farm-surface-secondary p-3 rounded-xl border border-farm-border">
                      {formData.description}
                    </p>
                  </div>
                )}

                {/* Mandi Assurance Banner */}
                <div className="p-3 rounded-xl bg-farm-brand-soft border border-farm-border-strong flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-farm-brand shrink-0" />
                  <div className="text-xs text-farm-brand">
                    <span className="font-bold">FarmLink Assured Trade:</span> Weighment and payment escrow guaranteed upon pickup.
                  </div>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="p-3 rounded-xl bg-farm-gold-soft border border-farm-gold/40 flex items-start gap-2 text-xs text-farm-gold">
              <Info className="w-4 h-4 text-farm-gold shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Notice:</strong> Selecting &quot;Publish Harvest&quot; will store this batch in your local demo listings and immediately update your dashboard metrics.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-6 border-t border-farm-border bg-farm-surface flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onEdit}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text font-display font-bold text-xs sm:text-sm hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              id="preview-edit-listing-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Listing</span>
            </button>

            <button
              type="button"
              onClick={onPublish}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
              id="preview-publish-harvest-btn"
            >
              <CheckCircle2 className="w-4 h-4 text-farm-gold" />
              <span>Publish Harvest</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
