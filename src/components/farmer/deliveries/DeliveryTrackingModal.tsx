import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Truck, 
  MapPin, 
  Phone, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Navigation,
  PackageCheck
} from 'lucide-react';
import { OrderDeliveryItem } from '@/types';

interface DeliveryTrackingModalProps {
  isOpen: boolean;
  order: OrderDeliveryItem | null;
  onClose: () => void;
  onOpenReadyForPickup: (order: OrderDeliveryItem) => void;
  onOpenContactLogistics: (order: OrderDeliveryItem) => void;
  onOpenConfirmCompletion: (order: OrderDeliveryItem) => void;
}

export const DeliveryTrackingModal: React.FC<DeliveryTrackingModalProps> = ({
  isOpen,
  order,
  onClose,
  onOpenReadyForPickup,
  onOpenContactLogistics,
  onOpenConfirmCompletion,
}) => {
  if (!isOpen || !order) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-4xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center font-bold text-xl border border-farm-border shrink-0">
                <Navigation className="w-6 h-6 text-farm-gold" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-farm-gold px-2 py-0.5 rounded-md bg-farm-brand border border-farm-brand">
                    {order.orderCode}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-farm-brand text-white">
                    {order.status}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                  Delivery Tracking &bull; {order.cropName} ({order.quantity} {order.unit})
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-farm-brand text-white hover:bg-farm-gold hover:text-farm-text transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
            {/* Illustrative Demo Notice Banner (Mandatory requirement) */}
            <div className="p-3 sm:p-4 rounded-2xl bg-farm-surface border border-farm-gold/40 text-xs font-medium text-farm-gold flex items-center gap-3 shadow-subtle">
              <div className="w-8 h-8 rounded-xl bg-farm-gold-soft flex items-center justify-center shrink-0 border border-farm-gold/40">
                <ShieldAlert className="w-4 h-4 text-farm-gold" />
              </div>
              <div>
                <span className="font-bold block text-sm">Illustrative demo tracking — live location is not connected.</span>
                <span className="text-[11px] text-farm-gold/80">Milestones reflect verified gate-passes, driver check-ins, and digital POD signoffs.</span>
              </div>
            </div>

            {/* Route Summary Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-farm-surface border border-farm-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-brand" /> Farmgate Origin (Pickup)
                </span>
                <p className="text-xs font-bold text-farm-text">{order.pickupLocation}</p>
                <p className="text-[11px] text-farm-text-secondary font-semibold">Expected: {order.orderDate}</p>
              </div>

              <div className="space-y-1 sm:border-l sm:border-farm-border sm:pl-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-farm-terracotta flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-terracotta" /> Buyer Destination
                </span>
                <p className="text-xs font-bold text-farm-text">{order.deliveryLocation}</p>
                <p className="text-[11px] text-farm-text-secondary font-semibold">Buyer: {order.buyerName} ({order.buyerLocation})</p>
              </div>
            </div>

            {/* 7-STAGE DELIVERY TIMELINE */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-2">
                <Truck className="w-4 h-4 text-farm-gold" />
                <span>7-Stage Delivery Progression</span>
              </h3>

              {/* Desktop Horizontal Stepper (hidden on mobile) */}
              <div className="hidden lg:block bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-card">
                <div className="grid grid-cols-7 gap-2 relative">
                  {order.trackingSteps.map((step, idx) => {
                    return (
                      <div key={idx} className="flex flex-col items-center text-center relative group">
                        {/* Connecting line between nodes */}
                        {idx < order.trackingSteps.length - 1 && (
                          <div 
                            className={`absolute top-4 left-1/2 w-full h-1 z-0 ${
                              order.trackingSteps[idx + 1].isCompleted 
                                ? 'bg-farm-brand' 
                                : step.isCompleted 
                                ? 'bg-farm-gold' 
                                : 'bg-farm-surface-secondary'
                            }`} 
                          />
                        )}

                        {/* Step Circle Node */}
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 shadow-subtle transition-all ${
                            step.isCompleted
                              ? 'bg-farm-brand text-white border-2 border-farm-brand'
                              : step.isCurrent
                              ? 'bg-farm-gold text-farm-text border-2 border-farm-brand ring-4 ring-farm-gold-soft'
                              : 'bg-farm-surface-secondary text-farm-text-secondary border-2 border-farm-border'
                          }`}
                        >
                          {step.isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>

                        {/* Step Title & Info */}
                        <div className="mt-2.5 space-y-0.5">
                          <span className={`text-[11px] font-bold block leading-tight ${
                            step.isCurrent 
                              ? 'text-farm-text font-extrabold' 
                              : step.isCompleted 
                              ? 'text-farm-brand' 
                              : 'text-farm-text-secondary'
                          }`}>
                            {step.stage}
                          </span>
                          {step.date && (
                            <span className="text-[10px] text-farm-text-secondary font-semibold block">
                              {step.date}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Vertical Timeline (Mobile and detailed stage cards) */}
              <div className="space-y-3">
                {order.trackingSteps.map((step, idx) => {
                  const isCurrent = step.isCurrent;
                  const isCompleted = step.isCompleted;

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        isCurrent
                          ? 'bg-farm-surface border-farm-gold ring-2 ring-farm-gold-soft'
                          : isCompleted
                          ? 'bg-farm-surface border-farm-border-strong'
                          : 'bg-farm-surface/70 border-farm-border opacity-75'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                            isCompleted
                              ? 'bg-farm-brand text-white'
                              : isCurrent
                              ? 'bg-farm-gold text-farm-text'
                              : 'bg-farm-surface-secondary text-farm-text-secondary'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-farm-text">
                              {step.stage}
                            </span>
                            {isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-farm-gold text-farm-text">
                                Current Stage
                              </span>
                            )}
                            {isCompleted && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-farm-brand-soft text-farm-brand">
                                Verified
                              </span>
                            )}
                            {!isCompleted && !isCurrent && (
                              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-farm-surface-secondary text-farm-text-secondary">
                                Pending
                              </span>
                            )}
                          </div>
                          {step.date && (
                            <span className="text-[11px] font-bold text-farm-text-secondary flex items-center gap-1">
                              <Clock className="w-3 h-3 text-farm-brand" />
                              <span>{step.date}</span>
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-farm-text-secondary font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Logistics Driver Contact Quick Strip */}
            {order.logisticsProvider && (
              <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-farm-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-farm-text">
                      {order.logisticsProvider.name} &bull; {order.logisticsProvider.vehicleNo}
                    </h4>
                    <p className="text-[11px] text-farm-text-secondary font-semibold">
                      Driver: {order.logisticsProvider.driverName} ({order.logisticsProvider.driverPhone})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContactLogistics(order)}
                  className="px-4 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-brand hover:bg-farm-brand-soft active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Contact Driver</span>
                </button>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex flex-wrap items-center justify-between gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {order.status === 'Confirmed' && (
                <button
                  type="button"
                  onClick={() => onOpenReadyForPickup(order)}
                  className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
                >
                  <PackageCheck className="w-4 h-4 text-farm-gold" />
                  <span>Mark Ready for Pickup</span>
                </button>
              )}

              {order.status === 'Delivered' && (
                <button
                  type="button"
                  onClick={() => onOpenConfirmCompletion(order)}
                  className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Confirm Completion</span>
                </button>
              )}

              {order.logisticsProvider && (
                <button
                  type="button"
                  onClick={() => onOpenContactLogistics(order)}
                  className="px-4 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-farm-text text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Logistics Details</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
