import React, { useState, useMemo } from 'react';
import { 
  Banknote, 
  Search, 
  Calendar, 
  SlidersHorizontal, 
  X, 
  CheckCircle2, 
  Clock, 
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import { TransactionItem, PaymentStatus } from '@/types';
import { TransactionDetailsModal } from '../payments/TransactionDetailsModal';
import { DemoReceiptModal } from '../payments/DemoReceiptModal';
import { ExportReportModal } from '../payments/ExportReportModal';

interface FarmerPaymentsViewProps {
  transactions: TransactionItem[];
  onNavigateOrders?: () => void;
}

type TabType = 'all' | 'completed' | 'pending' | 'processing' | 'failed';

export const FarmerPaymentsView: React.FC<FarmerPaymentsViewProps> = ({
  transactions,
  onNavigateOrders,
}) => {
  // Navigation & Filters
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'this_month' | 'last_30_days' | 'last_90_days'>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Modals
  const [selectedTransactionForDetails, setSelectedTransactionForDetails] = useState<TransactionItem | null>(null);
  const [selectedTransactionForReceipt, setSelectedTransactionForReceipt] = useState<TransactionItem | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Status Badge Helper
  const getStatusBadgeStyle = (status: PaymentStatus) => {
    switch (status) {
      case 'Completed':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Completed' };
      case 'Pending':
        return { bg: 'bg-farm-gold', text: 'text-farm-text', label: 'Pending' };
      case 'Processing':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Processing' };
      case 'Failed':
      default:
        return { bg: 'bg-farm-surface-secondary', text: 'text-white', label: 'Failed' };
    }
  };

  // Metrics Calculation
  const summary = useMemo(() => {
    const totalEarnings = transactions
      .filter((t) => t.status === 'Completed')
      .reduce((acc, curr) => acc + curr.netAmount, 0);

    const completedSum = totalEarnings;

    const pendingSum = transactions
      .filter((t) => t.status === 'Pending' || t.status === 'Processing')
      .reduce((acc, curr) => acc + curr.netAmount, 0);

    const thisMonthSum = transactions
      .filter((t) => (t.date.includes('September 2026') || t.date.includes('Sep 2026')) && t.status === 'Completed')
      .reduce((acc, curr) => acc + curr.netAmount, 0);

    const countAll = transactions.length;
    const countCompleted = transactions.filter((t) => t.status === 'Completed').length;
    const countPending = transactions.filter((t) => t.status === 'Pending').length;
    const countProcessing = transactions.filter((t) => t.status === 'Processing').length;
    const countFailed = transactions.filter((t) => t.status === 'Failed').length;

    return {
      totalEarnings,
      completedSum,
      pendingSum,
      thisMonthSum,
      countAll,
      countCompleted,
      countPending,
      countProcessing,
      countFailed,
    };
  }, [transactions]);

  // Filtered Transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      // 1. Tab filter
      if (activeTab === 'completed' && item.status !== 'Completed') return false;
      if (activeTab === 'pending' && item.status !== 'Pending') return false;
      if (activeTab === 'processing' && item.status !== 'Processing') return false;
      if (activeTab === 'failed' && item.status !== 'Failed') return false;

      // 2. Date filter
      if (dateFilter === 'this_month' || dateFilter === 'last_30_days') {
        if (!item.date.includes('September 2026') && !item.date.includes('Sep 2026')) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const txnMatch = item.transactionCode.toLowerCase().includes(query);
        const orderMatch = item.orderId.toLowerCase().includes(query);
        const buyerMatch = item.buyerName.toLowerCase().includes(query);
        const cropMatch = item.cropName.toLowerCase().includes(query);
        if (!txnMatch && !orderMatch && !buyerMatch && !cropMatch) return false;
      }

      return true;
    });
  }, [transactions, activeTab, dateFilter, searchQuery]);

  return (
    <div className="space-y-6 select-none">
      {/* 1. PAGE HEADER */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-7 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold uppercase tracking-wider">
                <Banknote className="w-3.5 h-3.5 text-farm-brand" />
                <span>Mandi Settlement Ledger</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-farm-gold-soft text-farm-gold text-[10px] font-bold border border-farm-gold/40">
                Demo financial data — no real payments are processed.
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text tracking-tight">
              Payments & Transactions
            </h1>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-0.5">
              Track your earnings and view your transaction history.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setIsExportOpen(true)}
              className="px-5 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-brand hover:bg-farm-brand-soft active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-subtle"
              id="export-report-btn"
            >
              <FileSpreadsheet className="w-4 h-4 text-farm-brand" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Search & Date Filter Controls */}
        <div className="pt-3 border-t border-farm-border flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by transaction ID, order ID, or buyer"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs sm:text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand focus:bg-farm-surface transition-all"
              id="txn-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-text-secondary hover:text-farm-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Date Range Selector */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-farm-text-secondary">Date:</span>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text focus:outline-hidden focus:border-farm-brand"
            >
              <option value="all">All Dates</option>
              <option value="this_month">This Month (Sep 2026)</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
            </select>
          </div>

          {/* Mobile Filter Button */}
          <div className="sm:hidden flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text flex items-center justify-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-farm-brand" />
              <span>Filter Dates {dateFilter !== 'all' ? `(${dateFilter})` : ''}</span>
            </button>
            {dateFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setDateFilter('all')}
                className="px-3 py-2.5 rounded-xl bg-farm-terracotta-soft text-farm-terracotta text-xs font-bold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Mobile Date Sheet */}
        {isMobileFiltersOpen && (
          <div className="sm:hidden p-3 rounded-2xl bg-farm-surface border border-farm-border space-y-2">
            <div className="text-xs font-bold text-farm-text flex items-center justify-between">
              <span>Select Date Filter</span>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-[11px] text-farm-text-secondary font-bold"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'All Dates' },
                { id: 'this_month', label: 'This Month' },
                { id: 'last_30_days', label: 'Last 30 Days' },
                { id: 'last_90_days', label: 'Last 90 Days' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setDateFilter(item.id as any);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold ${
                    dateFilter === item.id
                      ? 'bg-farm-brand text-white'
                      : 'bg-farm-surface text-farm-text border border-farm-border'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. PAYMENT SUMMARY (SOLID COLOUR ACCENTS: Deep Forest, Deep Teal, Mustard Gold, Terracotta) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Total Earnings (Deep Forest #164A36) */}
        <div 
          onClick={() => setActiveTab('completed')}
          className="p-4 rounded-3xl bg-farm-brand-soft border border-farm-border-strong flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Banknote className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              ₹{summary.totalEarnings.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-farm-brand">
              Total Earnings (Demo)
            </div>
          </div>
        </div>

        {/* 2. Completed Payments (Deep Teal #245B5A) */}
        <div 
          onClick={() => setActiveTab('completed')}
          className="p-4 rounded-3xl bg-farm-eucalyptus-soft border border-farm-info/40 flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              ₹{summary.completedSum.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-farm-info">
              Completed Payments
            </div>
          </div>
        </div>

        {/* 3. Pending Payments (Mustard Gold #D9A441) */}
        <div 
          onClick={() => setActiveTab('pending')}
          className="p-4 rounded-3xl bg-farm-gold-soft border border-farm-gold/40 flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-gold transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle">
            <Clock className="w-5 h-5 text-farm-text" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-gold">
              ₹{summary.pendingSum.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-farm-gold">
              Pending Payments
            </div>
          </div>
        </div>

        {/* 4. This Month's Earnings (Terracotta #C66B45) */}
        <div 
          onClick={() => setDateFilter('this_month')}
          className="p-4 rounded-3xl bg-farm-terracotta-soft border border-farm-terracotta/40 flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-terracotta transition-all"
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-terracotta">
              ₹{summary.thisMonthSum.toLocaleString()}
            </div>
            <div className="text-xs font-bold text-farm-terracotta">
              This Month
            </div>
          </div>
        </div>
      </div>

      {/* 3. PAYMENT STATUS TABS */}
      <div className="bg-farm-surface p-2 rounded-2xl border border-farm-border shadow-card flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as TabType, label: 'All', count: summary.countAll },
          { id: 'completed' as TabType, label: 'Completed', count: summary.countCompleted },
          { id: 'pending' as TabType, label: 'Pending', count: summary.countPending },
          { id: 'processing' as TabType, label: 'Processing', count: summary.countProcessing },
          { id: 'failed' as TabType, label: 'Failed', count: summary.countFailed },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-farm-brand text-white shadow-subtle'
                  : 'text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary'
              }`}
              id={`payment-tab-${tab.id}`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-farm-gold text-farm-text' : 'bg-farm-surface-secondary text-farm-text-secondary'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. TRANSACTION LIST */}
      {filteredTransactions.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-farm-surface-secondary text-farm-text font-bold uppercase text-[10px] border-b border-farm-border">
                <tr>
                  <th className="p-4">Txn ID / Order</th>
                  <th className="p-4">Buyer Organization</th>
                  <th className="p-4">Produce Details</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Method</th>
                  <th className="p-4 text-right">Amount</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-farm-border">
                {filteredTransactions.map((item) => {
                  const badge = getStatusBadgeStyle(item.status);

                  return (
                    <tr key={item.id} className="hover:bg-farm-surface transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-farm-brand block">{item.transactionCode}</span>
                        <span className="text-[11px] font-mono text-farm-text-secondary">{item.orderId}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-farm-text block">{item.buyerName}</span>
                        <span className="text-[11px] text-farm-text-secondary">{item.buyerType}</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-farm-text block">{item.cropName}</span>
                        <span className="text-[11px] text-farm-text-secondary">{item.quantity} {item.unit}</span>
                      </td>

                      <td className="p-4 font-medium text-farm-text-secondary">
                        {item.date}
                      </td>

                      <td className="p-4 font-medium text-farm-text">
                        {item.paymentMethod}
                      </td>

                      <td className="p-4 text-right">
                        <span className="font-display font-bold text-sm text-farm-brand">
                          ₹{item.netAmount.toLocaleString()}
                        </span>
                      </td>

                      <td className="p-4 text-center">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedTransactionForDetails(item)}
                            className="px-3 py-1.5 rounded-xl bg-farm-surface border border-farm-border text-farm-brand text-xs font-bold hover:bg-farm-brand-soft transition-all cursor-pointer"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedTransactionForReceipt(item)}
                            className="px-3 py-1.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-all cursor-pointer shadow-subtle"
                          >
                            Receipt
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="md:hidden space-y-4">
            {filteredTransactions.map((item) => {
              const badge = getStatusBadgeStyle(item.status);

              return (
                <div
                  key={item.id}
                  className="bg-farm-surface rounded-3xl border border-farm-border p-5 shadow-card space-y-3"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-farm-border">
                    <div>
                      <span className="font-mono text-xs font-bold text-farm-brand block">{item.transactionCode}</span>
                      <span className="font-mono text-[10px] text-farm-text-secondary">Order: {item.orderId}</span>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display font-bold text-base text-farm-text">{item.cropName}</h4>
                      <p className="text-xs text-farm-text-secondary font-semibold">{item.quantity} {item.unit} &bull; Buyer: {item.buyerName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-display font-bold text-farm-brand">
                        ₹{item.netAmount.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-farm-text-secondary font-semibold">{item.paymentMethod}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-farm-text-secondary pt-1">
                    <span>Date: {item.date}</span>
                  </div>

                  <div className="pt-2 border-t border-farm-border grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTransactionForDetails(item)}
                      className="px-3 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-brand text-xs font-bold hover:bg-farm-brand-soft active:scale-95 transition-all text-center cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTransactionForReceipt(item)}
                      className="px-3 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all text-center cursor-pointer shadow-subtle"
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* 8. EMPTY & ERROR STATES */
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-8 sm:p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-farm-surface-secondary border border-farm-border flex items-center justify-center mx-auto text-farm-brand">
            {searchQuery ? (
              <Search className="w-8 h-8 text-farm-text-secondary" />
            ) : (
              <Banknote className="w-8 h-8 text-farm-brand" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-farm-text">
              {searchQuery
                ? 'No matching transactions found'
                : activeTab === 'all'
                ? 'Your payment activity will appear here.'
                : `No ${activeTab} transactions found`}
            </h3>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-1">
              {searchQuery
                ? `No transactions match "${searchQuery}". Try searching by transaction code (e.g. FL-TXN-001) or buyer name.`
                : 'Confirmed buyer payments and escrow payouts for your completed harvests will be logged here.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setDateFilter('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand cursor-pointer"
              >
                Clear Search
              </button>
            ) : onNavigateOrders ? (
              <button
                type="button"
                onClick={onNavigateOrders}
                className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-bold hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-farm-gold" />
                <span>Go to Orders & Delivery</span>
              </button>
            ) : null}
          </div>
        </div>
      )}

      {/* 5. TRANSACTION DETAILS MODAL */}
      <TransactionDetailsModal
        isOpen={!!selectedTransactionForDetails}
        transaction={selectedTransactionForDetails}
        onClose={() => setSelectedTransactionForDetails(null)}
        onOpenReceipt={(txn) => {
          setSelectedTransactionForDetails(null);
          setSelectedTransactionForReceipt(txn);
        }}
      />

      {/* 6. DEMO RECEIPT MODAL */}
      <DemoReceiptModal
        isOpen={!!selectedTransactionForReceipt}
        transaction={selectedTransactionForReceipt}
        onClose={() => setSelectedTransactionForReceipt(null)}
      />

      {/* 7. EXPORT REPORT MODAL */}
      <ExportReportModal
        isOpen={isExportOpen}
        transactions={transactions}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
};
