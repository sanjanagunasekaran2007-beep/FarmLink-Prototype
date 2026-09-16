import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Upload, 
  Trash2, 
  Check, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Eye, 
  BookmarkCheck, 
  Sparkles,
  Layers,
  Leaf
} from 'lucide-react';
import { 
  HarvestFormData, 
  HarvestItem, 
  CropCategory, 
  QualityGrade, 
  HarvestUnit, 
  PriceType, 
  FarmingMethod 
} from '@/types';
import { HarvestPreviewModal } from './HarvestPreviewModal';

interface AddHarvestPageProps {
  onClose: () => void;
  onPublishHarvest: (harvest: HarvestItem) => void;
  onSaveDraft?: (draft: HarvestFormData) => void;
  initialDraft?: HarvestFormData | null;
}

const COMMON_CROPS = [
  { name: 'Tomato', category: 'Vegetables' as CropCategory, variety: 'Hybrid (Vaishnavi)', defaultPrice: '28', unit: 'Quintals' as HarvestUnit },
  { name: 'Red Onion', category: 'Vegetables' as CropCategory, variety: 'Nashik Red Medium', defaultPrice: '34', unit: 'Quintals' as HarvestUnit },
  { name: 'Potato', category: 'Vegetables' as CropCategory, variety: 'Jyoti Grade A', defaultPrice: '22', unit: 'Quintals' as HarvestUnit },
  { name: 'Wheat', category: 'Grains' as CropCategory, variety: 'Sharbati Premium', defaultPrice: '2450', unit: 'Quintals' as HarvestUnit },
  { name: 'Cotton', category: 'Other' as CropCategory, variety: 'Medium Staple', defaultPrice: '7200', unit: 'Quintals' as HarvestUnit },
  { name: 'Green Chili', category: 'Vegetables' as CropCategory, variety: 'G4 Hot', defaultPrice: '48', unit: 'Quintals' as HarvestUnit },
  { name: 'Paddy / Rice', category: 'Grains' as CropCategory, variety: 'Sona Masoori', defaultPrice: '2850', unit: 'Quintals' as HarvestUnit },
  { name: 'Banana (Robusta)', category: 'Fruits' as CropCategory, variety: 'Robusta Fresh', defaultPrice: '22', unit: 'Quintals' as HarvestUnit },
];

const STATES = [
  'Tamil Nadu',
  'Maharashtra',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Gujarat',
  'Punjab',
  'Madhya Pradesh',
  'Uttar Pradesh',
  'Rajasthan',
  'Kerala',
  'Other'
];

const DEFAULT_FORM_DATA: HarvestFormData = {
  cropName: 'Tomato',
  category: 'Vegetables',
  variety: 'Hybrid (Vaishnavi)',
  grade: 'Grade A',
  quantity: '30',
  unit: 'Quintals',
  expectedPrice: '28',
  priceType: 'Fixed expected price',
  harvestDate: 'Tomorrow, 7:00 AM',
  availableFrom: 'Ready for Immediate Dispatch',
  state: 'Tamil Nadu',
  district: 'Dindigul',
  village: 'Reddiarchatram',
  pickupLocation: 'Farm Plot 4B, Reddiarchatram Road',
  imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  description: 'Farm-fresh hybrid tomatoes harvested at optimum maturity. Uniform deep red coloration, high firmness suitable for inter-state wholesale transport.',
  farmingMethod: 'Natural farming',
};

