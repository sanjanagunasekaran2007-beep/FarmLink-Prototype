import { 
  LayoutDashboard, 
  Truck, 
  Route, 
  History, 
  Bell, 
  UserCircle 
} from 'lucide-react';
import { LogisticsTab } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface LogisticsNavigationProps {
  activeTab: LogisticsTab;
  onSelectTab: (tab: LogisticsTab) => void;
  unreadCount: number;
}

export const LogisticsNavigation = ({
  activeTab,
  onSelectTab,
  unreadCount,
}: LogisticsNavigationProps) => {
  const { t } = useLanguage();
  const { isSimpleMode } = useAccessibility();

  const allNavItems: { id: LogisticsTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'dashboard',
      label: t('common.dashboard', 'Dashboard'),
      icon: <LayoutDashboard className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    },
    {
      id: 'deliveries',
      label: t('logistics.assignedDeliveries', 'Deliveries'),
      icon: <Truck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    },
    {
      id: 'route',
      label: t('logistics.routeSummary', 'Route Summary'),
      icon: <Route className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    },
    {
      id: 'history',
      label: t('logistics.deliveryHistory', 'History'),
      icon: <History className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    },
    {
      id: 'notifications',
      label: t('common.notifications', 'Alerts'),
      icon: <Bell className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      id: 'profile',
      label: t('common.profile', 'Profile'),
      icon: <UserCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />,
    },
  ];

  // In simple mode, prioritize Dashboard, Deliveries, Route, Profile
  const navItems = isSimpleMode
    ? allNavItems.filter(item => item.id !== 'history' && item.id !== 'notifications')
    : allNavItems;

  return (
    <>
      {/* Desktop Sub-Header Navigation */}
      <nav className="hidden md:block bg-farm-surface border-b border-farm-border sticky top-[73px] z-20 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  id={`nav-logistics-${item.id}`}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-farm-brand text-white shadow-subtle'
                      : 'text-farm-text hover:bg-farm-surface-secondary hover:text-farm-text'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-farm-surface text-farm-brand'
                          : 'bg-farm-danger text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-farm-surface border-t border-farm-border shadow-card safe-area-bottom select-none">
        <div className={`grid ${navItems.length === 4 ? 'grid-cols-4' : 'grid-cols-6'} gap-0.5 px-1 py-1.5 max-w-lg mx-auto`}>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                id={`mob-nav-logistics-${item.id}`}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-bold transition-all relative cursor-pointer ${
                  isActive
                    ? 'bg-farm-brand text-white'
                    : 'text-farm-text-secondary hover:text-farm-text'
                }`}
              >
                <div className="relative mb-0.5">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 bg-farm-danger text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="truncate w-full text-center leading-tight">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
