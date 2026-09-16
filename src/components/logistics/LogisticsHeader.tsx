import { useState } from 'react';
import { Truck, Bell, LogOut, ShieldCheck, User, Globe, Sliders } from 'lucide-react';
import { LogisticsProfileData, LogisticsTab } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { LanguageSelectorModal } from '../common/LanguageSelectorModal';
import { AccessibilitySettingsModal } from '../common/AccessibilitySettingsModal';

interface LogisticsHeaderProps {
  profile: LogisticsProfileData;
  activeTab: LogisticsTab;
  onNavigateTab: (tab: LogisticsTab) => void;
  unreadCount: number;
  onOpenLogoutModal: () => void;
  onOpenNotifications: () => void;
}

export const LogisticsHeader = ({
  profile,
  activeTab,
  onNavigateTab,
  unreadCount,
  onOpenLogoutModal,
  onOpenNotifications,
}: LogisticsHeaderProps) => {
  const { t, currentLanguageMeta } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('farmer.welcome', 'Good morning');
    if (hour < 17) return t('farmer.welcome', 'Good afternoon');
    return t('farmer.welcome', 'Good evening');
  };

  return (
    <>
      <header className="bg-[#24352D] dark:bg-[#1D2C25] text-[#F5F1E8] border-b border-[#3B4C41] sticky top-0 z-30 shadow-card select-none transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between gap-3">
            {/* Brand & Greeting */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle border border-farm-gold/40">
                <Truck className="w-6 h-6 text-farm-text" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base sm:text-lg font-display font-bold text-[#F5F1E8] truncate">
                    {getGreeting()}, {profile.driverName.split(' ')[0]}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#1A2922] dark:bg-[#2B3D33] text-farm-gold px-2 py-0.5 rounded-full border border-farm-gold/40">
                    <ShieldCheck className="w-3 h-3 text-farm-gold" />
                    {profile.availabilityStatus}
                  </span>
                </div>
                <p className="text-xs text-[#C0C9BF] truncate">
                  {profile.companyName} &bull; {profile.vehicleNo}
                </p>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Theme Toggle */}
              <ThemeSwitcher size="md" className="bg-[#1A2922] dark:bg-[#2B3D33] border-[#3B4C41] text-[#F5F1E8]" />

              {/* Language Selector Button */}
              <button
                type="button"
                onClick={() => setIsLangModalOpen(true)}
                className="h-10 px-2.5 sm:px-3 rounded-xl bg-[#1A2922] dark:bg-[#2B3D33] border border-[#3B4C41] flex items-center gap-1.5 text-xs font-bold text-[#F5F1E8] hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
                title="Change Language / மொழி மாற்றுக"
                id="logistics-lang-btn"
              >
                <Globe className="w-3.5 h-3.5 text-farm-gold" />
                <span className="font-semibold text-[11px] sm:text-xs">{currentLanguageMeta.native}</span>
              </button>

              {/* Accessibility Button */}
              <button
                type="button"
                onClick={() => setIsAccessModalOpen(true)}
                className="w-10 h-10 rounded-xl bg-[#1A2922] dark:bg-[#2B3D33] border border-[#3B4C41] flex items-center justify-center text-[#F5F1E8] hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
                title="Accessibility Settings / ಸುಲಭ ಪ್ರವೇಶ"
                id="logistics-access-btn"
              >
                <Sliders className="w-4 h-4 text-farm-gold" />
              </button>

              {/* Notifications Button */}
              <button
                type="button"
                onClick={onOpenNotifications}
                className={`relative p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  activeTab === 'notifications'
                    ? 'bg-farm-gold text-farm-text border-farm-gold'
                    : 'bg-[#1A2922] dark:bg-[#2B3D33] text-[#F5F1E8] border-[#3B4C41] hover:bg-[#2B3D33]'
                }`}
                title="Notifications"
                id="logistics-notif-btn"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-farm-terracotta text-white text-[9px] font-bold flex items-center justify-center border border-[#24352D]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Profile Shortcut */}
              <button
                type="button"
                onClick={() => onNavigateTab('profile')}
                className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-farm-gold text-farm-text border-farm-gold'
                    : 'bg-[#1A2922] dark:bg-[#2B3D33] text-[#F5F1E8] border-[#3B4C41] hover:bg-[#2B3D33]'
                }`}
                id="logistics-profile-shortcut-btn"
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={onOpenLogoutModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-terracotta text-white hover:opacity-90 active:scale-95 transition-all shadow-subtle cursor-pointer border border-farm-terracotta"
                title="Switch Role / Logout"
                id="logistics-logout-btn"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Shared Modals */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />

      <AccessibilitySettingsModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </>
  );
};
