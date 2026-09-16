import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Sparkles, 
  CheckCircle2
} from 'lucide-react';
import { FarmerTab, HarvestItem, HarvestStatus, OrderDeliveryItem, OrderStatus, TransactionItem, ActivityItem, HarvestFormData, CropCategory, HarvestUnit, MarketPriceItem, InterestRequest, SharedNotificationItem, NotificationPreferences, SupportRequestItem, SupportCategory, RoleType } from '@/types';
import { FarmerHeader } from './FarmerHeader';
import { FarmerNavigation } from './FarmerNavigation';
import { AddHarvestPage } from './harvest/AddHarvestPage';
import { FindBuyersPage } from './buyers/FindBuyersPage';
import { SharedNotificationPanel } from '../common/notifications/SharedNotificationPanel';
import { SharedHelpCenterModal } from '../common/help/SharedHelpCenterModal';
import { NotificationPreferencesModal } from '../common/notifications/NotificationPreferencesModal';
import { MarketPricesSection } from './MarketPricesSection';
import { HarvestSummarySection } from './HarvestSummarySection';
import { QuickActionsSection } from './QuickActionsSection';
import { RecentActivitySection } from './RecentActivitySection';
import { FarmerMarketView } from './tabs/FarmerMarketView';
import { FarmerHarvestView } from './tabs/FarmerHarvestView';
import { FarmerDeliveriesView } from './tabs/FarmerDeliveriesView';
import { FarmerPaymentsView } from './tabs/FarmerPaymentsView';
import { FarmerProfileView } from './tabs/FarmerProfileView';
import { FarmLinkAIChatPanel } from './chatbot/FarmLinkAIChatPanel';
import { AskFarmLinkAISection } from './chatbot/AskFarmLinkAISection';
import { FloatingChatbotButton } from './chatbot/FloatingChatbotButton';
import { Footer } from '../common/Footer';
import { COMPREHENSIVE_MARKET_PRICES } from '@/data/marketPriceData';
import { INITIAL_INTEREST_REQUESTS } from '@/data/buyerData';
import { INITIAL_ORDERS, generateTrackingSteps } from '@/data/orderData';
import { INITIAL_TRANSACTIONS } from '@/data/paymentData';
import { 
  INITIAL_HARVESTS, 
  INITIAL_ACTIVITIES
} from '@/data/farmerDemoData';
import {
  initialSharedNotifications,
  defaultNotificationPreferences,
  initialSupportRequests
} from '@/data/supportAndFaqData';

interface FarmerDashboardProps {
  onLogout: () => void;
}

