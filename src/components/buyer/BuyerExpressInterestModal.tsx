import { useState } from 'react';
import { X, Send, Calendar, Truck, AlertCircle } from 'lucide-react';
import { HarvestItem, BuyerInterestRequest } from '@/types';

interface BuyerExpressInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  harvest: HarvestItem | null;
  onSubmit: (request: BuyerInterestRequest) => void;
}

export const BuyerExpressInterestModal = ({
  isOpen,
  onClose,
  harvest,
  onSubmit,
}: BuyerExpressInterestModalProps) => {
  const [requestedQuantity, setRequestedQuantity] = useState<string>(harvest ? harvest.quantity.toString() : '100');
  const [intendedUse, setIntendedUse] = useState('Wholesale Distribution');
  const [pickupPreference, setPickupPreference] = useState('Buyer Arranged Transport');
  const [preferredDate, setPreferredDate] = useState('Tomorrow, 9:00 AM');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || !harvest) return null;

  const maxQty = harvest.quantity;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const qty = parseFloat(requestedQuantity);

    if (!requestedQuantity || isNaN(qty) || qty <= 0) {
      errs.quantity = 'Please enter a valid procurement quantity';
    } else if (qty > maxQty) {
      errs.quantity = `Maximum available lot size is ${maxQty} ${harvest.unit}`;
    }

    if (!preferredDate.trim()) {
      errs.date = 'Preferred pickup or fulfillment date is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const qty = parseFloat(requestedQuantity);
      const estTotal = qty * harvest.expectedPrice;

      const newRequest: BuyerInterestRequest = {
        id: `REQ-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
        harvestId: harvest.id,
        harvestCode: harvest.harvestCode || harvest.id,
        cropName: harvest.cropName,
        variety: harvest.variety,
        farmerName: harvest.pickupLocation?.split(',')[0] || 'Verified Farmer',
        farmerLocation: `${harvest.district || ''}, ${harvest.state || ''}`,
        requestedQuantity: qty,
        unit: harvest.unit,
        intendedUse,
        pickupPreference,
        preferredDate,
        expectedPrice: harvest.expectedPrice,
        totalEstimatedValue: estTotal,
        message: message.trim() || undefined,
        status: 'Submitted',
        submittedAt: 'Just now',
        isDemoData: true,
      };

      onSubmit(newRequest);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-elevated overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-terracotta border border-farm-border flex items-center justify-center text-white">
              <Send className="w-5 h-5 text-farm-text-secondary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Express Purchase Interest
              </h2>
              <p className="text-xs text-white/70 font-medium">
                Submit procurement inquiry to grower &bull; Direct trade
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

        {/* Selected Lot Mini Banner */}
        <div className="bg-farm-surface-secondary p-4 border-b border-farm-border flex items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] font-bold text-farm-text-secondary uppercase">Target Lot</span>
            <div className="font-bold text-farm-text text-sm">
              {harvest.cropName} {harvest.variety ? `(${harvest.variety})` : ''}
            </div>
            <div className="text-[11px] text-farm-text-secondary">
              Lot: {harvest.harvestCode || harvest.id} &bull; Max: {harvest.quantity} {harvest.unit}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-farm-brand uppercase">Expected Price</span>
            <div className="font-display font-bold text-base text-farm-brand">
              ₹{harvest.expectedPrice}/{harvest.unit === 'Quintals' ? 'kg' : harvest.unit === 'Kilograms' ? 'kg' : 'unit'}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Required Quantity */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-farm-text uppercase tracking-wider">
                Required Procurement Quantity ({harvest.unit}) <span className="text-farm-danger">*</span>
              </label>
              <span className="text-[11px] text-farm-text-secondary">
                Available: {harvest.quantity} {harvest.unit}
              </span>
            </div>
            <input
              type="number"
              min="1"
              max={harvest.quantity}
              step="any"
              value={requestedQuantity}
              onChange={(e) => {
                setRequestedQuantity(e.target.value);
                if (errors.quantity) setErrors({ ...errors, quantity: '' });
              }}
              className={`w-full px-4 py-3 rounded-2xl bg-farm-surface border ${
                errors.quantity ? 'border-farm-danger' : 'border-farm-border'
              } text-farm-text font-semibold text-sm focus:outline-none focus:border-farm-brand`}
              placeholder={`Enter quantity up to ${harvest.quantity}`}
              id="express-quantity-input"
            />
            {errors.quantity && (
              <p className="text-xs text-farm-danger mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.quantity}</span>
              </p>
            )}
          </div>

          {/* Intended Business Use */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Intended Procurement Use
            </label>
            <select
              value={intendedUse}
              onChange={(e) => setIntendedUse(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
            >
              <option value="Wholesale Distribution">Wholesale Distribution (Mandi / Regional Trade)</option>
              <option value="Retail Supermarket">Retail Supermarket / Grocery Chain</option>
              <option value="Food Processing">Food Processing / Pulp & Canning</option>
              <option value="Export">Agri Export</option>
              <option value="Restaurant & Catering">Restaurant & Institutional Catering</option>
            </select>
          </div>

          {/* Preferred Pickup / Logistics Option */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Fulfillment & Transport Preference
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
                <Truck className="w-4 h-4" />
              </div>
              <select
                value={pickupPreference}
                onChange={(e) => setPickupPreference(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text text-sm focus:outline-none focus:border-farm-brand cursor-pointer"
              >
                <option value="Buyer Arranged Transport">Buyer Arranged Transport (Direct Farmgate Pickup)</option>
                <option value="FarmLink Logistics">FarmLink Logistics Carrier (Cold Chain / Truck)</option>
                <option value="Mandi Delivery">Farmer Delivery to Nearby Mandi Yard</option>
                <option value="Flexible">Flexible / Mutual Agreement</option>
              </select>
            </div>
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Target Fulfillment / Collection Date <span className="text-farm-danger">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-farm-text-secondary">
                <Calendar className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={preferredDate}
                onChange={(e) => {
                  setPreferredDate(e.target.value);
                  if (errors.date) setErrors({ ...errors, date: '' });
                }}
                className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-farm-surface border ${
                  errors.date ? 'border-farm-danger' : 'border-farm-border'
                } text-farm-text text-sm focus:outline-none focus:border-farm-brand`}
                placeholder="e.g. Tomorrow, 9:00 AM or 20 Sep 2026"
                id="express-date-input"
              />
            </div>
            {errors.date && (
              <p className="text-xs text-farm-danger mt-1 font-medium">{errors.date}</p>
            )}
          </div>

          {/* Optional Message */}
          <div>
            <label className="block text-xs font-bold text-farm-text uppercase tracking-wider mb-1.5">
              Message or Handling Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. We will send refrigerated vehicle TN-33-BX-8812 with standard plastic crates."
              className="w-full px-4 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs sm:text-sm text-farm-text focus:outline-none focus:border-farm-brand resize-none"
            />
          </div>

          {/* Demo Disclaimer */}
          <div className="p-3 bg-farm-surface-secondary rounded-2xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-text-secondary">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
            <span>
              This is a demo request. No purchase or payment has been completed.
            </span>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-farm-border">
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
              id="submit-interest-btn"
            >
              <Send className="w-4 h-4 text-farm-gold" />
              <span>Submit Interest Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
