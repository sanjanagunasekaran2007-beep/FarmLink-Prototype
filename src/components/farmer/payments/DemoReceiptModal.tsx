import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Receipt, X, Printer, ShieldCheck, CheckCircle2, Sprout } from 'lucide-react';
import { TransactionItem } from '@/types';

interface DemoReceiptModalProps {
  isOpen: boolean;
  transaction: TransactionItem | null;
  onClose: () => void;
}

export const DemoReceiptModal: React.FC<DemoReceiptModalProps> = ({
  isOpen,
  transaction,
  onClose,
}) => {
  const [printFeedback, setPrintFeedback] = useState<string | null>(null);

  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    setPrintFeedback('Receipt printable preview formatted. Browser print dialog triggered.');
    setTimeout(() => {
      window.print();
    }, 300);
    setTimeout(() => setPrintFeedback(null), 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-border shrink-0">
                <Receipt className="w-5 h-5 text-farm-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Demo Settlement Receipt
                </h3>
                <p className="text-xs text-farm-gold font-mono">
                  Txn: {transaction.transactionCode}
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

          {/* Feedback message */}
          {printFeedback && (
            <div className="bg-farm-brand-soft text-farm-brand p-3 text-xs font-bold flex items-center gap-2 border-b border-farm-border-strong">
              <CheckCircle2 className="w-4 h-4 text-farm-brand shrink-0" />
              <span>{printFeedback}</span>
            </div>
          )}

          {/* Receipt Printable Canvas */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 bg-farm-surface">
            {/* Top Brand Banner */}
            <div className="border-b-2 border-dashed border-farm-border pb-5 text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-farm-brand font-display font-extrabold text-xl">
                <div className="w-7 h-7 rounded-lg bg-farm-brand text-white flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-farm-gold" />
                </div>
                <span>FarmLink Mandi Network</span>
              </div>
              <p className="text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider">
                Official Digital Trade Payout Voucher
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-farm-gold-soft text-farm-gold text-[10px] font-bold border border-farm-gold/40 mt-1">
                Demo Mandi Escrow Record
              </span>
            </div>

            {/* Receipt Summary Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-farm-text-secondary block font-semibold">Farmer / Seller:</span>
                <span className="font-bold text-farm-text text-sm">Sanjana Devi</span>
                <span className="text-[11px] text-farm-text-secondary block">Dindigul, Tamil Nadu</span>
              </div>

              <div>
                <span className="text-farm-text-secondary block font-semibold">Buyer / Counterparty:</span>
                <span className="font-bold text-farm-text text-sm">{transaction.buyerName}</span>
                <span className="text-[11px] text-farm-text-secondary block">{transaction.buyerType || 'Verified Buyer'}</span>
              </div>

              <div>
                <span className="text-farm-text-secondary block font-semibold">Order Reference:</span>
                <span className="font-mono font-bold text-farm-brand">{transaction.orderId}</span>
              </div>

              <div>
                <span className="text-farm-text-secondary block font-semibold">Harvest Lot ID:</span>
                <span className="font-mono font-bold text-farm-terracotta">{transaction.harvestId || 'FL-LOT-DEFAULT'}</span>
              </div>

              <div>
                <span className="text-farm-text-secondary block font-semibold">Settlement Date:</span>
                <span className="font-bold text-farm-text">{transaction.date}</span>
              </div>

              <div>
                <span className="text-farm-text-secondary block font-semibold">Payment Method:</span>
                <span className="font-bold text-farm-text">{transaction.paymentMethod}</span>
              </div>
            </div>

            {/* Produce Breakdown Table */}
            <div className="border border-farm-border rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-farm-surface-secondary text-farm-text font-bold uppercase text-[10px] border-b border-farm-border">
                  <tr>
                    <th className="p-3">Produce Item</th>
                    <th className="p-3 text-center">Quantity</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-farm-border">
                  <tr>
                    <td className="p-3">
                      <span className="font-bold text-farm-text block">{transaction.cropName}</span>
                      {transaction.variety && (
                        <span className="text-[11px] text-farm-text-secondary">{transaction.variety}</span>
                      )}
                    </td>
                    <td className="p-3 text-center font-semibold text-farm-text">
                      {transaction.quantity} {transaction.unit}
                    </td>
                    <td className="p-3 text-right font-semibold text-farm-text">
                      ₹{transaction.unitPrice}/{transaction.unit === 'Quintals' ? 'kg' : transaction.unit}
                    </td>
                    <td className="p-3 text-right font-bold text-farm-text">
                      ₹{transaction.grossAmount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Net Settlement Breakdown */}
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border space-y-2 text-xs">
              <div className="flex items-center justify-between text-farm-text-secondary">
                <span>Gross Value</span>
                <span className="font-bold text-farm-text">₹{transaction.grossAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-farm-text-secondary">
                <span>Mandi Platform Charges (0% Promo)</span>
                <span className="font-bold text-farm-brand">₹0</span>
              </div>
              <div className="pt-2 border-t border-farm-border flex items-center justify-between text-sm">
                <span className="font-bold text-farm-text">Net Farmer Payout</span>
                <span className="font-display font-bold text-lg text-farm-brand">
                  ₹{transaction.netAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Escrow Seal Box */}
            <div className="p-3.5 rounded-2xl bg-farm-brand-soft border border-farm-border-strong flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-farm-brand shrink-0" />
                <div>
                  <span className="font-bold text-xs text-farm-brand block">Verified Mandi Escrow Payout</span>
                  <span className="text-[10px] text-farm-brand">Digital settlement seal authenticated</span>
                </div>
              </div>
              <span className="font-mono text-[10px] font-bold text-farm-brand bg-farm-surface px-2 py-0.5 rounded-md border border-farm-border-strong">
                {transaction.status}
              </span>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="text-center pt-2">
              <p className="text-[11px] font-bold text-farm-text-secondary italic">
                This is a sample receipt for demonstration purposes.
              </p>
            </div>
          </div>

          {/* Action Footer */}
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
              onClick={handlePrint}
              className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-subtle"
            >
              <Printer className="w-4 h-4 text-farm-gold" />
              <span>Print / Save as PDF (Demo)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
