import { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingBag, 
  Activity, 
  FileText, 
  Bell, 
  Settings,
  MoreHorizontal,
  X
} from 'lucide-react';
import { AdminTab } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface AdminNavigationProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  pendingReviewsCount: number;
  unreadNotificationsCount: number;
}

interface NavItem {
  id: AdminTab;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  mobilePrimary?: boolean;
}

export const AdminNavigation = ({
  activeTab,
  onSelectTab,
  pendingReviewsCount,
  unreadNotificationsCount,
}: AdminNavigationProps) => {
  const { t } = useLanguage();
  const [showMobileMoreMenu, setShowMobileMoreMenu] = useState(false);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: t('common.dashboard', 'Dashboard'),
      icon: <LayoutDashboard className="w-4 h-4" />,
      mobilePrimary: true,
    },
    {
      id: 'users',
      label: t('admin.users', 'Users'),
      icon: <Users className="w-4 h-4" />,
      mobilePrimary: true,
    },
    {
      id: 'listings',
      label: t('admin.listings', 'Harvest Listings'),
      icon: <Package className="w-4 h-4" />,
      badge: pendingReviewsCount,
      mobilePrimary: true,
    },
    {
      id: 'orders',
      label: t('admin.orders', 'Orders & Deliveries'),
      icon: <ShoppingBag className="w-4 h-4" />,
      mobilePrimary: true,
    },
    {
      id: 'activity',
      label: t('admin.activity', 'Activity'),
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: 'reports',
      label: t('admin.reports', 'Reports'),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: 'notifications',
      label: t('common.notifications', 'Notifications'),
      icon: <Bell className="w-4 h-4" />,
      badge: unreadNotificationsCount,
    },
    {
      id: 'settings',
      label: t('common.settings', 'Settings'),
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const primaryMobileItems = navItems.filter((item) => item.mobilePrimary);
  const secondaryMobileItems = navItems.filter((item) => !item.mobilePrimary);

  return (
    <>
      {/* 1. Desktop Tab Navigation Bar */}
      <nav className="w-full bg-farm-surface border-b border-farm-border sticky top-[65px] z-30 hidden md:block select-none shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-farm-brand text-white shadow-subtle'
                    : 'text-farm-text-secondary hover:bg-farm-surface hover:text-farm-text'
                }`}
                id={`admin-tab-${item.id}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-farm-gold text-farm-text' : 'bg-farm-surface-secondary text-farm-text-secondary'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-farm-surface border-t border-farm-border md:hidden px-2 pt-1 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] select-none shadow-elevated">
        <div className="grid grid-cols-5 gap-1 items-center">
          {primaryMobileItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setShowMobileMoreMenu(false);
                  onSelectTab(item.id);
                }}
                className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold transition-all relative min-h-[44px] ${
                  isActive ? 'text-farm-brand' : 'text-farm-text-secondary hover:text-farm-text'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-farm-brand-soft' : ''}`}>
                  {item.icon}
                </div>
                <span className="truncate max-w-[58px] mt-0.5">{item.label.split(' ')[0]}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-0 right-3 w-3.5 h-3.5 rounded-full bg-farm-danger text-white text-[8px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* More Menu Button for Mobile */}
          <button
            type="button"
            onClick={() => setShowMobileMoreMenu(!showMobileMoreMenu)}
            className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-bold transition-all relative min-h-[44px] ${
              secondaryMobileItems.some((i) => i.id === activeTab)
                ? 'text-farm-brand'
                : 'text-farm-text-secondary hover:text-farm-text'
            }`}
          >
            <div className={`p-1 rounded-lg ${secondaryMobileItems.some((i) => i.id === activeTab) ? 'bg-farm-brand-soft' : ''}`}>
              <MoreHorizontal className="w-4 h-4" />
            </div>
            <span className="mt-0.5">More</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-farm-danger" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile "More" Drawer Modal */}
      {showMobileMoreMenu && (
        <div className="fixed inset-0 z-50 bg-farm-brand/60 md:hidden flex flex-col justify-end">
          <div className="bg-farm-surface rounded-t-3xl border-t border-farm-border p-5 space-y-4 pb-20 shadow-elevated">
            <div className="flex items-center justify-between border-b border-farm-border pb-3">
              <h3 className="font-display font-bold text-sm text-farm-text">
                {t('admin.reports', 'Additional Admin Modules')}
              </h3>
              <button
                type="button"
                onClick={() => setShowMobileMoreMenu(false)}
                className="p-1.5 rounded-lg bg-farm-surface text-farm-text-secondary hover:text-farm-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {secondaryMobileItems.map((item) => {
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectTab(item.id);
                      setShowMobileMoreMenu(false);
                    }}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-bold text-left transition-all ${
                      isActive
                        ? 'bg-farm-brand text-white border-farm-brand'
                        : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-brand-soft'
                    }`}
                  >
                    <div className={`p-1.5 rounded-xl ${isActive ? 'bg-farm-brand' : 'bg-farm-surface border border-farm-border'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <p>{item.label}</p>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] text-farm-gold block">
                          {item.badge} Unread
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
