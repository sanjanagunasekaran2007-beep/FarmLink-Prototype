import { Home, Store, Users, Sprout, Truck, Wallet, User } from 'lucide-react';
import { FarmerTab } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface FarmerNavigationProps {
  activeTab: FarmerTab;
  onSelectTab: (tab: FarmerTab) => void;
  harvestCount: number;
  ordersCount?: number;
  transactionsCount?: number;
}

export const FarmerNavigation = ({
  activeTab,
  onSelectTab,
  harvestCount,
  ordersCount,
  transactionsCount,
}: FarmerNavigationProps) => {
  const { t } = useLanguage();
  const { isSimpleMode } = useAccessibility();

  const tabs = [
    { id: 'home' as FarmerTab, label: t('common.dashboard', 'Home'), icon: Home, simple: true },
    { id: 'market' as FarmerTab, label: t('farmer.marketPrices', 'Market Prices'), icon: Store, simple: true },
    { id: 'buyers' as FarmerTab, label: t('farmer.findBuyers', 'Find Buyers'), icon: Users, simple: false },
    { id: 'harvest' as FarmerTab, label: t('farmer.myHarvest', 'My Harvest'), icon: Sprout, count: harvestCount, simple: true },
    { id: 'deliveries' as FarmerTab, label: t('farmer.ordersDeliveries', 'Orders & Delivery'), icon: Truck, count: ordersCount, simple: false },
    { id: 'payments' as FarmerTab, label: t('farmer.paymentsLedger', 'Payments'), icon: Wallet, count: transactionsCount, simple: false },
    { id: 'profile' as FarmerTab, label: t('common.profile', 'Profile'), icon: User, simple: true },
  ];

  const visibleTabs = isSimpleMode ? tabs.filter((t) => t.simple) : tabs;

  return (
    <>
      {/* DESKTOP DARK CHARCOAL NAVIGATION BAR */}
      <nav aria-label="Desktop Navigation" className="hidden md:block w-full bg-farm-brand border-b border-farm-brand px-4 sm:px-8 py-2.5 sticky top-[65px] z-20 select-none shadow-card">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
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
                      ? 'bg-farm-gold text-farm-text shadow-subtle'
                      : 'text-white/80 hover:text-white hover:bg-farm-brand'
                  }`}
                  id={`desktop-nav-${tab.id}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-farm-brand text-farm-gold' : 'bg-farm-brand text-farm-gold'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isSimpleMode && (
            <span className="text-[11px] font-bold text-farm-gold bg-farm-brand px-2.5 py-1 rounded-lg border border-farm-gold/40 shrink-0">
              Simple Interface Active
            </span>
          )}
        </div>
      </nav>

      {/* MOBILE DARK CHARCOAL BOTTOM NAVIGATION BAR */}
      <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-farm-brand border-t border-farm-brand px-1 py-1.5 select-none shadow-elevated">
        <div 
          className="grid gap-0.5 max-w-md mx-auto"
          style={{ gridTemplateColumns: `repeat(${visibleTabs.length}, minmax(0, 1fr))` }}
        >
          {visibleTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-farm-gold text-farm-text font-bold shadow-subtle'
                    : 'text-white/70 hover:text-white'
                }`}
                id={`mobile-nav-${tab.id}`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] leading-tight truncate max-w-full">
                  {tab.label.split(' ')[0]}
                </span>
                {tab.count !== undefined && (
                  <span
                    className={`absolute top-1 right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center ${
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
    </>
  );
};
