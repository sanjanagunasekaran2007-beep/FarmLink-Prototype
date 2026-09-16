import { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Trash2, 
  ExternalLink, 
  Truck, 
  CheckCircle2, 
  Wallet, 
  ShoppingBag, 
  User, 
  Megaphone
} from 'lucide-react';
import { SharedNotificationItem, NotificationCategory, RoleType } from '@/types';

interface SharedNotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SharedNotificationItem[];
  userRole: RoleType | 'admin';
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  onNavigateToTab?: (tabName: string) => void;
}

export const SharedNotificationPanel = ({
  isOpen,
  onClose,
  notifications,
  userRole,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onNavigateToTab,
}: SharedNotificationPanelProps) => {
  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  // Filter notifications for this role or universal
  const roleNotifications = notifications.filter(
    (n) => n.role === userRole || n.role === 'all'
  );

  const categories: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All' },
    { id: 'Orders', label: 'Orders' },
    { id: 'Deliveries', label: 'Deliveries' },
    { id: 'Payments', label: 'Payments' },
    { id: 'Marketplace', label: 'Marketplace' },
    { id: 'Account', label: 'Account' },
    { id: 'Announcements', label: 'Announcements' },
  ];

  const filteredNotifications = roleNotifications.filter((n) => {
    const matchesRead = filterType === 'all' || !n.read;
    const matchesCategory =
      selectedCategory === 'ALL' || n.category === selectedCategory;
    return matchesRead && matchesCategory;
  });

  const unreadCount = roleNotifications.filter((n) => !n.read).length;

  const getCategoryIcon = (category: NotificationCategory) => {
    switch (category) {
      case 'Orders':
        return <CheckCircle2 className="w-4 h-4 text-farm-terracotta" />;
      case 'Deliveries':
        return <Truck className="w-4 h-4 text-farm-brand" />;
      case 'Payments':
        return <Wallet className="w-4 h-4 text-farm-brand" />;
      case 'Marketplace':
        return <ShoppingBag className="w-4 h-4 text-farm-gold" />;
      case 'Account':
        return <User className="w-4 h-4 text-farm-terracotta" />;
      case 'Announcements':
        return <Megaphone className="w-4 h-4 text-farm-info" />;
      default:
        return <Bell className="w-4 h-4 text-farm-text" />;
    }
  };

  const handleNotificationClick = (item: SharedNotificationItem) => {
    if (!item.read) {
      onMarkAsRead(item.id);
    }
    if (item.actionLinkTab && onNavigateToTab) {
      onClose();
      onNavigateToTab(item.actionLinkTab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-none select-none animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Drawer Container */}
      <div className="relative w-full max-w-md h-full bg-farm-surface border-l border-farm-border shadow-card flex flex-col justify-between overflow-hidden z-10">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-farm-brand text-white flex items-center justify-between shrink-0 border-b border-farm-brand">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-display font-bold">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-farm-danger text-white">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-[11px] text-farm-text-secondary">
                Live marketplace and dispatch updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="p-1.5 rounded-xl bg-farm-brand text-farm-text-secondary hover:text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="Mark all as read"
              >
                <CheckCheck className="w-4 h-4 text-farm-gold" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-farm-brand text-white hover:bg-farm-brand cursor-pointer"
              aria-label="Close"
              id="close-notifications-panel-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters and Categories */}
        <div className="p-3 bg-farm-surface border-b border-farm-border space-y-2 shrink-0">
          {/* Read / Unread Filter */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 bg-farm-surface p-1 rounded-xl border border-farm-border">
              <button
                type="button"
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-farm-brand text-white'
                    : 'text-farm-text-secondary hover:text-farm-text'
                }`}
              >
                All ({roleNotifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterType('unread')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterType === 'unread'
                    ? 'bg-farm-brand text-white'
                    : 'text-farm-text-secondary hover:text-farm-text'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            <span className="text-[10px] font-bold text-farm-terracotta uppercase tracking-wider">
              {userRole.toUpperCase()} PORTAL
            </span>
          </div>

          {/* Category Chips Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-farm-brand text-white'
                      : 'bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5">
          {filteredNotifications.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-farm-text">
                You&apos;re all caught up.
              </h3>
              <p className="text-xs text-farm-text-secondary max-w-xs mx-auto">
                New updates will appear here as soon as there is activity on your orders, listings, or payments.
              </p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 relative group ${
                  item.read
                    ? 'bg-farm-surface border-farm-border hover:border-farm-brand/40'
                    : 'bg-farm-surface border-farm-gold shadow-subtle'
                }`}
              >
                {/* Category Icon */}
                <div className="p-2 rounded-xl bg-farm-surface border border-farm-border shrink-0 mt-0.5 shadow-subtle">
                  {getCategoryIcon(item.category)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-farm-terracotta">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-farm-text-secondary">
                      {item.time}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-farm-text leading-snug mb-1">
                    {item.title}
                  </h4>

                  <p className="text-xs text-farm-text-secondary leading-relaxed">
                    {item.description}
                  </p>

                  {item.actionLinkTab && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-farm-brand hover:underline">
                      <span>View in {item.category}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Unread Indicator & Delete Button */}
                <div className="flex flex-col items-end justify-between shrink-0 gap-2">
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-farm-danger" />
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNotification(item.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-farm-text-secondary hover:text-farm-danger hover:bg-farm-danger-soft transition-all cursor-pointer"
                    title="Dismiss Notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="p-3 bg-farm-surface border-t border-farm-border text-center text-[11px] text-farm-terracotta shrink-0">
          Illustrative demo notifications &bull; No live push notifications sent
        </div>
      </div>
    </div>
  );
};
