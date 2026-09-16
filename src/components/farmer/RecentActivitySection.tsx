import { Clock, CheckCircle2, UserCheck, Truck, ShieldCheck } from 'lucide-react';
import { ActivityItem } from '@/types';

interface RecentActivitySectionProps {
  activities: ActivityItem[];
}

export const RecentActivitySection = ({
  activities,
}: RecentActivitySectionProps) => {
  const getActivityStyle = (type: ActivityItem['type']) => {
    switch (type) {
      case 'listing':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-farm-brand" />,
          iconBg: '#DCE8D7',
          badgeBg: '#DCE8D7',
          badgeText: '#164A36',
          badgeBorder: '#BFD4B8',
        };
      case 'buyer':
        return {
          icon: <UserCheck className="w-4 h-4 text-farm-gold" />,
          iconBg: '#F6E7B8',
          badgeBg: '#F6E7B8',
          badgeText: '#694708',
          badgeBorder: '#E4CC8B',
        };
      case 'delivery':
        return {
          icon: <Truck className="w-4 h-4 text-farm-brand" />,
          iconBg: '#DCEAF2',
          badgeBg: '#DCEAF2',
          badgeText: '#1F4765',
          badgeBorder: '#B6D3E3',
        };
      case 'payment':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-farm-brand" />,
          iconBg: '#DCE8D7',
          badgeBg: '#DCE8D7',
          badgeText: '#164A36',
          badgeBorder: '#BFD4B8',
        };
    }
  };

  return (
    <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card select-none">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-farm-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shadow-subtle">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-farm-text leading-tight">
              Recent Harvest & Trade Activity
            </h3>
            <p className="text-xs text-farm-text-secondary font-medium">
              Timestamped logs of harvest listings, buyer interest, and escrow settlements
            </p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-farm-text uppercase tracking-wider bg-farm-surface px-3 py-1 rounded-full border border-farm-border shadow-subtle">
          Live Events
        </span>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {activities.map((item) => {
          const style = getActivityStyle(item.type);

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-farm-terracotta transition-colors shadow-subtle"
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-xl shrink-0 mt-0.5"
                  style={{ backgroundColor: style.iconBg }}
                >
                  {style.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-farm-text">
                      {item.title}
                    </h4>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
                      style={{
                        backgroundColor: style.badgeBg,
                        color: style.badgeText,
                        borderColor: style.badgeBorder,
                      }}
                    >
                      {item.statusBadge}
                    </span>
                  </div>
                  <p className="text-xs text-farm-text-secondary mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-medium text-farm-text-secondary shrink-0 pl-11 sm:pl-0">
                {item.timestamp}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
