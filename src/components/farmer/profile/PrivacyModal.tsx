import { X, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-card overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Privacy & Data Security
              </h2>
              <p className="text-xs text-white/70 font-medium">
                How your personal and agricultural data is protected
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-farm-text/90 leading-relaxed">
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <ShieldCheck className="w-4 h-4 text-farm-brand" />
              <span>Zero Selling of Farmer Data</span>
            </div>
            <p className="text-farm-text-secondary">
              FarmLink does not sell, lease, or monetize your personal identity, contact number, or farmland ownership records to third-party marketing companies.
            </p>
          </div>

          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <CheckCircle2 className="w-4 h-4 text-farm-brand" />
              <span>Minimal Data Collection</span>
            </div>
            <p className="text-farm-text-secondary">
              We only collect information strictly required to coordinate verified buyers, schedule transport trucks, and route direct bank escrow payouts. No sensitive biometric or unnecessary financial data is stored.
            </p>
          </div>

          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <CheckCircle2 className="w-4 h-4 text-farm-brand" />
              <span>Encrypted Communications</span>
            </div>
            <p className="text-farm-text-secondary">
              All communication between your mobile app, Mandi price servers, and logistics coordination is encrypted with industry standard transport protocols.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface-secondary border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
