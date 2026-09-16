import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ShieldCheck, Banknote } from 'lucide-react';
import { OrderDeliveryItem } from '@/types';

interface ConfirmCompletionModalProps {
  isOpen: boolean;
  order: OrderDeliveryItem | null;
  onClose: () => void;
  onConfirm: (orderId: string) => void;
}

export const ConfirmCompletionModal: React.FC<ConfirmCompletionModalProps> = ({
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
              <div className="w-10 h-10 rounded-2xl bg-farm-brand text-white flex items-center justify-center border border-farm-border shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Confirm Order Completion
                </h3>
                <p className="text-xs text-white/80 font-mono">
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
            <div className="p-4 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40 text-xs text-farm-info space-y-2">
              <p className="font-bold text-sm text-farm-brand flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-farm-brand" />
                Finalize Delivery & Escrow Settlement
              </p>
              <p className="font-medium text-farm-info leading-relaxed">
                Produce batch (<span className="font-bold">{order.quantity} {order.unit} {order.cropName}</span>) was delivered to <span className="font-bold">{order.buyerName}</span>. Confirming will close this trade lot and verify payout deposit into your linked bank account.
              </p>
            </div>

            {order.totalAmount && (
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-farm-text-secondary block">
                    Escrow Payout Value
                  </span>
                  <span className="text-xl font-display font-bold text-farm-brand">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border-strong">
                  <Banknote className="w-5 h-5" />
                </div>
              </div>
            )}
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
              className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-subtle"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Confirm Completion</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
