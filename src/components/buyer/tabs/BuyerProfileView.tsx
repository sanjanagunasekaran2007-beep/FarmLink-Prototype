import { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  FileText, 
  Lock, 
  Type, 
  Sun, 
  ZapOff, 
  Layers,
  Truck,
  Check,
  Bell,
  HelpCircle
} from 'lucide-react';
import { BuyerProfileData, AccessibilitySettings } from '@/types';
import { INITIAL_BUYER_PROFILE } from '@/data/buyerDemoData';
import { INITIAL_ACCESSIBILITY_SETTINGS, SUPPORTED_LANGUAGES } from '@/data/profileData';
import { EditBuyerProfileModal } from '../EditBuyerProfileModal';
import { BuyerLogoutConfirmModal } from '../BuyerLogoutConfirmModal';
import { TermsModal } from '@/components/farmer/profile/TermsModal';
import { PrivacyModal } from '@/components/farmer/profile/PrivacyModal';

interface BuyerProfileViewProps {
  onLogout: () => void;
  onOpenHelpCenter?: () => void;
  onOpenNotificationPreferences?: () => void;
  onShowToast?: (msg: string) => void;
}

export const BuyerProfileView = ({ 
  onLogout, 
  onOpenHelpCenter,
  onOpenNotificationPreferences,
  onShowToast 
}: BuyerProfileViewProps) => {
  const [profile, setProfile] = useState<BuyerProfileData>(() => {
    try {
      const stored = localStorage.getItem('farmlink_buyer_profile');
      return stored ? JSON.parse(stored) : INITIAL_BUYER_PROFILE;
    } catch {
      return INITIAL_BUYER_PROFILE;
    }
  });

  const [selectedLang, setSelectedLang] = useState<string>(() => {
    try {
      return localStorage.getItem('farmlink_language') || 'English';
    } catch {
      return 'English';
    }
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem('farmlink_accessibility');
      return stored ? JSON.parse(stored) : INITIAL_ACCESSIBILITY_SETTINGS;
    } catch {
      return INITIAL_ACCESSIBILITY_SETTINGS;
    }
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Sync Accessibility Settings to Document Element for Realtime UI Updates
  useEffect(() => {
    try {
      localStorage.setItem('farmlink_accessibility', JSON.stringify(accessibility));
    } catch {
      // ignore
    }

    if (accessibility.largerText) {
      document.body.classList.add('larger-text-mode');
      document.documentElement.setAttribute('data-larger-text', 'true');
    } else {
      document.body.classList.remove('larger-text-mode');
      document.documentElement.removeAttribute('data-larger-text');
    }

    if (accessibility.highContrast) {
      document.body.classList.add('high-contrast-mode');
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.body.classList.remove('high-contrast-mode');
      document.documentElement.removeAttribute('data-high-contrast');
    }

    if (accessibility.reducedMotion) {
      document.body.classList.add('reduced-motion-mode');
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    } else {
      document.body.classList.remove('reduced-motion-mode');
      document.documentElement.removeAttribute('data-reduced-motion');
    }
  }, [accessibility]);

  const handleSaveProfile = (updated: BuyerProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('farmlink_buyer_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
    if (onShowToast) onShowToast('Your buyer profile has been updated.');
  };

  const handleLanguageSelect = (langName: string) => {
    setSelectedLang(langName);
    try {
      localStorage.setItem('farmlink_language', langName);
    } catch {
      // ignore
    }
    if (onShowToast) onShowToast(`Preferred language updated to ${langName}.`);
  };

  const handleToggleAccessibility = (key: keyof AccessibilitySettings) => {
    setAccessibility((prev) => ({ ...prev, [key]: !prev[key] }));
    if (onShowToast) onShowToast('Accessibility settings updated.');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none pb-8">
      {/* 1. Profile Header Card */}
      <section 
        aria-label="Buyer Profile Header"
        className="bg-farm-surface p-5 sm:p-7 rounded-3xl border border-farm-border shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Avatar with Terracotta/Deep Forest */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-farm-terracotta text-white flex items-center justify-center font-display font-bold text-2xl sm:text-3xl shadow-subtle shrink-0 border-2 border-farm-border">
            <Building2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-brand">
                {profile.businessName}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border">
                <ShieldCheck className="w-3.5 h-3.5 text-farm-brand" />
                <span>{profile.buyerType}</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-farm-terracotta shrink-0" />
              <span>{profile.city}, {profile.district}, {profile.state}</span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-border">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{profile.verificationStatus}</span>
              </span>
              <span className="text-[11px] text-farm-text-secondary bg-farm-surface-secondary px-2.5 py-1 rounded-xl border border-farm-border">
                Contact: {profile.contactPerson}
              </span>
            </div>
          </div>
        </div>

        {/* Edit Button */}
        <div className="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
            id="buyer-edit-profile-btn"
          >
            <Edit3 className="w-4 h-4 text-farm-gold" />
            <span>Edit Profile</span>
          </button>
        </div>
      </section>

      {/* 2-Column Info & Preferences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Business Entity Credentials */}
        <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <Building2 className="w-4 h-4" />
              </div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Entity & Contact Information
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-farm-brand hover:text-farm-terracotta flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-farm-text">
            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Business Name</span>
              <span className="font-bold">{profile.businessName}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Contact Person</span>
              <span className="font-bold">{profile.contactPerson}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-farm-brand" />
                <span>Mobile Number</span>
              </span>
              <span className="font-bold font-mono text-farm-brand">{profile.mobile}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-farm-brand" />
                <span>Email Address</span>
              </span>
              <span className="font-bold font-mono truncate max-w-[180px] sm:max-w-none">{profile.email}</span>
            </div>

            <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border flex items-center justify-between">
              <span className="text-farm-text-secondary font-medium">GST Identification</span>
              <span className="font-bold font-mono text-farm-text">{profile.gstNumber || '33AABCF1234F1Z8'}</span>
            </div>
          </div>
        </section>

        {/* Procurement Preferences */}
        <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <Truck className="w-4 h-4 text-farm-brand" />
              </div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Procurement Preferences
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="text-xs font-bold text-farm-brand hover:text-farm-terracotta flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-farm-text">
            <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border space-y-1.5">
              <span className="text-farm-text-secondary font-medium block text-[11px]">Target Procurement Crops</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.preferredCrops.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-lg bg-farm-brand-soft text-farm-brand font-bold text-[11px] border border-farm-border"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Default Fulfillment</span>
              <span className="font-bold text-farm-brand">{profile.preferredFulfillment}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">FSSAI Food License</span>
              <span className="font-bold font-mono text-farm-text">{profile.fssaiNumber || '12422003000542'}</span>
            </div>

            <div className="p-3 rounded-xl bg-farm-brand-soft border border-farm-border flex items-center gap-2 text-[11px] text-farm-brand">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Verified Institutional Buyer on Mandi Escrow Network</span>
            </div>
          </div>
        </section>
      </div>

      {/* Language Preferences */}
      <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-farm-border">
          <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
            <Globe className="w-4 h-4 text-farm-brand" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-farm-brand">
              Application Language Preference
            </h2>
            <p className="text-xs text-farm-text-secondary">
              Choose preferred language for harvest alerts and contract notices
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.name;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageSelect(lang.name)}
                className={`p-3.5 rounded-2xl text-center border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                    : 'bg-farm-surface text-farm-text border-farm-border hover:border-farm-brand'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="font-display font-bold text-sm">{lang.native}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-farm-gold" />}
                </div>
                <span className={`text-[11px] font-medium ${isSelected ? 'text-farm-text-secondary' : 'text-farm-text-secondary'}`}>
                  {lang.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Accessibility Settings */}
      <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-farm-border">
          <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
            <Layers className="w-4 h-4 text-farm-brand" />
          </div>
          <div>
            <h2 className="font-display font-bold text-base text-farm-brand">
              Accessibility Settings
            </h2>
            <p className="text-xs text-farm-text-secondary">
              Adjust readability and display comfort
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Larger Text */}
          <div className="flex items-center justify-between p-3.5 bg-farm-surface rounded-2xl border border-farm-border">
            <div className="flex items-start gap-2.5 pr-2">
              <Type className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-farm-text">Larger Text</h3>
                <p className="text-[11px] text-farm-text-secondary">Increase text size for easier reading.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleAccessibility('largerText')}
              className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative shrink-0 ${
                accessibility.largerText ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                  accessibility.largerText ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3.5 bg-farm-surface rounded-2xl border border-farm-border">
            <div className="flex items-start gap-2.5 pr-2">
              <Sun className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-farm-text">High-Contrast Mode</h3>
                <p className="text-[11px] text-farm-text-secondary">Enhance contrast between text and background.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleAccessibility('highContrast')}
              className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative shrink-0 ${
                accessibility.highContrast ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                  accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between p-3.5 bg-farm-surface rounded-2xl border border-farm-border">
            <div className="flex items-start gap-2.5 pr-2">
              <ZapOff className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-farm-text">Reduced Motion</h3>
                <p className="text-[11px] text-farm-text-secondary">Minimize animations and transitions across screens.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleAccessibility('reducedMotion')}
              className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative shrink-0 ${
                accessibility.reducedMotion ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                  accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Simple Interface Mode */}
          <div className="flex items-center justify-between p-3.5 bg-farm-surface rounded-2xl border border-farm-border">
            <div className="flex items-start gap-2.5 pr-2">
              <Layers className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-bold text-farm-text">Simple Interface Mode</h3>
                <p className="text-[11px] text-farm-text-secondary">Streamline screens for essential actions only.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleToggleAccessibility('simpleInterface')}
              className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative shrink-0 ${
                accessibility.simpleInterface ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                  accessibility.simpleInterface ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Notification Preferences & Help Centre Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Notification Preferences */}
        <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <Bell className="w-4 h-4 text-farm-brand" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-farm-brand">
                  Notification Alerts
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Configure order, transit, and price alerts
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-farm-text-secondary leading-relaxed">
            Manage your procurement alerts, transit dispatches, seller responses, and APMC modal rate changes.
          </p>

          {onOpenNotificationPreferences && (
            <button
              type="button"
              onClick={onOpenNotificationPreferences}
              className="w-full py-2.5 px-4 rounded-xl bg-farm-surface hover:bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-farm-terracotta" />
              <span>Configure Notification Preferences</span>
            </button>
          )}
        </section>

        {/* Help & Support */}
        <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <HelpCircle className="w-4 h-4 text-farm-brand" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-farm-brand">
                  Help & Buyer Support
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Procurement FAQs, guides & ticket desk
                </p>
              </div>
            </div>
          </div>

          <p className="text-xs text-farm-text-secondary leading-relaxed">
            Need assistance with harvest lot validation, cold-chain transport, or escrow settlements? Browse buyer FAQs or submit a ticket.
          </p>

          {onOpenHelpCenter && (
            <button
              type="button"
              onClick={onOpenHelpCenter}
              className="w-full py-2.5 px-4 rounded-xl bg-farm-brand hover:bg-farm-brand-hover text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
            >
              <HelpCircle className="w-3.5 h-3.5 text-farm-gold" />
              <span>Open Help Centre & FAQs</span>
            </button>
          )}
        </section>
      </div>

      {/* Account Actions & Secure Log Out */}
      <section className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <button
            type="button"
            onClick={() => setIsTermsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center gap-1.5 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-farm-brand" />
            <span>Buyer Terms & Escrow Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center gap-1.5 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-farm-brand" />
            <span>Data Security & Privacy</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-farm-danger/30 bg-farm-surface text-farm-danger text-xs sm:text-sm font-bold hover:bg-farm-surface active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out Securely</span>
        </button>
      </section>

      {/* Modals */}
      <EditBuyerProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <BuyerLogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
};
