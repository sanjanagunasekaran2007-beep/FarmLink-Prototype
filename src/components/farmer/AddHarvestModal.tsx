import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Check, AlertCircle, Calendar, MapPin, Tag } from 'lucide-react';
import { HarvestItem } from '@/types';

interface AddHarvestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddHarvest: (harvest: HarvestItem) => void;
}

const COMMON_CROPS = [
  { name: 'Tomato', category: 'Vegetables', defaultPrice: 28, unit: 'Quintals' },
  { name: 'Red Onion', category: 'Vegetables', defaultPrice: 34, unit: 'Quintals' },
  { name: 'Potato', category: 'Vegetables', defaultPrice: 22, unit: 'Quintals' },
  { name: 'Wheat', category: 'Grains', defaultPrice: 2450, unit: 'Quintals' },
  { name: 'Cotton', category: 'Cash Crops', defaultPrice: 7200, unit: 'Quintals' },
  { name: 'Green Chili', category: 'Vegetables', defaultPrice: 48, unit: 'Quintals' },
  { name: 'Paddy / Rice', category: 'Grains', defaultPrice: 2850, unit: 'Quintals' },
  { name: 'Banana (Robusta)', category: 'Fruits', defaultPrice: 22, unit: 'Quintals' },
];

export const AddHarvestModal = ({
  isOpen,
  onClose,
  onAddHarvest,
}: AddHarvestModalProps) => {
  const [cropName, setCropName] = useState('Tomato');
  const [category, setCategory] = useState('Vegetables');
  const [quantity, setQuantity] = useState<string>('30');
  const [unit, setUnit] = useState('Quintals');
  const [expectedPrice, setExpectedPrice] = useState<string>('28');
  const [harvestDate, setHarvestDate] = useState('Tomorrow, 7:00 AM');
  const [pickupLocation, setPickupLocation] = useState('Farm Plot 4B, Reddiarchatram, Dindigul');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleCropSelect = (crop: typeof COMMON_CROPS[0]) => {
    setCropName(crop.name);
    setCategory(crop.category);
    setExpectedPrice(crop.defaultPrice.toString());
    setUnit(crop.unit);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsedQty = parseFloat(quantity);
    const parsedPrice = parseFloat(expectedPrice);

    if (!cropName.trim()) {
      setErrorMsg('Please select or specify a crop name.');
      return;
    }
    if (isNaN(parsedQty) || parsedQty <= 0) {
      setErrorMsg('Please enter a valid harvest quantity.');
      return;
    }
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg('Please enter a valid expected price.');
      return;
    }
    if (!pickupLocation.trim()) {
      setErrorMsg('Please provide a pickup farmgate address.');
      return;
    }

    const newHarvest: HarvestItem = {
      id: `hrv-${Date.now()}`,
      cropName,
      category,
      quantity: parsedQty,
      unit,
      expectedPrice: parsedPrice,
      harvestDate: harvestDate || 'Ready for Immediate Dispatch',
      pickupLocation,
      imageUrl: imagePreview || undefined,
      status: 'Active',
      createdAt: 'Just now',
    };

    onAddHarvest(newHarvest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-farm-brand/50 backdrop-blur-none flex items-center justify-center p-3 sm:p-4 overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-farm-surface rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-farm-border bg-farm-surface">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-farm-brand"></span>
              <h3 className="text-xl font-display font-bold text-farm-brand">
                List New Harvest
              </h3>
            </div>
            <p className="text-xs text-farm-text-secondary mt-0.5">
              Connect fresh produce with verified buyers on the Mandi network.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-center text-farm-text-secondary hover:text-farm-text hover:bg-farm-brand-soft active:scale-95 transition-all cursor-pointer"
            id="close-harvest-modal-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-farm-surface border border-farm-border text-farm-text-secondary text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Quick Crop Selector Pills */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1.5">
              Select Common Crop
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_CROPS.map((c) => {
                const isSelected = cropName === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleCropSelect(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                        : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-brand-soft'
                    }`}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crop Name & Category Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Crop Name / Variety
              </label>
              <input
                type="text"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                placeholder="e.g. Hybrid Tomato"
                required
                className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Crop Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains & Cereals</option>
                <option value="Fruits">Fresh Fruits</option>
                <option value="Cash Crops">Cash Crops</option>
                <option value="Pulses">Pulses & Legumes</option>
                <option value="Spices">Spices & Condiments</option>
              </select>
            </div>
          </div>

          {/* Quantity & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Harvest Quantity
              </label>
              <input
                type="number"
                min="1"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 25"
                required
                className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Unit of Measurement
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
              >
                <option value="Quintals">Quintals (100 kg)</option>
                <option value="Kg">Kilograms (kg)</option>
                <option value="Crates">Crates (25 kg standard)</option>
                <option value="Tonnes">Tonnes (MT)</option>
                <option value="Bags">Bags (50 kg)</option>
              </select>
            </div>
          </div>

          {/* Expected Price & Harvest Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Expected Price (₹ per unit)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-xs text-farm-text-secondary font-bold">₹</span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(e.target.value)}
                  placeholder="e.g. 28"
                  required
                  className="w-full pl-8 pr-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Harvest Ready Date / Time
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-farm-text-secondary" />
                <input
                  type="text"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  placeholder="e.g. Tomorrow, 7:00 AM"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
                />
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Farmgate Pickup Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-farm-terracotta" />
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder="Village name, farm survey / landmark, district"
                required
                className="w-full pl-9 pr-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-1 focus:ring-farm-brand"
              />
            </div>
          </div>

          {/* Crop Image Upload */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Upload Harvest Photos (Optional)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-farm-border rounded-2xl p-4 flex flex-col items-center justify-center bg-farm-surface hover:bg-farm-brand-soft transition-colors cursor-pointer"
            >
              {imagePreview ? (
                <div className="flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Harvest preview"
                    className="w-14 h-14 rounded-xl object-cover border border-farm-border"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-farm-brand flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Photo Attached
                    </span>
                    <span className="text-[11px] text-farm-text-secondary block">Click to change photo</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <Upload className="w-5 h-5 text-farm-text-secondary mb-1" />
                  <span className="text-xs font-bold text-farm-brand">Tap to upload harvest photo</span>
                  <span className="text-[10px] text-farm-text-secondary mt-0.5">High quality batch photos attract 2.4x faster buyer bids</span>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-farm-border text-xs font-bold text-farm-text-secondary hover:bg-farm-surface active:scale-95 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-farm-brand text-xs sm:text-sm font-bold text-white hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-1.5 cursor-pointer"
              id="submit-harvest-btn"
            >
              <Tag className="w-4 h-4" />
              <span>List Harvest on Mandi</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
