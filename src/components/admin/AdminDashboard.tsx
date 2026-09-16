import { useState } from 'react';
import { 
  AdminTab, 
  AdminUserStatus, 
  AdminListingStatus, 
  AdminUserItem, 
  AdminListingItem, 
  AdminOrderItem, 
  AdminActivityItem, 
  AdminReportItem, 
  AdminMetrics, 
  SharedNotificationItem, 
  NotificationPreferences, 
  SupportRequestItem, 
  RoleType, 
  SupportCategory 
} from '../../types';
import { 
  initialAdminMetrics, 
  initialAdminUsers, 
  initialAdminListings, 
  initialAdminOrders, 
  initialAdminActivities, 
  initialAdminReports 
} from '../../data/adminDemoData';
import { 
  initialSharedNotifications, 
  defaultNotificationPreferences, 
  initialSupportRequests 
} from '../../data/supportAndFaqData';

import { AdminHeader } from './AdminHeader';
import { AdminNavigation } from './AdminNavigation';
import { AdminDashboardView } from './tabs/AdminDashboardView';
import { AdminUsersView } from './tabs/AdminUsersView';
import { AdminListingsView } from './tabs/AdminListingsView';
import { AdminOrdersView } from './tabs/AdminOrdersView';
import { AdminActivityView } from './tabs/AdminActivityView';
import { AdminReportsView } from './tabs/AdminReportsView';
import { AdminSettingsView } from './tabs/AdminSettingsView';

