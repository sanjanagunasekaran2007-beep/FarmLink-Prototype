import { LogOut, X, AlertTriangle } from 'lucide-react';

interface BuyerLogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const BuyerLogoutConfirmModal = ({
  isOpen,
  onClose,
  onConfirmLogout,
}: BuyerLogoutConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-md shadow-elevated overflow-hidden">
        {/* Top Alert Banner */}
        <div className="bg-farm-brand text-white p-5 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-danger flex items-center justify-center text-white">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                Confirm Log Out
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Buyer Marketplace Session
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 p-3.5 bg-farm-surface rounded-2xl border border-farm-border">
            <AlertTriangle className="w-5 h-5 text-farm-terracotta shrink-0 mt-0.5" />
            <div className="text-xs text-farm-text space-y-1">
              <p className="font-bold">Are you sure you want to log out?</p>
              <p className="text-farm-text-secondary leading-relaxed">
                Your shortlisted harvests, submitted purchase requests, active orders, and payment records will remain safely saved in your local session.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary cursor-pointer text-center"
            >
              Stay Logged In
            </button>
            <button
              type="button"
              onClick={onConfirmLogout}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-farm-danger text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-border"
            >
              <LogOut className="w-4 h-4" />
              <span>Yes, Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
