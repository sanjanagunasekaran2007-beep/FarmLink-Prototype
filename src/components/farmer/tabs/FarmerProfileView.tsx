import { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Sprout, 
  Globe, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Edit3, 
  ShieldCheck, 
  HelpCircle, 
  FileText, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Type, 
  Sun, 
  ZapOff, 
  Layers,
  Bell,
  Check
} from 'lucide-react';
import { 
  FarmerProfileData, 
  FarmDetailsData, 
  AccessibilitySettings, 
  NotificationSettings, 
  VerificationItemStatus 
} from '@/types';
import { 
  INITIAL_FARMER_PROFILE, 
  INITIAL_FARM_DETAILS, 
  INITIAL_ACCESSIBILITY_SETTINGS, 
  INITIAL_NOTIFICATION_SETTINGS, 
  INITIAL_VERIFICATION_STATUSES,
  SUPPORTED_LANGUAGES,
  SUPPORT_FAQS
} from '@/data/profileData';
import { EditProfileModal } from '../profile/EditProfileModal';
import { EditFarmModal } from '../profile/EditFarmModal';
import { LogoutConfirmModal } from '../profile/LogoutConfirmModal';
import { SupportModal } from '../profile/SupportModal';
import { TermsModal } from '../profile/TermsModal';
import { PrivacyModal } from '../profile/PrivacyModal';

interface FarmerProfileViewProps {
  onLogout: () => void;
  onOpenHelpCenter?: () => void;
  onOpenNotificationPreferences?: () => void;
  onShowToast?: (msg: string) => void;
}

