import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageCheck, X, CheckCircle2 } from 'lucide-react';
import { OrderDeliveryItem } from '@/types';

interface ReadyForPickupConfirmModalProps {
  isOpen: boolean;
  order: OrderDeliveryItem | null;
  onClose: () => void;
  onConfirm: (orderId: string) => void;
}

export const ReadyForPickupConfirmModal: React.FC<ReadyForPickupConfirmModalProps> = ({
  isOpen,
  order,
  onClose,
  onConfirm,
}) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-farm-surface w-full max-w-md rounded-3xl border border-farm-border shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 border-b border-farm-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-border shrink-0">
                <PackageCheck className="w-5 h-5 text-farm-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Mark Ready for Pickup?
                </h3>
                <p className="text-xs text-farm-gold font-mono">
                  Order: {order.orderCode}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-farm-brand text-white hover:bg-farm-gold hover:text-farm-text transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong text-xs text-farm-brand space-y-2">
              <p className="font-bold text-sm">
                Confirm Produce Packaging & Weight
              </p>
              <p className="font-medium text-farm-brand/90 leading-relaxed">
                By marking this ready, you confirm that <span className="font-bold">{order.quantity} {order.unit} of {order.cropName}</span> is graded, packed into crates/bags, and available at the farmgate pickup location for the assigned transport vehicle.
              </p>
            </div>

            <div className="space-y-2 text-xs bg-farm-surface p-4 rounded-2xl border border-farm-border">
              <div className="flex items-center justify-between">
                <span className="text-farm-text-secondary font-semibold">Buyer:</span>
                <span className="font-bold text-farm-text">{order.buyerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-farm-text-secondary font-semibold">Pickup Location:</span>
                <span className="font-bold text-farm-text truncate max-w-[200px]">{order.pickupLocation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-farm-text-secondary font-semibold">Assigned Transport:</span>
                <span className="font-bold text-farm-brand">{order.logisticsProvider?.name || 'Mandi Transport'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirm(order.id);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-subtle"
            >
              <CheckCircle2 className="w-4 h-4 text-farm-gold" />
              <span>Confirm Ready for Pickup</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
