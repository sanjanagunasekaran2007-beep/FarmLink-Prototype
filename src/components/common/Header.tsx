import { useState } from 'react';
import { Sprout, RotateCcw, Globe, Sliders } from 'lucide-react';
import { AppView } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ThemeSwitcher } from './ThemeSwitcher';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { AccessibilitySettingsModal } from './AccessibilitySettingsModal';

interface HeaderProps {
  currentView: AppView;
  onReplay: () => void;
  onSkipSplash: () => void;
}

export const Header = ({
  currentView,
  onReplay,
  onSkipSplash,
}: HeaderProps) => {
  const isSplash = currentView === 'splash';
  const { t, currentLanguageMeta } = useLanguage();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-farm-surface dark:bg-[#111A16] text-farm-text dark:text-[#F5F1E8] border-b border-farm-border px-4 sm:px-8 py-3.5 sticky top-0 z-30 select-none shadow-card transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Group */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#24352D] dark:bg-[#1D2C25] flex items-center justify-center text-[#F5F1E8] dark:text-[#91C39B] shadow-subtle border border-farm-gold/40 shrink-0">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="farmlink-logo-text whitespace-nowrap font-display font-bold text-base sm:text-lg text-[#24352D] dark:text-[#F5F1E8] tracking-wider leading-none">
                  {t('common.appName', 'FARMLINK')}
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-farm-surface-secondary dark:bg-[#1A2922] text-farm-market text-[10px] font-bold tracking-wide uppercase border border-farm-market/40 whitespace-nowrap">
                  {t('common.mandiNetwork', 'Live Mandi Network')}
                </span>
              </div>
              <span className="text-[10px] font-medium text-farm-text-muted tracking-wider uppercase mt-0.5 hidden xs:block truncate max-w-[180px] sm:max-w-none">
                {t('common.tagline', 'Intelligent Agricultural Marketplace')}
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
            {/* Theme Switcher Toggle */}
            <ThemeSwitcher size="md" className="bg-farm-surface-secondary dark:bg-[#1A2922] border-farm-border text-farm-text dark:text-[#F5F1E8]" />

            {/* Language Selector Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-farm-border text-xs font-bold text-farm-text dark:text-[#F5F1E8] bg-farm-surface-secondary dark:bg-[#1A2922] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
              id="header-lang-btn"
              title="Change Language / மொழி மாற்றுக"
            >
              <Globe className="w-3.5 h-3.5 text-farm-market" />
              <span className="font-semibold">{currentLanguageMeta.native}</span>
            </button>

            {/* Accessibility Button */}
            <button
              type="button"
              onClick={() => setIsAccessModalOpen(true)}
              className="p-2 rounded-xl border border-farm-border text-farm-text dark:text-[#F5F1E8] bg-farm-surface-secondary dark:bg-[#1A2922] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
              id="header-access-btn"
              title="Accessibility Settings / ಸುಲಭ ಪ್ರವೇಶ"
            >
              <Sliders className="w-4 h-4 text-farm-market" />
            </button>

            {isSplash ? (
              <button
                type="button"
                onClick={onSkipSplash}
                className="px-3.5 py-2 rounded-xl border border-farm-harvest text-xs font-bold text-white bg-farm-harvest hover:opacity-90 active:scale-95 transition-all shadow-subtle cursor-pointer"
                id="skip-splash-button"
              >
                Skip Intro
              </button>
            ) : (
              <button
                type="button"
                onClick={onReplay}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-farm-border text-xs font-bold text-farm-text dark:text-[#F5F1E8] bg-farm-surface-secondary dark:bg-[#1A2922] hover:bg-farm-surface-hover dark:hover:bg-[#2B3D33] active:scale-95 transition-all shadow-subtle cursor-pointer"
                id="replay-intro-button"
              >
                <RotateCcw className="w-3.5 h-3.5 text-farm-market" />
                <span className="hidden sm:inline">Replay Intro</span>
              </button>
            )}
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
