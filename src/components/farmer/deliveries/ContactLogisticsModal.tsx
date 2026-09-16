import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Phone, MessageSquare, Star, X, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { LogisticsProvider } from '@/types';

interface ContactLogisticsModalProps {
  isOpen: boolean;
  provider: LogisticsProvider | null;
  orderCode: string;
  onClose: () => void;
}

export const ContactLogisticsModal: React.FC<ContactLogisticsModalProps> = ({
  isOpen,
  provider,
  orderCode,
  onClose,
}) => {
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  if (!isOpen || !provider) return null;

  const handleDemoCall = () => {
    setFeedbackToast(`Demo call initiated to driver ${provider.driverName} (${provider.driverPhone}).`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleDemoMessage = () => {
    setFeedbackToast(`Automated SMS sent with farmgate pickup coordinates for ${orderCode}.`);
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-farm-surface w-full max-w-md rounded-3xl border border-farm-border shadow-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 border-b border-farm-brand flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center border border-farm-border shrink-0">
                <Truck className="w-5 h-5 text-farm-gold" />
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-white">
                  Contact Logistics
                </h3>
                <p className="text-xs text-white/70 font-mono">
                  Order: {orderCode}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-farm-brand text-white hover:bg-farm-gold hover:text-farm-text transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Feedback Toast */}
          {feedbackToast && (
            <div className="bg-farm-brand-soft text-farm-brand border-b border-farm-border-strong p-3 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-farm-brand shrink-0" />
              <span>{feedbackToast}</span>
            </div>
          )}

          {/* Body */}
          <div className="p-6 space-y-4">
            {/* Demo Notice Banner */}
            <div className="p-3 rounded-xl bg-farm-gold-soft border border-farm-gold/40 text-[11px] font-bold text-farm-gold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-farm-gold shrink-0" />
              <span>Demo logistics contact — verified driver assigned via Mandi Transport Network.</span>
            </div>

            {/* Provider Info Card */}
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-base text-farm-text">
                    {provider.name}
                  </h4>
                  <p className="text-xs text-farm-text-secondary font-semibold">{provider.vehicleType}</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-farm-brand-soft text-farm-brand font-bold text-xs">
                  <Star className="w-3.5 h-3.5 fill-farm-brand text-farm-brand" />
                  <span>{provider.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-farm-border text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-farm-brand" /> Driver Name
                  </span>
                  <span className="font-bold text-farm-text">{provider.driverName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-farm-brand" /> Vehicle Registration
                  </span>
                  <span className="font-mono font-bold text-farm-text bg-farm-surface-secondary px-2 py-0.5 rounded-md border border-farm-border">
                    {provider.vehicleNo}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-farm-terracotta" /> Contact Phone
                  </span>
                  <span className="font-bold text-farm-text">{provider.driverPhone}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary">Trip Status</span>
                  <span className="font-bold px-2 py-0.5 rounded-md bg-farm-eucalyptus-soft text-farm-brand border border-farm-info/40">
                    {provider.contactStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Demo Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDemoCall}
                className="px-4 py-3 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs hover:bg-farm-brand active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-subtle"
              >
                <Phone className="w-4 h-4 text-farm-gold" />
                <span>Call Driver</span>
              </button>

              <button
                type="button"
                onClick={handleDemoMessage}
                className="px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-farm-text font-display font-bold text-xs hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-farm-brand" />
                <span>Message</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
