import { useState } from 'react';
import { X, Sprout, Check, AlertCircle, Plus } from 'lucide-react';
import { FarmDetailsData, FarmlandAreaUnit, FarmFarmingMethod, FarmIrrigationType } from '@/types';

interface EditFarmModalProps {
  isOpen: boolean;
  onClose: () => void;
  farmDetails: FarmDetailsData;
  onSave: (updatedFarm: FarmDetailsData) => void;
}

const COMMON_CROPS = [
  'Tomato',
  'Onion',
  'Potato',
  'Green Chili',
  'Wheat',
  'Rice (Paddy)',
  'Maize',
  'Cotton',
  'Sugarcane',
  'Turmeric',
  'Banana',
  'Coconut',
];

export const EditFarmModal = ({
  isOpen,
  onClose,
  farmDetails,
  onSave,
}: EditFarmModalProps) => {
  const [formData, setFormData] = useState<FarmDetailsData>(farmDetails);
  const [newCropInput, setNewCropInput] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.farmName.trim()) {
      errs.farmName = 'Farm name or holding identifier is required';
    }

    if (!formData.totalArea || parseFloat(formData.totalArea.toString()) <= 0) {
      errs.totalArea = 'Please enter a valid land holding area';
    }

    if (formData.mainCrops.length === 0) {
      errs.mainCrops = 'Select or add at least one crop';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleToggleCrop = (crop: string) => {
    if (formData.mainCrops.includes(crop)) {
      setFormData({
        ...formData,
        mainCrops: formData.mainCrops.filter((c) => c !== crop),
      });
    } else {
      setFormData({
        ...formData,
        mainCrops: [...formData.mainCrops, crop],
      });
      if (errors.mainCrops) setErrors({ ...errors, mainCrops: '' });
    }
  };

  const handleAddCustomCrop = () => {
    const trimmed = newCropInput.trim();
    if (trimmed && !formData.mainCrops.includes(trimmed)) {
      setFormData({
        ...formData,
        mainCrops: [...formData.mainCrops, trimmed],
      });
      setNewCropInput('');
      if (errors.mainCrops) setErrors({ ...errors, mainCrops: '' });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-card overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Manage Farm Details
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Update land holding size, crop types, and farming practice
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
          {/* Farm Name */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Farm Name / Plot Reference <span className="text-farm-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.farmName}
              onChange={(e) => {
                setFormData({ ...formData, farmName: e.target.value });
                if (errors.farmName) setErrors({ ...errors, farmName: '' });
              }}
              className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                errors.farmName ? 'border-farm-danger' : 'border-farm-border'
              } text-farm-text font-semibold text-sm focus:outline-none focus:border-farm-brand`}
              placeholder="e.g. Green Valley Farms (Plot 4B)"
              id="edit-farm-name"
            />
            {errors.farmName && (
              <p className="text-xs text-farm-danger mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.farmName}</span>
              </p>
            )}
          </div>

          {/* Land Area & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Total Farmland Area <span className="text-farm-danger">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.totalArea}
                onChange={(e) => {
                  setFormData({ ...formData, totalArea: e.target.value });
                  if (errors.totalArea) setErrors({ ...errors, totalArea: '' });
                }}
                className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.totalArea ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="e.g. 5.5"
                id="edit-farm-area"
              />
              {errors.totalArea && (
                <p className="text-xs text-farm-danger mt-1 font-medium">{errors.totalArea}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
                Area Unit <span className="text-farm-danger">*</span>
              </label>
              <select
                value={formData.areaUnit}
                onChange={(e) =>
                  setFormData({ ...formData, areaUnit: e.target.value as FarmlandAreaUnit })
                }
                className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
                id="edit-farm-unit"
              >
                <option value="Acres">Acres</option>
                <option value="Hectares">Hectares</option>
              </select>
            </div>
          </div>

          {/* Main Crops Grown */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Main Crops Grown <span className="text-farm-danger">*</span>
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {COMMON_CROPS.map((crop) => {
                const isSelected = formData.mainCrops.includes(crop);
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

            {/* Add Custom Crop Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newCropInput}
                onChange={(e) => setNewCropInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomCrop();
                  }
                }}
                placeholder="Add other crop..."
                className="flex-1 px-3 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
              />
              <button
                type="button"
                onClick={handleAddCustomCrop}
                className="px-3 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
            {errors.mainCrops && (
              <p className="text-xs text-farm-danger mt-1 font-medium">{errors.mainCrops}</p>
            )}
          </div>

          {/* Farming Method */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Farming Method <span className="text-farm-danger">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Conventional', 'Organic', 'Mixed'] as FarmFarmingMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, farmingMethod: method })}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold text-center cursor-pointer transition-all border ${
                    formData.farmingMethod === method
                      ? 'bg-farm-brand text-white border-farm-brand'
                      : 'bg-farm-surface text-farm-text-secondary border-farm-border hover:text-farm-text'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          {/* Irrigation Type */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Primary Irrigation Type <span className="text-farm-danger">*</span>
            </label>
            <select
              value={formData.irrigationType}
              onChange={(e) =>
                setFormData({ ...formData, irrigationType: e.target.value as FarmIrrigationType })
              }
              className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
              id="edit-farm-irrigation"
            >
              <option value="Drip irrigation">Drip irrigation</option>
              <option value="Borewell">Borewell</option>
              <option value="Canal">Canal</option>
              <option value="Rain-fed">Rain-fed</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-farm-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary cursor-pointer transition-all"
              id="edit-farm-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
              id="edit-farm-save"
            >
              <Check className="w-4 h-4 text-farm-gold" />
              <span>Save Farm Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
