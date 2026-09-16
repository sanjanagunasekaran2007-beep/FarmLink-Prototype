import { motion } from 'framer-motion';
import { X, Bell, TrendingUp, CheckCircle2, Truck, Info, CheckCheck } from 'lucide-react';
import { NotificationItem } from '@/types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationsModal = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
}: NotificationsModalProps) => {
  if (!isOpen) return null;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'price':
        return <TrendingUp className="w-4 h-4 text-farm-brand" />;
      case 'order':
        return <CheckCircle2 className="w-4 h-4 text-farm-terracotta" />;
      case 'delivery':
        return <Truck className="w-4 h-4 text-farm-brand" />;
      default:
        return <Info className="w-4 h-4 text-farm-text-secondary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-farm-brand/40 backdrop-blur-none flex items-center justify-center sm:justify-end p-3 sm:p-6 overflow-hidden select-none">
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md h-full max-h-[85vh] sm:max-h-[90vh] bg-farm-surface rounded-3xl border border-farm-border shadow-elevated flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-farm-border bg-farm-surface flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-farm-brand">
                Mandi & Trade Alerts
              </h3>
              <p className="text-[11px] text-farm-text-secondary">Real-time agricultural network updates</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-center text-farm-text-secondary hover:text-farm-text cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-farm-text-secondary">
              No unread alerts at this time.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                  n.read
                    ? 'bg-farm-surface border-farm-border'
                    : 'bg-farm-surface border-farm-brand/30'
                }`}
              >
                <div className="p-2 rounded-xl bg-farm-surface border border-farm-border shrink-0 mt-0.5">
                  {getNotifIcon(n.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-farm-text leading-snug">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-farm-text-secondary shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-farm-text-secondary leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-farm-border bg-farm-surface flex items-center justify-between">
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-bold text-farm-brand hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
