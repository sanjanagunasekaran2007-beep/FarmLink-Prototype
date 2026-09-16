import { useState } from 'react';
import { X, Clock, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';
import { LogisticsDeliveryItem, LogisticsDeliveryStatus } from '@/types';

interface LogisticsStatusUpdateModalProps {
  delivery: LogisticsDeliveryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmUpdate: (deliveryId: string, newStatus: LogisticsDeliveryStatus, note: string) => void;
}

export const LogisticsStatusUpdateModal = ({
  delivery,
  isOpen,
  onClose,
  onConfirmUpdate,
}: LogisticsStatusUpdateModalProps) => {
  if (!isOpen || !delivery) return null;

  const [selectedStatus, setSelectedStatus] = useState<LogisticsDeliveryStatus>(delivery.status);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses: { id: LogisticsDeliveryStatus; label: string; desc: string }[] = [
    { id: 'Assigned', label: '1. Assigned', desc: 'Manifest created, awaiting dispatch' },
    { id: 'Pickup Pending', label: '2. Pickup Pending', desc: 'Vehicle en route to farmgate or collection yard' },
    { id: 'Picked Up', label: '3. Picked Up', desc: 'Produce loaded, verified, and sealed' },
    { id: 'In Transit', label: '4. In Transit', desc: 'Consignment moving along highway corridor' },
    { id: 'Delivered', label: '5. Delivered', desc: 'Handed over at buyer warehouse / Mandi dock' },
  ];

  const presetNotes = [
    'Vehicle reached the collection centre.',
    'Produce successfully picked up and crates secured.',
    'Delivery is currently in transit on express highway.',
    'Produce safely handed over to the receiving supervisor.',
    'Delayed by 15 mins due to loading bay queue.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmUpdate(delivery.id, selectedStatus, note.trim() || `Status changed to ${selectedStatus}`);
      setIsSubmitting(false);
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-lg rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface/15 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold">
                Update Delivery Status
              </h2>
              <p className="text-xs text-farm-text-secondary">
                {delivery.deliveryCode} &bull; {delivery.produceName}
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 text-farm-text">
          {/* Current Status Info */}
          <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border flex items-center justify-between text-xs">
            <span className="text-farm-text-secondary">Current Status:</span>
            <span className="px-2.5 py-0.5 rounded-full font-bold bg-farm-brand text-white">
              {delivery.status}
            </span>
          </div>

          {/* Status Selection List */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-2">
              Select New Stage:
            </label>
            <div className="space-y-2">
              {statuses.map((s) => {
                const isSelected = selectedStatus === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStatus(s.id)}
                    className={`w-full p-3 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-farm-brand-soft border-farm-brand text-farm-brand shadow-subtle'
                        : 'bg-farm-surface border-farm-border text-farm-text hover:bg-farm-surface-secondary'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className="text-[11px] text-farm-text-secondary mt-0.5">{s.desc}</div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-farm-brand text-white flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preset Quick Notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-farm-text flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-farm-gold" />
                Quick Preset Notes
              </label>
              <span className="text-[10px] text-farm-text-secondary">Tap to insert</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {presetNotes.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setNote(preset)}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-farm-surface text-farm-terracotta border border-farm-border hover:bg-farm-surface-secondary active:scale-95 transition-all text-left cursor-pointer"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Note Input */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1.5">
              Optional Driver Dispatch Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Arrived at loading bay, temperature verified at 6°C..."
              rows={2}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand resize-none"
            />
          </div>

          {/* Demo disclaimer */}
          <div className="p-3 bg-farm-surface rounded-xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-terracotta">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Demo update saved locally. No external API connected.</span>
          </div>

          {/* Actions */}
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
              id="confirm-status-update-button"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Saving...' : 'Confirm Status Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
