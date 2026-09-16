import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle, MapPin, Tag, Calendar, Layers } from 'lucide-react';
import { HarvestItem, QualityGrade, FarmingMethod, HarvestUnit, CropCategory } from '@/types';

interface EditHarvestModalProps {
  isOpen: boolean;
  harvest: HarvestItem | null;
  onClose: () => void;
  onSave: (updatedHarvest: HarvestItem) => void;
}

export const EditHarvestModal: React.FC<EditHarvestModalProps> = ({
  isOpen,
  harvest,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<HarvestItem>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (harvest) {
      setFormData({
        ...harvest,
      });
      setErrors({});
    }
  }, [harvest]);

  if (!isOpen || !harvest) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.cropName?.trim()) {
      errs.cropName = 'Crop name is required.';
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      errs.quantity = 'Please enter a valid quantity.';
    }
    if (!formData.expectedPrice || Number(formData.expectedPrice) <= 0) {
      errs.expectedPrice = 'Please enter a valid expected price.';
    }
    if (!formData.pickupLocation?.trim()) {
      errs.pickupLocation = 'Pickup location is required.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const updated: HarvestItem = {
      ...harvest,
      cropName: formData.cropName || harvest.cropName,
      variety: formData.variety || '',
      category: formData.category || harvest.category,
      grade: (formData.grade as QualityGrade) || harvest.grade || 'Grade A',
      quantity: Number(formData.quantity) || harvest.quantity,
      unit: (formData.unit as HarvestUnit) || harvest.unit,
      expectedPrice: Number(formData.expectedPrice) || harvest.expectedPrice,
      harvestDate: formData.harvestDate || harvest.harvestDate,
      availableFrom: formData.availableFrom || harvest.availableFrom,
      state: formData.state || harvest.state,
      district: formData.district || harvest.district,
      village: formData.village || harvest.village,
      pickupLocation: formData.pickupLocation || harvest.pickupLocation,
      farmingMethod: (formData.farmingMethod as FarmingMethod) || harvest.farmingMethod || 'Natural farming',
      description: formData.description || '',
      updatedAt: 'Just now',
    };

    onSave(updated);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-2xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Top Modal Header */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-border flex items-center justify-between shrink-0">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand text-farm-gold text-[11px] font-bold uppercase tracking-wider mb-1">
                <span>Lot: {harvest.harvestCode || harvest.id}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                Edit Harvest Details
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-farm-brand text-white hover:bg-farm-gold hover:text-farm-text transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Fields Scrollable Body */}
          <form onSubmit={handleFormSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
            {/* 1. Crop Basics */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 pb-1 border-b border-farm-border">
                <Tag className="w-4 h-4 text-farm-gold" />
                <span>Crop Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Crop Name <span className="text-farm-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.cropName || ''}
                    onChange={(e) => setFormData({ ...formData, cropName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand focus:bg-farm-surface"
                    placeholder="e.g. Tomato, Onion, Wheat"
                  />
                  {errors.cropName && (
                    <p className="text-[11px] font-bold text-farm-terracotta mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.cropName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Crop Variety / Hybrid Name
                  </label>
                  <input
                    type="text"
                    value={formData.variety || ''}
                    onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand focus:bg-farm-surface"
                    placeholder="e.g. Hybrid Shivam, Nasik Red"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category || 'Vegetables'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CropCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                    <option value="Pulses">Pulses</option>
                    <option value="Spices">Spices</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Quality Grade
                  </label>
                  <select
                    value={formData.grade || 'Grade A'}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value as QualityGrade })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                  >
                    <option value="Grade A">Grade A (Export / Premium)</option>
                    <option value="Grade B">Grade B (Standard Market)</option>
                    <option value="Grade C">Grade C (Processing / Value)</option>
                    <option value="Not specified">Not specified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Quantity & Expected Pricing */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 pb-1 border-b border-farm-border">
                <Layers className="w-4 h-4 text-farm-terracotta" />
                <span>Quantity & Pricing</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Available Quantity <span className="text-farm-terracotta">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                    min="1"
                  />
                  {errors.quantity && (
                    <p className="text-[11px] font-bold text-farm-terracotta mt-1">
                      {errors.quantity}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Unit of Measurement
                  </label>
                  <select
                    value={formData.unit || 'Kilograms'}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as HarvestUnit })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                  >
                    <option value="Kilograms">Kilograms (kg)</option>
                    <option value="Quintals">Quintals (100 kg)</option>
                    <option value="Tonnes">Tonnes (1,000 kg)</option>
                    <option value="Crates">Crates</option>
                    <option value="Bags">Bags</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Expected Price (₹/unit) <span className="text-farm-terracotta">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.expectedPrice || ''}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                    min="1"
                  />
                  {errors.expectedPrice && (
                    <p className="text-[11px] font-bold text-farm-terracotta mt-1">
                      {errors.expectedPrice}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Dates & Timing */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 pb-1 border-b border-farm-border">
                <Calendar className="w-4 h-4 text-farm-brand" />
                <span>Harvest Timing</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Expected Harvest Date
                  </label>
                  <input
                    type="text"
                    value={formData.harvestDate || ''}
                    onChange={(e) => setFormData({ ...formData, harvestDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                    placeholder="e.g. 20 Sep 2026 or Tomorrow, 7:00 AM"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Dispatch Availability
                  </label>
                  <input
                    type="text"
                    value={formData.availableFrom || ''}
                    onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                    placeholder="e.g. Immediate Dispatch or 22 Sep 2026"
                  />
                </div>
              </div>
            </div>

            {/* 4. Location & Farming Method */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 pb-1 border-b border-farm-border">
                <MapPin className="w-4 h-4 text-farm-terracotta" />
                <span>Location & Practice</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Pickup Location / Farm Gate <span className="text-farm-terracotta">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pickupLocation || ''}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                    placeholder="e.g. Farm Plot 4B, Tiruvallur, Tamil Nadu"
                  />
                  {errors.pickupLocation && (
                    <p className="text-[11px] font-bold text-farm-terracotta mt-1">
                      {errors.pickupLocation}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-farm-text mb-1">
                    Farming Method
                  </label>
                  <select
                    value={formData.farmingMethod || 'Natural farming'}
                    onChange={(e) => setFormData({ ...formData, farmingMethod: e.target.value as FarmingMethod })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand"
                  >
                    <option value="Natural farming">Natural farming (Zero chemical residue)</option>
                    <option value="Organic">Organic (Certified / In-conversion)</option>
                    <option value="Conventional">Conventional</option>
                    <option value="Not specified">Not specified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Additional Notes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-farm-text">
                Additional Notes / Batch Specs
              </label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs sm:text-sm text-farm-text font-medium focus:outline-hidden focus:border-farm-brand"
                placeholder="Mention storage conditions, crate packing, moisture level, or transport convenience..."
              />
            </div>
          </form>

          {/* Modal Footer Actions */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleFormSubmit}
              className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-2 shadow-subtle"
            >
              <Save className="w-4 h-4 text-farm-gold" />
              <span>Save Changes</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
