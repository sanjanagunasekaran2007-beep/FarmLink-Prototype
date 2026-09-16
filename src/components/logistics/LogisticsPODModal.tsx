import { useState } from 'react';
import { X, FileCheck2, CheckCircle2, AlertCircle, KeyRound, UserCheck, ShieldCheck } from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsPODModalProps {
  delivery: LogisticsDeliveryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPOD: (
    deliveryId: string,
    method: 'Buyer confirmation' | 'Delivery code verified' | 'Manual confirmation',
    verifiedCode: string,
    receivedBy: string,
    note: string
  ) => void;
}

export const LogisticsPODModal = ({
  delivery,
  isOpen,
  onClose,
  onConfirmPOD,
}: LogisticsPODModalProps) => {
  if (!isOpen || !delivery) return null;

  const [method, setMethod] = useState<'Buyer confirmation' | 'Delivery code verified' | 'Manual confirmation'>('Delivery code verified');
  const [code, setCode] = useState('POD-9482');
  const [receivedBy, setReceivedBy] = useState('Receiving Manager (Buyer)');
  const [note, setNote] = useState('All crates inspected. Zero transit damage observed.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmPOD(
        delivery.id,
        method,
        code.trim() || 'POD-VERIFIED',
        receivedBy.trim() || 'Buyer Representative',
        note.trim()
      );
      setIsSubmitting(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-lg rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface/15 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold">
                Proof of Delivery (POD) Demo
              </h2>
              <p className="text-xs text-farm-brand-soft">
                {delivery.deliveryCode} &bull; {delivery.produceName} ({delivery.quantity} {delivery.unit})
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
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-farm-text">
          {/* Demo disclaimer banner */}
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
            <p className="text-xs text-farm-terracotta leading-relaxed">
              <strong className="font-bold">Demonstration Workflow:</strong> This is a simulation interface. No real delivery verification, digital signature, or OTP is executed.
            </p>
          </div>

          {/* Delivery Handover Summary */}
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-farm-text-secondary">Consignment Code:</span>
              <span className="font-mono font-bold text-farm-brand">{delivery.deliveryCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-farm-text-secondary">Receiving Buyer:</span>
              <span className="font-bold text-farm-text">{delivery.buyerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-farm-text-secondary">Drop-off Location:</span>
              <span className="text-farm-text">{delivery.deliveryLocation}</span>
            </div>
          </div>

          {/* Verification Method Selector */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-2">
              Select Confirmation Method:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'Delivery code verified', label: 'Delivery Code', icon: <KeyRound className="w-3.5 h-3.5" /> },
                { id: 'Buyer confirmation', label: 'Buyer Signoff', icon: <UserCheck className="w-3.5 h-3.5" /> },
                { id: 'Manual confirmation', label: 'Manual Check', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
              ].map((opt) => {
                const isSelected = method === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMethod(opt.id as any)}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                        : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                    }`}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fictional Code / Identifier */}
          {method === 'Delivery code verified' && (
            <div>
              <label className="block text-xs font-bold text-farm-text mb-1">
                Fictional 4-Digit Buyer Delivery Code (Demo)
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="POD-9482"
                className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border font-mono text-xs font-bold text-farm-brand focus:outline-none focus:border-farm-brand"
              />
            </div>
          )}

          {/* Received By */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Received By (Name / Designation)
            </label>
            <input
              type="text"
              value={receivedBy}
              onChange={(e) => setReceivedBy(e.target.value)}
              placeholder="e.g. Ramesh K. (Receiving Supervisor)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand"
            />
          </div>

          {/* Note / Remarks */}
          <div>
            <label className="block text-xs font-bold text-farm-text mb-1">
              Delivery Remarks & Condition Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. 20 crates unloaded in good condition, seals verified..."
              rows={2}
              className="w-full px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs focus:outline-none focus:border-farm-brand resize-none"
            />
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
              id="submit-pod-confirmation-button"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isSubmitting ? 'Recording...' : 'Mark Delivery Completed'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