import { SharedNotificationPanel } from '../common/notifications/SharedNotificationPanel';
import { NotificationPreferencesModal } from '../common/notifications/NotificationPreferencesModal';
import { SharedHelpCenterModal } from '../common/help/SharedHelpCenterModal';
import { Footer } from '../common/Footer';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Core Demo Datasets in State
  const [metrics, setMetrics] = useState<AdminMetrics>(initialAdminMetrics);
  const [users, setUsers] = useState<AdminUserItem[]>(initialAdminUsers);
  const [listings, setListings] = useState<AdminListingItem[]>(initialAdminListings);
  const [orders, setOrders] = useState<AdminOrderItem[]>(initialAdminOrders);
  const [activities, setActivities] = useState<AdminActivityItem[]>(initialAdminActivities);
  const [reports, setReports] = useState<AdminReportItem[]>(initialAdminReports);

  // Shared System State
  const [notifications, setNotifications] = useState<SharedNotificationItem[]>(initialSharedNotifications);
  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(defaultNotificationPreferences);
  const [supportRequests, setSupportRequests] = useState<SupportRequestItem[]>(initialSupportRequests);

  // Modals Visibility
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isPrefsModalOpen, setIsPrefsModalOpen] = useState(false);

  // Unread Admin Notifications Count
  const unreadNotificationsCount = notifications.filter(
    (n) => (n.role === 'admin' || n.role === 'all') && !n.read
  ).length;

  // Pending items count for navigation badges
  const pendingReviewsCount = listings.filter((l) => l.status === 'Pending Review').length;

  // ==========================================
  // DEMO DATA MANIPULATION HANDLERS
  // ==========================================

  // Update User Status (Active / Pending Review / Inactive)
  const handleUpdateUserStatus = (userId: string, newStatus: AdminUserStatus) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, status: newStatus };
        }
        return u;
      })
    );

    const targetUser = users.find((u) => u.id === userId);
    const userName = targetUser ? targetUser.name : userId;

    // Append to activity log
    const newActivity: AdminActivityItem = {
      id: `act-${Date.now()}`,
      title: `User Status Updated to ${newStatus}`,
      description: `Account status for "${userName}" was changed to ${newStatus} by Admin.`,
      timestamp: 'Just now',
      category: 'Users',
      relatedModule: 'User Management',
      severity: newStatus === 'Active' ? 'success' : newStatus === 'Inactive' ? 'warning' : 'info',
      isDemoData: true,
    };
    setActivities((prev) => [newActivity, ...prev]);

    // Recalculate pending users count
    setTimeout(() => {
      setMetrics((prev) => {
        const pendingCount = users.filter((u) => u.id !== userId ? u.status === 'Pending Review' : newStatus === 'Pending Review').length;
        return { ...prev, pendingUsersReview: pendingCount };
      });
    }, 50);
  };

  // Update Listing Status (Published / Paused / Archived)
  const handleUpdateListingStatus = (listingId: string, newStatus: AdminListingStatus) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          return { ...item, status: newStatus };
        }
        return item;
      })
    );

    const targetListing = listings.find((l) => l.id === listingId);
    const cropTitle = targetListing ? `${targetListing.cropName} (${targetListing.listingId})` : listingId;

    // Append activity
    const newActivity: AdminActivityItem = {
      id: `act-${Date.now()}`,
      title: `Listing Status Changed: ${newStatus}`,
      description: `Harvest listing for ${cropTitle} was set to "${newStatus}".`,
      timestamp: 'Just now',
      category: 'Listings',
      relatedModule: 'Harvest Listings',
      severity: newStatus === 'Published' ? 'success' : newStatus === 'Paused' ? 'warning' : 'info',
      isDemoData: true,
    };
    setActivities((prev) => [newActivity, ...prev]);

    // Update active listings & pending review metrics
    setTimeout(() => {
      setMetrics((prev) => {
        const activeCount = listings.filter((l) => l.id !== listingId ? l.status === 'Published' : newStatus === 'Published').length;
        const pendingCount = listings.filter((l) => l.id !== listingId ? l.status === 'Pending Review' : newStatus === 'Pending Review').length;
        return {
          ...prev,
          activeListings: activeCount,
          pendingListingsReview: pendingCount,
        };
      });
    }, 50);
  };

  // Safe Demo Data Reset
  const handleResetDemoData = () => {
    setMetrics(initialAdminMetrics);
    setUsers(initialAdminUsers);
    setListings(initialAdminListings);
    setOrders(initialAdminOrders);
    setActivities([
      {
        id: `act-reset-${Date.now()}`,
        title: 'Demo Environment Reset',
        description: 'All demonstration metrics, user statuses, and harvest lots reset to baseline.',
        timestamp: 'Just now',
        category: 'System',
        relatedModule: 'Admin Settings',
        severity: 'info',
        isDemoData: true,
      },
      ...initialAdminActivities,
    ]);
    setReports(initialAdminReports);
    setNotifications(initialSharedNotifications);
  };

  // ==========================================
  // NOTIFICATIONS HANDLERS
  // ==========================================
  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.role === 'admin' || n.role === 'all' ? { ...n, read: true } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmitSupportRequest = (
    role: RoleType,
    category: SupportCategory,
    subject: string,
    description: string,
    relatedEntityId?: string
  ) => {
    const newReq: SupportRequestItem = {
      id: `req-adm-${Date.now()}`,
      referenceId: `REF-ADM-${Math.floor(1000 + Math.random() * 9000)}`,
      userRole: role,
      category,
      subject,
      description,
      relatedEntityId,
      createdAt: 'Just now',
      status: 'Submitted',
      responseNote: 'Demonstration inquiry logged in platform system queue.',
      isDemoData: true,
    };
    setSupportRequests((prev) => [newReq, ...prev]);
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-farm-bg text-farm-text flex flex-col justify-between relative overflow-x-hidden selection:bg-farm-brand-soft selection:text-farm-brand">
      {/* 1. Admin Header */}
      <AdminHeader
        unreadNotificationCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationPanelOpen(true)}
        onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
        onExitAdmin={onLogout}
      />

      {/* 2. Admin Navigation Sub-Header */}
      <AdminNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'notifications') {
            setIsNotificationPanelOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        pendingReviewsCount={pendingReviewsCount}
        unreadNotificationsCount={unreadNotificationsCount}
      />

      {/* 3. Main Tab Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 pb-24 md:pb-12">
        {activeTab === 'dashboard' && (
          <AdminDashboardView
            metrics={metrics}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'users' && (
          <AdminUsersView
            users={users}
            onUpdateUserStatus={handleUpdateUserStatus}
          />
        )}

        {activeTab === 'listings' && (
          <AdminListingsView
            listings={listings}
            onUpdateListingStatus={handleUpdateListingStatus}
          />
        )}

        {activeTab === 'orders' && (
          <AdminOrdersView
            orders={orders}
          />
        )}

        {activeTab === 'activity' && (
          <AdminActivityView
            activities={activities}
          />
        )}

        {activeTab === 'reports' && (
          <AdminReportsView
            reports={reports}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettingsView
            onOpenNotificationsPrefs={() => setIsPrefsModalOpen(true)}
            onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
            onResetDemoData={handleResetDemoData}
          />
        )}
      </main>

      {/* 4. Shared Notification Panel */}
      <SharedNotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
        userRole="admin"
        onMarkAsRead={handleMarkNotificationAsRead}
        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
        onDeleteNotification={handleDeleteNotification}
        onNavigateToTab={(tabName) => {
          setIsNotificationPanelOpen(false);
          if (tabName === 'users' || tabName === 'listings' || tabName === 'orders' || tabName === 'activity') {
            setActiveTab(tabName as AdminTab);
          }
        }}
      />

      {/* 5. Notification Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isPrefsModalOpen}
        onClose={() => setIsPrefsModalOpen(false)}
        preferences={notificationPrefs}
        onSavePreferences={(newPrefs) => setNotificationPrefs(newPrefs)}
      />

      {/* 6. Help Center & Support Modal */}
      <SharedHelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        userRole="admin"
        supportRequests={supportRequests}
        onSubmitSupportRequest={handleSubmitSupportRequest}
      />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};
