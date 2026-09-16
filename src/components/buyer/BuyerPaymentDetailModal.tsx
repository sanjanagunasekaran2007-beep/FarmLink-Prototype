import { X, Wallet, ShieldCheck, AlertCircle } from 'lucide-react';
import { TransactionItem } from '@/types';

interface BuyerPaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionItem | null;
}

export const BuyerPaymentDetailModal = ({
  isOpen,
  onClose,
  transaction,
}: BuyerPaymentDetailModalProps) => {
  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-elevated overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg text-white">
                  {transaction.transactionCode}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand border border-farm-border">
                  {transaction.status}
                </span>
              </div>
              <p className="text-xs text-white/70">
                Order Ref: {transaction.orderId} &bull; {transaction.cropName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4 text-xs text-farm-text">
          {/* Amount Overview */}
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-farm-text-secondary block">
                Total Escrow Value
              </span>
              <span className="text-2xl font-display font-bold text-farm-brand">
                ₹{transaction.netAmount?.toLocaleString('en-IN') || transaction.grossAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-farm-text-secondary block">Date Processed</span>
              <span className="font-bold">{transaction.date}</span>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border space-y-2">
            <h3 className="font-bold text-farm-brand uppercase text-[11px] pb-1 border-b border-farm-border">
              Settlement Breakdown
            </h3>

            <div className="flex justify-between py-1">
              <span className="text-farm-text-secondary">Produce Cost ({transaction.quantity} {transaction.unit} @ ₹{transaction.unitPrice}/{transaction.unit})</span>
              <span className="font-bold font-mono">₹{transaction.grossAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between py-1 text-farm-text-secondary">
              <span>Mandi Platform Cess (1.5%)</span>
              <span className="font-mono">₹{transaction.platformFee?.toLocaleString('en-IN') || '0'}</span>
            </div>

            <div className="flex justify-between py-1 text-farm-text-secondary">
              <span>GST / Administrative Fee</span>
              <span className="font-mono">₹{transaction.taxOrCess?.toLocaleString('en-IN') || '0'}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-farm-border font-bold text-sm text-farm-brand">
              <span>Net Escrow Deposit</span>
              <span className="font-mono">₹{transaction.netAmount?.toLocaleString('en-IN') || transaction.grossAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Payment Method & Guarantee */}
          <div className="p-3.5 rounded-2xl bg-farm-brand-soft border border-farm-border flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-farm-brand shrink-0" />
            <div>
              <span className="font-bold text-farm-brand block">Protected Escrow Guarantee</span>
              <span className="text-[11px] text-farm-text-secondary leading-tight block">
                {transaction.paymentMethod}
              </span>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-farm-surface-secondary rounded-2xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-text-secondary">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
            <span>Demo payment information only. No real payment has been processed.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface-secondary border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
