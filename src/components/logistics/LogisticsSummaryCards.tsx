import { ClipboardList, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { LogisticsDeliveryItem, LogisticsTab } from '@/types';

interface LogisticsSummaryCardsProps {
  deliveries: LogisticsDeliveryItem[];
  onNavigateTab: (tab: LogisticsTab) => void;
}

export const LogisticsSummaryCards = ({
  deliveries,
  onNavigateTab,
}: LogisticsSummaryCardsProps) => {
  const assignedCount = deliveries.filter((d) => d.status === 'Assigned').length;
  const pickupPendingCount = deliveries.filter(
    (d) => d.status === 'Pickup Pending' || d.status === 'Picked Up'
  ).length;
  const inTransitCount = deliveries.filter((d) => d.status === 'In Transit').length;
  const completedCount = deliveries.filter((d) => d.status === 'Delivered').length;

  const cards = [
    {
      id: 'assigned',
      title: 'Assigned Deliveries',
      count: assignedCount,
      subtext: 'Scheduled for dispatch',
      icon: <ClipboardList className="w-5 h-5 text-white" />,
      bg: 'bg-farm-brand',
      textColor: 'text-white',
      subColor: 'text-farm-text-secondary',
      tab: 'deliveries' as LogisticsTab,
    },
    {
      id: 'pickups',
      title: 'Pickups Today',
      count: pickupPendingCount,
      subtext: 'Collection yards & FPOs',
      icon: <Clock className="w-5 h-5 text-farm-text" />,
      bg: 'bg-farm-gold',
      textColor: 'text-farm-text',
      subColor: 'text-farm-terracotta',
      tab: 'deliveries' as LogisticsTab,
    },
    {
      id: 'transit',
      title: 'In Transit',
      count: inTransitCount,
      subtext: 'Live on highway routes',
      icon: <Truck className="w-5 h-5 text-white" />,
      bg: 'bg-farm-terracotta',
      textColor: 'text-white',
      subColor: 'text-farm-terracotta-soft',
      tab: 'route' as LogisticsTab,
    },
    {
      id: 'completed',
      title: 'Completed Deliveries',
      count: completedCount,
      subtext: 'POD confirmed & closed',
      icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      bg: 'bg-farm-brand',
      textColor: 'text-white',
      subColor: 'text-farm-brand-soft',
      tab: 'history' as LogisticsTab,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onNavigateTab(card.tab)}
          id={`summary-card-${card.id}`}
          className={`${card.bg} p-4 sm:p-5 rounded-3xl text-left border border-black/5 shadow-subtle hover:brightness-95 active:scale-[0.99] transition-all cursor-pointer flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-xs sm:text-sm font-bold ${card.textColor} opacity-90 line-clamp-1`}>
              {card.title}
            </span>
            <div className="p-2 rounded-2xl bg-black/10 shrink-0">
              {card.icon}
            </div>
          </div>
          <div>
            <div className={`text-2xl sm:text-3xl font-display font-black ${card.textColor}`}>
              {card.count}
            </div>
            <p className={`text-[11px] font-medium mt-1 ${card.subColor} line-clamp-1`}>
              {card.subtext}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
};
