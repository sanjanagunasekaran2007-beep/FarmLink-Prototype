import { useState } from 'react';
import { X, User, Phone, Mail, MapPin, Globe, Check, AlertCircle } from 'lucide-react';
import { FarmerProfileData } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/data/profileData';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: FarmerProfileData;
  onSave: (updatedProfile: FarmerProfileData) => void;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditProfileModalProps) => {
  const [formData, setFormData] = useState<FarmerProfileData>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.village.trim()) {
      errs.village = 'Village name is required';
    }

    if (!formData.district.trim()) {
      errs.district = 'District name is required';
    }

    if (!formData.state.trim()) {
      errs.state = 'State is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-card overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Edit Personal Profile
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Update basic identification and contact details
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Full Name <span className="text-farm-danger">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.fullName ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text font-semibold text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="Enter farmer full name"
                id="edit-profile-name"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-farm-danger mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Mobile Number Display (Readonly or masked for security) */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Registered Mobile Number
            </label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-farm-surface-secondary border border-farm-border text-farm-text-secondary font-mono text-sm">
              <Phone className="w-4 h-4 text-farm-brand shrink-0" />
              <span className="font-bold text-farm-text">{formData.mobile}</span>
              <span className="ml-auto text-[11px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-full border border-farm-border">
                Verified OTP
              </span>
            </div>
            <p className="text-[11px] text-farm-text-secondary mt-1">
              Mobile number changes require verification at your local Mandi desk.
            </p>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Email Address (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.email ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="farmer.name@example.com"
                id="edit-profile-email"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-farm-danger mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Village & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Village / Town <span className="text-farm-danger">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => {
                    setFormData({ ...formData, village: e.target.value });
                    if (errors.village) setErrors({ ...errors, village: '' });
                  }}
                  className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border ${
                    errors.village ? 'border-farm-danger' : 'border-farm-border'
                  } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                  placeholder="e.g. Poondi"
                  id="edit-profile-village"
                />
              </div>
              {errors.village && (
                <p className="text-xs text-farm-danger mt-1 font-medium">{errors.village}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                District <span className="text-farm-danger">*</span>
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => {
                  setFormData({ ...formData, district: e.target.value });
                  if (errors.district) setErrors({ ...errors, district: '' });
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.district ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="e.g. Tiruvallur"
                id="edit-profile-district"
              />
              {errors.district && (
                <p className="text-xs text-farm-danger mt-1 font-medium">{errors.district}</p>
              )}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              State <span className="text-farm-danger">*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.target.value });
                if (errors.state) setErrors({ ...errors, state: '' });
              }}
              className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
              id="edit-profile-state"
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Kerala">Kerala</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Telangana">Telangana</option>
            </select>
          </div>

          {/* Preferred Contact Language */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Preferred Contact Language
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
                <Globe className="w-4 h-4" />
              </div>
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
                id="edit-profile-lang"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.name}>
                    {lang.name} ({lang.native})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary cursor-pointer transition-all"
              id="edit-profile-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
              id="edit-profile-save"
            >
              <Check className="w-4 h-4 text-farm-gold" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
