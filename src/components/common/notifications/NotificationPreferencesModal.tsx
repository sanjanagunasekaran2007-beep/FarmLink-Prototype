import { useState } from 'react';
import { X, Bell, Check, AlertCircle } from 'lucide-react';
import { NotificationPreferences } from '@/types';

interface NotificationPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: NotificationPreferences;
  onSavePreferences: (prefs: NotificationPreferences) => void;
}

export const NotificationPreferencesModal = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}: NotificationPreferencesModalProps) => {
  if (!isOpen) return null;

  const [orderUpdates, setOrderUpdates] = useState(preferences.orderUpdates);
  const [deliveryUpdates, setDeliveryUpdates] = useState(preferences.deliveryUpdates);
  const [paymentUpdates, setPaymentUpdates] = useState(preferences.paymentUpdates);
  const [marketplaceUpdates, setMarketplaceUpdates] = useState(preferences.marketplaceUpdates);
  const [announcements, setAnnouncements] = useState(preferences.announcements);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      onSavePreferences({
        orderUpdates,
        deliveryUpdates,
        paymentUpdates,
        marketplaceUpdates,
        announcements,
      });
      setIsSaving(false);
      onClose();
    }, 250);
  };

  const toggles = [
    {
      id: 'orders',
      title: 'Order & Contract Updates',
      desc: 'Notifications when an order is placed, accepted, or confirmed.',
      checked: orderUpdates,
      onChange: setOrderUpdates,
    },
    {
      id: 'deliveries',
      title: 'Delivery & Transport Tracking',
      desc: 'Vehicle dispatch, pickup reminders, and transit milestone alerts.',
      checked: deliveryUpdates,
      onChange: setDeliveryUpdates,
    },
    {
      id: 'payments',
      title: 'Payment & Escrow Settlements',
      desc: 'Escrow deposit verification, payout releases, and invoice receipts.',
      checked: paymentUpdates,
      onChange: setPaymentUpdates,
    },
    {
      id: 'marketplace',
      title: 'Marketplace & Price Movements',
      desc: 'Mandi spot price alerts, buyer interest requests, and new harvest listings.',
      checked: marketplaceUpdates,
      onChange: setMarketplaceUpdates,
    },
    {
      id: 'announcements',
      title: 'FarmLink Community & Weather Advisories',
      desc: 'Regional agricultural weather advisories and platform announcements.',
      checked: announcements,
      onChange: setAnnouncements,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-lg rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0 border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold">
                Notification Preferences
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Manage alerts for trade, transit, and payments
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-farm-text-secondary hover:text-white hover:bg-farm-brand cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Toggles */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-4 text-farm-text overflow-y-auto">
          {/* Disclaimer */}
          <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border flex items-start gap-2.5 text-xs text-farm-terracotta">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Local Demo Preferences:</strong> These are local demo preferences. No real notifications or SMS alerts are sent to phone numbers.
            </p>
          </div>

          <div className="space-y-3">
            {toggles.map((item) => (
              <label
                key={item.id}
                className="p-3.5 rounded-2xl border border-farm-border bg-farm-surface hover:bg-farm-surface transition-all flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold text-farm-text block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-farm-text-secondary leading-relaxed block mt-0.5">
                    {item.desc}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.onChange(e.target.checked)}
                  className="w-5 h-5 rounded-lg text-farm-brand focus:ring-farm-brand mt-0.5 cursor-pointer shrink-0"
                />
              </label>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle cursor-pointer disabled:opacity-50"
              id="save-notif-prefs-btn"
            >
              <Check className="w-3.5 h-3.5" />
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
