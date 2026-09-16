import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Package, 
  Calendar, 
  MapPin, 
  Truck, 
  Send,
  Eye
} from 'lucide-react';
import { InterestRequest } from '@/types';

interface MyInterestRequestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: InterestRequest[];
}

export const MyInterestRequestsModal: React.FC<MyInterestRequestsModalProps> = ({
  isOpen,
  onClose,
  requests,
}) => {
  const [selectedRequest, setSelectedRequest] = useState<InterestRequest | null>(null);

  if (!isOpen) return null;

  const getStatusBadge = (status: InterestRequest['status']) => {
    switch (status) {
      case 'Accepted':
        return {
          bg: '#DCE8D7',
          text: '#164A36',
          border: '#BFD4B8',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'Accepted by Buyer',
        };
      case 'Viewed':
        return {
          bg: '#DCEAF2',
          text: '#245B5A',
          border: '#B6D3E3',
          icon: <Eye className="w-3.5 h-3.5" />,
          label: 'Viewed by Buyer',
        };
      case 'Sent':
        return {
          bg: '#F6E7B8',
          text: '#694708',
          border: '#E4CC8B',
          icon: <Clock className="w-3.5 h-3.5" />,
          label: 'Request Sent',
        };
      case 'Closed':
        return {
          bg: '#F3EBDD',
          text: '#66736A',
          border: '#D5C9B5',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />,
          label: 'Closed / Fulfilled',
        };
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-3xl bg-farm-surface rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-farm-border bg-farm-surface shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-farm-surface-secondary border border-farm-border text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
                title="Back to Buyers"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-farm-brand" />
                  <h3 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                    My Interest Requests
                  </h3>
                </div>
                <p className="text-xs text-farm-text-secondary">
                  Track responses to harvest interest submissions sent to verified buyers
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
            {requests.length === 0 ? (
              <div className="bg-farm-surface rounded-2xl border border-farm-border p-12 text-center space-y-3 shadow-subtle">
                <div className="w-12 h-12 rounded-2xl bg-farm-surface-secondary text-farm-terracotta flex items-center justify-center mx-auto border border-farm-border">
                  <Send className="w-6 h-6" />
                </div>
                <h4 className="text-base font-display font-bold text-farm-text">
                  No interest requests sent yet
                </h4>
                <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
                  Browse verified buyers on the marketplace and click &quot;Express Interest&quot; to connect your listed crops directly.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {requests.map((req) => {
                  const badge = getStatusBadge(req.status);

                  return (
                    <div
                      key={req.id}
                      className="bg-farm-surface rounded-2xl border border-farm-border p-4 sm:p-5 shadow-subtle hover:border-farm-brand transition-all space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-display font-bold text-farm-text">
                              {req.buyerName}
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-farm-surface-secondary text-farm-text text-[10px] font-bold border border-farm-border">
                              {req.buyerType}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary font-medium">
                            <MapPin className="w-3.5 h-3.5 text-farm-terracotta" />
                            <span>{req.buyerLocation}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span
                            className="px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5"
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.text,
                              borderColor: badge.border,
                            }}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        </div>
                      </div>

                      {/* Produce & Timing Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-farm-border text-xs">
                        <div className="bg-farm-surface-secondary p-2.5 rounded-xl border border-farm-border">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1">
                            <Package className="w-3 h-3 text-farm-brand" />
                            <span>Offered Lot</span>
                          </div>
                          <div className="text-sm font-bold text-farm-text mt-0.5">
                            {req.quantity} {req.unit} &bull; {req.cropName}
                          </div>
                        </div>

                        <div className="bg-farm-surface-secondary p-2.5 rounded-xl border border-farm-border">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-farm-brand" />
                            <span>Pickup Date</span>
                          </div>
                          <div className="text-xs font-bold text-farm-text mt-0.5 truncate">
                            {req.preferredPickupDate}
                          </div>
                        </div>

                        <div className="bg-farm-surface-secondary p-2.5 rounded-xl border border-farm-border col-span-2 sm:col-span-1">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary flex items-center gap-1">
                            <Truck className="w-3 h-3 text-farm-gold" />
                            <span>Logistics</span>
                          </div>
                          <div className="text-xs font-bold text-farm-text mt-0.5 truncate">
                            {req.pickupPreference}
                          </div>
                        </div>
                      </div>

                      {/* Message excerpt if present */}
                      {req.message && (
                        <p className="text-xs text-farm-text-secondary bg-farm-surface p-2.5 rounded-xl border border-farm-border">
                          &ldquo;{req.message}&rdquo;
                        </p>
                      )}

                      <div className="flex items-center justify-between text-[11px] text-farm-text-secondary pt-1">
                        <span>Submitted: {req.submittedAt}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(req)}
                          className="font-bold text-farm-brand hover:underline cursor-pointer"
                        >
                          View Request Summary
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-6 border-t border-farm-border bg-farm-surface flex justify-end shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>

      {/* Request Details Nested Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-60 bg-farm-brand/70 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-farm-surface rounded-3xl p-6 border border-farm-border shadow-elevated space-y-4"
          >
            <div className="flex items-center justify-between border-b border-farm-border pb-3">
              <h3 className="font-display font-bold text-base text-farm-text">
                Interest Request Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="w-7 h-7 rounded-lg text-farm-text-secondary hover:bg-farm-surface-secondary flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-xl bg-farm-surface border border-farm-border">
                <span className="font-semibold text-farm-text-secondary">Buyer Name:</span>
                <span className="font-bold text-farm-text">{selectedRequest.buyerName}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-farm-surface border border-farm-border">
                <span className="font-semibold text-farm-text-secondary">Crop &amp; Quantity:</span>
                <span className="font-bold text-farm-text">{selectedRequest.quantity} {selectedRequest.unit} of {selectedRequest.cropName}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-farm-surface border border-farm-border">
                <span className="font-semibold text-farm-text-secondary">Pickup Date:</span>
                <span className="font-bold text-farm-text">{selectedRequest.preferredPickupDate}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-farm-surface border border-farm-border">
                <span className="font-semibold text-farm-text-secondary">Logistics:</span>
                <span className="font-bold text-farm-text">{selectedRequest.pickupPreference}</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-farm-surface border border-farm-border">
                <span className="font-semibold text-farm-text-secondary">Status:</span>
                <span className="font-bold text-farm-brand">{selectedRequest.status}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedRequest(null)}
              className="w-full py-2.5 rounded-xl bg-farm-brand text-white font-bold text-xs cursor-pointer"
            >
              Back to Requests
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
