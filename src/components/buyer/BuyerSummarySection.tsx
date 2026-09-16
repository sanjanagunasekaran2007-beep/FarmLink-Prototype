import { Store, Bookmark, FileText, Truck, ArrowUpRight } from 'lucide-react';
import { BuyerTab } from '@/types';

interface BuyerSummarySectionProps {
  availableCount: number;
  savedCount: number;
  requestsCount: number;
  ordersCount: number;
  onNavigateTab: (tab: BuyerTab) => void;
}

export const BuyerSummarySection = ({
  availableCount,
  savedCount,
  requestsCount,
  ordersCount,
  onNavigateTab,
}: BuyerSummarySectionProps) => {
  const cards = [
    {
      id: 'browse' as BuyerTab,
      label: 'Available Harvests',
      value: `${availableCount} Lots`,
      subtext: 'Direct farmgate listings ready for procurement',
      badge: 'Live Marketplace',
      icon: Store,
      bg: '#164A36',
      textColor: '#FFFDF7',
      accentColor: '#D9A441',
      border: '#113A2A',
    },
    {
      id: 'saved' as BuyerTab,
      label: 'Saved Harvests',
      value: `${savedCount} Saved`,
      subtext: 'Bookmarked produce lots for rapid review',
      badge: 'Shortlisted',
      icon: Bookmark,
      bg: '#D9A441',
      textColor: '#17211C',
      accentColor: '#164A36',
      border: '#B8872E',
    },
    {
      id: 'requests' as BuyerTab,
      label: 'Active Requests',
      value: `${requestsCount} Active`,
      subtext: 'Purchase intent submitted to verified growers',
      badge: 'Under Review',
      icon: FileText,
      bg: '#C66B45',
      textColor: '#FFFDF7',
      accentColor: '#F6E7B8',
      border: '#A8512C',
    },
    {
      id: 'orders' as BuyerTab,
      label: 'Confirmed Orders',
      value: `${ordersCount} Orders`,
      subtext: 'Active dispatches with escrow guarantee',
      badge: 'In Transit / Delivered',
      icon: Truck,
      bg: '#245B5A',
      textColor: '#FFFDF7',
      accentColor: '#D9A441',
      border: '#1C4A49',
    },
  ];

  return (
    <section aria-label="Buyer Summary Overview" className="space-y-3 select-none">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-base font-display font-bold text-farm-brand uppercase tracking-wider">
          Marketplace Activity Overview
        </h2>
        <span className="text-[11px] font-medium text-farm-text-secondary">
          Demo data &bull; Updated real-time
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onNavigateTab(card.id)}
              className="p-5 rounded-3xl text-left transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer shadow-card flex flex-col justify-between space-y-4 border"
              style={{
                backgroundColor: card.bg,
                color: card.textColor,
                borderColor: card.border,
              }}
              id={`buyer-summary-card-${card.id}`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/15 border border-white/20"
                >
                  {card.badge}
                </span>
                <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs font-bold opacity-90 mt-0.5">
                  {card.label}
                </div>
                <p className="text-[11px] opacity-75 mt-1 leading-snug">
                  {card.subtext}
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold pt-1 opacity-90">
                <span>View module</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
