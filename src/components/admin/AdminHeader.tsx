import { useState } from 'react';
import { Sprout, Bell, HelpCircle, LogOut, Globe, Sliders } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { LanguageSelectorModal } from '../common/LanguageSelectorModal';
import { AccessibilitySettingsModal } from '../common/AccessibilitySettingsModal';

interface AdminHeaderProps {
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenHelpCenter: () => void;
  onExitAdmin: () => void;
}

export const AdminHeader = ({
  unreadNotificationCount,
  onOpenNotifications,
  onOpenHelpCenter,
  onExitAdmin,
}: AdminHeaderProps) => {
  const { t, currentLanguageMeta } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-farm-surface dark:bg-[#111A16] text-farm-text dark:text-[#F5F1E8] border-b border-farm-border px-4 sm:px-8 py-3.5 sticky top-0 z-40 select-none shadow-card transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#24352D] dark:bg-[#1D2C25] flex items-center justify-center text-[#F5F1E8] dark:text-[#91C39B] shadow-subtle border border-farm-gold/40 shrink-0">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="farmlink-logo-text whitespace-nowrap font-display font-bold text-base sm:text-lg text-[#24352D] dark:text-[#F5F1E8] tracking-wider leading-none">
                  FARMLINK
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-farm-surface-secondary dark:bg-[#1A2922] text-farm-gold text-[10px] font-bold tracking-wide uppercase border border-farm-gold/40 whitespace-nowrap">
                  {t('roles.admin', 'Admin')}
                </span>
              </div>
              <span className="text-[10px] font-medium text-farm-text-secondary tracking-wider uppercase mt-0.5 hidden xs:block truncate max-w-[180px] sm:max-w-none">
                {t('admin.workspaceSubtitle', 'Platform Governance & Simulation Ledger')}
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <ThemeSwitcher size="md" className="bg-farm-surface-secondary dark:bg-[#1A2922] border-farm-border text-farm-text dark:text-[#F5F1E8]" />

            {/* Language Selector Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-farm-surface-secondary dark:bg-[#1A2922] border border-farm-border flex items-center gap-1.5 text-xs font-bold text-farm-text dark:text-[#F5F1E8] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
              title="Change Language / மொழி மாற்றுக"
              id="admin-lang-btn"
            >
              <Globe className="w-3.5 h-3.5 text-farm-gold" />
              <span className="font-semibold text-[11px] sm:text-xs">{currentLanguageMeta.native}</span>
            </button>

            {/* Accessibility Button */}
            <button
              type="button"
              onClick={() => setIsAccessModalOpen(true)}
              className="p-2 rounded-xl bg-farm-surface-secondary dark:bg-[#1A2922] border border-farm-border text-farm-text dark:text-[#F5F1E8] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] transition-colors cursor-pointer"
              title="Accessibility Settings / ಸುಲಭ ಪ್ರವೇಶ"
              id="admin-access-btn"
            >
              <Sliders className="w-4 h-4 text-farm-gold" />
            </button>

            {/* Notifications Trigger */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="p-2 rounded-xl bg-farm-surface-secondary dark:bg-[#1A2922] border border-farm-border text-farm-text dark:text-[#F5F1E8] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] transition-colors relative cursor-pointer"
              aria-label="View platform notifications"
              id="admin-notifications-btn"
            >
              <Bell className="w-4 h-4 text-farm-gold" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-farm-terracotta text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Help Center Trigger */}
            <button
              type="button"
              onClick={onOpenHelpCenter}
              className="p-2 rounded-xl bg-farm-surface-secondary dark:bg-[#1A2922] border border-farm-border text-farm-text dark:text-[#F5F1E8] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] transition-colors cursor-pointer"
              aria-label="Platform Help Center"
              id="admin-help-center-btn"
            >
              <HelpCircle className="w-4 h-4 text-farm-gold" />
            </button>

            {/* Exit Admin Button */}
            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-farm-terracotta text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-subtle cursor-pointer border border-farm-terracotta"
              id="admin-exit-btn"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exit Admin</span>
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
