import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { 
  BuyerTab, 
  HarvestItem, 
  BuyerInterestRequest, 
  OrderDeliveryItem, 
  TransactionItem, 
  FarmerTab,
  SharedNotificationItem,
  NotificationPreferences,
  SupportRequestItem,
  SupportCategory,
  RoleType
} from '@/types';
import { BuyerHeader } from './BuyerHeader';
import { BuyerNavigation } from './BuyerNavigation';
import { BuyerDashboardView } from './tabs/BuyerDashboardView';
import { BuyerBrowseHarvestsView } from './tabs/BuyerBrowseHarvestsView';
import { BuyerSavedHarvestsView } from './tabs/BuyerSavedHarvestsView';
import { BuyerRequestsView } from './tabs/BuyerRequestsView';
import { BuyerOrdersView } from './tabs/BuyerOrdersView';
import { BuyerPaymentsView } from './tabs/BuyerPaymentsView';
import { BuyerProfileView } from './tabs/BuyerProfileView';
import { BuyerHarvestDetailModal } from './BuyerHarvestDetailModal';
import { BuyerExpressInterestModal } from './BuyerExpressInterestModal';
import { SharedNotificationPanel } from '../common/notifications/SharedNotificationPanel';
import { SharedHelpCenterModal } from '../common/help/SharedHelpCenterModal';
import { NotificationPreferencesModal } from '../common/notifications/NotificationPreferencesModal';
import { FarmLinkAIChatPanel } from '../farmer/chatbot/FarmLinkAIChatPanel';
import { FloatingChatbotButton } from '../farmer/chatbot/FloatingChatbotButton';
import { Footer } from '../common/Footer';
import { 
  INITIAL_AVAILABLE_HARVESTS, 
  INITIAL_SAVED_HARVEST_CODES, 
  INITIAL_BUYER_REQUESTS, 
  INITIAL_BUYER_ORDERS, 
  INITIAL_BUYER_TRANSACTIONS,
  INITIAL_BUYER_PROFILE
} from '@/data/buyerDemoData';
import {
  initialSharedNotifications,
  defaultNotificationPreferences,
  initialSupportRequests
} from '@/data/supportAndFaqData';

interface BuyerDashboardProps {
  onLogout: () => void;
}

