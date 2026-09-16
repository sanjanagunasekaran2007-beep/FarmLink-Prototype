import { Store, Bookmark, FileText, Truck, Bot, ArrowRight } from 'lucide-react';
import { BuyerTab } from '@/types';

interface BuyerQuickActionsSectionProps {
  onNavigateTab: (tab: BuyerTab) => void;
  onOpenAI: () => void;
}

export const BuyerQuickActionsSection = ({
  onNavigateTab,
  onOpenAI,
}: BuyerQuickActionsSectionProps) => {
  const actions = [
    {
      title: 'Browse Available Crops',
      desc: 'Explore fresh lots directly from verified farmers',
      icon: Store,
      bg: '#FFFDF7',
      iconBg: '#E8EFE5',
      iconColor: '#164A36',
      border: '#DCE2D9',
      onClick: () => onNavigateTab('browse'),
    },
    {
      title: 'Saved Harvests',
      desc: 'Quickly access your shortlisted harvest batches',
      icon: Bookmark,
      bg: '#FFFDF7',
      iconBg: '#FDF0EB',
      iconColor: '#C66B45',
      border: '#DCE2D9',
      onClick: () => onNavigateTab('saved'),
    },
    {
      title: 'My Purchase Requests',
      desc: 'Review submitted intents and farmer acceptance',
      icon: FileText,
      bg: '#FFFDF7',
      iconBg: '#FBF4E4',
      iconColor: '#D9A441',
      border: '#DCE2D9',
      onClick: () => onNavigateTab('requests'),
    },
    {
      title: 'Track Live Orders',
      desc: 'Monitor farmgate pickup, transit, and delivery status',
      icon: Truck,
      bg: '#FFFDF7',
      iconBg: '#E8F1F2',
      iconColor: '#245B5A',
      border: '#DCE2D9',
      onClick: () => onNavigateTab('orders'),
    },
    {
      title: 'Ask FarmLink AI',
      desc: 'Get procurement assistance, crop timing & pricing help',
      icon: Bot,
      bg: '#FFFDF7',
      iconBg: '#E8EFE5',
      iconColor: '#164A36',
      border: '#DCE2D9',
      onClick: onOpenAI,
    },
  ];

  return (
    <section aria-label="Buyer Quick Actions" className="space-y-3 select-none">
      <h2 className="text-sm sm:text-base font-display font-bold text-farm-brand uppercase tracking-wider">
        Quick Procurement Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {actions.map((act, idx) => {
          const Icon = act.icon;

          return (
            <button
              key={idx}
              type="button"
              onClick={act.onClick}
              className="p-4 rounded-3xl bg-farm-surface border border-farm-border shadow-card text-left hover:border-farm-brand active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center border border-farm-border"
                  style={{ backgroundColor: act.iconBg, color: act.iconColor }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-farm-text-secondary group-hover:text-farm-brand group-hover:translate-x-0.5 transition-all" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-farm-text leading-snug">
                  {act.title}
                </h3>
                <p className="text-[11px] text-farm-text-secondary mt-1 line-clamp-2">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