export const FarmerProfileView = ({ 
  onLogout, 
  onOpenHelpCenter,
  onOpenNotificationPreferences,
  onShowToast 
}: FarmerProfileViewProps) => {
  // 1. Profile State
  const [profile, setProfile] = useState<FarmerProfileData>(() => {
    try {
      const stored = localStorage.getItem('farmlink_farmer_profile');
      return stored ? JSON.parse(stored) : INITIAL_FARMER_PROFILE;
    } catch {
      return INITIAL_FARMER_PROFILE;
    }
  });

  // 2. Farm Details State
  const [farmDetails, setFarmDetails] = useState<FarmDetailsData>(() => {
    try {
      const stored = localStorage.getItem('farmlink_farm_details');
      return stored ? JSON.parse(stored) : INITIAL_FARM_DETAILS;
    } catch {
      return INITIAL_FARM_DETAILS;
    }
  });

  // 3. Language Selection State
  const [selectedLang, setSelectedLang] = useState<string>(() => {
    try {
      return localStorage.getItem('farmlink_language') || 'English';
    } catch {
      return 'English';
    }
  });

  // 4. Accessibility Settings State
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem('farmlink_accessibility');
      return stored ? JSON.parse(stored) : INITIAL_ACCESSIBILITY_SETTINGS;
    } catch {
      return INITIAL_ACCESSIBILITY_SETTINGS;
    }
  });

  // 5. Notification Preferences State
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    try {
      const stored = localStorage.getItem('farmlink_notification_settings');
      return stored ? JSON.parse(stored) : INITIAL_NOTIFICATION_SETTINGS;
    } catch {
      return INITIAL_NOTIFICATION_SETTINGS;
    }
  });

  // 6. Verification Statuses
  const [verificationStatuses] = useState<VerificationItemStatus[]>(INITIAL_VERIFICATION_STATUSES);

  // 7. Modals
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isEditFarmOpen, setIsEditFarmOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // 8. Expanded FAQ Accordion
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // 9. Local Toast message fallback
  const [localToast, setLocalToast] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    } else {
      setLocalToast(msg);
      setTimeout(() => setLocalToast(null), 4000);
    }
  };

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

  // Handle Save Profile
  const handleSaveProfile = (updated: FarmerProfileData) => {
    setProfile(updated);
    try {
      localStorage.setItem('farmlink_farmer_profile', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showFeedback('Your profile has been updated.');
  };

  // Handle Save Farm Details
  const handleSaveFarm = (updated: FarmDetailsData) => {
    setFarmDetails(updated);
    try {
      localStorage.setItem('farmlink_farm_details', JSON.stringify(updated));
    } catch {
      // ignore
    }
    showFeedback('Your farm details have been updated.');
  };

  // Handle Language Change
  const handleLanguageSelect = (langName: string) => {
    setSelectedLang(langName);
    try {
      localStorage.setItem('farmlink_language', langName);
    } catch {
      // ignore
    }
    showFeedback(`Preferred language updated to ${langName}.`);
  };

  // Toggle Accessibility Option
  const handleToggleAccessibility = (key: keyof AccessibilitySettings) => {
    setAccessibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
    showFeedback('Accessibility settings updated.');
  };

  // Toggle Notification Preference
  const handleToggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('farmlink_notification_settings', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    showFeedback('Notification preferences updated.');
  };

  // Format initials from name
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Mask mobile number for clean security display
  const maskMobile = (num: string) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.length > 5) {
      return `${clean.slice(0, 5)} •••••`;
    }
    return num;
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto select-none pb-8">
      {/* Local Feedback Toast (if parent toast is not attached) */}
      {localToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
          <div className="bg-farm-brand text-white p-3.5 rounded-2xl shadow-elevated border border-farm-brand text-xs font-bold flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-farm-gold shrink-0" />
              <span>{localToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setLocalToast(null)}
              className="text-xs text-white hover:text-farm-gold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 1. PROFILE HEADER */}
      <section 
        aria-label="Farmer Profile Header" 
        className="bg-farm-surface p-5 sm:p-7 rounded-3xl border border-farm-border shadow-card flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 w-full sm:w-auto">
          {/* Avatar with solid Forest green */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-2xl sm:text-3xl shadow-subtle shrink-0 border-2 border-farm-brand">
            {getInitials(profile.fullName)}
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-brand">
                {profile.fullName}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border">
                <ShieldCheck className="w-3.5 h-3.5 text-farm-brand" />
                <span>Role: Farmer</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-4 h-4 text-farm-terracotta shrink-0" />
              <span>
                {profile.village}, {profile.district}, {profile.state}
              </span>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-farm-surface text-farm-terracotta text-[11px] font-bold border border-farm-border">
                <Clock className="w-3.5 h-3.5" />
                <span>{profile.verificationStatus}</span>
              </span>
              <span className="text-[11px] text-farm-text-secondary bg-farm-surface-secondary px-2.5 py-1 rounded-xl border border-farm-border">
                Demo Account • Sample profile data for prototype verification
              </span>
            </div>
          </div>
        </div>

        {/* Edit Profile Action */}
        <div className="shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsEditProfileOpen(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
            id="profile-edit-btn"
          >
            <Edit3 className="w-4 h-4 text-farm-gold" />
            <span>Edit Profile</span>
          </button>
        </div>
      </section>

      {/* 2-COLUMN SETTINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 2. PERSONAL PROFILE INFORMATION CARD */}
        <section 
          aria-label="Personal Information" 
          className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <User className="w-4 h-4" />
              </div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Personal Information
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditProfileOpen(true)}
              className="text-xs font-bold text-farm-brand hover:text-farm-terracotta flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-farm-text">
            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Full Name</span>
              <span className="font-bold">{profile.fullName}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-farm-brand" />
                <span>Mobile Number</span>
              </span>
              <span className="font-bold font-mono text-farm-brand">
                {maskMobile(profile.mobile)}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-farm-brand" />
                <span>Email Address</span>
              </span>
              <span className="font-bold font-mono truncate max-w-[180px] sm:max-w-none">
                {profile.email || 'Not provided'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border">
                <span className="text-farm-text-secondary font-medium block text-[11px]">Village / Town</span>
                <span className="font-bold">{profile.village}</span>
              </div>
              <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border">
                <span className="text-farm-text-secondary font-medium block text-[11px]">District & State</span>
                <span className="font-bold truncate block">{profile.district}, {profile.state}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-farm-brand" />
                <span>Contact Language</span>
              </span>
              <span className="font-bold text-farm-brand">{profile.preferredLanguage}</span>
            </div>
          </div>
        </section>

        {/* 3. FARM DETAILS CARD */}
        <section 
          aria-label="Farm Details" 
          className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <Sprout className="w-4 h-4 text-farm-brand" />
              </div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Farm Details
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsEditFarmOpen(true)}
              className="text-xs font-bold text-farm-brand hover:text-farm-terracotta flex items-center gap-1 cursor-pointer"
              id="edit-farm-btn"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Farm Details</span>
            </button>
          </div>

          <div className="space-y-3 text-xs text-farm-text">
            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Farm Name / Identifier</span>
              <span className="font-bold text-farm-brand">{farmDetails.farmName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border">
                <span className="text-farm-text-secondary font-medium block text-[11px]">Total Land Area</span>
                <span className="font-bold text-sm text-farm-text">
                  {farmDetails.totalArea} {farmDetails.areaUnit}
                </span>
              </div>
              <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border">
                <span className="text-farm-text-secondary font-medium block text-[11px]">Farming Practice</span>
                <span className="font-bold text-farm-brand">{farmDetails.farmingMethod}</span>
              </div>
            </div>

            <div className="p-2.5 bg-farm-surface rounded-xl border border-farm-border space-y-1.5">
              <span className="text-farm-text-secondary font-medium block text-[11px]">Main Crops Grown</span>
              <div className="flex flex-wrap gap-1.5">
                {farmDetails.mainCrops.map((crop) => (
                  <span
                    key={crop}
                    className="px-2.5 py-1 rounded-lg bg-farm-brand-soft text-farm-brand font-bold text-[11px] border border-farm-border"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-farm-surface rounded-xl border border-farm-border">
              <span className="text-farm-text-secondary font-medium">Primary Irrigation</span>
              <span className="font-bold">{farmDetails.irrigationType}</span>
            </div>
          </div>
        </section>
      </div>

      {/* 4. LANGUAGE PREFERENCE SECTION */}
      <section 
        aria-label="Language Preferences" 
        className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-farm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
              <Globe className="w-4 h-4 text-farm-brand" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Application Language Preference
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Select your preferred language for Mandi notices, crop updates, and alerts
              </p>
            </div>
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
                id={`lang-select-${lang.code}`}
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

      {/* 5. ACCESSIBILITY SETTINGS & 6. NOTIFICATION SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 5. ACCESSIBILITY SETTINGS */}
        <section 
          aria-label="Accessibility Settings" 
          className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
        >
          <div className="flex items-center gap-2.5 pb-3 border-b border-farm-border">
            <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
              <Layers className="w-4 h-4 text-farm-brand" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Accessibility Settings
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Customize display comfort for your daily use
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Toggle 1: Larger Text */}
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
                aria-label="Toggle larger text"
                id="toggle-larger-text"
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                    accessibility.largerText ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: High-contrast mode */}
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
                aria-label="Toggle high contrast"
                id="toggle-high-contrast"
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                    accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: Reduced-motion */}
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
                aria-label="Toggle reduced motion"
                id="toggle-reduced-motion"
              >
                <span
                  className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                    accessibility.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 4: Simple interface mode */}
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
                aria-label="Toggle simple interface mode"
                id="toggle-simple-interface"
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

        {/* 6. NOTIFICATION SETTINGS */}
        <section 
          aria-label="Notification Preferences" 
          className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-farm-border">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
                <Bell className="w-4 h-4 text-farm-brand" />
              </div>
              <div>
                <h2 className="font-display font-bold text-base text-farm-brand">
                  Notification Preferences
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Control which alerts reach your device
                </p>
              </div>
            </div>

            {onOpenNotificationPreferences && (
              <button
                type="button"
                onClick={onOpenNotificationPreferences}
                className="px-3.5 py-1.5 rounded-xl bg-farm-surface text-farm-brand hover:bg-farm-brand-soft border border-farm-border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Bell className="w-3.5 h-3.5 text-farm-terracotta" />
                <span>Manage Modal Preferences</span>
              </button>
            )}
          </div>

          <div className="space-y-2.5">
            {[
              { key: 'orderUpdates' as const, label: 'Order Updates', desc: 'Direct alerts when purchase orders are confirmed.' },
              { key: 'deliveryUpdates' as const, label: 'Delivery & Transport', desc: 'Vehicle arrival and farmgate pickup notifications.' },
              { key: 'buyerInterest' as const, label: 'Buyer Interest Updates', desc: 'When verified buyers express interest in your harvest.' },
              { key: 'marketPrices' as const, label: 'Market Price Updates', desc: 'Daily APMC spot rate changes for your crops.' },
              { key: 'generalAnnouncements' as const, label: 'General Announcements', desc: 'Kisan schemes, MSP advisories, and weather notices.' },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-3 bg-farm-surface rounded-2xl border border-farm-border"
              >
                <div className="pr-2">
                  <h3 className="text-xs font-bold text-farm-text">{item.label}</h3>
                  <p className="text-[11px] text-farm-text-secondary">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleNotification(item.key)}
                  className={`w-12 h-7 rounded-full transition-colors cursor-pointer relative shrink-0 ${
                    notifications[item.key] ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
                  }`}
                  aria-label={`Toggle ${item.label}`}
                  id={`toggle-notif-${item.key}`}
                >
                  <span
                    className={`block w-5 h-5 rounded-full bg-farm-surface shadow-sm transition-transform ${
                      notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-farm-text-secondary pt-1">
            Demo Mode: Push and SMS alerts are simulated in this prototype environment.
          </p>
        </section>
      </div>

      {/* 7. VERIFICATION STATUS */}
      <section 
        aria-label="Account Verification Status" 
        className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
      >
        <div className="flex items-center justify-between pb-3 border-b border-farm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
              <ShieldCheck className="w-4 h-4 text-farm-brand" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Account Verification Status
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Trust & safety checkpoints for trade participation
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {verificationStatuses.map((item, idx) => {
            const isDone = item.status === 'Completed';
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex flex-col justify-between space-y-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-farm-text">{item.title}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isDone
                          ? 'bg-farm-brand-soft text-farm-brand border-farm-border'
                          : 'bg-farm-surface text-farm-terracotta border-farm-border'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-farm-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {item.note && (
                  <div className="text-[10px] font-bold text-farm-brand pt-1">
                    ✓ {item.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-3.5 rounded-2xl bg-farm-surface-secondary border border-farm-border text-xs text-farm-text-secondary flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
          <span>
            Verification features will be connected when the secure verification service is available. No Aadhaar or identity documents are required for demo usage.
          </span>
        </div>
      </section>

      {/* 8. HELP & SUPPORT (Expandable FAQs + Contact Support) */}
      <section 
        aria-label="Help and Support" 
        className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-farm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center border border-farm-border">
              <HelpCircle className="w-4 h-4 text-farm-brand" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-farm-brand">
                Help & Support Center
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Guides on listings, buyers, tracking, and payments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenHelpCenter && (
              <button
                type="button"
                onClick={onOpenHelpCenter}
                className="px-3.5 py-2.5 rounded-xl bg-farm-brand-soft text-farm-brand text-xs font-bold hover:bg-farm-brand hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-farm-border"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Open Full Help Centre</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                if (onOpenHelpCenter) {
                  onOpenHelpCenter();
                } else {
                  setIsSupportModalOpen(true);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
              id="open-support-btn"
            >
              <HelpCircle className="w-3.5 h-3.5 text-farm-gold" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Expandable FAQs */}
        <div className="space-y-2">
          {SUPPORT_FAQS.slice(0, 4).map((faq) => {
            const isExpanded = expandedFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="border border-farm-border rounded-2xl bg-farm-surface overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className="w-full p-3.5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-farm-surface-secondary transition-colors"
                >
                  <span className="text-xs sm:text-sm font-bold text-farm-text">
                    {faq.question}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-farm-brand shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-farm-text-secondary shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-3.5 pt-0 text-xs text-farm-text/80 leading-relaxed border-t border-farm-border/50 bg-farm-surface">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. ACCOUNT ACTIONS & LOGOUT */}
      <section 
        aria-label="Account Actions" 
        className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
          <button
            type="button"
            onClick={() => setIsTermsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center gap-1.5 cursor-pointer transition-all"
            id="view-terms-btn"
          >
            <FileText className="w-3.5 h-3.5 text-farm-brand" />
            <span>View Terms & Conditions</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center gap-1.5 cursor-pointer transition-all"
            id="view-privacy-btn"
          >
            <Lock className="w-3.5 h-3.5 text-farm-brand" />
            <span>Privacy Information</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsLogoutModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-farm-danger/30 bg-farm-surface text-farm-danger text-xs sm:text-sm font-bold hover:bg-farm-surface active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer"
          id="profile-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out Securely</span>
        </button>
      </section>

      {/* Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />

      <EditFarmModal
        isOpen={isEditFarmOpen}
        onClose={() => setIsEditFarmOpen(false)}
        farmDetails={farmDetails}
        onSave={handleSaveFarm}
      />

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirmLogout={() => {
          setIsLogoutModalOpen(false);
          onLogout();
        }}
      />

      <SupportModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
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