export const AddHarvestPage: React.FC<AddHarvestPageProps> = ({
  onClose,
  onPublishHarvest,
  onSaveDraft,
  initialDraft,
}) => {
  const [formData, setFormData] = useState<HarvestFormData>(initialDraft || DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [draftSavedToast, setDraftSavedToast] = useState(false);

  // Sync formData if initialDraft changes (e.g. from Market Prices "Use This Crop")
  React.useEffect(() => {
    if (initialDraft) {
      setFormData(initialDraft);
    }
  }, [initialDraft]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldChange = <K extends keyof HarvestFormData>(key: K, value: HarvestFormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const handleSelectCommonCrop = (crop: typeof COMMON_CROPS[0]) => {
    setFormData((prev) => ({
      ...prev,
      cropName: crop.name,
      category: crop.category,
      variety: crop.variety,
      expectedPrice: crop.defaultPrice,
      unit: crop.unit,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFieldChange('imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.cropName.trim()) {
      newErrors.cropName = 'Crop name is required.';
    }

    const qty = parseFloat(formData.quantity);
    if (!formData.quantity.trim() || isNaN(qty) || qty <= 0) {
      newErrors.quantity = 'Please enter a valid harvest quantity greater than 0.';
    }

    const price = parseFloat(formData.expectedPrice);
    if (!formData.expectedPrice.trim() || isNaN(price) || price <= 0) {
      newErrors.expectedPrice = 'Please enter a valid expected price.';
    }

    if (!formData.harvestDate.trim()) {
      newErrors.harvestDate = 'Please enter the harvest date or schedule.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.';
    }
    if (!formData.district.trim()) {
      newErrors.district = 'District is required.';
    }
    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Specific pickup farmgate location is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsPreviewOpen(true);
    } else {
      // Scroll smoothly to top error if any
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleSaveAsDraft = () => {
    if (onSaveDraft) {
      onSaveDraft(formData);
    }
    try {
      localStorage.setItem('farmlink_harvest_draft', JSON.stringify(formData));
    } catch {
      // ignore storage errors
    }
    setDraftSavedToast(true);
    setTimeout(() => setDraftSavedToast(false), 3500);
  };

  const handlePublishListing = () => {
    const parsedQty = parseFloat(formData.quantity) || 0;
    const parsedPrice = parseFloat(formData.expectedPrice) || 0;

    const newHarvestItem: HarvestItem = {
      id: `hrv-${Date.now()}`,
      cropName: formData.cropName,
      category: formData.category,
      variety: formData.variety || undefined,
      grade: formData.grade,
      quantity: parsedQty,
      unit: formData.unit,
      expectedPrice: parsedPrice,
      priceType: formData.priceType,
      harvestDate: formData.harvestDate,
      availableFrom: formData.availableFrom || formData.harvestDate,
      state: formData.state,
      district: formData.district,
      village: formData.village,
      pickupLocation: formData.pickupLocation,
      imageUrl: formData.imageUrl || undefined,
      description: formData.description || undefined,
      farmingMethod: formData.farmingMethod,
      status: 'Active',
      createdAt: 'Just now',
    };

    setIsPreviewOpen(false);
    onPublishHarvest(newHarvestItem);
  };

  const handleCancelClick = () => {
    // If form has non-empty inputs, ask confirmation
    if (formData.cropName.trim()) {
      setShowCancelConfirm(true);
    } else {
      onClose();
    }
  };

  return (
    <div className="min-h-screen bg-farm-surface-secondary text-farm-text flex flex-col justify-between select-none">
      {/* Draft Saved Feedback Notification */}
      <AnimatePresence>
        {draftSavedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
          >
            <div className="bg-farm-brand text-white p-4 rounded-2xl shadow-elevated border border-farm-brand text-xs font-bold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="w-4 h-4 text-farm-gold shrink-0" />
                <span>Draft successfully saved to your local workspace!</span>
              </div>
              <button
                type="button"
                onClick={() => setDraftSavedToast(false)}
                className="text-xs text-white hover:text-farm-gold"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Dialog */}
      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-farm-surface rounded-3xl p-6 border border-farm-border shadow-elevated text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-farm-terracotta-soft text-farm-terracotta flex items-center justify-center mx-auto border border-farm-terracotta/40">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-farm-text">
                  Leave Add Harvest?
                </h3>
                <p className="text-xs text-farm-text-secondary mt-1">
                  You have unsaved changes in this harvest listing. You can save as a draft before leaving.
                </p>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleSaveAsDraft();
                    setShowCancelConfirm(false);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
                >
                  Save Draft & Exit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCancelConfirm(false);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-farm-surface-secondary border border-farm-border text-farm-terracotta text-xs font-bold hover:bg-farm-surface-secondary transition-colors cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="text-xs font-bold text-farm-text-secondary hover:text-farm-text py-1 cursor-pointer"
                >
                  Continue Editing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-farm-brand text-white border-b border-farm-brand px-4 sm:px-8 py-4 shadow-card">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancelClick}
              className="w-9 h-9 rounded-xl bg-farm-brand border border-farm-border text-white hover:bg-farm-brand active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title="Return to Dashboard"
              id="back-to-dashboard-btn"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-farm-gold" />
                <span className="text-xs font-bold uppercase tracking-wider text-farm-gold">
                  FarmLink Mandi Network
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-display font-bold text-white tracking-tight">
                Farmer Listing Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="px-3.5 py-2 rounded-xl bg-farm-brand border border-farm-border text-xs font-bold text-white hover:bg-farm-brand active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              id="header-save-draft-btn"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-farm-gold" />
              <span className="hidden sm:inline">Save Draft</span>
            </button>
            <button
              type="button"
              onClick={handleCancelClick}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-white/80 hover:text-white hover:bg-farm-brand transition-colors cursor-pointer"
              id="header-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      </header>

      {/* Main Form Page Body on Warm Sand (#F3EBDD) */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {/* Page Hero Banner */}
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-eucalyptus-soft text-farm-brand border border-farm-info/40 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-farm-brand" />
              <span>Direct Farmgate Marketplace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-farm-text">
              List Your Harvest
            </h1>
            <p className="text-sm sm:text-base text-farm-text-secondary font-medium leading-relaxed">
              Tell buyers what you have ready to sell.
            </p>
          </div>
        </div>

        {/* Global Error Banner if any */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border text-farm-text-secondary text-xs sm:text-sm font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Please correct the following before previewing:</p>
              <ul className="list-disc list-inside mt-1 space-y-0.5 font-normal text-xs">
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 5-SECTION HARVEST FORM */}
        <form onSubmit={handlePreviewClick} className="space-y-6">
          {/* ========================================================================= */}
          {/* SECTION 1: WHAT ARE YOU SELLING? */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-farm-border">
              <div className="w-8 h-8 rounded-xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-sm shadow-subtle">
                1
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-farm-text">
                  What are you selling?
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Select produce type, variety, and quality grade classification.
                </p>
              </div>
            </div>

            {/* Quick Popular Crop Selector Chips */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-2">
                Quick Select Common Crop
              </label>
              <div className="flex flex-wrap gap-2">
                {COMMON_CROPS.map((c) => {
                  const isSelected = formData.cropName === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleSelectCommonCrop(c)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                          : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-farm-gold" />}
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields: Crop Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Crop Name <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={formData.cropName}
                  onChange={(e) => handleFieldChange('cropName', e.target.value)}
                  placeholder="e.g. Tomato, Potato, Wheat"
                  required
                  className={`w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                    errors.cropName ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                  }`}
                  id="input-crop-name"
                />
                {errors.cropName && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.cropName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Crop Category <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleFieldChange('category', e.target.value as CropCategory)}
                  className="w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand cursor-pointer"
                  id="select-crop-category"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Pulses">Pulses</option>
                  <option value="Spices">Spices</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Variety & Quality Grade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Crop Variety <span className="text-farm-text-secondary font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => handleFieldChange('variety', e.target.value)}
                  placeholder="e.g. Vaishnavi Hybrid, Desi, Sona Masoori"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand"
                  id="input-crop-variety"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Quality Grade
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['Grade A', 'Grade B', 'Grade C', 'Not specified'] as QualityGrade[]).map((grade) => {
                    const isSelected = formData.grade === grade;
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => handleFieldChange('grade', grade)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                            : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                        }`}
                      >
                        {grade}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 2: HOW MUCH DO YOU HAVE? */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-farm-border">
              <div className="w-8 h-8 rounded-xl bg-farm-gold text-farm-text flex items-center justify-center font-display font-bold text-sm shadow-subtle">
                2
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-farm-text">
                  How much do you have?
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Specify available quantity and unit of measurement.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Harvest Quantity <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={formData.quantity}
                    onChange={(e) => handleFieldChange('quantity', e.target.value)}
                    placeholder="e.g. 50"
                    required
                    className={`w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.quantity ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="input-harvest-quantity"
                  />
                </div>
                {errors.quantity && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.quantity}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Unit of Measurement <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleFieldChange('unit', e.target.value as HarvestUnit)}
                  className="w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand cursor-pointer"
                  id="select-harvest-unit"
                >
                  <option value="Kilograms">Kilograms (kg)</option>
                  <option value="Quintals">Quintals (100 kg standard)</option>
                  <option value="Tonnes">Tonnes (MT / 1,000 kg)</option>
                  <option value="Crates">Crates (25 kg standard crate)</option>
                  <option value="Bags">Bags (50 kg gunny bag)</option>
                </select>
              </div>
            </div>

            {/* Visual Calculation Badge */}
            {formData.quantity && (
              <div className="p-3.5 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-farm-gold">
                  <Layers className="w-4 h-4 text-farm-gold" />
                  <span className="font-bold">Total Batch Size:</span>
                  <span>{formData.quantity} {formData.unit}</span>
                </div>
                <span className="text-[11px] font-bold text-farm-gold bg-farm-surface px-2.5 py-1 rounded-lg border border-farm-gold/40">
                  Standard Mandi Lot
                </span>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: WHEN IS IT READY? */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-farm-border">
              <div className="w-8 h-8 rounded-xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-sm shadow-subtle">
                3
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-farm-text">
                  When is it ready?
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Dates for harvesting, dispatch availability, and expected farmgate pricing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Harvest Date <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-farm-text-secondary" />
                  <input
                    type="text"
                    value={formData.harvestDate}
                    onChange={(e) => handleFieldChange('harvestDate', e.target.value)}
                    placeholder="e.g. Tomorrow, 7:00 AM or 18 Sep 2026"
                    required
                    className={`w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.harvestDate ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="input-harvest-date"
                  />
                </div>
                {errors.harvestDate && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.harvestDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Available-from Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-farm-brand" />
                  <input
                    type="text"
                    value={formData.availableFrom}
                    onChange={(e) => handleFieldChange('availableFrom', e.target.value)}
                    placeholder="e.g. Ready for Immediate Dispatch"
                    className="w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand"
                    id="input-available-from"
                  />
                </div>
              </div>
            </div>

            {/* Expected Price & Price Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Expected Price (₹ per {formData.unit === 'Quintals' ? 'kg / unit' : formData.unit}) <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm text-farm-text-secondary font-bold">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={formData.expectedPrice}
                    onChange={(e) => handleFieldChange('expectedPrice', e.target.value)}
                    placeholder="e.g. 28"
                    required
                    className={`w-full min-h-[48px] pl-9 pr-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.expectedPrice ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="input-expected-price"
                  />
                </div>
                {errors.expectedPrice && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.expectedPrice}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Price Type Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(['Fixed expected price', 'Open to buyer offers'] as PriceType[]).map((type) => {
                    const isSelected = formData.priceType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleFieldChange('priceType', type)}
                        className={`min-h-[48px] px-3 py-2 rounded-2xl text-xs font-bold border text-left transition-all cursor-pointer flex items-center gap-2 ${
                          isSelected
                            ? 'bg-farm-terracotta text-white border-farm-terracotta shadow-subtle'
                            : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-farm-border bg-farm-surface' : 'border-farm-border'
                        }`}>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-farm-terracotta" />}
                        </span>
                        <span className="leading-tight">{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 4: WHERE CAN BUYERS COLLECT IT? */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-farm-border">
              <div className="w-8 h-8 rounded-xl bg-farm-terracotta text-white flex items-center justify-center font-display font-bold text-sm shadow-subtle">
                4
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-farm-text">
                  Where can buyers collect it?
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Farm location and pickup address for logistics truck allocation.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  State <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleFieldChange('state', e.target.value)}
                  className="w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand cursor-pointer"
                  id="select-state"
                >
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  District <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleFieldChange('district', e.target.value)}
                  placeholder="e.g. Dindigul, Nashik"
                  required
                  className={`w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                    errors.district ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                  }`}
                  id="input-district"
                />
                {errors.district && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.district}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Village or Town
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleFieldChange('village', e.target.value)}
                  placeholder="e.g. Reddiarchatram"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand"
                  id="input-village"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text mb-1.5">
                Pickup Location & Landmark <span className="text-farm-terracotta font-bold">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-farm-terracotta" />
                <input
                  type="text"
                  value={formData.pickupLocation}
                  onChange={(e) => handleFieldChange('pickupLocation', e.target.value)}
                  placeholder="e.g. Farm Plot 4B, South Road Gate / Near Primary Cooperative Mandi"
                  required
                  className={`w-full min-h-[48px] pl-10 pr-4 py-2.5 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                    errors.pickupLocation ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                  }`}
                  id="input-pickup-location"
                />
              </div>
              {errors.pickupLocation && (
                <p className="text-[11px] text-farm-terracotta font-bold mt-1">{errors.pickupLocation}</p>
              )}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 5: ADD A PHOTO & DETAILS */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-5">
            <div className="flex items-center gap-3 pb-3 border-b border-farm-border">
              <div className="w-8 h-8 rounded-xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-sm shadow-subtle">
                5
              </div>
              <div>
                <h2 className="text-lg font-display font-bold text-farm-text">
                  Add a photo &amp; details
                </h2>
                <p className="text-xs text-farm-text-secondary">
                  Upload batch photos and specify farming cultivation method.
                </p>
              </div>
            </div>

            {/* Media Upload Area */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-2">
                Crop Image
              </label>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                id="file-crop-image-upload"
              />

              {formData.imageUrl ? (
                <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={formData.imageUrl}
                      alt="Harvest Preview"
                      className="w-20 h-20 rounded-2xl object-cover border border-farm-border shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-farm-brand">
                        <Check className="w-4 h-4 text-farm-brand" />
                        <span>Photo Attached</span>
                      </div>
                      <p className="text-[11px] text-farm-text-secondary mt-0.5">
                        High resolution harvest preview ready for buyers
                      </p>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs font-bold text-farm-brand hover:underline mt-1 cursor-pointer"
                      >
                        Change photo
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleFieldChange('imageUrl', null)}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-text-secondary text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    id="remove-image-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove image</span>
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-farm-border rounded-2xl p-6 flex flex-col items-center justify-center bg-farm-surface hover:bg-farm-surface-secondary transition-colors cursor-pointer text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-farm-eucalyptus-soft text-farm-brand flex items-center justify-center mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-farm-brand">
                    Click or tap to upload harvest photo
                  </span>
                  <span className="text-[11px] text-farm-text-secondary mt-1">
                    PNG, JPG, WebP supported (max 10MB)
                  </span>
                </div>
              )}
            </div>

            {/* Farming Method Selection */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-2">
                Farming Cultivation Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Conventional', 'Organic', 'Natural farming', 'Not specified'] as FarmingMethod[]).map((method) => {
                  const isSelected = formData.farmingMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => handleFieldChange('farmingMethod', method)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                          : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                      }`}
                    >
                      {isSelected && <Leaf className="w-3 h-3 text-farm-gold" />}
                      <span>{method}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1.5">
                Short Description &amp; Quality Notes
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                placeholder="Describe your produce (e.g. size, maturity stage, packaging type, storage condition)..."
                rows={3}
                className="w-full px-4 py-3 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand leading-relaxed resize-none"
                id="textarea-description"
              />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SECTION 6: BOTTOM ACTIONS TOOLBAR */}
          {/* ========================================================================= */}
          <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-30">
            <button
              type="button"
              onClick={handleCancelClick}
              className="text-xs font-bold text-farm-text-secondary hover:text-farm-text transition-colors order-3 sm:order-1 cursor-pointer"
              id="bottom-cancel-action"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
              <button
                type="button"
                onClick={handleSaveAsDraft}
                className="flex-1 sm:flex-none px-5 py-3.5 rounded-2xl bg-farm-surface border border-farm-border text-farm-text font-display font-bold text-xs sm:text-sm hover:bg-farm-surface-secondary active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer"
                id="bottom-save-draft-btn"
              >
                <BookmarkCheck className="w-4 h-4 text-farm-gold" />
                <span>Save as Draft</span>
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-7 py-3.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
                id="bottom-preview-listing-btn"
              >
                <Eye className="w-4 h-4 text-farm-gold" />
                <span>Preview Listing</span>
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* Preview Modal */}
      <HarvestPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        formData={formData}
        onEdit={() => setIsPreviewOpen(false)}
        onPublish={handlePublishListing}
      />
    </div>
  );
};
