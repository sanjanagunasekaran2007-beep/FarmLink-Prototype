import { useState } from 'react';
import { ShoppingBag, Bell, MapPin, User, LogOut, Globe, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { LanguageSelectorModal } from '../common/LanguageSelectorModal';
import { AccessibilitySettingsModal } from '../common/AccessibilitySettingsModal';

interface BuyerHeaderProps {
  businessName?: string;
  contactName?: string;
  location?: string;
  unreadCount?: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const BuyerHeader = ({
  businessName = 'FreshMart Agro Wholesale',
  contactName = 'Rajesh Patel',
  location = 'Koyambedu, Chennai, Tamil Nadu',
  unreadCount = 2,
  onOpenNotifications,
  onOpenProfile,
  onLogout,
}: BuyerHeaderProps) => {
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
      <header className="w-full bg-[#24352D] dark:bg-[#1D2C25] text-[#F5F1E8] border-b border-[#3B4C41] px-4 sm:px-8 py-3.5 sticky top-0 z-30 select-none shadow-card transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand Emblem & Buyer Greeting */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-teal flex items-center justify-center text-white shadow-subtle shrink-0 border border-farm-gold/40">
              <ShoppingBag className="w-5 h-5 text-white" strokeWidth={2.4} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-base sm:text-lg text-[#F5F1E8] leading-tight">
                  {getGreeting()}, {contactName.split(' ')[0]}
                </h2>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-[#1A2922] dark:bg-[#2B3D33] text-farm-teal text-[10px] font-bold uppercase border border-farm-teal/40">
                  {t('roles.buyer', 'Institutional Buyer')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#C0C9BF] font-medium mt-0.5">
                <span className="font-bold text-[#F5F1E8] truncate max-w-[140px] sm:max-w-none">
                  {businessName}
                </span>
                <span className="text-[#91A095] hidden sm:inline">&bull;</span>
                <MapPin className="w-3.5 h-3.5 text-farm-gold hidden sm:inline shrink-0" />
                <span className="truncate max-w-[160px] sm:max-w-none text-[#C0C9BF] hidden sm:inline">
                  {location}
                </span>
                <span className="text-[#91A095] hidden sm:inline">&bull;</span>
                <span className="text-[10px] text-farm-gold bg-[#1A2922] px-2 py-0.5 rounded-full hidden lg:inline border border-[#3B4C41] font-semibold">
                  Demo Marketplace Data
                </span>
              </div>
            </div>
          </div>

          {/* Right: Theme, Language, Accessibility, Notifications, Profile & Logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <ThemeSwitcher size="md" className="bg-[#1A2922] dark:bg-[#2B3D33] border-[#3B4C41] text-[#F5F1E8]" />

            {/* Language Selector Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="h-10 px-2.5 sm:px-3 rounded-xl bg-[#1A2922] dark:bg-[#2B3D33] border border-[#3B4C41] flex items-center gap-1.5 text-xs font-bold text-[#F5F1E8] hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
              title="Change Language / மொழி மாற்றுக"
              id="buyer-lang-btn"
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
              id="buyer-access-btn"
            >
              <Sliders className="w-4 h-4 text-farm-gold" />
            </button>

            {/* Notifications Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="w-10 h-10 rounded-xl bg-[#1A2922] dark:bg-[#2B3D33] border border-[#3B4C41] flex items-center justify-center text-[#F5F1E8] hover:bg-[#2B3D33] active:scale-95 transition-all relative shadow-subtle cursor-pointer"
              aria-label="Open notifications"
              id="buyer-notif-btn"
            >
              <Bell className="w-4 h-4 text-[#F5F1E8]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-farm-terracotta text-white text-[9px] font-bold flex items-center justify-center border border-[#24352D]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Buyer Profile Button */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-[#1A2922] dark:bg-[#2B3D33] border border-[#3B4C41] text-xs font-bold text-[#F5F1E8] hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
              title="View Buyer Profile"
              id="buyer-profile-btn"
            >
              <User className="w-3.5 h-3.5 text-farm-gold" />
              <span>Profile</span>
            </button>

            {/* Logout / Switch Role Button */}
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 h-10 px-3 rounded-xl bg-farm-terracotta text-white hover:opacity-90 active:scale-95 transition-all text-xs font-bold shadow-subtle cursor-pointer border border-farm-terracotta"
              title="Switch Role / Logout"
              id="buyer-logout-btn"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Exit</span>
            </button>
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
