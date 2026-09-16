import { useState } from 'react';
import { Wallet, ShieldCheck, Eye, AlertCircle } from 'lucide-react';
import { TransactionItem } from '@/types';
import { BuyerPaymentDetailModal } from '../BuyerPaymentDetailModal';

interface BuyerPaymentsViewProps {
  transactions: TransactionItem[];
}

export const BuyerPaymentsView = ({ transactions }: BuyerPaymentsViewProps) => {
  const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);

  const totalSpent = transactions.reduce((acc, curr) => acc + (curr.netAmount || curr.grossAmount), 0);

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              Buyer Payments & Escrow Ledger
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-white text-xs font-bold">
              {transactions.length} Transactions
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-0.5">
            Transparent tripartite escrow deposits, mandi fee records, and release logs
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-farm-text-secondary bg-farm-surface px-3 py-1 rounded-xl border border-farm-border">
            Demo Payment Data
          </span>
        </div>
      </div>

      {/* Financial Overview Stat Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-5 rounded-3xl bg-farm-brand text-white border border-farm-brand shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-farm-gold tracking-wider">
            Total Escrow Volume
          </span>
          <div className="text-2xl sm:text-3xl font-display font-bold">
            ₹{totalSpent.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-white/70">
            Across {transactions.length} settled procurement lots
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-farm-surface border border-farm-border shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-farm-text-secondary tracking-wider">
            Escrow Protection
          </span>
          <div className="text-lg font-bold text-farm-brand flex items-center gap-1.5 mt-1">
            <ShieldCheck className="w-5 h-5 text-farm-brand" />
            <span>100% Protected</span>
          </div>
          <p className="text-[11px] text-farm-text-secondary">
            Held in independent tripartite bank account
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-farm-surface border border-farm-border shadow-card space-y-1">
          <span className="text-[10px] font-bold uppercase text-farm-text-secondary tracking-wider">
            Settlement Method
          </span>
          <div className="text-lg font-bold text-farm-text mt-1">
            Direct Bank Transfer
          </div>
          <p className="text-[11px] text-farm-text-secondary">
            Automatic release upon delivery acknowledgement
          </p>
        </div>
      </div>

      {/* Transactions Table / List */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-farm-border flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-farm-brand">
            Escrow Transaction History
          </h3>
          <span className="text-xs text-farm-text-secondary">Demo Audit Records</span>
        </div>

        <div className="divide-y divide-farm-border">
          {transactions.map((txn) => (
            <div
              key={txn.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-farm-surface/60 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-farm-brand-soft text-farm-brand flex items-center justify-center font-bold shrink-0 border border-farm-border">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-farm-text">{txn.cropName}</span>
                    <span className="text-[10px] font-mono text-farm-text-secondary bg-farm-surface-secondary px-2 py-0.5 rounded-md border border-farm-border">
                      {txn.transactionCode}
                    </span>
                  </div>
                  <p className="text-xs text-farm-text-secondary">
                    Order: <span className="font-mono">{txn.orderId}</span> &bull; {txn.quantity} {txn.unit} &bull; {txn.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <div className="text-left sm:text-right">
                  <span className="text-sm font-display font-bold text-farm-brand block">
                    ₹{(txn.netAmount || txn.grossAmount).toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-full border border-farm-border">
                    {txn.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTxn(txn)}
                  className="px-3.5 py-2 rounded-xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Breakdown</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-4 bg-farm-surface-secondary rounded-3xl border border-farm-border flex items-center gap-2.5 text-xs text-farm-text-secondary">
        <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
        <span>Demo payment information only. No real payment has been processed.</span>
      </div>

      {/* Detail Modal */}
      <BuyerPaymentDetailModal
        isOpen={!!selectedTxn}
        onClose={() => setSelectedTxn(null)}
        transaction={selectedTxn}
      />
    </div>
  );
};
