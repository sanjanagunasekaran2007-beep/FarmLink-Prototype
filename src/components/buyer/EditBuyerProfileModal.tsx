import { useState } from 'react';
import { X, Building2, Phone, Mail, Check, AlertCircle } from 'lucide-react';
import { BuyerProfileData, BuyerType, PickupDeliveryPref } from '@/types';

interface EditBuyerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BuyerProfileData;
  onSave: (updatedProfile: BuyerProfileData) => void;
}

const COMMON_CROPS = ['Tomato', 'Onion', 'Potato', 'Wheat', 'Green Chili', 'Turmeric', 'Banana', 'Red Chili', 'Rice (Paddy)', 'Cotton'];

export const EditBuyerProfileModal = ({
  isOpen,
  onClose,
  profile,
  onSave,
}: EditBuyerProfileModalProps) => {
  const [formData, setFormData] = useState<BuyerProfileData>(profile);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.businessName.trim()) {
      errs.businessName = 'Business or entity name is required';
    }
    if (!formData.contactPerson.trim()) {
      errs.contactPerson = 'Contact person name is required';
    }
    if (!formData.city.trim()) {
      errs.city = 'City / Market locality is required';
    }
    if (!formData.district.trim()) {
      errs.district = 'District is required';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (formData.preferredCrops.length === 0) {
      errs.crops = 'Select at least one preferred crop';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleToggleCrop = (crop: string) => {
    if (formData.preferredCrops.includes(crop)) {
      setFormData({
        ...formData,
        preferredCrops: formData.preferredCrops.filter((c) => c !== crop),
      });
    } else {
      setFormData({
        ...formData,
        preferredCrops: [...formData.preferredCrops, crop],
      });
      if (errors.crops) setErrors({ ...errors, crops: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-elevated overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-terracotta border border-farm-border flex items-center justify-center text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Edit Buyer Profile
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Update procurement entity details & preferences
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4">
          {/* Business Name */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Business / Entity Name <span className="text-farm-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => {
                setFormData({ ...formData, businessName: e.target.value });
                if (errors.businessName) setErrors({ ...errors, businessName: '' });
              }}
              className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                errors.businessName ? 'border-farm-danger' : 'border-farm-border'
              } text-farm-text font-semibold text-sm focus:outline-none focus:border-farm-brand`}
              placeholder="e.g. FreshMart Agro Wholesale"
            />
            {errors.businessName && (
              <p className="text-xs text-farm-danger mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.businessName}</span>
              </p>
            )}
          </div>

          {/* Buyer Type & Contact Person */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Buyer Category
              </label>
              <select
                value={formData.buyerType}
                onChange={(e) =>
                  setFormData({ ...formData, buyerType: e.target.value as BuyerType })
                }
                className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
              >
                <option value="Wholesale Buyer">Wholesale Buyer</option>
                <option value="Retailer">Retailer / Supermarket</option>
                <option value="Food Processing Company">Food Processing Company</option>
                <option value="Exporter">Agri Exporter</option>
                <option value="Restaurant">Restaurant & Catering</option>
                <option value="FPO">FPO / Aggregator</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Contact Person <span className="text-farm-danger">*</span>
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => {
                  setFormData({ ...formData, contactPerson: e.target.value });
                  if (errors.contactPerson) setErrors({ ...errors, contactPerson: '' });
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.contactPerson ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="e.g. Rajesh Patel"
              />
              {errors.contactPerson && (
                <p className="text-xs text-farm-danger mt-1 font-medium">{errors.contactPerson}</p>
              )}
            </div>
          </div>

          {/* Mobile & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-farm-surface-secondary border border-farm-border text-farm-text font-mono text-sm">
                <Phone className="w-4 h-4 text-farm-brand shrink-0" />
                <span>{formData.mobile}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Email Address
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
                  placeholder="name@business.com"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                City / Market <span className="text-farm-danger">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                  if (errors.city) setErrors({ ...errors, city: '' });
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.city ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="e.g. Koyambedu"
              />
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
                placeholder="e.g. Chennai"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>
          </div>

          {/* Preferred Crops */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Preferred Procurement Crops <span className="text-farm-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CROPS.map((crop) => {
                const isSelected = formData.preferredCrops.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => handleToggleCrop(crop)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-farm-brand text-white border border-farm-brand'
                        : 'bg-farm-surface text-farm-text-secondary border border-farm-border hover:border-farm-brand'
                    }`}
                  >
                    {crop} {isSelected && '✓'}
                  </button>
                );
              })}
            </div>
            {errors.crops && (
              <p className="text-xs text-farm-danger mt-1 font-medium">{errors.crops}</p>
            )}
          </div>

          {/* Preferred Fulfillment */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Default Fulfillment Preference
            </label>
            <select
              value={formData.preferredFulfillment}
              onChange={(e) =>
                setFormData({ ...formData, preferredFulfillment: e.target.value as PickupDeliveryPref })
              }
              className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
            >
              <option value="Buyer Arranged Transport">Buyer Arranged Transport (Farmgate Pickup)</option>
              <option value="Farmgate Pickup">Farmgate Pickup (Carrier Managed)</option>
              <option value="Mandi Delivery">Mandi Delivery</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
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
