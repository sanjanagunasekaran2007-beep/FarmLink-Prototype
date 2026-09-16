import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface AdminActionConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'success' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminActionConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel,
  cancelLabel = 'Cancel',
  variant = 'warning',
  onConfirm,
  onCancel,
}: AdminActionConfirmModalProps) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-farm-danger" />,
          iconBg: '#FDEAE8',
          btnBg: '#B94A48',
          btnHover: '#9a3d3b',
          btnText: '#FFFDF7',
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-farm-text-secondary" />,
          iconBg: '#FFF3D6',
          btnBg: '#D9A441',
          btnHover: '#c29135',
          btnText: '#17211C',
        };
      case 'success':
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-farm-brand" />,
          iconBg: '#E8EFE5',
          btnBg: '#164A36',
          btnHover: '#113a2b',
          btnText: '#FFFDF7',
        };
      case 'primary':
      default:
        return {
          icon: <Info className="w-6 h-6 text-farm-brand" />,
          iconBg: '#E8EFE5',
          btnBg: '#17211C',
          btnHover: '#24332C',
          btnText: '#FFFDF7',
        };
    }
  };

  const style = getVariantStyles();

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-md bg-farm-surface rounded-2xl border border-farm-border shadow-subtle overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 pt-6 pb-2 flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-farm-border"
              style={{ backgroundColor: style.iconBg }}
            >
              {style.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-display font-bold text-farm-text">
                {title}
              </h3>
              <p className="text-xs text-farm-text-secondary mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Demo Notice Banner */}
          <div className="mx-6 my-4 p-3 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text-secondary">
            <strong className="text-farm-text">Demo Simulation Notice:</strong> This action only modifies in-memory demonstration state in your current session. No real files or accounts are affected.
          </div>

          {/* Buttons */}
          <div className="bg-farm-surface px-6 py-4 border-t border-farm-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-brand-soft transition-colors cursor-pointer"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-subtle cursor-pointer"
              style={{
                backgroundColor: style.btnBg,
                color: style.btnText,
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
