import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Send, 
  Calendar, 
  Sprout, 
  Store, 
  Info 
} from 'lucide-react';
import { BuyerProfile, HarvestItem, InterestRequest, PickupDeliveryPref } from '@/types';

interface ExpressInterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  buyer: BuyerProfile | null;
  harvests: HarvestItem[];
  onSubmitInterest: (request: InterestRequest) => void;
}

export const ExpressInterestModal: React.FC<ExpressInterestModalProps> = ({
  isOpen,
  onClose,
  buyer,
  harvests,
  onSubmitInterest,
}) => {
  const [selectedHarvestId, setSelectedHarvestId] = useState<string>('');
  const [cropName, setCropName] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('25');
  const [unit, setUnit] = useState<string>('Quintals');
  const [preferredPickupDate, setPreferredPickupDate] = useState<string>('Tomorrow, 8:00 AM');
  const [pickupPreference, setPickupPreference] = useState<PickupDeliveryPref>('Farmgate Pickup');
  const [message, setMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-fill when buyer opens
  useEffect(() => {
    if (buyer) {
      // If farmer has matching harvest for this buyer's crop requirements
      const matchingHarvest = harvests.find((h) => 
        buyer.cropsRequired.some((c) => c.toLowerCase() === h.cropName.toLowerCase())
      );

      if (matchingHarvest) {
        setSelectedHarvestId(matchingHarvest.id);
        setCropName(matchingHarvest.cropName);
        setQuantity(matchingHarvest.quantity.toString());
        setUnit(matchingHarvest.unit);
        setPreferredPickupDate(matchingHarvest.harvestDate || 'Tomorrow, 8:00 AM');
      } else if (buyer.cropsRequired.length > 0) {
        setSelectedHarvestId('custom');
        setCropName(buyer.cropsRequired[0]);
        setQuantity('30');
        setUnit('Quintals');
        setPreferredPickupDate('Tomorrow, 8:00 AM');
      }
      setPickupPreference(buyer.pickupPreference || 'Farmgate Pickup');
      setMessage(`Freshly harvested Grade A lot ready for pickup in Dindigul.`);
      setErrors({});
    }
  }, [buyer, harvests]);

  if (!isOpen || !buyer) return null;

  const handleHarvestSelect = (harvestId: string) => {
    setSelectedHarvestId(harvestId);
    if (harvestId === 'custom') {
      // Keep existing custom crop
    } else {
      const h = harvests.find((item) => item.id === harvestId);
      if (h) {
        setCropName(h.cropName);
        setQuantity(h.quantity.toString());
        setUnit(h.unit);
        setPreferredPickupDate(h.harvestDate || 'Tomorrow, 8:00 AM');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!cropName.trim()) {
      newErrors.cropName = 'Please enter or select a crop name.';
    }
    const parsedQty = parseFloat(quantity);
    if (!quantity.trim() || isNaN(parsedQty) || parsedQty <= 0) {
      newErrors.quantity = 'Please enter a valid harvest quantity.';
    }
    if (!preferredPickupDate.trim()) {
      newErrors.preferredPickupDate = 'Please specify a preferred pickup or dispatch date.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newRequest: InterestRequest = {
      id: `req-${Date.now()}`,
      buyerId: buyer.id,
      buyerName: buyer.name,
      buyerType: buyer.buyerType,
      buyerLocation: buyer.location,
      cropName: cropName.trim(),
      quantity: parsedQty,
      unit,
      harvestId: selectedHarvestId !== 'custom' ? selectedHarvestId : undefined,
      preferredPickupDate: preferredPickupDate.trim(),
      pickupPreference,
      message: message.trim() || undefined,
      status: 'Sent',
      submittedAt: 'Just now',
      timestamp: 'Just now',
    };

    onSubmitInterest(newRequest);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-xl bg-farm-surface rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-farm-border bg-farm-surface shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-farm-brand" />
                <h3 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                  Express Interest
                </h3>
              </div>
              <p className="text-xs text-farm-text-secondary">
                To: <strong className="text-farm-text">{buyer.name}</strong> ({buyer.buyerType})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Buyer Requirements Notice */}
            <div className="p-3.5 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40 flex items-start gap-2.5 text-xs text-farm-info">
              <Store className="w-4 h-4 text-farm-brand shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{buyer.name}</span> is currently procuring{' '}
                <strong>{buyer.cropsRequired.join(', ')}</strong> with typical lot sizes of{' '}
                <strong>{buyer.quantityRequirement}</strong> in {buyer.location}.
              </div>
            </div>

            {/* Select from My Harvests */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1.5 flex items-center justify-between">
                <span>Select from My Listed Harvests</span>
                <span className="text-[11px] font-normal text-farm-text-secondary">Auto-fills crop data</span>
              </label>
              <div className="relative">
                <select
                  value={selectedHarvestId}
                  onChange={(e) => handleHarvestSelect(e.target.value)}
                  className="w-full min-h-[46px] px-3.5 py-2 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-semibold text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand cursor-pointer"
                  id="select-my-harvest-input"
                >
                  <option value="custom">-- Custom Crop Entry --</option>
                  {harvests.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.cropName} &bull; {h.quantity} {h.unit} (Expected ₹{h.expectedPrice}/{h.unit === 'Quintals' ? 'kg' : h.unit}) &bull; {h.pickupLocation}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Crop Name & Quantity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  Crop Name <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="relative">
                  <Sprout className="w-4 h-4 absolute left-3.5 top-3 text-farm-brand" />
                  <input
                    type="text"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    placeholder="e.g. Tomato, Onion"
                    required
                    className={`w-full min-h-[46px] pl-10 pr-3.5 py-2 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.cropName ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="interest-crop-name"
                  />
                </div>
                {errors.cropName && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-0.5">{errors.cropName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  Available Quantity &amp; Unit <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 25"
                    required
                    className={`w-1/2 min-h-[46px] px-3 py-2 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.quantity ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="interest-quantity"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-1/2 min-h-[46px] px-2.5 py-2 bg-farm-surface border border-farm-border rounded-2xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
                    id="interest-unit"
                  >
                    <option value="Quintals">Quintals</option>
                    <option value="Kilograms">Kilograms</option>
                    <option value="Tonnes">Tonnes</option>
                    <option value="Crates">Crates</option>
                    <option value="Bags">Bags</option>
                  </select>
                </div>
                {errors.quantity && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-0.5">{errors.quantity}</p>
                )}
              </div>
            </div>

            {/* Preferred Pickup Date & Logistics Preference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  Preferred Pickup / Dispatch Date <span className="text-farm-terracotta font-bold">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3 text-farm-text-secondary" />
                  <input
                    type="text"
                    value={preferredPickupDate}
                    onChange={(e) => setPreferredPickupDate(e.target.value)}
                    placeholder="e.g. Tomorrow, 8:00 AM"
                    required
                    className={`w-full min-h-[46px] pl-10 pr-3.5 py-2 bg-farm-surface border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand ${
                      errors.preferredPickupDate ? 'border-farm-terracotta bg-farm-surface' : 'border-farm-border'
                    }`}
                    id="interest-pickup-date"
                  />
                </div>
                {errors.preferredPickupDate && (
                  <p className="text-[11px] text-farm-terracotta font-bold mt-0.5">{errors.preferredPickupDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-farm-text mb-1">
                  Pickup / Delivery Preference
                </label>
                <select
                  value={pickupPreference}
                  onChange={(e) => setPickupPreference(e.target.value as PickupDeliveryPref)}
                  className="w-full min-h-[46px] px-3.5 py-2 bg-farm-surface border border-farm-border rounded-2xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
                  id="interest-pickup-pref"
                >
                  <option value="Farmgate Pickup">Farmgate Pickup (Buyer Arranged)</option>
                  <option value="Mandi Delivery">Mandi Delivery (Farmer Arranged)</option>
                  <option value="Buyer Arranged Transport">Buyer Arranged Transport</option>
                  <option value="Flexible">Flexible / Mutual Agreement</option>
                </select>
              </div>
            </div>

            {/* Optional Note / Message */}
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Note / Produce Details <span className="text-farm-text-secondary font-normal">(Optional)</span>
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention packaging crates, produce firmness, quality grade notes..."
                rows={2}
                className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand resize-none"
                id="interest-message"
              />
            </div>

            {/* Prototype Notice */}
            <div className="p-3 rounded-xl bg-farm-gold-soft border border-farm-gold/40 flex items-center gap-2 text-xs text-farm-gold">
              <Info className="w-4 h-4 text-farm-gold shrink-0" />
              <span>
                Sending this interest will log your request in demo state without sending external SMS.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-farm-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-farm-border text-xs font-bold text-farm-text-secondary hover:bg-farm-surface-secondary cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
                id="submit-interest-request-btn"
              >
                <Send className="w-4 h-4 text-farm-gold" />
                <span>Send Interest Request</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
