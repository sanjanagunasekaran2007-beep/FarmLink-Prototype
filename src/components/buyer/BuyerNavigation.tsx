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
      {/* DESKTOP DARK NAVIGATION BAR */}
      <nav aria-label="Desktop Buyer Navigation" className="hidden md:block w-full bg-[#24352D] dark:bg-[#111A16] border-b border-[#3B4C41] px-4 sm:px-8 py-2.5 sticky top-[65px] z-20 select-none shadow-card">
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
                    : 'text-white/80 hover:text-white hover:bg-[#1A2922] dark:hover:bg-[#2B3D33]'
                }`}
                id={`desktop-buyer-nav-${tab.id}`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#24352D] text-farm-gold' : 'bg-farm-terracotta text-white'
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

      {/* MOBILE DARK BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Buyer Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#24352D] dark:bg-[#111A16] border-t border-[#3B4C41] px-1 pt-1 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))] select-none shadow-elevated">
        <div className={`grid ${tabs.length === 5 ? 'grid-cols-5' : 'grid-cols-7'} gap-0.5 max-w-md mx-auto`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all cursor-pointer relative min-h-[44px] ${
                  isActive
                    ? 'bg-farm-terracotta text-white font-bold shadow-subtle'
                    : 'text-white/70 hover:text-white'
                }`}
                id={`mobile-buyer-nav-${tab.id}`}
              >
                <Icon className="w-4 h-4 xs:w-5 xs:h-5 mb-0.5 shrink-0" />
                <span className="text-[9px] xs:text-[10px] leading-tight truncate max-w-full text-center">
                  {tab.label.split(' ')[0]}
                </span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`absolute top-0.5 right-1 w-3.5 h-3.5 xs:w-4 xs:h-4 rounded-full text-[8px] xs:text-[9px] font-bold flex items-center justify-center ${
                      isActive ? 'bg-[#24352D] text-farm-gold' : 'bg-farm-gold text-farm-text'
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