export const FarmerDashboard = ({ onLogout }: FarmerDashboardProps) => {
  const [activeTab, setActiveTab] = useState<FarmerTab>('home');
  const [harvests, setHarvests] = useState<HarvestItem[]>(INITIAL_HARVESTS);
  const [orders, setOrders] = useState<OrderDeliveryItem[]>(INITIAL_ORDERS);
  const [transactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [interestRequests, setInterestRequests] = useState<InterestRequest[]>(INITIAL_INTEREST_REQUESTS);
  const [isAddHarvestOpen, setIsAddHarvestOpen] = useState(false);
  const [savedDraft, setSavedDraft] = useState<HarvestFormData | null>(null);
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
  const [profileName, setProfileName] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('farmlink_farmer_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.fullName || 'Santhosh Kumar';
      }
    } catch {
      // ignore
    }
    return 'Santhosh Kumar';
  });
  const [profileLocation, setProfileLocation] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('farmlink_farmer_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        return `${parsed.district || 'Tiruvallur'}, ${parsed.state || 'Tamil Nadu'}`;
      }
    } catch {
      // ignore
    }
    return 'Tiruvallur, Tamil Nadu';
  });

  // Load saved draft from localStorage on mount if present
  useEffect(() => {
    try {
      const stored = localStorage.getItem('farmlink_harvest_draft');
      if (stored) {
        setSavedDraft(JSON.parse(stored));
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Add new harvest to active state
  const handleAddHarvest = (newHarvest: HarvestItem) => {
    // Ensure harvestCode is assigned if not provided
    const formattedHarvest: HarvestItem = {
      ...newHarvest,
      harvestCode: newHarvest.harvestCode || `FL-2026-${String(harvests.length + 1).padStart(3, '0')}`,
      status: newHarvest.status || 'Published',
      timeline: newHarvest.timeline || [
        {
          title: 'Listing Published',
          timestamp: 'Just now',
          description: `${newHarvest.quantity} ${newHarvest.unit} of ${newHarvest.cropName} listed on mandi network.`,
          statusBadge: 'Published',
        },
      ],
    };

    setHarvests((prev) => [formattedHarvest, ...prev]);

    // Prepend new activity log
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Your ${formattedHarvest.cropName} harvest was listed`,
      description: `${formattedHarvest.quantity} ${formattedHarvest.unit} of ${formattedHarvest.cropName}${formattedHarvest.variety ? ` (${formattedHarvest.variety})` : ''} listed at ₹${formattedHarvest.expectedPrice}/${formattedHarvest.unit === 'Quintals' ? 'kg' : formattedHarvest.unit}. Sent to verified buyers on Mandi network.`,
      timestamp: 'Just now',
      type: 'listing',
      statusBadge: 'Active Listing',
    };
    setActivities((prev) => [newActivity, ...prev]);

    // Success feedback mandated in spec
    setToastMessage('Your harvest has been added to your demo listings.');
    setTimeout(() => setToastMessage(null), 5000);
    setIsAddHarvestOpen(false);
  };

  const handleUpdateHarvest = (updated: HarvestItem) => {
    setHarvests((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Updated ${updated.cropName} harvest`,
      description: `Harvest ${updated.harvestCode || updated.id} details were updated (${updated.quantity} ${updated.unit}, ₹${updated.expectedPrice}/${updated.unit === 'Quintals' ? 'kg' : updated.unit}).`,
      timestamp: 'Just now',
      type: 'listing',
      statusBadge: 'Details Updated',
    };
    setActivities((prev) => [newActivity, ...prev]);
    setToastMessage('Your harvest details have been updated.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleDeleteHarvest = (harvestId: string) => {
    const itemToDelete = harvests.find((h) => h.id === harvestId);
    setHarvests((prev) => prev.filter((h) => h.id !== harvestId));
    if (itemToDelete) {
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        title: `Deleted ${itemToDelete.cropName} harvest`,
        description: `Harvest ${itemToDelete.harvestCode || itemToDelete.id} removed from farm inventory.`,
        timestamp: 'Just now',
        type: 'listing',
        statusBadge: 'Listing Deleted',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
    setToastMessage('Harvest listing has been deleted.');
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleHarvestStatusChange = (harvestId: string, newStatus: HarvestStatus) => {
    setHarvests((prev) =>
      prev.map((h) => {
        if (h.id === harvestId) {
          const updatedTimeline = h.timeline ? [...h.timeline] : [];
          updatedTimeline.unshift({
            title: `Status changed to ${newStatus}`,
            timestamp: 'Just now',
            description: `Listing status transitioned to ${newStatus}.`,
            statusBadge: newStatus,
          });
          return {
            ...h,
            status: newStatus,
            updatedAt: 'Just now',
            timeline: updatedTimeline,
          };
        }
        return h;
      })
    );

    const item = harvests.find((h) => h.id === harvestId);
    const name = item?.cropName || 'Harvest';
    if (newStatus === 'Published') {
      setToastMessage(`${name} harvest has been published to verified buyers.`);
    } else if (newStatus === 'Draft') {
      setToastMessage(`${name} harvest saved as draft.`);
    } else if (newStatus === 'Completed') {
      setToastMessage(`${name} harvest marked as completed.`);
    } else if (newStatus === 'Archived') {
      setToastMessage(`${name} harvest has been archived.`);
    } else {
      setToastMessage(`${name} status updated to ${newStatus}.`);
    }
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedSteps = generateTrackingSteps(newStatus, order.orderDate, order.expectedDate);
          const updatedTimeline = [...order.timeline];

          if (newStatus === 'Ready for Pickup') {
            updatedTimeline.unshift({
              title: 'Marked Ready for Pickup',
              timestamp: 'Just now',
              description: 'Farmer confirmed harvest lot is graded, crated, and waiting at farmgate.',
              statusBadge: 'Ready for Pickup',
            });
            setToastMessage('The buyer has been notified that your harvest is ready for pickup.');
          } else if (newStatus === 'Completed') {
            updatedTimeline.unshift({
              title: 'Delivery & Escrow Settled',
              timestamp: 'Just now',
              description: 'Delivery acknowledged and escrow payment deposited to farmer account.',
              statusBadge: 'Completed',
            });
            setToastMessage('Order completed and delivery confirmed successfully.');
          } else {
            updatedTimeline.unshift({
              title: `Status changed to ${newStatus}`,
              timestamp: 'Just now',
              description: `Order delivery status transitioned to ${newStatus}.`,
              statusBadge: newStatus,
            });
            setToastMessage(`Order status updated to ${newStatus}.`);
          }

          const newActivity: ActivityItem = {
            id: `act-${Date.now()}`,
            title: `Order ${order.orderCode} updated`,
            description: `${order.cropName} delivery status is now ${newStatus}.`,
            timestamp: 'Just now',
            type: 'delivery',
            statusBadge: newStatus,
          };
          setActivities((prevAct) => [newActivity, ...prevAct]);

          return {
            ...order,
            status: newStatus,
            timeline: updatedTimeline,
            trackingSteps: updatedSteps,
          };
        }
        return order;
      })
    );
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleSaveDraft = (draftData: HarvestFormData) => {
    setSavedDraft(draftData);
  };

  const handleAddInterestRequest = (request: InterestRequest) => {
    setInterestRequests((prev) => [request, ...prev]);
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      title: `Interest request sent to ${request.buyerName}`,
      description: `Sent direct harvest offer for ${request.quantity} ${request.unit} of ${request.cropName}. Preferred pickup: ${request.preferredPickupDate}.`,
      timestamp: 'Just now',
      type: 'buyer',
      statusBadge: 'Interest Sent',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // Pre-fill Add Harvest with specific crop intelligence from Market Prices
  const handleOpenAddHarvestWithCrop = (crop: MarketPriceItem) => {
    const cropDraft: HarvestFormData = {
      cropName: crop.cropName,
      category: (crop.category as CropCategory) || 'Vegetables',
      variety: crop.variety || '',
      grade: 'Grade A',
      quantity: '30',
      unit: crop.unit === 'kg' ? 'Quintals' : (crop.unit as HarvestUnit) || 'Quintals',
      expectedPrice: crop.price.toString(),
      priceType: 'Fixed expected price',
      harvestDate: 'Tomorrow, 7:00 AM',
      availableFrom: 'Ready for Immediate Dispatch',
      state: crop.state || 'Tamil Nadu',
      district: crop.district || 'Dindigul',
      village: 'Reddiarchatram',
      pickupLocation: `Farm Plot 4B, Near ${crop.marketLocation}`,
      imageUrl: null,
      description: `Fresh batch of ${crop.cropName}${crop.variety ? ` (${crop.variety})` : ''} ready for collection based on regional mandi modal rate ₹${crop.price}/${crop.unit}.`,
      farmingMethod: 'Natural farming',
    };
    setSavedDraft(cropDraft);
    setIsAddHarvestOpen(true);
  };

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
      const next = prev.map((n) => (n.role === 'farmer' || n.role === 'all' ? { ...n, read: true } : n));
      try {
        localStorage.setItem('farmlink_notifications', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setToastMessage('All notifications marked as read.');
    setTimeout(() => setToastMessage(null), 4000);
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
    setToastMessage('Notification dismissed.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveNotificationPreferences = (prefs: NotificationPreferences) => {
    setNotificationPreferences(prefs);
    try {
      localStorage.setItem('farmlink_notif_prefs', JSON.stringify(prefs));
    } catch {
      // ignore
    }
    setToastMessage('Notification preferences updated.');
    setTimeout(() => setToastMessage(null), 4000);
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
      responseNote: 'Thank you for reaching out. FarmLink support team has queued your ticket for review.',
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

    // Add local demo notification
    const newNotif: SharedNotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Support Ticket Created (${refNum})`,
      description: `Your query "${subject}" was logged in demo support history.`,
      time: 'Just now',
      category: 'Account',
      read: false,
      role: 'farmer',
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

    setToastMessage(`Your demo support request has been recorded. Reference: ${refNum}`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const unreadCount = sharedNotifications.filter(
    (n) => (n.role === 'farmer' || n.role === 'all') && !n.read
  ).length;

  return (
    <div className="min-h-screen min-h-[100dvh] bg-farm-bg text-farm-text flex flex-col justify-between relative overflow-x-hidden selection:bg-farm-terracotta-soft selection:text-farm-terracotta">
      {/* 1. Solid Dark Charcoal Header */}
      <FarmerHeader
        farmerName={profileName}
        location={profileLocation}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setActiveTab('profile')}
        onLogout={onLogout}
      />

      {/* 2. Responsive Dark Charcoal Navigation (Desktop sub-header + Mobile bottom bar) */}
      <FarmerNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        harvestCount={harvests.length}
        ordersCount={orders.length}
        transactionsCount={transactions.length}
      />

      {/* Toast Alert */}
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

      {/* 3. Main Dashboard Viewport on Warm Sand (#F3EBDD) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-24 md:pb-10">
        <AnimatePresence mode="wait">
          {/* TAB 1: HOME OVERVIEW */}
          {activeTab === 'home' && (
            <motion.div
              key="tab-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* SOLID TERRACOTTA PRIMARY ACTION SECTION (NOT GREEN) */}
              <div className="bg-farm-terracotta text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden select-none border border-farm-border">
                <div className="space-y-2 max-w-xl z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-surface-secondary text-white text-[11px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-farm-text-secondary" />
                    <span>Direct Farmgate Listing</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-white">
                    Ready to sell your harvest?
                  </h1>

                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
                    List your fresh produce and connect with verified buyers across Tamil Nadu, Karnataka & Maharashtra with guaranteed escrow payment.
                  </p>
                </div>

                <div className="z-10 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsAddHarvestOpen(true)}
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-farm-surface text-farm-text font-display font-bold text-sm sm:text-base hover:bg-farm-surface active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2.5 cursor-pointer border border-farm-terracotta/40"
                    id="hero-add-harvest-btn"
                  >
                    <PlusCircle className="w-5 h-5 text-farm-terracotta" />
                    <span>+ Add Harvest</span>
                  </button>
                </div>
              </div>

              {/* QUICK ACTIONS WITH DISTINCT COLOR IDENTITIES */}
              <QuickActionsSection
                onOpenAddHarvest={() => setIsAddHarvestOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />

              {/* ASK FARMLINK AI SECTION */}
              <AskFarmLinkAISection
                onOpenChat={(prompt) => {
                  setChatInitialPrompt(prompt || null);
                  setIsChatOpen(true);
                }}
              />

              {/* TODAY'S APMC MARKET PRICES WITH DISTINCT CROP ACCENTS */}
              <MarketPricesSection
                prices={COMPREHENSIVE_MARKET_PRICES}
                onViewAll={() => setActiveTab('market')}
              />

              {/* MY HARVEST SUMMARY WITH MULTI-COLOUR STATS */}
              <HarvestSummarySection
                harvests={harvests}
                onViewAllHarvests={() => setActiveTab('harvest')}
              />

              {/* RECENT HARVEST & TRADE ACTIVITY */}
              <RecentActivitySection activities={activities} />
            </motion.div>
          )}

          {/* TAB 2: MARKET PRICES VIEW */}
          {activeTab === 'market' && (
            <motion.div
              key="tab-market"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FarmerMarketView
                onOpenAddHarvestWithCrop={handleOpenAddHarvestWithCrop}
                onOpenAddHarvest={() => setIsAddHarvestOpen(true)}
              />
            </motion.div>
          )}

          {/* TAB 3: FIND BUYERS VIEW */}
          {activeTab === 'buyers' && (
            <motion.div
              key="tab-buyers"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FindBuyersPage
                harvests={harvests}
                interestRequests={interestRequests}
                onAddInterestRequest={handleAddInterestRequest}
              />
            </motion.div>
          )}

          {/* TAB 4: MY HARVEST VIEW */}
          {activeTab === 'harvest' && (
            <motion.div
              key="tab-harvest"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FarmerHarvestView
                harvests={harvests}
                onOpenAddHarvest={() => setIsAddHarvestOpen(true)}
                onUpdateHarvest={handleUpdateHarvest}
                onDeleteHarvest={handleDeleteHarvest}
                onStatusChange={handleHarvestStatusChange}
              />
            </motion.div>
          )}

          {/* TAB 5: DELIVERIES VIEW */}
          {activeTab === 'deliveries' && (
            <motion.div
              key="tab-deliveries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FarmerDeliveriesView 
                orders={orders}
                onNavigateHarvest={() => setActiveTab('harvest')}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
            </motion.div>
          )}

          {/* TAB 6: PAYMENTS & TRANSACTIONS VIEW */}
          {activeTab === 'payments' && (
            <motion.div
              key="tab-payments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FarmerPaymentsView
                transactions={transactions}
                onNavigateOrders={() => setActiveTab('deliveries')}
              />
            </motion.div>
          )}

          {/* TAB 7: PROFILE VIEW */}
          {activeTab === 'profile' && (
            <motion.div
              key="tab-profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FarmerProfileView 
                onLogout={onLogout} 
                onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
                onOpenNotificationPreferences={() => setIsNotifPrefsOpen(true)}
                onShowToast={(msg) => {
                  setToastMessage(msg);
                  setTimeout(() => setToastMessage(null), 5000);
                  try {
                    const stored = localStorage.getItem('farmlink_farmer_profile');
                    if (stored) {
                      const parsed = JSON.parse(stored);
                      if (parsed.fullName) setProfileName(parsed.fullName);
                      if (parsed.district && parsed.state) setProfileLocation(`${parsed.district}, ${parsed.state}`);
                    }
                  } catch {
                    // ignore
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Full Experience Add Harvest Page / Modal View */}
      {isAddHarvestOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-farm-surface-secondary">
          <AddHarvestPage
            onClose={() => setIsAddHarvestOpen(false)}
            onPublishHarvest={handleAddHarvest}
            onSaveDraft={handleSaveDraft}
            initialDraft={savedDraft}
          />
        </div>
      )}

      {/* 5. Shared Role-Aware Notifications Panel Drawer */}
      <SharedNotificationPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={sharedNotifications}
        userRole="farmer"
        onMarkAsRead={handleMarkNotificationRead}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onDeleteNotification={handleDeleteNotification}
        onNavigateToTab={(tabName) => {
          if (['home', 'market', 'buyers', 'harvest', 'deliveries', 'payments', 'profile'].includes(tabName)) {
            setActiveTab(tabName as FarmerTab);
          }
        }}
      />

      {/* 6. Shared Help Centre Modal with Role FAQs & Support Form */}
      <SharedHelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        userRole="farmer"
        supportRequests={supportRequests}
        onSubmitSupportRequest={handleSubmitSupportRequest}
      />

      {/* 7. Notification Preferences Modal */}
      <NotificationPreferencesModal
        isOpen={isNotifPrefsOpen}
        onClose={() => setIsNotifPrefsOpen(false)}
        preferences={notificationPreferences}
        onSavePreferences={handleSaveNotificationPreferences}
      />

      {/* 8. Floating AI Chatbot Button */}
      <FloatingChatbotButton
        onClick={() => {
          setChatInitialPrompt(null);
          setIsChatOpen(true);
        }}
        isOpen={isChatOpen}
      />

      {/* 9. FarmLink AI Chatbot Panel */}
      <FarmLinkAIChatPanel
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(null);
        }}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsChatOpen(false);
        }}
        onOpenAddHarvest={() => {
          setIsChatOpen(false);
          setIsAddHarvestOpen(true);
        }}
        onOpenHelpCenter={() => {
          setIsChatOpen(false);
          setIsHelpCenterOpen(true);
        }}
        initialPrompt={chatInitialPrompt}
      />

      {/* 10. Trust Footer */}
      <Footer />
    </div>
  );
};
