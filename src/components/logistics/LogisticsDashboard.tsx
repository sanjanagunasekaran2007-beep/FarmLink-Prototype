import { useState } from 'react';
import { 
  LogisticsTab, 
  LogisticsDeliveryItem, 
  LogisticsDeliveryStatus, 
  LogisticsProfileData, 
  LogisticsTimelineEvent,
  SharedNotificationItem,
  NotificationPreferences,
  SupportRequestItem,
  SupportCategory,
  RoleType,
  FarmerTab
} from '@/types';
import { 
  initialLogisticsDeliveries, 
  initialLogisticsProfile
} from '@/data/logisticsDemoData';
import {
  initialSharedNotifications,
  defaultNotificationPreferences,
  initialSupportRequests
} from '@/data/supportAndFaqData';
import { LogisticsHeader } from './LogisticsHeader';
import { LogisticsNavigation } from './LogisticsNavigation';
import { LogisticsDashboardView } from './tabs/LogisticsDashboardView';
import { LogisticsDeliveriesView } from './tabs/LogisticsDeliveriesView';
import { LogisticsRouteSummaryView } from './tabs/LogisticsRouteSummaryView';
import { LogisticsHistoryView } from './tabs/LogisticsHistoryView';
import { LogisticsNotificationsView } from './tabs/LogisticsNotificationsView';
import { LogisticsProfileView } from './tabs/LogisticsProfileView';
import { LogisticsDeliveryDetailModal } from './LogisticsDeliveryDetailModal';
import { LogisticsStatusUpdateModal } from './LogisticsStatusUpdateModal';
import { LogisticsPODModal } from './LogisticsPODModal';
import { LogisticsRouteModal } from './LogisticsRouteModal';
import { EditLogisticsProfileModal } from './EditLogisticsProfileModal';
import { LogisticsLogoutConfirmModal } from './LogisticsLogoutConfirmModal';
import { SharedNotificationPanel } from '../common/notifications/SharedNotificationPanel';
import { SharedHelpCenterModal } from '../common/help/SharedHelpCenterModal';
import { NotificationPreferencesModal } from '../common/notifications/NotificationPreferencesModal';
import { FarmLinkAIChatPanel } from '../farmer/chatbot/FarmLinkAIChatPanel';
import { FloatingChatbotButton } from '../farmer/chatbot/FloatingChatbotButton';
import { Footer } from '@/components/common/Footer';
import { CheckCircle2, X } from 'lucide-react';

interface LogisticsDashboardProps {
  onLogout: () => void;
}

