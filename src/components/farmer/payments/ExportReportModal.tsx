import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, X, Download, Calendar, Info } from 'lucide-react';
import { TransactionItem } from '@/types';

interface ExportReportModalProps {
  isOpen: boolean;
  transactions: TransactionItem[];
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  transactions,
  onClose,
}) => {
  const [dateRange, setDateRange] = useState<'all' | 'this_month' | 'last_30_days' | 'last_90_days'>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (dateRange === 'this_month' || dateRange === 'last_30_days') {
      return transactions.filter((t) => t.date.includes('September 2026') || t.date.includes('Sep 2026'));
    }
    return transactions;
  }, [transactions, dateRange]);

  const totalSum = useMemo(() => {
    return filtered.reduce((acc, curr) => acc + curr.netAmount, 0);
  }, [filtered]);

  if (!isOpen) return null;

  const handleTriggerExport = () => {
    setExportNotice('Report preview ready. File export will be connected later.');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-3xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-border shrink-0">
                <FileSpreadsheet className="w-5 h-5 text-farm-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Export Financial Report
                </h3>
                <p className="text-xs text-farm-gold font-semibold">
                  Mandi Transaction Summary & Audit Log
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
          <div className="p-5 sm:p-7 space-y-5 overflow-y-auto flex-1">
            {/* Filter Selector & Summary Header */}
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-farm-text flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-farm-brand" /> Date Range:
                </span>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text focus:outline-hidden focus:border-farm-brand"
                >
                  <option value="all">All Available Records</option>
                  <option value="this_month">This Month (September 2026)</option>
                  <option value="last_30_days">Last 30 Days</option>
                  <option value="last_90_days">Last 90 Days</option>
                </select>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="p-2.5 rounded-xl bg-farm-brand-soft border border-farm-border-strong">
                  <span className="text-[10px] uppercase font-bold text-farm-brand block">Records</span>
                  <span className="font-display font-bold text-base text-farm-brand">{filtered.length} entries</span>
                </div>
                <div className="p-2.5 rounded-xl bg-farm-eucalyptus-soft border border-farm-info/40">
                  <span className="text-[10px] uppercase font-bold text-farm-info block">Total Sum</span>
                  <span className="font-display font-bold text-base text-farm-brand">₹{totalSum.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Export Notice Message */}
            {exportNotice ? (
              <div className="p-3.5 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 text-xs font-bold text-farm-gold flex items-center gap-2">
                <Info className="w-4 h-4 text-farm-gold shrink-0" />
                <span>{exportNotice}</span>
              </div>
            ) : null}

            {/* Preview Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-farm-brand block">
                Report Preview Table ({filtered.length} rows)
              </span>

              <div className="border border-farm-border rounded-2xl overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-farm-surface-secondary text-farm-text font-bold uppercase text-[10px] border-b border-farm-border">
                    <tr>
                      <th className="p-3">Txn ID</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Buyer</th>
                      <th className="p-3">Crop / Qty</th>
                      <th className="p-3 text-right">Amount</th>
                      <th className="p-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-farm-border bg-farm-surface">
                    {filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-farm-surface">
                        <td className="p-3 font-mono font-bold text-farm-brand">{item.transactionCode}</td>
                        <td className="p-3 font-medium text-farm-text-secondary">{item.date}</td>
                        <td className="p-3 font-bold text-farm-text">{item.buyerName}</td>
                        <td className="p-3 font-medium text-farm-text">{item.cropName} ({item.quantity} {item.unit})</td>
                        <td className="p-3 text-right font-display font-bold text-farm-text">₹{item.netAmount.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            item.status === 'Completed'
                              ? 'bg-farm-brand-soft text-farm-brand'
                              : item.status === 'Pending'
                              ? 'bg-farm-gold-soft text-farm-gold'
                              : item.status === 'Processing'
                              ? 'bg-farm-eucalyptus-soft text-farm-brand'
                              : 'bg-farm-terracotta-soft text-farm-text-secondary'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              onClick={handleTriggerExport}
              className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-subtle"
            >
              <Download className="w-4 h-4 text-farm-gold" />
              <span>Export CSV (Demo)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
