import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Edit3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Tag, 
  Leaf, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Send,
  Package
} from 'lucide-react';
import { HarvestItem, HarvestStatus } from '@/types';

interface HarvestDetailsModalProps {
  isOpen: boolean;
  harvest: HarvestItem | null;
  onClose: () => void;
  onOpenEdit: (harvest: HarvestItem) => void;
  onOpenDelete: (harvest: HarvestItem) => void;
  onStatusChange: (harvestId: string, newStatus: HarvestStatus) => void;
}

export const HarvestDetailsModal: React.FC<HarvestDetailsModalProps> = ({
  isOpen,
  harvest,
  onClose,
  onOpenEdit,
  onOpenDelete,
  onStatusChange,
}) => {
  if (!isOpen || !harvest) return null;

  const getStatusBadge = (status: HarvestStatus) => {
    switch (status) {
      case 'Published':
      case 'Active':
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: 'Published',
        };
      case 'Draft':
        return {
          bg: 'bg-farm-gold',
          text: 'text-farm-text',
          label: 'Draft',
        };
      case 'Completed':
      case 'Sold':
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: 'Completed',
        };
      case 'Archived':
        return {
          bg: 'bg-farm-terracotta',
          text: 'text-white',
          label: 'Archived',
        };
      default:
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: status,
        };
    }
  };

  const statusBadge = getStatusBadge(harvest.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-3xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center font-bold text-xl border border-farm-border shrink-0">
                {harvest.cropName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-farm-gold px-2 py-0.5 rounded-md bg-farm-brand border border-farm-brand">
                    {harvest.harvestCode || harvest.id}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                  {harvest.cropName}
                  {harvest.variety ? ` • ${harvest.variety}` : ''}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-farm-brand text-white hover:bg-farm-gold hover:text-farm-text transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
            {/* Top Grid: Image + Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Image Preview */}
              <div className="md:col-span-5">
                {harvest.imageUrl ? (
                  <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden border border-farm-border bg-farm-surface-secondary relative">
                    <img
                      src={harvest.imageUrl}
                      alt={harvest.cropName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-farm-brand/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {harvest.category}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-48 rounded-2xl border border-dashed border-farm-border bg-farm-surface-secondary flex flex-col items-center justify-center text-farm-terracotta gap-2 p-4 text-center">
                    <Package className="w-8 h-8 text-farm-terracotta" />
                    <span className="text-xs font-bold">Standard Batch Photo</span>
                    <span className="text-[10px] text-farm-text-secondary">Direct farmgate verified lot</span>
                  </div>
                )}
              </div>

              {/* Core Quantity & Pricing Specs */}
              <div className="md:col-span-7 grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5 text-farm-brand" />
                    <span>Listed Quantity</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-farm-brand">
                    {harvest.quantity} <span className="text-sm font-semibold">{harvest.unit}</span>
                  </div>
                  <div className="text-[11px] text-farm-brand font-medium mt-0.5">
                    Ready for fulfillment
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-farm-terracotta-soft border border-farm-terracotta/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-farm-terracotta flex items-center gap-1.5 mb-1">
                    <Tag className="w-3.5 h-3.5 text-farm-terracotta" />
                    <span>Expected Rate</span>
                  </div>
                  <div className="text-2xl font-display font-bold text-farm-terracotta">
                    ₹{harvest.expectedPrice}
                    <span className="text-xs font-semibold">/{harvest.unit === 'Quintals' ? 'kg' : harvest.unit}</span>
                  </div>
                  <div className="text-[11px] text-farm-terracotta font-medium mt-0.5">
                    {harvest.priceType || 'Fixed expected price'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-farm-gold-soft border border-farm-gold/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-farm-gold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-farm-gold" />
                    <span>Quality Grade</span>
                  </div>
                  <div className="text-lg font-display font-bold text-farm-gold">
                    {harvest.grade || 'Grade A'}
                  </div>
                  <div className="text-[11px] text-farm-gold font-medium mt-0.5">
                    Visual & moisture tested
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-farm-info flex items-center gap-1.5 mb-1">
                    <Leaf className="w-3.5 h-3.5 text-farm-brand" />
                    <span>Farming Practice</span>
                  </div>
                  <div className="text-lg font-display font-bold text-farm-brand truncate">
                    {harvest.farmingMethod || 'Natural farming'}
                  </div>
                  <div className="text-[11px] text-farm-info font-medium mt-0.5">
                    Safe residue profile
                  </div>
                </div>
              </div>
            </div>

            {/* Lot Information & Logistics Details */}
            <div className="p-4 sm:p-5 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand pb-2 border-b border-farm-border flex items-center justify-between">
                <span>Lot Specifications & Logistics</span>
                <span className="text-[11px] font-semibold text-farm-text-secondary">
                  Listed: {harvest.createdAt} {harvest.updatedAt ? `• Updated: ${harvest.updatedAt}` : ''}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <Calendar className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="text-farm-text-secondary font-semibold block">Expected Harvest Date:</span>
                    <span className="font-bold text-farm-text">{harvest.harvestDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
                  <div>
                    <span className="text-farm-text-secondary font-semibold block">Available For Dispatch:</span>
                    <span className="font-bold text-farm-text">{harvest.availableFrom || 'Ready for Immediate Dispatch'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
                  <div>
                    <span className="text-farm-text-secondary font-semibold block">Pickup / Farm Gate Location:</span>
                    <span className="font-bold text-farm-text">{harvest.pickupLocation}</span>
                  </div>
                </div>
              </div>

              {harvest.description && (
                <div className="pt-3 border-t border-farm-border">
                  <span className="text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider block mb-1">
                    Farmer Notes & Produce Highlights:
                  </span>
                  <p className="text-xs sm:text-sm text-farm-text font-medium leading-relaxed bg-farm-surface p-3 rounded-xl border border-farm-border">
                    {harvest.description}
                  </p>
                </div>
              )}
            </div>

            {/* Activity Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-2">
                <Clock className="w-4 h-4 text-farm-gold" />
                <span>Harvest Lifecycle & Timeline</span>
              </h3>

              <div className="space-y-2.5">
                {(harvest.timeline && harvest.timeline.length > 0) ? (
                  harvest.timeline.map((event, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-farm-text">{event.title}</span>
                          {event.statusBadge && (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong">
                              {event.statusBadge}
                            </span>
                          )}
                        </div>
                        <p className="text-farm-text-secondary font-medium">{event.description}</p>
                      </div>
                      <span className="text-[11px] font-bold text-farm-text-secondary shrink-0">
                        {event.timestamp}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-farm-text">Listing Created</span>
                      <p className="text-farm-text-secondary font-medium">Harvest record logged into active portfolio.</p>
                    </div>
                    <span className="text-[11px] font-bold text-farm-text-secondary">{harvest.createdAt}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal Action Bar (Desktop and Mobile Responsive) */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex flex-wrap items-center justify-between gap-2.5 shrink-0">
            {/* Left Destructive / Secondary Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenDelete(harvest)}
                className="px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-terracotta/40 text-farm-terracotta text-xs font-bold hover:bg-farm-terracotta-soft active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5 text-farm-terracotta" />
                <span className="hidden sm:inline">Delete Listing</span>
                <span className="sm:hidden">Delete</span>
              </button>

              {harvest.status !== 'Archived' ? (
                <button
                  type="button"
                  onClick={() => onStatusChange(harvest.id, 'Archived')}
                  className="px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-terracotta text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-farm-terracotta" />
                  <span>Archive</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onStatusChange(harvest.id, 'Draft')}
                  className="px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-text text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Restore to Draft</span>
                </button>
              )}
            </div>

            {/* Right Primary / Transition Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenEdit(harvest)}
                className="px-4 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-text text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5 text-farm-brand" />
                <span>Edit Details</span>
              </button>

              {/* Status Specific Publishing / Completion Buttons */}
              {harvest.status === 'Published' || harvest.status === 'Active' ? (
                <>
                  <button
                    type="button"
                    onClick={() => onStatusChange(harvest.id, 'Draft')}
                    className="px-4 py-2 rounded-xl bg-farm-gold-soft text-farm-gold border border-farm-gold/40 text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5 text-farm-gold" />
                    <span>Unpublish (Draft)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onStatusChange(harvest.id, 'Completed')}
                    className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    <span>Mark as Completed</span>
                  </button>
                </>
              ) : harvest.status === 'Draft' ? (
                <button
                  type="button"
                  onClick={() => onStatusChange(harvest.id, 'Published')}
                  className="px-5 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                >
                  <Send className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Publish Listing</span>
                </button>
              ) : harvest.status === 'Completed' || harvest.status === 'Sold' ? (
                <button
                  type="button"
                  onClick={() => onStatusChange(harvest.id, 'Published')}
                  className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                >
                  <Send className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Re-publish Listing</span>
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
