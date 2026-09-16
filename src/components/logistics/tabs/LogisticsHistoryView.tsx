import { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  FileCheck2, 
  Eye, 
  RotateCcw,
  PackageCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsHistoryViewProps {
  deliveries: LogisticsDeliveryItem[];
  onViewDelivery: (delivery: LogisticsDeliveryItem) => void;
}

export const LogisticsHistoryView = ({
  deliveries,
  onViewDelivery,
}: LogisticsHistoryViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const completedDeliveries = useMemo(() => {
    return deliveries
      .filter((d) => d.status === 'Delivered')
      .filter((d) => {
        const query = searchQuery.toLowerCase();
        return (
          d.deliveryCode.toLowerCase().includes(query) ||
          d.produceName.toLowerCase().includes(query) ||
          d.pickupLocation.toLowerCase().includes(query) ||
          d.deliveryLocation.toLowerCase().includes(query) ||
          d.farmerName.toLowerCase().includes(query) ||
          d.buyerName.toLowerCase().includes(query)
        );
      });
  }, [deliveries, searchQuery]);

  const totalKg = deliveries
    .filter((d) => d.status === 'Delivered')
    .reduce((acc, d) => acc + d.quantity, 0);

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              Delivery History & POD Archive
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-white text-xs font-bold">
              {deliveries.filter((d) => d.status === 'Delivered').length} Closed
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-1">
            Archived agricultural consignments with electronic proof of delivery records
          </p>
        </div>
        <span className="text-[11px] font-bold text-farm-terracotta bg-farm-surface px-3 py-1.5 rounded-2xl border border-farm-border shrink-0 self-start sm:self-center">
          Illustrative Demo Data
        </span>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-farm-brand-soft border border-farm-brand/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0">
            <PackageCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-farm-brand block">Total Deliveries Closed</span>
            <strong className="text-lg font-display font-black text-farm-text">
              {deliveries.filter((d) => d.status === 'Delivered').length} Trips
            </strong>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-farm-surface border border-farm-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-farm-brand block">Cumulative Cargo Moved</span>
            <strong className="text-lg font-display font-black text-farm-text">
              {(totalKg / 1000).toFixed(2)} Metric Tonnes
            </strong>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-farm-surface border border-farm-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-farm-terracotta block">Average Transit Rating</span>
            <strong className="text-lg font-display font-black text-farm-text">
              99.2% On-Time
            </strong>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-farm-surface p-3.5 rounded-2xl border border-farm-border shadow-subtle flex items-center gap-2">
        <Search className="w-4 h-4 text-farm-text-secondary shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search history by delivery ID, crop, or location..."
          className="w-full bg-transparent text-xs text-farm-text focus:outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs text-farm-text-secondary hover:text-farm-text cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* History Items List */}
      {completedDeliveries.length === 0 ? (
        <div className="bg-farm-surface p-10 rounded-3xl border border-farm-border text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
            <History className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-farm-text">No completed deliveries to show yet.</h3>
          <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
            When you complete active trips and confirm proof of delivery, they will appear here in your archived ledger.
          </p>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3.5">
          {completedDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle hover:border-farm-brand transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-farm-border">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-sm text-farm-brand bg-farm-brand-soft px-2.5 py-0.5 rounded-xl">
                    {delivery.deliveryCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-farm-brand text-white border border-farm-brand">
                    Delivered & Verified
                  </span>
                  <span className="text-xs text-farm-text-secondary">
                    Completed: {delivery.completedDate || delivery.expectedDate}
                  </span>
                </div>

                <span className="text-xs font-bold text-farm-brand bg-farm-brand-soft px-2.5 py-1 rounded-xl">
                  {delivery.quantity.toLocaleString()} {delivery.unit}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 text-xs">
                <div>
                  <span className="text-farm-text-secondary block">Produce</span>
                  <strong className="font-bold text-farm-text">{delivery.produceName}</strong>
                </div>
                <div>
                  <span className="text-farm-text-secondary block">Origin</span>
                  <span className="text-farm-text font-medium truncate block">{delivery.pickupLocation}</span>
                </div>
                <div>
                  <span className="text-farm-text-secondary block">Destination</span>
                  <span className="text-farm-text font-medium truncate block">{delivery.deliveryLocation}</span>
                </div>
              </div>

              {delivery.podConfirmation && (
                <div className="p-3 bg-farm-brand-soft rounded-xl border border-farm-brand/20 text-xs mb-3 flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-farm-brand flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5" />
                    POD: {delivery.podConfirmation.method} ({delivery.podConfirmation.verifiedCode || 'VERIFIED'})
                  </span>
                  <span className="text-[11px] text-farm-text-secondary">
                    Received by: {delivery.podConfirmation.receivedBy || 'Buyer'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-farm-border">
                <span className="text-[11px] text-farm-text-secondary">
                  Order Ref: {delivery.orderCode} &bull; Approx {delivery.routeInfo.approxDistanceKm} km
                </span>
                <button
                  type="button"
                  onClick={() => onViewDelivery(delivery)}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text hover:bg-farm-surface-secondary border border-farm-border transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Summary
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
