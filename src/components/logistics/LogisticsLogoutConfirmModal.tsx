import { X, LogOut } from 'lucide-react';

interface LogisticsLogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmLogout: () => void;
}

export const LogisticsLogoutConfirmModal = ({
  isOpen,
  onClose,
  onConfirmLogout,
}: LogisticsLogoutConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn">
      <div className="bg-farm-surface w-full max-w-md rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto p-5 sm:p-6 text-farm-text">
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-farm-danger-soft text-farm-danger flex items-center justify-center">
            <LogOut className="w-6 h-6" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-farm-text-secondary hover:bg-farm-surface-secondary transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-display font-bold text-farm-text mb-2">
          Exit Logistics Fleet Portal?
        </h3>
        <p className="text-xs text-farm-text-secondary leading-relaxed mb-5">
          You will be returned to the FarmLink role selection screen. Your local demo delivery updates and fleet settings will remain active for this browser session.
        </p>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary cursor-pointer"
          >
            Stay on Portal
          </button>
          <button
            type="button"
            onClick={onConfirmLogout}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-danger text-white hover:bg-farm-danger/90 active:scale-95 transition-all shadow-subtle cursor-pointer"
            id="confirm-logistics-logout-btn"
          >
            Confirm Exit
          </button>
        </div>
      </div>
    </div>
  );
};
