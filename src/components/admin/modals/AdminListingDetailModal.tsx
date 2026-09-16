import { motion, AnimatePresence } from 'framer-motion';
import { X, Sprout, MapPin, Calendar, CheckCircle2, PauseCircle, PlayCircle, ShieldCheck } from 'lucide-react';
import { AdminListingItem, AdminListingStatus } from '@/types';

interface AdminListingDetailModalProps {
  listing: AdminListingItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAction?: (action: 'review' | 'pause' | 'restore' | 'archive', listing: AdminListingItem) => void;
}

export const AdminListingDetailModal = ({
  listing,
  isOpen,
  onClose,
  onAction,
}: AdminListingDetailModalProps) => {
  if (!isOpen || !listing) return null;

  const getStatusStyle = (status: AdminListingStatus) => {
    switch (status) {
      case 'Published':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Pending Review':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Paused':
        return { bg: '#FDEAE8', text: '#B94A48', border: '#B94A48' };
      case 'Archived':
        return { bg: '#F7F4EC', text: '#66736A', border: '#DCE2D9' };
      default:
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
    }
  };

  const statusStyle = getStatusStyle(listing.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-farm-surface rounded-2xl border border-farm-border shadow-subtle overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-brand">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Harvest Listing Details
                </h3>
                <div className="flex items-center gap-2 text-xs text-farm-text-secondary/80">
                  <span>ID: {listing.listingId}</span>
                  <span>&bull;</span>
                  <span className="text-farm-gold font-semibold">Demo Listing</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-farm-brand text-farm-text-secondary hover:bg-farm-brand transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Title & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-farm-border">
              <div>
                <h4 className="text-xl font-display font-bold text-farm-text">
                  {listing.cropName}
                </h4>
                <p className="text-xs text-farm-text-secondary mt-0.5">
                  Category: <strong className="text-farm-text">{listing.category}</strong> &bull; Grade: <strong className="text-farm-brand">{listing.qualityGrade}</strong>
                </p>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: statusStyle.bg,
                  color: statusStyle.text,
                  borderColor: statusStyle.border,
                }}
              >
                {listing.status}
              </span>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <span className="text-xs font-bold text-farm-text-secondary">Producer / Farmer</span>
                <p className="text-sm font-semibold text-farm-text">{listing.farmerName}</p>
                <span className="text-[11px] text-farm-text-secondary font-mono">{listing.farmerId}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <span className="text-xs font-bold text-farm-text-secondary">Quantity & Price</span>
                <p className="text-sm font-bold text-farm-brand">
                  {listing.quantity.toLocaleString()} {listing.unit}
                </p>
                <span className="text-xs text-farm-text font-medium">
                  Expected Price: ₹{listing.expectedPrice} / kg
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <MapPin className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Farmgate Location</span>
                </div>
                <p className="text-xs font-semibold text-farm-text">{listing.location}</p>
                <span className="text-[11px] text-farm-text-secondary">{listing.district}, {listing.state}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                  <Calendar className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Key Dates</span>
                </div>
                <p className="text-xs text-farm-text">
                  Published: <strong>{listing.publishedDate}</strong>
                </p>
                <p className="text-xs text-farm-text">
                  Harvest Date: <strong>{listing.harvestDate}</strong>
                </p>
              </div>
            </div>

            {/* Quality & Review Notes */}
            <div className="p-4 rounded-xl bg-farm-surface border border-farm-gold">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-farm-text-secondary shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
                    APMC Quality Audit Notes
                  </h5>
                  <p className="text-xs text-farm-text leading-relaxed">
                    {listing.reviewNotes || 'No specific review notes recorded.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Safe Demo Actions */}
            {onAction && (
              <div className="pt-2 border-t border-farm-border">
                <p className="text-xs font-bold text-farm-text mb-2">
                  Listing Management Actions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {listing.status === 'Pending Review' && (
                    <button
                      type="button"
                      onClick={() => onAction('review', listing)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve & Publish Listing</span>
                    </button>
                  )}

                  {listing.status === 'Published' && (
                    <button
                      type="button"
                      onClick={() => onAction('pause', listing)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-farm-danger text-white text-xs font-bold hover:bg-farm-surface-secondary transition-colors cursor-pointer"
                    >
                      <PauseCircle className="w-3.5 h-3.5" />
                      <span>Pause Demo Listing</span>
                    </button>
                  )}

                  {listing.status === 'Paused' && (
                    <button
                      type="button"
                      onClick={() => onAction('restore', listing)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Restore Listing</span>
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-farm-text-secondary mt-2">
                  * Note: Listing moderation changes only affect this demonstration session.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-farm-surface px-6 py-3.5 border-t border-farm-border flex items-center justify-between">
            <span className="text-xs text-farm-text-secondary">
              FarmLink Admin Demonstration Module
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
