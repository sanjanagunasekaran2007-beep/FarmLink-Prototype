import { 
  Truck, 
  Clock, 
  ChevronRight, 
  Bot, 
  Sparkles, 
  Route, 
  History, 
  Eye
} from 'lucide-react';
import { LogisticsDeliveryItem, LogisticsTab } from '@/types';
import { LogisticsSummaryCards } from '../LogisticsSummaryCards';

interface LogisticsDashboardViewProps {
  deliveries: LogisticsDeliveryItem[];
  onNavigateTab: (tab: LogisticsTab) => void;
  onViewDelivery: (delivery: LogisticsDeliveryItem) => void;
  onOpenStatusUpdate: (delivery: LogisticsDeliveryItem) => void;
  onOpenRouteSummary: (delivery: LogisticsDeliveryItem) => void;
  onOpenAIWithQuestion: (question: string) => void;
}

export const LogisticsDashboardView = ({
  deliveries,
  onNavigateTab,
  onViewDelivery,
  onOpenStatusUpdate,
  onOpenRouteSummary,
  onOpenAIWithQuestion,
}: LogisticsDashboardViewProps) => {
  const activeDeliveries = deliveries.filter((d) => d.status !== 'Delivered' && d.status !== 'Cancelled');
  const todayDeliveries = deliveries.slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'bg-farm-surface text-farm-terracotta border-farm-gold';
      case 'Pickup Pending':
        return 'bg-farm-surface text-farm-terracotta border-farm-terracotta';
      case 'Picked Up':
        return 'bg-farm-eucalyptus-soft text-farm-brand border-farm-info';
      case 'In Transit':
        return 'bg-farm-brand text-white border-farm-brand';
      case 'Delivered':
        return 'bg-farm-brand text-white border-farm-brand';
      default:
        return 'bg-farm-surface-secondary text-farm-text border-farm-border';
    }
  };

  const aiQuestions = [
    'How do I update delivery status?',
    'How do I complete a proof of delivery?',
    'What do the route distance values mean?',
    'How do I contact the farmer or buyer?',
  ];

  return (
    <div className="space-y-6 select-none pb-8">
      {/* 1. Summary Statistics */}
      <LogisticsSummaryCards
        deliveries={deliveries}
        onNavigateTab={onNavigateTab}
      />

      {/* 2. Quick Actions Bar */}
      <div className="bg-farm-surface p-4 sm:p-5 rounded-3xl border border-farm-border shadow-subtle">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-farm-text-secondary">
            Logistics Quick Actions
          </h2>
          <span className="text-[11px] text-farm-text-secondary">Direct Shortcuts</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('deliveries')}
            className="p-3 rounded-2xl bg-farm-surface border border-farm-border hover:bg-farm-brand hover:text-white hover:border-farm-brand text-farm-text text-xs font-bold flex items-center gap-2 transition-all cursor-pointer group"
          >
            <Truck className="w-4 h-4 text-farm-brand group-hover:text-white" />
            <span className="truncate">View Deliveries</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const pending = activeDeliveries[0] || deliveries[0];
              if (pending) onOpenStatusUpdate(pending);
            }}
            className="p-3 rounded-2xl bg-farm-surface border border-farm-border hover:bg-farm-brand hover:text-white hover:border-farm-brand text-farm-text text-xs font-bold flex items-center gap-2 transition-all cursor-pointer group"
          >
            <Clock className="w-4 h-4 text-farm-terracotta group-hover:text-white" />
            <span className="truncate">Update Status</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('route')}
            className="p-3 rounded-2xl bg-farm-surface border border-farm-border hover:bg-farm-brand hover:text-white hover:border-farm-brand text-farm-text text-xs font-bold flex items-center gap-2 transition-all cursor-pointer group"
          >
            <Route className="w-4 h-4 text-farm-brand group-hover:text-white" />
            <span className="truncate">Route Summary</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('history')}
            className="p-3 rounded-2xl bg-farm-surface border border-farm-border hover:bg-farm-brand hover:text-white hover:border-farm-brand text-farm-text text-xs font-bold flex items-center gap-2 transition-all cursor-pointer group"
          >
            <History className="w-4 h-4 text-farm-terracotta group-hover:text-white" />
            <span className="truncate">Delivery History</span>
          </button>
        </div>
      </div>

      {/* 3. Today's Delivery Schedule */}
      <div className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-farm-border">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                Today&apos;s Delivery Schedule
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-surface text-farm-terracotta border border-farm-border">
                Illustrative demo data
              </span>
            </div>
            <p className="text-xs text-farm-text-secondary mt-0.5">
              Scheduled agricultural consignments for fleet vehicle TN-23-AX-8942
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('deliveries')}
            className="inline-flex items-center gap-1 text-xs font-bold text-farm-brand hover:underline cursor-pointer"
          >
            View all ({deliveries.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {todayDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="p-4 rounded-2xl bg-farm-surface border border-farm-border hover:border-farm-brand transition-all shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-farm-brand-soft text-farm-brand flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono font-bold text-xs text-farm-brand">
                      {delivery.deliveryCode}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(delivery.status)}`}>
                      {delivery.status}
                    </span>
                    <span className="text-xs font-bold text-farm-text">
                      &bull; {delivery.produceName} ({delivery.quantity} {delivery.unit})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-farm-text-secondary">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-farm-terracotta">Pickup:</span>
                      <span className="truncate">{delivery.pickupLocation}</span>
                      <span className="text-farm-text font-mono shrink-0">({delivery.pickupTime})</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-bold text-farm-brand">Drop-off:</span>
                      <span className="truncate">{delivery.deliveryLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={() => onViewDelivery(delivery)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text hover:bg-farm-surface-secondary border border-farm-border transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Details
                </button>
                {delivery.status !== 'Delivered' && (
                  <button
                    type="button"
                    onClick={() => onOpenStatusUpdate(delivery)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer shadow-subtle"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Update
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onOpenRouteSummary(delivery)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-brand hover:bg-farm-brand-soft border border-farm-border transition-all cursor-pointer"
                >
                  <Route className="w-3.5 h-3.5" />
                  Route
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active Corridor & Route Spotlight */}
      {activeDeliveries.length > 0 && (
        <div className="bg-farm-brand text-white p-5 sm:p-6 rounded-3xl border border-farm-brand shadow-card">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-wider font-bold text-farm-gold bg-farm-surface/10 px-2.5 py-0.5 rounded-full">
              Live Highway Dispatch Spotlight
            </span>
            <span className="text-xs text-farm-text-secondary">
              {activeDeliveries[0].routeInfo.highwayCorridor}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                {activeDeliveries[0].deliveryCode}: {activeDeliveries[0].produceName}
              </h3>
              <p className="text-xs text-farm-text-secondary mt-1 flex items-center gap-2 flex-wrap">
                <span>Origin: {activeDeliveries[0].pickupLocation}</span>
                <span>&rarr;</span>
                <span>Destination: {activeDeliveries[0].deliveryLocation}</span>
              </p>
              <div className="flex items-center gap-3 mt-3 text-xs">
                <span className="bg-farm-surface/15 px-2.5 py-1 rounded-xl font-bold">
                  Distance: {activeDeliveries[0].routeInfo.approxDistanceKm} km (Demo)
                </span>
                <span className="bg-farm-surface/15 px-2.5 py-1 rounded-xl font-bold">
                  Est. Time: {activeDeliveries[0].routeInfo.estimatedTravelTime}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => onOpenRouteSummary(activeDeliveries[0])}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-brand hover:bg-farm-surface-secondary transition-all cursor-pointer shadow-subtle"
              >
                Inspect Waypoints
              </button>
              <button
                type="button"
                onClick={() => onOpenStatusUpdate(activeDeliveries[0])}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-gold text-farm-text hover:bg-farm-gold/90 transition-all cursor-pointer"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. FarmLink AI for Logistics Section */}
      <div className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-farm-brand text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-farm-text">
                FarmLink AI Logistics Guide
              </h3>
              <p className="text-xs text-farm-text-secondary">
                Instant answers on dispatch rules, POD validation, and route guidelines
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold bg-farm-brand-soft text-farm-brand px-2.5 py-0.5 rounded-full">
            Assistant Ready
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-farm-border">
          {aiQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onOpenAIWithQuestion(q)}
              className="inline-flex items-center gap-1.5 text-xs font-medium bg-farm-surface text-farm-text border border-farm-border px-3 py-1.5 rounded-xl hover:bg-farm-brand hover:text-white hover:border-farm-brand active:scale-95 transition-all text-left cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-farm-gold" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
