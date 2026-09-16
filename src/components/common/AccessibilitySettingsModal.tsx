import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sliders, 
  Type, 
  SunMedium, 
  Eye, 
  Move, 
  Maximize2, 
  RotateCcw,
  Palette
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { useLanguage } from '@/context/LanguageContext';
import { TextSizeMode } from '@/types';
import { ThemeSwitcher } from './ThemeSwitcher';

interface AccessibilitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilitySettingsModal = ({
  isOpen,
  onClose,
}: AccessibilitySettingsModalProps) => {
  const { 
    settings, 
    updateSetting, 
    resetSettings 
  } = useAccessibility();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const currentTextSize: TextSizeMode = settings.textSize || (settings.largerText ? 'larger' : 'default');

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-xl bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {t('accessibility.accessibilityTitle', 'Display & Accessibility')}
                </h3>
                <p className="text-xs text-white/80">
                  {t('accessibility.accessibilityDesc', 'Customize color theme, text sizing, contrast, and layout density.')}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label={t('common.close', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {/* 0. Color Theme (Light / Dark / System) */}
            <div className="space-y-3 pb-4 border-b border-farm-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-farm-brand" />
                  <h4 className="text-sm font-display font-bold text-farm-text">
                    Color Theme Mode
                  </h4>
                </div>
              </div>
              <p className="text-xs text-farm-text-muted">
                Choose Light, Dark, or System mode to adapt comfortably to your environment.
              </p>
              <div className="pt-1">
                <ThemeSwitcher variant="segmented" className="w-full justify-between" />
              </div>
            </div>

            {/* 1. Text Sizing */}
            <div className="space-y-3 pb-4 border-b border-farm-border">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-farm-brand" />
                <h4 className="text-sm font-display font-bold text-farm-text">
                  {t('accessibility.textSize', 'Text Sizing')}
                </h4>
              </div>
              <p className="text-xs text-farm-text-muted">
                {t('accessibility.textSizeDesc', 'Make text easier to read across all screens.')}
              </p>

              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {[
                  { id: 'default', label: t('accessibility.defaultText', 'Default') },
                  { id: 'larger', label: t('accessibility.largerText', 'Larger (+15%)') },
                  { id: 'extra-large', label: t('accessibility.extraLargeText', 'Extra Large (+30%)') },
                ].map((size) => {
                  const isSelected = currentTextSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => updateSetting('textSize', size.id as TextSizeMode)}
                      className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                          : 'bg-farm-surface-muted text-farm-text border-farm-border hover:bg-farm-surface-hover'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. High Contrast Mode */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-farm-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SunMedium className="w-4 h-4 text-farm-brand" />
                  <h4 className="text-sm font-display font-bold text-farm-text">
                    {t('accessibility.highContrast', 'High Contrast Mode')}
                  </h4>
                </div>
                <p className="text-xs text-farm-text-muted">
                  {t('accessibility.highContrastDesc', 'Maximize visual contrast between text and background surfaces.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`w-12 h-7 rounded-full transition-colors relative shrink-0 cursor-pointer p-0.5 ${
                  settings.highContrast ? 'bg-farm-brand' : 'bg-farm-surface-muted border border-farm-border'
                }`}
                role="switch"
                aria-checked={settings.highContrast}
                aria-label={t('accessibility.highContrast', 'High Contrast')}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-farm-surface shadow-subtle transition-transform ${
                    settings.highContrast ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 3. Reduced Motion */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-farm-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Move className="w-4 h-4 text-farm-brand" />
                  <h4 className="text-sm font-display font-bold text-farm-text">
                    {t('accessibility.reducedMotion', 'Reduced Motion')}
                  </h4>
                </div>
                <p className="text-xs text-farm-text-muted">
                  {t('accessibility.reducedMotionDesc', 'Limit animated transitions and page movements.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`w-12 h-7 rounded-full transition-colors relative shrink-0 cursor-pointer p-0.5 ${
                  settings.reducedMotion ? 'bg-farm-brand' : 'bg-farm-surface-muted border border-farm-border'
                }`}
                role="switch"
                aria-checked={settings.reducedMotion}
                aria-label={t('accessibility.reducedMotion', 'Reduced Motion')}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-farm-surface shadow-subtle transition-transform ${
                    settings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 4. Comfortable Spacing */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-farm-border">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-farm-brand" />
                  <h4 className="text-sm font-display font-bold text-farm-text">
                    {t('accessibility.comfortableSpacing', 'Comfortable Spacing')}
                  </h4>
                </div>
                <p className="text-xs text-farm-text-muted">
                  {t('accessibility.comfortableSpacingDesc', 'Enlarge touch targets and spacing for field conditions.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting('comfortableSpacing', !settings.comfortableSpacing)}
                className={`w-12 h-7 rounded-full transition-colors relative shrink-0 cursor-pointer p-0.5 ${
                  settings.comfortableSpacing ? 'bg-farm-brand' : 'bg-farm-surface-muted border border-farm-border'
                }`}
                role="switch"
                aria-checked={!!settings.comfortableSpacing}
                aria-label={t('accessibility.comfortableSpacing', 'Comfortable Spacing')}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-farm-surface shadow-subtle transition-transform ${
                    settings.comfortableSpacing ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* 5. Simple Interface Mode */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-farm-brand" />
                  <h4 className="text-sm font-display font-bold text-farm-text">
                    {t('accessibility.simpleInterface', 'Simple Interface Mode')}
                  </h4>
                </div>
                <p className="text-xs text-farm-text-muted">
                  {t('accessibility.simpleInterfaceDesc', 'Show only essential actions and reduce interface complexity.')}
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateSetting('simpleInterface', !settings.simpleInterface)}
                className={`w-12 h-7 rounded-full transition-colors relative shrink-0 cursor-pointer p-0.5 ${
                  settings.simpleInterface ? 'bg-farm-brand' : 'bg-farm-surface-muted border border-farm-border'
                }`}
                role="switch"
                aria-checked={settings.simpleInterface}
                aria-label={t('accessibility.simpleInterface', 'Simple Interface')}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-farm-surface shadow-subtle transition-transform ${
                    settings.simpleInterface ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-farm-surface-muted px-6 py-4 border-t border-farm-border flex items-center justify-between">
            <button
              type="button"
              onClick={resetSettings}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-text-muted hover:text-farm-danger transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('accessibility.resetDefaults', 'Reset Defaults')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-primary-forest text-xs py-2 px-5 cursor-pointer"
            >
              {t('common.save', 'Save Preferences')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
