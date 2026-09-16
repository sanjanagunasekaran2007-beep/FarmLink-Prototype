import { useState } from 'react';
import { X, User, Building2, Phone, Mail, Truck, Check, AlertCircle } from 'lucide-react';
import { LogisticsProfileData } from '@/types';

interface EditLogisticsProfileModalProps {
  profile: LogisticsProfileData;
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updated: LogisticsProfileData) => void;
}

export const EditLogisticsProfileModal = ({
  profile,
  isOpen,
  onClose,
  onSaveProfile,
}: EditLogisticsProfileModalProps) => {
  if (!isOpen) return null;

  const [driverName, setDriverName] = useState(profile.driverName);
  const [companyName, setCompanyName] = useState(profile.companyName);
  const [serviceArea, setServiceArea] = useState(profile.serviceArea);
  const [mobile, setMobile] = useState(profile.mobile);
  const [email, setEmail] = useState(profile.email);
  const [vehicleType, setVehicleType] = useState(profile.vehicleType);
  const [vehicleNo, setVehicleNo] = useState(profile.vehicleNo);
  const [availabilityStatus, setAvailabilityStatus] = useState(profile.availabilityStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onSaveProfile({
        ...profile,
        driverName: driverName.trim(),
        companyName: companyName.trim(),
        serviceArea: serviceArea.trim(),
        mobile: mobile.trim(),
        email: email.trim(),
        vehicleType: vehicleType.trim(),
        vehicleNo: vehicleNo.trim(),
        availabilityStatus,
      });
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-lg rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface/15 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold">
                Edit Fleet Profile
              </h2>
              <p className="text-xs text-farm-text-secondary">
                Driver & Vehicle Registration Settings
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl bg-farm-surface/10 hover:bg-farm-surface/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-farm-text overflow-y-auto">
          {/* Driver Name */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Driver Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-farm-text-secondary absolute left-3 top-3" />
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
              />
            </div>
          </div>

          {/* Logistics Company */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Logistics Company / Operator Entity
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-farm-text-secondary absolute left-3 top-3" />
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
              />
            </div>
          </div>

          {/* Vehicle Type & Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Vehicle Type
              </label>
              <div className="relative">
                <Truck className="w-4 h-4 text-farm-text-secondary absolute left-3 top-3" />
                <input
                  type="text"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Vehicle Plate (Demo)
              </label>
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border font-mono font-bold text-xs text-farm-brand focus:outline-none focus:border-farm-brand"
              />
            </div>
          </div>

          {/* Mobile & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Mobile Number (Demo)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-farm-text-secondary absolute left-3 top-3" />
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-farm-text-secondary absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
                />
              </div>
            </div>
          </div>

          {/* Service Area */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Primary Operating Service Corridors
            </label>
            <input
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
            />
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1.5">
              Duty Availability Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Available', 'On Duty', 'Off Duty'] as const).map((status) => {
                const isSelected = availabilityStatus === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setAvailabilityStatus(status)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                        : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-farm-surface rounded-xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-terracotta">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Profile updates are saved locally in the demo session.</span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle cursor-pointer disabled:opacity-50"
              id="save-logistics-profile-button"
            >
              <Check className="w-3.5 h-3.5" />
              {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
