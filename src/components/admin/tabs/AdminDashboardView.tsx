import { 
  ShoppingBag, 
  Truck, 
  Sprout, 
  Package, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Activity,
  AlertCircle
} from 'lucide-react';
import { AdminMetrics, AdminTab } from '@/types';
import { initialCropDistribution, initialCategoryBreakdown, initialAdminActivities } from '@/data/adminDemoData';

interface AdminDashboardViewProps {
  metrics: AdminMetrics;
  onNavigateTab: (tab: AdminTab) => void;
}

export const AdminDashboardView = ({
  metrics,
  onNavigateTab,
}: AdminDashboardViewProps) => {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Header */}
      <div className="bg-farm-brand text-white rounded-3xl p-6 sm:p-8 border border-farm-brand shadow-subtle relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-farm-brand border border-farm-brand text-[11px] font-bold text-farm-gold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Demo Admin Workspace &bull; Illustrative demo data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white">
            Good morning, Platform Administrator
          </h1>
          <p className="text-sm text-farm-text-secondary/80 leading-relaxed">
            Here is an overview of your FarmLink demonstration marketplace. All figures, user accounts, and trade transactions are illustrative mock records designed for interface validation.
          </p>
        </div>
      </div>

      {/* 2. Platform Summary Metrics */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-display font-bold text-farm-text uppercase tracking-wider">
            Platform Summary
          </h2>
          <span className="text-xs font-semibold text-farm-text-secondary">
            Demo figures
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {/* Registered Farmers */}
          <div 
            onClick={() => onNavigateTab('users')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-brand transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-brand mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-brand-soft flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Producers</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-brand transition-colors">
              {metrics.registeredFarmers.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Registered Farmers</p>
          </div>

          {/* Registered Buyers */}
          <div 
            onClick={() => onNavigateTab('users')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-terracotta transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-text-secondary mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-surface-secondary flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Buyers</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-text-secondary transition-colors">
              {metrics.registeredBuyers.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Registered Buyers</p>
          </div>

          {/* Logistics Partners */}
          <div 
            onClick={() => onNavigateTab('users')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-border transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-text-secondary mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-surface-secondary flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Fleet</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-text-secondary transition-colors">
              {metrics.logisticsPartners.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Logistics Partners</p>
          </div>

          {/* Active Listings */}
          <div 
            onClick={() => onNavigateTab('listings')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-brand transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-brand mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-brand-soft flex items-center justify-center">
                <Package className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Market</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-brand transition-colors">
              {metrics.activeListings.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Active Listings</p>
          </div>

          {/* Active Orders */}
          <div 
            onClick={() => onNavigateTab('orders')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-gold transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-text-secondary mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-surface-secondary flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">In Progress</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-text-secondary transition-colors">
              {metrics.activeOrders.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Active Orders</p>
          </div>

          {/* Completed Deliveries */}
          <div 
            onClick={() => onNavigateTab('orders')}
            className="bg-farm-surface p-4 rounded-2xl border border-farm-border shadow-subtle hover:border-farm-brand transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-farm-brand mb-2">
              <div className="w-8 h-8 rounded-xl bg-farm-brand-soft flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Fulfilled</span>
            </div>
            <div className="text-2xl font-display font-bold text-farm-text group-hover:text-farm-brand transition-colors">
              {metrics.completedDeliveries.toLocaleString()}
            </div>
            <p className="text-xs font-medium text-farm-text-secondary mt-0.5">Completed Deliveries</p>
          </div>
        </div>
      </div>

      {/* 3. Review Queue Quick Action Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Listings Awaiting Review */}
        <div className="p-5 rounded-2xl bg-farm-surface border border-farm-gold flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-text-secondary">
                <AlertCircle className="w-4 h-4" />
                <span>Action Needed &bull; Review Queue</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-farm-surface-secondary text-[11px] font-bold text-farm-text-secondary border border-farm-gold/40">
                {metrics.pendingListingsReview} Pending
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-farm-text">
              Harvest Listings Awaiting Quality Review
            </h3>
            <p className="text-xs text-farm-text-secondary leading-relaxed">
              New farmer harvest lots requiring standard APMC quality grade confirmation and moisture spot checks before being featured to bulk institutional buyers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('listings')}
            className="mt-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer w-full sm:w-auto self-start"
          >
            <span>Inspect Pending Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Users Awaiting Verification */}
        <div className="p-5 rounded-2xl bg-farm-brand-soft border border-farm-brand flex flex-col justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-brand">
                <ShieldCheck className="w-4 h-4" />
                <span>Verification Ledger</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-farm-surface text-[11px] font-bold text-farm-brand border border-farm-brand/30">
                {metrics.pendingUsersReview} Pending
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-farm-text">
              Account Credentials Under Verification
            </h3>
            <p className="text-xs text-farm-text-secondary leading-relaxed">
              Fictional farmer land records, buyer wholesale trade licenses, and logistics commercial permits submitted for demonstration review.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('users')}
            className="mt-4 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer w-full sm:w-auto self-start"
          >
            <span>Review User Credentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Marketplace Overview (Crops & Categories Distribution) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most-Listed Crops (2 cols) */}
        <div className="lg:col-span-2 bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-lg text-farm-text">
                Most-Listed Produce (Demo Figures)
              </h3>
              <p className="text-xs text-farm-text-secondary">
                Breakdown of active listings volume by agricultural commodity
              </p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-farm-brand bg-farm-brand-soft px-2.5 py-1 rounded-lg border border-farm-border">
              Live Market Volumes
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {initialCropDistribution.map((crop, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: crop.color }} />
                    <span className="font-bold text-farm-text">{crop.cropName}</span>
                    <span className="text-farm-text-secondary">({crop.category})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-farm-text-secondary">{crop.totalVolumeQuintals} Quintals ({crop.listingCount} lots)</span>
                    <span className="font-bold text-farm-brand">Avg ₹{crop.avgPrice}/kg</span>
                  </div>
                </div>

                {/* Solid Progress Bar */}
                <div className="w-full h-2.5 rounded-full bg-farm-surface border border-farm-border overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${crop.percentage}%`,
                      backgroundColor: crop.color 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most-Viewed Categories (1 col) */}
        <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display font-bold text-lg text-farm-text">
                Crop Categories
              </h3>
              <span className="text-[11px] font-semibold text-farm-text-secondary">Demo %</span>
            </div>
            <p className="text-xs text-farm-text-secondary mb-4">
              Market share by produce category
            </p>

            <div className="space-y-3.5">
              {initialCategoryBreakdown.map((cat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-md" style={{ backgroundColor: cat.color }} />
                    <div>
                      <p className="text-xs font-bold text-farm-text">{cat.category}</p>
                      <span className="text-[11px] text-farm-text-secondary">{cat.listings} active lots</span>
                    </div>
                  </div>
                  <span className="text-sm font-display font-bold" style={{ color: cat.color }}>
                    {cat.share}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-farm-border">
            <button
              type="button"
              onClick={() => onNavigateTab('reports')}
              className="w-full py-2.5 px-4 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-brand-soft hover:text-farm-brand transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Comprehensive Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recent Platform Activity Stream Preview */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-farm-text">
              Recent Platform Activity (Illustrative Demo)
            </h3>
            <p className="text-xs text-farm-text-secondary">
              Live operational audit log across all marketplace participants
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('activity')}
            className="inline-flex items-center gap-1 text-xs font-bold text-farm-brand hover:underline cursor-pointer"
          >
            <span>View All Activity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-farm-border">
          {initialAdminActivities.slice(0, 4).map((act) => (
            <div key={act.id} className="py-3.5 first:pt-1 last:pb-1 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-farm-surface border border-farm-border flex items-center justify-center text-farm-brand shrink-0 mt-0.5">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-farm-text">
                    {act.title}
                  </h4>
                  <p className="text-xs text-farm-text-secondary mt-0.5">
                    {act.description}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-medium text-farm-text-secondary">
                  {act.timestamp}
                </span>
                <span className="block text-[10px] font-bold text-farm-brand mt-0.5 uppercase tracking-wide">
                  {act.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
