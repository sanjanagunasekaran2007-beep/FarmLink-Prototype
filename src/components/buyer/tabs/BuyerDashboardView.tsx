import { Sparkles, ArrowRight, Store, MapPin, Send, Bookmark, CheckCircle2, Truck } from 'lucide-react';
import { BuyerTab, HarvestItem, BuyerInterestRequest, OrderDeliveryItem } from '@/types';
import { BuyerSummarySection } from '../BuyerSummarySection';
import { BuyerQuickActionsSection } from '../BuyerQuickActionsSection';

interface BuyerDashboardViewProps {
  harvests: HarvestItem[];
  savedHarvestCodes: string[];
  requests: BuyerInterestRequest[];
  orders: OrderDeliveryItem[];
  onNavigateTab: (tab: BuyerTab) => void;
  onViewHarvest: (harvest: HarvestItem) => void;
  onToggleSave: (harvestCode: string) => void;
  onExpressInterest: (harvest: HarvestItem) => void;
  onOpenAI: (prompt?: string) => void;
}

export const BuyerDashboardView = ({
  harvests,
  savedHarvestCodes,
  requests,
  orders,
  onNavigateTab,
  onViewHarvest,
  onToggleSave,
  onExpressInterest,
  onOpenAI,
}: BuyerDashboardViewProps) => {
  const featuredHarvests = harvests.slice(0, 4);
  const activeOrders = orders.filter((o) => o.status === 'In Transit' || o.status === 'Ready for Pickup' || o.status === 'Confirmed');

  return (
    <div className="space-y-6 select-none">
      {/* 1. SOLID TERRACOTTA / DEEP TEAL BUYER HERO BANNER */}
      <div className="bg-farm-terracotta text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 border border-farm-border">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-surface-secondary text-white text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-farm-text-secondary" />
            <span>Direct Farmgate Procurement</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white">
            Source quality crops directly from verified growers
          </h1>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            Browse live harvests across Tamil Nadu & Karnataka. Guaranteed quality grading, scheduled farmgate collection, and escrow-backed settlements.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => onNavigateTab('browse')}
            className="px-6 py-4 rounded-2xl bg-farm-surface text-farm-text font-display font-bold text-sm sm:text-base hover:bg-farm-surface active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-terracotta/40"
            id="buyer-hero-browse-btn"
          >
            <Store className="w-5 h-5 text-farm-terracotta" />
            <span>Browse Harvests</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY OVERVIEW CARDS */}
      <BuyerSummarySection
        availableCount={harvests.length}
        savedCount={savedHarvestCodes.length}
        requestsCount={requests.length}
        ordersCount={orders.length}
        onNavigateTab={onNavigateTab}
      />

      {/* 3. QUICK ACTIONS BAR */}
      <BuyerQuickActionsSection
        onNavigateTab={onNavigateTab}
        onOpenAI={() => onOpenAI('How do I find a harvest and submit a purchase request?')}
      />

      {/* 4. FEATURED HARVEST LISTINGS SECTION */}
      <section aria-label="Featured Harvests" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-display font-bold text-farm-brand">
              Available Farmgate Harvests
            </h2>
            <p className="text-xs text-farm-text-secondary">
              Freshly listed lots ready for procurement dispatch
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('browse')}
            className="text-xs font-bold text-farm-terracotta hover:text-farm-brand flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({harvests.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredHarvests.map((item) => {
            const isSaved = savedHarvestCodes.includes(item.harvestCode || item.id);

            return (
              <div
                key={item.id}
                className="bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden flex flex-col justify-between hover:border-farm-brand transition-all"
              >
                {/* Crop Image / Banner */}
                <div className="relative h-36 bg-farm-surface-secondary overflow-hidden">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.cropName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-farm-surface text-farm-brand font-display font-bold text-2xl">
                      {item.cropName}
                    </div>
                  )}

                  <span className="absolute top-2.5 left-2.5 bg-farm-brand/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                    {item.grade || 'Grade A'}
                  </span>

                  <button
                    type="button"
                    onClick={() => onToggleSave(item.harvestCode || item.id)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-subtle ${
                      isSaved
                        ? 'bg-farm-gold text-farm-text'
                        : 'bg-farm-surface/90 text-farm-text-secondary hover:text-farm-terracotta'
                    }`}
                    title={isSaved ? 'Remove from saved' : 'Save harvest'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-display font-bold text-base text-farm-text">
                        {item.cropName}
                      </h3>
                      <span className="text-[10px] text-farm-text-secondary font-mono">
                        {item.harvestCode || item.id}
                      </span>
                    </div>

                    <p className="text-xs text-farm-text-secondary truncate">
                      {item.variety || item.category} &bull; {item.farmingMethod || 'Conventional'}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-farm-text-secondary mt-1">
                      <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                      <span className="truncate">{item.district || 'Tiruvallur'}, {item.state || 'TN'}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="p-2.5 bg-farm-surface rounded-2xl border border-farm-border flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-farm-text-secondary block">Available</span>
                      <span className="text-xs font-bold text-farm-text">
                        {item.quantity} {item.unit}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold uppercase text-farm-brand block">Expected Price</span>
                      <span className="text-xs font-bold text-farm-brand">
                        ₹{item.expectedPrice}/{item.unit === 'Quintals' ? 'kg' : 'kg'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onViewHarvest(item)}
                      className="flex-1 py-2 rounded-xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border cursor-pointer"
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onExpressInterest(item)}
                      className="px-3 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover flex items-center gap-1 cursor-pointer border border-farm-brand"
                    >
                      <Send className="w-3 h-3 text-farm-gold" />
                      <span>Interest</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ACTIVE ORDERS & DISPATCHES SECTION */}
      {activeOrders.length > 0 && (
        <section aria-label="Active Dispatches" className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-display font-bold text-farm-brand">
                Active Dispatches & Escrow
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Track incoming shipments and delivery confirmations
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-farm-brand hover:text-farm-brand flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-5 rounded-3xl bg-farm-surface border border-farm-border shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-farm-surface text-farm-brand flex items-center justify-center border border-farm-border">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-farm-text">
                        {ord.cropName} ({ord.quantity} {ord.unit})
                      </h3>
                      <p className="text-[11px] text-farm-text-secondary">
                        Order Ref: {ord.orderCode} &bull; ₹{ord.totalAmount?.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-farm-gold text-[10px] font-bold border border-farm-brand">
                    {ord.status}
                  </span>
                </div>

                {ord.logisticsProvider && (
                  <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border text-xs text-farm-text flex items-center justify-between">
                    <div>
                      <span className="text-farm-text-secondary text-[10px] uppercase font-bold block">Assigned Fleet</span>
                      <span className="font-bold">{ord.logisticsProvider.vehicleNo}</span> ({ord.logisticsProvider.driverName})
                    </div>
                    <span className="text-[10px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-full border border-farm-border">
                      {ord.logisticsProvider.contactStatus}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-farm-text-secondary flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-farm-brand" />
                    <span>{ord.escrowStatus || 'Locked in Escrow'}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => onNavigateTab('orders')}
                    className="text-xs font-bold text-farm-brand hover:text-farm-terracotta flex items-center gap-1 cursor-pointer"
                  >
                    <span>Track Consignment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. ASK FARMLINK AI BANNER */}
      <div className="bg-farm-brand text-white rounded-3xl p-6 shadow-card border border-farm-border flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-farm-brand text-farm-gold text-[10px] font-bold uppercase tracking-wider border border-farm-brand">
            <Sparkles className="w-3 h-3 text-farm-gold" />
            <span>AI Procurement Assistant</span>
          </span>
          <h2 className="text-xl font-display font-bold">
            Need help sourcing specific produce batches?
          </h2>
          <p className="text-xs text-white/80">
            Ask FarmLink AI about harvest availability, mandi spot price trends, and delivery scheduling.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenAI('How do I find a harvest and submit an interest request?')}
          className="px-5 py-3 rounded-2xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface active:scale-95 transition-all shadow-subtle cursor-pointer shrink-0 border border-farm-border"
        >
          Ask FarmLink AI
        </button>
      </div>
    </div>
  );
};
