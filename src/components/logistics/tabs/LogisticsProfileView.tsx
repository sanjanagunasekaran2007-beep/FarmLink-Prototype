import { useState } from 'react';
import { 
  Building2, 
  Truck, 
  Globe, 
  HelpCircle, 
  LogOut, 
  Edit3, 
  Bell, 
  Eye, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { LogisticsProfileData } from '@/types';

interface LogisticsProfileViewProps {
  profile: LogisticsProfileData;
  onOpenEditProfile: () => void;
  onOpenLogoutModal: () => void;
  onOpenHelpCenter?: () => void;
  onOpenNotificationPreferences?: () => void;
  onUpdateLanguage: (lang: string) => void;
  onUpdateDutyStatus: (status: 'Available' | 'On Duty' | 'Off Duty') => void;
}

export const LogisticsProfileView = ({
  profile,
  onOpenEditProfile,
  onOpenLogoutModal,
  onOpenHelpCenter,
  onOpenNotificationPreferences,
  onUpdateLanguage,
  onUpdateDutyStatus,
}: LogisticsProfileViewProps) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  // Settings Toggles
  const [notifySms, setNotifySms] = useState(true);
  const [notifyApp, setNotifyApp] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  ];

  const faqs = [
    {
      id: 'faq-1',
      question: 'How are farm delivery trips assigned to my vehicle?',
      answer: 'When a buyer confirms a harvest order, the Mandi Dispatch Engine matches verified logistics vehicles based on load capacity, refrigerated unit availability, and operating highway corridor.',
    },
    {
      id: 'faq-2',
      question: 'What is required to complete an electronic Proof of Delivery (POD)?',
      answer: 'At the destination warehouse, the receiving officer verifies crate quantities, inspects produce freshness, and enters a 4-digit digital code or signs the electronic receiving manifest. This immediately releases the escrow payment.',
    },
    {
      id: 'faq-3',
      question: 'What should I do if a collection centre has a loading delay?',
      answer: 'Update your delivery status note to "Delayed at loading bay". The farmer coordinator and destination warehouse receive an automated dispatch notification.',
    },
    {
      id: 'faq-4',
      question: 'Are cold-chain temperature logs recorded during transit?',
      answer: 'Yes, for perishable produce like tomatoes, berries, and mushrooms, maintain the reefer unit between 6°C and 8°C. The temperature log is confirmed upon dock arrival.',
    },
  ];

  return (
    <div className="space-y-6 select-none pb-8">
      {/* Top Banner / Identity Card */}
      <div className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-2xl shadow-subtle shrink-0">
              {profile.driverName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-text">
                  {profile.driverName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-farm-brand-soft text-farm-brand border border-farm-brand/20">
                  Verified Fleet Driver
                </span>
              </div>
              <p className="text-xs sm:text-sm text-farm-text-secondary mt-0.5 font-medium">
                {profile.companyName}
              </p>
              <p className="text-xs text-farm-terracotta mt-1 font-mono">
                License: {profile.drivingLicenseNo} &bull; Plate: {profile.vehicleNo}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenEditProfile}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle cursor-pointer shrink-0 self-start sm:self-center"
            id="open-edit-profile-btn"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Duty Status Switcher */}
      <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle">
        <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text-secondary mb-3">
          Duty & Availability Status
        </h3>
        <div className="grid grid-cols-3 gap-2.5">
          {(['Available', 'On Duty', 'Off Duty'] as const).map((status) => {
            const isSelected = profile.availabilityStatus === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onUpdateDutyStatus(status)}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${
                  isSelected
                    ? status === 'On Duty'
                      ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                      : status === 'Available'
                      ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                      : 'bg-farm-terracotta text-white border-farm-terracotta shadow-subtle'
                    : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fleet & Operational Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vehicle & Freight Details */}
        <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-farm-border">
            <Truck className="w-4 h-4 text-farm-brand" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
              Vehicle & Cargo Capability
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-farm-border/50">
              <span className="text-farm-text-secondary">Vehicle Type:</span>
              <strong className="font-bold text-farm-text text-right">{profile.vehicleType}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-farm-border/50">
              <span className="text-farm-text-secondary">Plate Registration:</span>
              <strong className="font-mono font-bold text-farm-brand">{profile.vehicleNo}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-farm-border/50">
              <span className="text-farm-text-secondary">Experience:</span>
              <strong className="font-bold text-farm-text">{profile.experienceYears} Years</strong>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-farm-text-secondary">Completed Trips:</span>
              <strong className="font-bold text-farm-brand">{profile.totalDeliveriesCompleted} Deliveries</strong>
            </div>
          </div>
        </div>

        {/* Operating Corridors & Contact */}
        <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-farm-border">
            <Building2 className="w-4 h-4 text-farm-brand" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
              Contact & Corridors
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-farm-border/50">
              <span className="text-farm-text-secondary">Mobile (Demo):</span>
              <strong className="font-mono text-farm-text">{profile.mobile}</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-farm-border/50">
              <span className="text-farm-text-secondary">Email:</span>
              <strong className="text-farm-text">{profile.email}</strong>
            </div>
            <div className="pt-1">
              <span className="text-farm-text-secondary block mb-1">Operating Corridors:</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.preferredCorridors.map((c, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-medium bg-farm-surface text-farm-text px-2.5 py-1 rounded-xl border border-farm-border"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Preference */}
      <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-farm-brand" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
            Preferred Language / மொழி / भाषा
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {languages.map((lang) => {
            const isSelected =
              profile.preferredLanguage.toLowerCase() === lang.label.toLowerCase() ||
              profile.preferredLanguage.toLowerCase() === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onUpdateLanguage(lang.label)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                    : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                }`}
              >
                <div className="text-xs font-bold">{lang.native}</div>
                <div className={`text-[10px] ${isSelected ? 'text-farm-text-secondary' : 'text-farm-text-secondary'}`}>
                  {lang.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification Preferences & Accessibility */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Notification Preferences */}
        <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-farm-border">
            <Bell className="w-4 h-4 text-farm-brand" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
              Notification Preferences
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-farm-text">SMS Dispatch Alerts</span>
              <input
                type="checkbox"
                checked={notifySms}
                onChange={(e) => setNotifySms(e.target.checked)}
                className="w-4 h-4 rounded text-farm-brand focus:ring-farm-brand"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-farm-text">In-App Urgent Reminders</span>
              <input
                type="checkbox"
                checked={notifyApp}
                onChange={(e) => setNotifyApp(e.target.checked)}
                className="w-4 h-4 rounded text-farm-brand focus:ring-farm-brand"
              />
            </label>

            {onOpenNotificationPreferences && (
              <div className="pt-2 border-t border-farm-border">
                <button
                  type="button"
                  onClick={onOpenNotificationPreferences}
                  className="w-full py-2 px-3 rounded-xl bg-farm-surface hover:bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-farm-terracotta" />
                  <span>Configure Alert Preferences</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Accessibility Settings */}
        <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-farm-border">
            <Eye className="w-4 h-4 text-farm-brand" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
              Accessibility Settings
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-farm-text">High Contrast Mode</span>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={(e) => setHighContrast(e.target.checked)}
                className="w-4 h-4 rounded text-farm-brand focus:ring-farm-brand"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-farm-text">Large Text Readability</span>
              <input
                type="checkbox"
                checked={largeText}
                onChange={(e) => setLargeText(e.target.checked)}
                className="w-4 h-4 rounded text-farm-brand focus:ring-farm-brand"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Help & FAQs */}
      <div className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-farm-border">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-farm-brand" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text">
              Logistics FAQs & Operations Guide
            </h3>
          </div>

          {onOpenHelpCenter && (
            <button
              type="button"
              onClick={onOpenHelpCenter}
              className="px-3.5 py-1.5 rounded-xl bg-farm-brand text-white hover:bg-farm-brand-hover text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-subtle self-start sm:self-auto"
            >
              <HelpCircle className="w-3.5 h-3.5 text-farm-gold" />
              <span>Open Help Centre & Submit Ticket</span>
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-farm-border overflow-hidden bg-farm-surface"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs font-bold text-farm-text cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-farm-text-secondary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-farm-text-secondary shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-3.5 pt-0 text-xs text-farm-text-secondary leading-relaxed border-t border-farm-border/40 bg-farm-surface">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout Action */}
      <div className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-bold text-farm-text">Exit Fleet Session</h4>
          <p className="text-xs text-farm-text-secondary">Return to role selection and authentication portal</p>
        </div>
        <button
          type="button"
          onClick={onOpenLogoutModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-danger border border-farm-border hover:bg-farm-danger-soft hover:border-farm-danger transition-all cursor-pointer"
          id="profile-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};
