import { useState } from 'react';
import { 
  Settings, 
  RotateCcw, 
  Bell, 
  HelpCircle, 
  Sliders, 
  Eye, 
  Monitor, 
  Check, 
  Server,
  Palette
} from 'lucide-react';
import { ThemeSwitcher } from '@/components/common/ThemeSwitcher';
import { AdminActionConfirmModal } from '../modals/AdminActionConfirmModal';

interface AdminSettingsViewProps {
  onOpenNotificationsPrefs: () => void;
  onOpenHelpCenter: () => void;
  onResetDemoData: () => void;
}

export const AdminSettingsView = ({
  onOpenNotificationsPrefs,
  onOpenHelpCenter,
  onResetDemoData,
}: AdminSettingsViewProps) => {
  const [tableDensity, setTableDensity] = useState<'comfortable' | 'compact'>('comfortable');
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<'off' | '30s' | '60s'>('off');
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSavePreferences = () => {
    setSavedFeedback('Admin preferences saved successfully!');
    setTimeout(() => {
      setSavedFeedback(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-border uppercase tracking-wider mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>Workspace Preferences</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            Admin Workspace Settings
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Configure demonstration UI preferences, manage theme mode, and access platform support tools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Preferences & Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Mode Selector Card */}
          <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-4 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-farm-text">
                  Color Theme Mode
                </h3>
                <p className="text-xs text-farm-text-secondary">
                  Choose between Light, Dark, or System preference across the Admin console
                </p>
              </div>
            </div>

            <div className="pt-2">
              <ThemeSwitcher variant="segmented" className="w-full justify-between" />
            </div>
          </div>

          {/* Workspace Info Card */}
          <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-4 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand-soft text-farm-brand flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-farm-text">
                  Demo Environment Information
                </h3>
                <p className="text-xs text-farm-text-secondary">
                  FarmLink Demonstration Release v2.4 (Frontend Prototype)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-farm-surface-muted border border-farm-border">
                <span className="text-[11px] font-bold text-farm-text-muted">Environment Mode</span>
                <p className="text-sm font-semibold text-farm-brand mt-0.5">Frontend Mock Sandbox</p>
              </div>
              <div className="p-3.5 rounded-xl bg-farm-surface-muted border border-farm-border">
                <span className="text-[11px] font-bold text-farm-text-muted">Data Storage</span>
                <p className="text-sm font-semibold text-farm-text mt-0.5">In-Memory Session State</p>
              </div>
              <div className="p-3.5 rounded-xl bg-farm-surface-muted border border-farm-border">
                <span className="text-[11px] font-bold text-farm-text-muted">APMC Exchange Feeds</span>
                <p className="text-sm font-semibold text-farm-text mt-0.5">Simulated Spot Rates</p>
              </div>
              <div className="p-3.5 rounded-xl bg-farm-surface-muted border border-farm-border">
                <span className="text-[11px] font-bold text-farm-text-muted">Escrow Settlement</span>
                <p className="text-sm font-semibold text-farm-brand mt-0.5">Automated Demo Ledger</p>
              </div>
            </div>
          </div>

          {/* Interface & Display Preferences */}
          <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-surface-muted text-farm-brand flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-farm-text">
                  Display & Interface Preferences
                </h3>
                <p className="text-xs text-farm-text-secondary">
                  Adjust administrative table density and visual controls
                </p>
              </div>
            </div>

            {/* Density Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-farm-text">
                Table Row Density
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTableDensity('comfortable')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    tableDensity === 'comfortable'
                      ? 'bg-farm-brand-soft border-farm-brand text-farm-brand'
                      : 'bg-farm-surface-muted border-farm-border text-farm-text-secondary hover:bg-farm-surface-hover'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Comfortable (Standard)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTableDensity('compact')}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    tableDensity === 'compact'
                      ? 'bg-farm-brand-soft border-farm-brand text-farm-brand'
                      : 'bg-farm-surface-muted border-farm-border text-farm-text-secondary hover:bg-farm-surface-hover'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Compact (Dense)</span>
                </button>
              </div>
            </div>

            {/* Auto Refresh Simulator */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-farm-text">
                Demo Market Feed Auto-Refresh
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['off', '30s', '60s'] as const).map((interval) => (
                  <button
                    key={interval}
                    type="button"
                    onClick={() => setAutoRefreshInterval(interval)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold capitalize cursor-pointer transition-all ${
                      autoRefreshInterval === interval
                        ? 'bg-farm-brand border-farm-brand text-white'
                        : 'bg-farm-surface-muted border-farm-border text-farm-text-secondary hover:bg-farm-surface-hover'
                    }`}
                  >
                    {interval === 'off' ? 'Disabled' : `Every ${interval}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-3 border-t border-farm-border flex items-center justify-between">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="btn-primary-forest text-xs py-2.5 px-5 cursor-pointer"
              >
                Apply Interface Settings
              </button>
              {savedFeedback && (
                <span className="text-xs font-bold text-farm-brand flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>{savedFeedback}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Links & Local Reset */}
        <div className="space-y-6">
          {/* Support & Notification Links */}
          <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-4 transition-colors">
            <h3 className="font-display font-bold text-base text-farm-text">
              Platform Admin Utilities
            </h3>

            <div className="space-y-3">
              <button
                type="button"
                onClick={onOpenNotificationsPrefs}
                className="w-full p-3.5 rounded-2xl bg-farm-surface-muted border border-farm-border hover:border-farm-brand hover:bg-farm-surface-hover text-left transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-center text-farm-brand">
                    <Bell className="w-4 h-4 text-farm-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-farm-text group-hover:text-farm-brand transition-colors">
                      Notification Preferences
                    </h4>
                    <p className="text-[11px] text-farm-text-muted">Configure admin alert categories</p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={onOpenHelpCenter}
                className="w-full p-3.5 rounded-2xl bg-farm-surface-muted border border-farm-border hover:border-farm-brand hover:bg-farm-surface-hover text-left transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-center text-farm-brand">
                    <HelpCircle className="w-4 h-4 text-farm-text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-farm-text group-hover:text-farm-brand transition-colors">
                      Platform Help & FAQs
                    </h4>
                    <p className="text-[11px] text-farm-text-muted">Browse guide articles and policies</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle space-y-4 transition-colors">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-base text-farm-danger">
                Reset Demonstration Data
              </h3>
              <p className="text-xs text-farm-text-secondary leading-relaxed">
                Restore default demo figures, user statuses, and sample listings to their initial state.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-farm-warning-soft border border-farm-warning text-xs text-farm-text">
              <strong className="block mb-0.5 text-farm-warning">Safety Guarantee:</strong>
              This action only resets browser memory. No external databases or personal data are affected.
            </div>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-farm-danger-soft border border-farm-danger text-farm-danger text-xs font-bold hover:bg-farm-danger hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Local Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AdminActionConfirmModal
        isOpen={showResetConfirm}
        title="Reset Local Demonstration Data"
        description="Are you sure you want to reset all demo users, harvest listings, and simulated trade records back to their factory defaults?"
        confirmLabel="Confirm Factory Reset"
        variant="danger"
        onConfirm={() => {
          onResetDemoData();
          setShowResetConfirm(false);
          setSavedFeedback('Demo data reset to initial prototype state!');
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </div>
  );
};
