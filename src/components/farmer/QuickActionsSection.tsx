import { PlusCircle, TrendingUp, Users, Truck, ArrowRight } from 'lucide-react';
import { FarmerTab } from '@/types';

interface QuickActionsSectionProps {
  onOpenAddHarvest: () => void;
  onNavigateTab: (tab: FarmerTab) => void;
}

export const QuickActionsSection = ({
  onOpenAddHarvest,
  onNavigateTab,
}: QuickActionsSectionProps) => {
  const actions = [
    {
      id: 'add-harvest',
      title: 'Add Harvest',
      subtitle: 'List crop on Mandi',
      icon: <PlusCircle className="w-5 h-5 text-white" strokeWidth={2.4} />,
      action: onOpenAddHarvest,
      iconBg: 'bg-farm-terracotta text-white',
      accentColor: 'text-farm-terracotta',
      borderHover: 'hover:border-farm-terracotta',
    },
    {
      id: 'market-prices',
      title: 'Market Prices',
      subtitle: 'APMC spot rates',
      icon: <TrendingUp className="w-5 h-5 text-farm-text" strokeWidth={2.4} />,
      action: () => onNavigateTab('market'),
      iconBg: 'bg-farm-gold text-farm-text',
      accentColor: 'text-farm-gold',
      borderHover: 'hover:border-farm-gold',
    },
    {
      id: 'find-buyers',
      title: 'Find Buyers',
      subtitle: 'Verified orders',
      icon: <Users className="w-5 h-5 text-white" strokeWidth={2.4} />,
      action: () => onNavigateTab('buyers'),
      iconBg: 'bg-farm-brand text-white',
      accentColor: 'text-farm-brand',
      borderHover: 'hover:border-farm-brand',
    },
    {
      id: 'track-delivery',
      title: 'Track Delivery',
      subtitle: 'Transit & pickup',
      icon: <Truck className="w-5 h-5 text-white" strokeWidth={2.4} />,
      action: () => onNavigateTab('deliveries'),
      iconBg: 'bg-farm-info text-white',
      accentColor: 'text-farm-info',
      borderHover: 'hover:border-farm-info',
    },
  ];

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-bold text-base text-farm-text">
          Quick Actions
        </h3>
        <span className="text-xs text-farm-text-secondary font-medium">Frequent Tasks</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {actions.map((act) => (
          <button
            key={act.id}
            type="button"
            onClick={act.action}
            className={`p-4 sm:p-5 rounded-2xl bg-farm-surface border border-farm-border text-left transition-all hover:scale-[1.02] ${act.borderHover} active:scale-95 cursor-pointer flex flex-col justify-between shadow-subtle group`}
            id={`quick-action-${act.id}`}
          >
            <div className="flex items-center justify-between w-full mb-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-subtle ${act.iconBg}`}
              >
                {act.icon}
              </div>
              <ArrowRight className="w-4 h-4 text-farm-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="text-sm font-bold text-farm-text">
                {act.title}
              </div>
              <div className="text-[11px] font-medium text-farm-text-secondary mt-0.5">
                {act.subtitle}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
