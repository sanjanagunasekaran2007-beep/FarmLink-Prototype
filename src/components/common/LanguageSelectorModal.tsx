import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Check, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { SupportedLanguageCode } from '../../types';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageSelectorModal = ({
  isOpen,
  onClose,
}: LanguageSelectorModalProps) => {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();

  if (!isOpen) return null;

  const handleSelectLanguage = (code: SupportedLanguageCode) => {
    setLanguage(code);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-farm-surface rounded-3xl border border-farm-border shadow-subtle overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-brand">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  {t('common.selectLanguage', 'Select Language')}
                </h3>
                <p className="text-xs text-farm-text-secondary/80">
                  Choose your preferred regional language
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-farm-brand text-farm-text-secondary hover:bg-farm-brand transition-colors cursor-pointer"
              aria-label={t('common.close', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: 6 Languages Grid */}
          <div className="p-6 overflow-y-auto space-y-3">
            <p className="text-xs text-farm-text-secondary mb-2">
              The entire application interface will adapt to your selected language.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportedLanguages.map((lang) => {
                const isSelected = language === lang.code;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start justify-between cursor-pointer group ${
                      isSelected
                        ? 'bg-farm-brand-soft border-farm-brand ring-1 ring-farm-brand'
                        : 'bg-farm-surface border-farm-border hover:bg-farm-surface hover:border-farm-brand/40'
                    }`}
                    id={`lang-btn-${lang.code}`}
                  >
                    <div className="space-y-1">
                      <div className="text-base font-display font-bold text-farm-text group-hover:text-farm-brand transition-colors">
                        {lang.native}
                      </div>
                      <div className="text-xs font-semibold text-farm-text-secondary">
                        {lang.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-farm-terracotta pt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{lang.region}</span>
                      </div>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-farm-brand text-white flex items-center justify-center shrink-0 mt-0.5 shadow-subtle">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-farm-border bg-farm-surface shrink-0 mt-0.5 group-hover:border-farm-brand" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-farm-surface px-6 py-3.5 border-t border-farm-border flex items-center justify-between">
            <span className="text-xs text-farm-text-secondary">
              FarmLink Multilingual Network
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
            >
              {t('common.confirm', 'Done')}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
