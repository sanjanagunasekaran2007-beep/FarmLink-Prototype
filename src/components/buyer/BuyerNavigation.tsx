import { LayoutDashboard, Store, Bookmark, FileText, Truck, Wallet, User } from 'lucide-react';
import { BuyerTab } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface BuyerNavigationProps {
  activeTab: BuyerTab;
  onSelectTab: (tab: BuyerTab) => void;
  savedCount?: number;
  requestsCount?: number;
  ordersCount?: number;
  transactionsCount?: number;
}

export const BuyerNavigation = ({
  activeTab,
  onSelectTab,
  savedCount,
  requestsCount,
  ordersCount,
  transactionsCount,
}: BuyerNavigationProps) => {
  const { t } = useLanguage();
  const { isSimpleMode } = useAccessibility();

  const allTabs = [
    { id: 'dashboard' as BuyerTab, label: t('common.dashboard', 'Dashboard'), icon: LayoutDashboard },
    { id: 'browse' as BuyerTab, label: t('buyer.browseHarvests', 'Browse Harvests'), icon: Store },
    { id: 'saved' as BuyerTab, label: t('buyer.savedHarvests', 'Saved Harvests'), icon: Bookmark, count: savedCount },
    { id: 'requests' as BuyerTab, label: t('buyer.myRequests', 'My Requests'), icon: FileText, count: requestsCount },
    { id: 'orders' as BuyerTab, label: t('common.orders', 'Orders'), icon: Truck, count: ordersCount },
    { id: 'payments' as BuyerTab, label: t('common.payments', 'Payments'), icon: Wallet, count: transactionsCount },
    { id: 'profile' as BuyerTab, label: t('common.profile', 'Profile'), icon: User },
  ];

  // In Simple Mode, keep essential tabs: Dashboard, Browse, Orders, Payments, Profile
  const tabs = isSimpleMode
    ? allTabs.filter(tab => tab.id !== 'saved' && tab.id !== 'requests')
    : allTabs;

  return (
    <>
      {/* DESKTOP DARK CHARCOAL NAVIGATION BAR */}
      <nav aria-label="Desktop Buyer Navigation" className="hidden md:block w-full bg-farm-brand border-b border-farm-brand px-4 sm:px-8 py-2.5 sticky top-[65px] z-20 select-none shadow-card">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-farm-terracotta text-white shadow-subtle'
                    : 'text-white/80 hover:text-white hover:bg-farm-brand'
                }`}
                id={`desktop-buyer-nav-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-farm-brand text-farm-gold' : 'bg-farm-terracotta text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MOBILE DARK CHARCOAL BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Buyer Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-farm-brand border-t border-farm-brand px-1 py-1.5 select-none shadow-elevated">
        <div className={`grid ${tabs.length === 5 ? 'grid-cols-5' : 'grid-cols-7'} gap-0.5 max-w-md mx-auto`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-farm-terracotta text-white font-bold shadow-subtle'
                    : 'text-white/70 hover:text-white'
                }`}
                id={`mobile-buyer-nav-${tab.id}`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] leading-tight truncate max-w-full">
                  {tab.label.split(' ')[0]}
                </span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`absolute top-1 right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
                      isActive ? 'bg-farm-brand text-farm-gold' : 'bg-farm-gold text-farm-text'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