export const LogisticsDashboard = ({ onLogout }: LogisticsDashboardProps) => {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<LogisticsTab>('dashboard');
  const [deliveries, setDeliveries] = useState<LogisticsDeliveryItem[]>(initialLogisticsDeliveries);
  const [profile, setProfile] = useState<LogisticsProfileData>(initialLogisticsProfile);
  
  // Shared Modals & Notifications State
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isNotifPrefsOpen, setIsNotifPrefsOpen] = useState(false);

  const [sharedNotifications, setSharedNotifications] = useState<SharedNotificationItem[]>(() => {
    try {
      const stored = localStorage.getItem('farmlink_notifications');
      return stored ? JSON.parse(stored) : initialSharedNotifications;
    } catch {
      return initialSharedNotifications;
    }
  });

  const [supportRequests, setSupportRequests] = useState<SupportRequestItem[]>(() => {
    try {
      const stored = localStorage.getItem('farmlink_support_requests');
      return stored ? JSON.parse(stored) : initialSupportRequests;
    } catch {
      return initialSupportRequests;
    }
  });

  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(() => {
    try {
      const stored = localStorage.getItem('farmlink_notif_prefs');
      return stored ? JSON.parse(stored) : defaultNotificationPreferences;
    } catch {
      return defaultNotificationPreferences;
    }
  });

  // Modals state
  const [selectedDelivery, setSelectedDelivery] = useState<LogisticsDeliveryItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPODModalOpen, setIsPODModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // AI Chatbot State
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState<string | undefined>(undefined);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const unreadCount = sharedNotifications.filter(
    (n) => (n.role === 'logistics' || n.role === 'all') && !n.read
  ).length;

  // View Details
  const handleViewDelivery = (delivery: LogisticsDeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsDetailOpen(true);
  };

  // Open Status Update Modal
  const handleOpenStatusUpdate = (delivery: LogisticsDeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsStatusModalOpen(true);
  };

  // Open Route Summary Modal
  const handleOpenRouteSummary = (delivery: LogisticsDeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsRouteModalOpen(true);
  };

  // Open POD Modal
  const handleOpenPOD = (delivery: LogisticsDeliveryItem) => {
    setSelectedDelivery(delivery);
    setIsPODModalOpen(true);
  };

  // Confirm Status Update
  const handleConfirmStatusUpdate = (
    deliveryId: string,
    newStatus: LogisticsDeliveryStatus,
    note: string
  ) => {
    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          const nowStr = '16 Sep 2026, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const newEvent: LogisticsTimelineEvent = {
            id: `t-${Date.now()}`,
            stage: newStatus,
            title: `Status: ${newStatus}`,
            timestamp: nowStr,
            description: note,
            statusBadge: newStatus,
            isCompleted: true,
            isCurrent: true,
          };

          const updatedTimeline: LogisticsTimelineEvent[] = d.timeline.map((item) => ({
            ...item,
            isCurrent: false,
          }));
          updatedTimeline.push(newEvent);

          return {
            ...d,
            status: newStatus,
            timeline: updatedTimeline,
          };
        }
        return d;
      })
    );

    // Add local notification
    const newNotif: SharedNotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Status Updated: ${selectedDelivery?.deliveryCode}`,
      description: `Delivery status set to ${newStatus}. Note: "${note}"`,
      time: 'Just now',
      category: 'Deliveries',
      read: false,
      role: 'logistics',
      isDemoData: true,
    };
    setSharedNotifications((prev) => [newNotif, ...prev]);

    showToast(`Demo update saved locally. Status changed to ${newStatus}.`);
  };

  // Confirm POD Handover
  const handleConfirmPOD = (
    deliveryId: string,
    method: 'Buyer confirmation' | 'Delivery code verified' | 'Manual confirmation',
    verifiedCode: string,
    receivedBy: string,
    note: string
  ) => {
    const nowStr = '16 Sep 2026, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setDeliveries((prev) =>
      prev.map((d) => {
        if (d.id === deliveryId) {
          const newEvent: LogisticsTimelineEvent = {
            id: `t-${Date.now()}`,
            stage: 'Delivered',
            title: 'Delivered & POD Verified',
            timestamp: nowStr,
            description: `POD confirmed via ${method} (Code: ${verifiedCode}). Received by ${receivedBy}. ${note}`,
            statusBadge: 'Delivered',
            isCompleted: true,
            isCurrent: true,
          };

          const updatedTimeline: LogisticsTimelineEvent[] = d.timeline.map((item) => ({
            ...item,
            isCurrent: false,
          }));
          updatedTimeline.push(newEvent);

          return {
            ...d,
            status: 'Delivered' as LogisticsDeliveryStatus,
            completedDate: nowStr,
            podConfirmation: {
              confirmedAt: nowStr,
              method,
              verifiedCode,
              receivedBy,
              note,
            },
            timeline: updatedTimeline,
          };
        }
        return d;
      })
    );

    const newNotif: SharedNotificationItem = {
      id: `notif-${Date.now()}`,
      title: `POD Recorded: ${selectedDelivery?.deliveryCode}`,
      description: `Consignment marked delivered to ${receivedBy}. Escrow release triggered.`,
      time: 'Just now',
      category: 'Orders',
      read: false,
      role: 'logistics',
      isDemoData: true,
    };
    setSharedNotifications((prev) => [newNotif, ...prev]);

    showToast(`Delivery ${selectedDelivery?.deliveryCode} completed successfully. POD recorded.`);
  };

  // Profile updates
  const handleSaveProfile = (updated: LogisticsProfileData) => {
    setProfile(updated);
    showToast('Fleet profile details saved successfully.');
  };

  const handleUpdateDutyStatus = (status: 'Available' | 'On Duty' | 'Off Duty') => {
    setProfile((prev) => ({ ...prev, availabilityStatus: status }));
    showToast(`Duty status updated to ${status}.`);
  };

  const handleUpdateLanguage = (lang: string) => {
    setProfile((prev) => ({ ...prev, preferredLanguage: lang }));
    showToast(`Preferred language set to ${lang}.`);
  };

  // Shared Notification Actions
  const handleMarkSharedNotificationRead = (id: string) => {
    setSharedNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleMarkAllSharedNotificationsRead = () => {
    setSharedNotifications((prev) => {
      const next = prev.map((n) => (n.role === 'logistics' || n.role === 'all' ? { ...n, read: true } : n));
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast('All fleet notifications marked as read.');
  };

  const handleDeleteSharedNotification = (id: string) => {
    setSharedNotifications((prev) => {
      const next = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast('Notification dismissed.');
  };

  const handleSaveNotificationPreferences = (prefs: NotificationPreferences) => {
    setNotificationPreferences(prefs);
    try {
      localStorage.setItem('farmlink_notif_prefs', JSON.stringify(prefs));
    } catch {
      // ignore
    }
    showToast('Logistics alert preferences saved.');
  };

  const handleSubmitSupportRequest = (
    role: RoleType,
    category: SupportCategory,
    subject: string,
    description: string,
    relatedEntityId?: string
  ) => {
    const refNum = `FL-SUP-${String(supportRequests.length + 1).padStart(3, '0')}`;
    const nowStr = '16 Sep 2026, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newReq: SupportRequestItem = {
      id: `sup-${Date.now()}`,
      referenceId: refNum,
      userRole: role,
      category,
      subject,
      description,
      relatedEntityId,
      createdAt: nowStr,
      status: 'Submitted',
      responseNote: 'FarmLink Dispatch & Transit Operations have received your inquiry.',
      isDemoData: true,
    };

    setSupportRequests((prev) => {
      const next = [newReq, ...prev];
      try {
        localStorage.setItem('farmlink_support_requests', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    const newNotif: SharedNotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Support Ticket Created (${refNum})`,
      description: `Logistics inquiry "${subject}" submitted successfully.`,
      time: 'Just now',
      category: 'Account',
      read: false,
      role: 'logistics',
      isDemoData: true,
    };
    setSharedNotifications((prev) => {
      const next = [newNotif, ...prev];
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    showToast(`Your demo support request has been recorded. Reference: ${refNum}`);
  };

  // FarmLink AI query launcher
  const handleOpenAIWithQuestion = (question: string) => {
    setAiInitialQuestion(question);
    setIsAIOpen(true);
  };

  return (
    <div className="min-h-screen bg-farm-bg text-farm-text flex flex-col justify-between relative overflow-x-hidden selection:bg-farm-gold-soft selection:text-farm-gold">
      {/* 1. TOP HEADER */}
      <LogisticsHeader
        profile={profile}
        activeTab={activeTab}
        onNavigateTab={setActiveTab}
        unreadCount={unreadCount}
        onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
        onOpenNotifications={() => setIsNotificationsPanelOpen(true)}
      />

      {/* 2. NAVIGATION BAR (Desktop sub-header + Mobile bottom bar) */}
      <LogisticsNavigation
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadCount={unreadCount}
      />

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 pt-4 sm:pt-6 pb-20 md:pb-12">
        {activeTab === 'dashboard' && (
          <LogisticsDashboardView
            deliveries={deliveries}
            onNavigateTab={setActiveTab}
            onViewDelivery={handleViewDelivery}
            onOpenStatusUpdate={handleOpenStatusUpdate}
            onOpenRouteSummary={handleOpenRouteSummary}
            onOpenAIWithQuestion={handleOpenAIWithQuestion}
          />
        )}

        {activeTab === 'deliveries' && (
          <LogisticsDeliveriesView
            deliveries={deliveries}
            onViewDelivery={handleViewDelivery}
            onOpenStatusUpdate={handleOpenStatusUpdate}
            onOpenRouteSummary={handleOpenRouteSummary}
            onOpenPOD={handleOpenPOD}
          />
        )}

        {activeTab === 'route' && (
          <LogisticsRouteSummaryView
            deliveries={deliveries}
            onViewDelivery={handleViewDelivery}
            onOpenRouteSummary={handleOpenRouteSummary}
          />
        )}

        {activeTab === 'history' && (
          <LogisticsHistoryView
            deliveries={deliveries}
            onViewDelivery={handleViewDelivery}
          />
        )}

        {activeTab === 'notifications' && (
          <LogisticsNotificationsView
            notifications={sharedNotifications.filter((n) => n.role === 'logistics' || n.role === 'all') as any}
            onMarkAsRead={handleMarkSharedNotificationRead}
            onMarkAllAsRead={handleMarkAllSharedNotificationsRead}
            onClearAll={() => setSharedNotifications((prev) => prev.filter((n) => n.role !== 'logistics'))}
          />
        )}

        {activeTab === 'profile' && (
          <LogisticsProfileView
            profile={profile}
            onOpenEditProfile={() => setIsEditProfileOpen(true)}
            onOpenLogoutModal={() => setIsLogoutModalOpen(true)}
            onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
            onOpenNotificationPreferences={() => setIsNotifPrefsOpen(true)}
            onUpdateLanguage={handleUpdateLanguage}
            onUpdateDutyStatus={handleUpdateDutyStatus}
          />
        )}
      </main>

      {/* Floating FarmLink AI Button for Logistics */}
      <FloatingChatbotButton
        onClick={() => {
          setAiInitialQuestion(undefined);
          setIsAIOpen(true);
        }}
        isOpen={isAIOpen}
      />

      {/* FarmLink AI Chatbot Panel */}
      <FarmLinkAIChatPanel
        isOpen={isAIOpen}
        onClose={() => {
          setIsAIOpen(false);
          setAiInitialQuestion(undefined);
        }}
        onNavigateTab={(tab: FarmerTab) => {
          setIsAIOpen(false);
          if (tab === 'deliveries') {
            setActiveTab('deliveries');
          } else if (tab === 'profile') {
            setActiveTab('profile');
          } else if (tab === 'market' || tab === 'buyers') {
            setActiveTab('route');
          } else {
            setActiveTab('dashboard');
          }
        }}
        onOpenAddHarvest={() => {
          setIsAIOpen(false);
          setActiveTab('deliveries');
        }}
        onOpenHelpCenter={() => {
          setIsAIOpen(false);
          setIsHelpCenterOpen(true);
        }}
        initialPrompt={aiInitialQuestion}
      />

      {/* Shared Notifications Drawer */}
      <SharedNotificationPanel
        isOpen={isNotificationsPanelOpen}
        onClose={() => setIsNotificationsPanelOpen(false)}
        notifications={sharedNotifications}
        userRole="logistics"
        onMarkAsRead={handleMarkSharedNotificationRead}
        onMarkAllAsRead={handleMarkAllSharedNotificationsRead}
        onDeleteNotification={handleDeleteSharedNotification}
        onNavigateToTab={(tabName) => {
          if (['dashboard', 'deliveries', 'route', 'history', 'notifications', 'profile'].includes(tabName)) {
            setActiveTab(tabName as LogisticsTab);
          }
        }}
      />

      {/* Shared Help Centre Modal */}
      <SharedHelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        userRole="logistics"
        supportRequests={supportRequests}
        onSubmitSupportRequest={handleSubmitSupportRequest}
      />

      {/* Notification Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isNotifPrefsOpen}
        onClose={() => setIsNotifPrefsOpen(false)}
        preferences={notificationPreferences}
        onSavePreferences={handleSaveNotificationPreferences}
      />

      {/* MODALS */}
      <LogisticsDeliveryDetailModal
        delivery={selectedDelivery}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenStatusUpdate={handleOpenStatusUpdate}
        onOpenRouteSummary={handleOpenRouteSummary}
        onOpenPOD={handleOpenPOD}
      />

      <LogisticsStatusUpdateModal
        delivery={selectedDelivery}
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirmUpdate={handleConfirmStatusUpdate}
      />

      <LogisticsPODModal
        delivery={selectedDelivery}
        isOpen={isPODModalOpen}
        onClose={() => setIsPODModalOpen(false)}
        onConfirmPOD={handleConfirmPOD}
      />

      <LogisticsRouteModal
        delivery={selectedDelivery}
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
      />

      <EditLogisticsProfileModal
        profile={profile}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      <LogisticsLogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
      />

      {/* TOAST FEEDBACK BANNER */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 animate-slideDown max-w-sm">
          <div className="bg-farm-brand text-white px-4 py-3 rounded-2xl shadow-card flex items-center gap-2.5 text-xs font-bold border border-white/20">
            <CheckCircle2 className="w-4 h-4 text-farm-gold shrink-0" />
            <span className="flex-1 leading-snug">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Trust Footer */}
      <Footer />
    </div>
  );
};
