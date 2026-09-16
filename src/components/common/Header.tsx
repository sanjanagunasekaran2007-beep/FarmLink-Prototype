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
      <header className="w-full bg-farm-navigation text-farm-navigation-text border-b border-farm-border px-4 sm:px-8 py-3.5 sticky top-0 z-30 select-none shadow-card transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Group */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-farm-harvest flex items-center justify-center text-white shadow-subtle border border-farm-market/40">
              <Sprout className="w-5 h-5 text-white" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg text-farm-navigation-text tracking-wider leading-none">
                  {t('common.appName', 'FARMLINK')}
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full bg-farm-navigation-text/10 text-farm-market text-[10px] font-bold tracking-wide uppercase border border-farm-market/40">
                  {t('common.mandiNetwork', 'Live Mandi Network')}
                </span>
              </div>
              <span className="text-[10px] font-medium text-farm-text-muted tracking-wider uppercase mt-0.5">
                {t('common.tagline', 'Intelligent Agricultural Marketplace')}
              </span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Switcher Toggle */}
            <ThemeSwitcher size="md" className="bg-farm-navigation-text/10 border-farm-border text-farm-navigation-text" />

            {/* Language Selector Button */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-farm-border text-xs font-bold text-farm-navigation-text bg-farm-navigation-text/10 hover:bg-farm-navigation-text/20 active:scale-95 transition-all shadow-subtle cursor-pointer"
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
              className="p-2 rounded-xl border border-farm-border text-farm-navigation-text bg-farm-navigation-text/10 hover:bg-farm-navigation-text/20 active:scale-95 transition-all shadow-subtle cursor-pointer"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-farm-border text-xs font-bold text-farm-navigation-text bg-farm-navigation-text/10 hover:bg-farm-navigation-text/20 active:scale-95 transition-all shadow-subtle cursor-pointer"
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
