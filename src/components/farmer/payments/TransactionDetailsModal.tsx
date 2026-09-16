import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  User, 
  Layers,
  Banknote,
  ShieldAlert
} from 'lucide-react';
import { TransactionItem, PaymentStatus } from '@/types';

interface TransactionDetailsModalProps {
  isOpen: boolean;
  transaction: TransactionItem | null;
  onClose: () => void;
  onOpenReceipt: (transaction: TransactionItem) => void;
}

export const TransactionDetailsModal: React.FC<TransactionDetailsModalProps> = ({
  isOpen,
  transaction,
  onClose,
  onOpenReceipt,
}) => {
  if (!isOpen || !transaction) return null;

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'Completed':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Completed' };
      case 'Pending':
        return { bg: 'bg-farm-gold', text: 'text-farm-text', label: 'Pending' };
      case 'Processing':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Processing' };
      case 'Failed':
      default:
        return { bg: 'bg-farm-surface-secondary', text: 'text-white', label: 'Failed (Retry Queue)' };
    }
  };

  const statusBadge = getStatusBadge(transaction.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-2xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center font-bold text-xl border border-farm-border shrink-0">
                <Banknote className="w-6 h-6 text-farm-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-farm-gold px-2 py-0.5 rounded-md bg-farm-brand border border-farm-brand">
                    {transaction.transactionCode}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                  ₹{transaction.netAmount.toLocaleString()} &bull; {transaction.cropName}
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

          {/* Body Content */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
            {/* Demo Financial Notice */}
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-gold/40 text-xs font-medium text-farm-gold flex items-center gap-3 shadow-subtle">
              <ShieldAlert className="w-5 h-5 text-farm-gold shrink-0" />
              <div>
                <span className="font-bold block text-sm">Demo financial data — no real payments are processed.</span>
                <span className="text-[11px] text-farm-gold/80">Settlement figures and timestamps represent demo escrow logs.</span>
              </div>
            </div>

            {/* Core Transaction Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-brand block mb-1">
                  Net Payout
                </span>
                <span className="text-xl font-display font-bold text-farm-brand">
                  ₹{transaction.netAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-farm-terracotta-soft border border-farm-terracotta/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-terracotta block mb-1">
                  Quantity
                </span>
                <span className="text-xl font-display font-bold text-farm-terracotta">
                  {transaction.quantity} <span className="text-xs font-semibold">{transaction.unit}</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-farm-gold-soft border border-farm-gold/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-gold block mb-1">
                  Payment Method
                </span>
                <span className="text-xs font-bold text-farm-gold block truncate">
                  {transaction.paymentMethod}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-info block mb-1">
                  Date Logged
                </span>
                <span className="text-xs font-bold text-farm-brand block">
                  {transaction.date}
                </span>
              </div>
            </div>

            {/* Order & Counterparty Details */}
            <div className="p-5 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand pb-2 border-b border-farm-border flex items-center justify-between">
                <span>Transaction Lot & Counterparty</span>
                <span className="font-mono text-xs text-farm-text-secondary">Order: {transaction.orderId}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-farm-text-secondary font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-farm-brand" /> Buyer Organization:
                  </span>
                  <p className="font-bold text-farm-text text-sm">{transaction.buyerName}</p>
                  <p className="text-[11px] text-farm-text-secondary">{transaction.buyerType || 'Verified Buyer'}</p>
                </div>

                <div>
                  <span className="text-farm-text-secondary font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-farm-terracotta" /> Produce Lot:
                  </span>
                  <p className="font-bold text-farm-text text-sm">{transaction.cropName} {transaction.variety ? `(${transaction.variety})` : ''}</p>
                  <p className="text-[11px] text-farm-text-secondary">Unit Rate: ₹{transaction.unitPrice}/{transaction.unit}</p>
                </div>
              </div>

              {transaction.notes && (
                <div className="pt-2 border-t border-farm-border">
                  <span className="text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider block mb-0.5">
                    Clearing Notes:
                  </span>
                  <p className="text-xs text-farm-text font-medium bg-farm-surface p-2.5 rounded-xl border border-farm-border">
                    {transaction.notes}
                  </p>
                </div>
              )}
            </div>

            {/* 4-STAGE PAYMENT TIMELINE */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-2">
                <Clock className="w-4 h-4 text-farm-gold" />
                <span>4-Stage Payment Lifecycle</span>
              </h3>

              <div className="space-y-2.5">
                {transaction.timeline.map((step, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
                        step.isCurrent
                          ? 'bg-farm-surface border-farm-gold ring-2 ring-farm-gold-soft'
                          : step.isCompleted
                          ? 'bg-farm-surface border-farm-border-strong'
                          : 'bg-farm-surface/70 border-farm-border opacity-75'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                            step.isCompleted
                              ? 'bg-farm-brand text-white'
                              : step.isCurrent
                              ? 'bg-farm-gold text-farm-text'
                              : 'bg-farm-surface-secondary text-farm-text-secondary'
                          }`}
                        >
                          {step.isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-farm-text">{step.stage}</span>
                          {step.timestamp && (
                            <span className="text-[11px] font-bold text-farm-text-secondary">
                              {step.timestamp}
                            </span>
                          )}
                        </div>
                        <p className="text-farm-text-secondary font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex items-center justify-between shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenReceipt(transaction);
              }}
              className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
            >
              <Receipt className="w-4 h-4 text-farm-gold" />
              <span>View Demo Receipt</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