export const BuyerDashboard = ({ onLogout }: BuyerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<BuyerTab>('dashboard');
  const [harvests] = useState<HarvestItem[]>(INITIAL_AVAILABLE_HARVESTS);
  const [savedHarvestCodes, setSavedHarvestCodes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('farmlink_buyer_saved_harvests');
      return stored ? JSON.parse(stored) : INITIAL_SAVED_HARVEST_CODES;
    } catch {
      return INITIAL_SAVED_HARVEST_CODES;
    }
  });
  const [requests, setRequests] = useState<BuyerInterestRequest[]>(() => {
    try {
      const stored = localStorage.getItem('farmlink_buyer_requests');
      return stored ? JSON.parse(stored) : INITIAL_BUYER_REQUESTS;
    } catch {
      return INITIAL_BUYER_REQUESTS;
    }
  });
  const [orders] = useState<OrderDeliveryItem[]>(INITIAL_BUYER_ORDERS);
  const [transactions] = useState<TransactionItem[]>(INITIAL_BUYER_TRANSACTIONS);

  // Modals & Shared State
  const [selectedHarvestDetail, setSelectedHarvestDetail] = useState<HarvestItem | null>(null);
  const [selectedInterestHarvest, setSelectedInterestHarvest] = useState<HarvestItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
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

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Buyer Info for Header
  const [buyerBusinessName, setBuyerBusinessName] = useState(INITIAL_BUYER_PROFILE.businessName);
  const [buyerContactName, setBuyerContactName] = useState(INITIAL_BUYER_PROFILE.contactPerson);
  const [buyerLocation, setBuyerLocation] = useState(`${INITIAL_BUYER_PROFILE.city}, ${INITIAL_BUYER_PROFILE.district}`);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('farmlink_buyer_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.businessName) setBuyerBusinessName(parsed.businessName);
        if (parsed.contactPerson) setBuyerContactName(parsed.contactPerson);
        if (parsed.city && parsed.district) setBuyerLocation(`${parsed.city}, ${parsed.district}`);
      }
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Toggle Save / Shortlist
  const handleToggleSave = (harvestCode: string) => {
    setSavedHarvestCodes((prev) => {
      const exists = prev.includes(harvestCode);
      const next = exists ? prev.filter((c) => c !== harvestCode) : [...prev, harvestCode];
      try {
        localStorage.setItem('farmlink_buyer_saved_harvests', JSON.stringify(next));
      } catch {
        // ignore
      }
      showToast(exists ? 'Harvest removed from shortlisted lots.' : 'Harvest saved to your shortlisted lots.');
      return next;
    });
  };

  // Submit Interest Request
  const handleSubmitInterestRequest = (newRequest: BuyerInterestRequest) => {
    setRequests((prev) => {
      const next = [newRequest, ...prev];
      try {
        localStorage.setItem('farmlink_buyer_requests', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast('Your interest request has been submitted.');
  };

  // Notification & Support Handlers
  const handleMarkNotificationRead = (id: string) => {
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

  const handleMarkAllNotificationsRead = () => {
    setSharedNotifications((prev) => {
      const next = prev.map((n) => (n.role === 'buyer' || n.role === 'all' ? { ...n, read: true } : n));
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showToast('All notifications marked as read.');
  };

  const handleDeleteNotification = (id: string) => {
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
    showToast('Notification preferences updated.');
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
      responseNote: 'Thank you for contacting FarmLink Procurement Support. An agent has queued your ticket.',
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
      title: `Support Ticket Logged (${refNum})`,
      description: `Support inquiry "${subject}" submitted successfully.`,
      time: 'Just now',
      category: 'Account',
      read: false,
      role: 'buyer',
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

  const unreadCount = sharedNotifications.filter(
    (n) => (n.role === 'buyer' || n.role === 'all') && !n.read
  ).length;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-farm-bg text-farm-text flex flex-col justify-between relative overflow-x-hidden selection:bg-farm-teal-soft selection:text-farm-teal">
      {/* 1. Buyer Top Header */}
      <BuyerHeader
        businessName={buyerBusinessName}
        contactName={buyerContactName}
        location={buyerLocation}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onLogout={onLogout}
      />

      {/* 2. Responsive Buyer Navigation */}
      <BuyerNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        savedCount={savedHarvestCodes.length}
        requestsCount={requests.length}
        ordersCount={orders.length}
        transactionsCount={transactions.length}
      />

      {/* Toast Alert Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
          >
            <div className="bg-farm-brand text-white p-4 rounded-2xl shadow-elevated border border-farm-brand text-xs font-bold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-farm-gold shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-xs text-white hover:text-farm-gold font-bold"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Main Viewport Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-24 md:pb-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="buyer-tab-dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerDashboardView
                harvests={harvests}
                savedHarvestCodes={savedHarvestCodes}
                requests={requests}
                orders={orders}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onViewHarvest={(h) => setSelectedHarvestDetail(h)}
                onToggleSave={handleToggleSave}
                onExpressInterest={(h) => setSelectedInterestHarvest(h)}
                onOpenAI={(prompt) => {
                  setChatInitialPrompt(prompt || null);
                  setIsChatOpen(true);
                }}
              />
            </motion.div>
          )}

          {/* TAB 2: BROWSE HARVESTS */}
          {activeTab === 'browse' && (
            <motion.div
              key="buyer-tab-browse"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerBrowseHarvestsView
                harvests={harvests}
                savedHarvestCodes={savedHarvestCodes}
                onViewHarvest={(h) => setSelectedHarvestDetail(h)}
                onToggleSave={handleToggleSave}
                onExpressInterest={(h) => setSelectedInterestHarvest(h)}
              />
            </motion.div>
          )}

          {/* TAB 3: SAVED HARVESTS */}
          {activeTab === 'saved' && (
            <motion.div
              key="buyer-tab-saved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerSavedHarvestsView
                harvests={harvests}
                savedHarvestCodes={savedHarvestCodes}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onViewHarvest={(h) => setSelectedHarvestDetail(h)}
                onToggleSave={handleToggleSave}
                onExpressInterest={(h) => setSelectedInterestHarvest(h)}
              />
            </motion.div>
          )}

          {/* TAB 4: MY REQUESTS */}
          {activeTab === 'requests' && (
            <motion.div
              key="buyer-tab-requests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerRequestsView
                requests={requests}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}

          {/* TAB 5: ORDERS */}
          {activeTab === 'orders' && (
            <motion.div
              key="buyer-tab-orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerOrdersView orders={orders} />
            </motion.div>
          )}

          {/* TAB 6: PAYMENTS */}
          {activeTab === 'payments' && (
            <motion.div
              key="buyer-tab-payments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerPaymentsView transactions={transactions} />
            </motion.div>
          )}

          {/* TAB 7: PROFILE */}
          {activeTab === 'profile' && (
            <motion.div
              key="buyer-tab-profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <BuyerProfileView
                onLogout={onLogout}
                onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
                onOpenNotificationPreferences={() => setIsNotifPrefsOpen(true)}
                onShowToast={(msg) => showToast(msg)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Harvest Detail Modal */}
      <BuyerHarvestDetailModal
        isOpen={!!selectedHarvestDetail}
        onClose={() => setSelectedHarvestDetail(null)}
        harvest={selectedHarvestDetail}
        isSaved={selectedHarvestDetail ? savedHarvestCodes.includes(selectedHarvestDetail.harvestCode || selectedHarvestDetail.id) : false}
        onToggleSave={handleToggleSave}
        onExpressInterest={(h) => setSelectedInterestHarvest(h)}
      />

      {/* 5. Express Interest Modal */}
      <BuyerExpressInterestModal
        isOpen={!!selectedInterestHarvest}
        onClose={() => setSelectedInterestHarvest(null)}
        harvest={selectedInterestHarvest}
        onSubmit={handleSubmitInterestRequest}
      />

      {/* 6. Shared Role-Aware Notifications Panel Drawer */}
      <SharedNotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={sharedNotifications}
        userRole="buyer"
        onMarkAsRead={handleMarkNotificationRead}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onDeleteNotification={handleDeleteNotification}
        onNavigateToTab={(tabName) => {
          if (['dashboard', 'browse', 'saved', 'requests', 'orders', 'payments', 'profile'].includes(tabName)) {
            setActiveTab(tabName as BuyerTab);
          }
        }}
      />

      {/* 7. Shared Help Centre Modal */}
      <SharedHelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        userRole="buyer"
        supportRequests={supportRequests}
        onSubmitSupportRequest={handleSubmitSupportRequest}
      />

      {/* 8. Notification Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isNotifPrefsOpen}
        onClose={() => setIsNotifPrefsOpen(false)}
        preferences={notificationPreferences}
        onSavePreferences={handleSaveNotificationPreferences}
      />

      {/* 9. Floating AI Button */}
      <FloatingChatbotButton
        onClick={() => {
          setChatInitialPrompt(null);
          setIsChatOpen(true);
        }}
        isOpen={isChatOpen}
      />

      {/* 10. FarmLink AI Chatbot Panel */}
      <FarmLinkAIChatPanel
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(null);
        }}
        onNavigateTab={(tab: FarmerTab) => {
          setIsChatOpen(false);
          if (tab === 'harvest' || tab === 'market') {
            setActiveTab('browse');
          } else if (tab === 'deliveries') {
            setActiveTab('orders');
          } else if (tab === 'payments') {
            setActiveTab('payments');
          } else if (tab === 'profile') {
            setActiveTab('profile');
          } else {
            setActiveTab('dashboard');
          }
        }}
        onOpenAddHarvest={() => {
          setIsChatOpen(false);
          setActiveTab('browse');
        }}
        onOpenHelpCenter={() => {
          setIsChatOpen(false);
          setIsHelpCenterOpen(true);
        }}
        initialPrompt={chatInitialPrompt}
      />

      {/* 11. Trust Footer */}
      <Footer />
    </div>
  );
};
