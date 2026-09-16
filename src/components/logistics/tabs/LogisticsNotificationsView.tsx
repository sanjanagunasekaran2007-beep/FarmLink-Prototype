import { useState } from 'react';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Truck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { LogisticsNotificationItem } from '@/types';

interface LogisticsNotificationsViewProps {
  notifications: LogisticsNotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export const LogisticsNotificationsView = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
}: LogisticsNotificationsViewProps) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredList = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'assigned':
        return <Truck className="w-4 h-4 text-farm-brand" />;
      case 'pickup':
        return <Clock className="w-4 h-4 text-farm-gold" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-farm-brand" />;
      default:
        return <Bell className="w-4 h-4 text-farm-terracotta" />;
    }
  };

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-text">
              Fleet Alerts & Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-farm-danger text-white text-xs font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-farm-text-secondary mt-1">
            Dispatch updates, upcoming pickup reminders, and electronic POD signoff alerts
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-brand-soft text-farm-brand hover:bg-farm-brand-soft border border-farm-brand/30 transition-all cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Mark All Read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-danger hover:bg-farm-danger-soft border border-farm-border transition-all cursor-pointer"
              title="Clear Notifications"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-farm-brand text-white shadow-subtle'
              : 'bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary'
          }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filter === 'unread'
              ? 'bg-farm-brand text-white shadow-subtle'
              : 'bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary'
          }`}
        >
          Unread Only ({unreadCount})
        </button>
      </div>

      {/* Notifications Feed */}
      {filteredList.length === 0 ? (
        <div className="bg-farm-surface p-10 rounded-3xl border border-farm-border text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-farm-text">
            {filter === 'unread' ? 'No unread notifications' : 'No notifications in inbox'}
          </h3>
          <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
            Dispatch alerts, pickup schedules, and proof of delivery confirmations will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => onMarkAsRead(item.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                item.read
                  ? 'bg-farm-surface border-farm-border'
                  : 'bg-farm-surface border-farm-gold shadow-subtle'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                  item.read ? 'bg-farm-surface' : 'bg-farm-surface border border-farm-border'
                }`}>
                  {getIcon(item.type)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-farm-text">
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-farm-danger shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-farm-text-secondary leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-farm-terracotta font-medium mt-1.5 block">
                    {item.time}
                  </span>
                </div>
              </div>

              {!item.read && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(item.id);
                  }}
                  className="text-[11px] font-bold text-farm-brand hover:underline shrink-0"
                >
                  Mark read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
