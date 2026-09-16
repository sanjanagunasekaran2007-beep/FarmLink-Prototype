import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Truck, 
  MapPin, 
  Calendar, 
  Clock, 
  Layers, 
  Tag, 
  User, 
  ShieldCheck, 
  PackageCheck, 
  CheckCircle2, 
  Phone, 
  Navigation
} from 'lucide-react';
import { OrderDeliveryItem, OrderStatus } from '@/types';

interface OrderDetailsModalProps {
  isOpen: boolean;
  order: OrderDeliveryItem | null;
  onClose: () => void;
  onOpenTracking: (order: OrderDeliveryItem) => void;
  onOpenReadyForPickup: (order: OrderDeliveryItem) => void;
  onOpenContactLogistics: (order: OrderDeliveryItem) => void;
  onOpenConfirmCompletion: (order: OrderDeliveryItem) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  isOpen,
  order,
  onClose,
  onOpenTracking,
  onOpenReadyForPickup,
  onOpenContactLogistics,
  onOpenConfirmCompletion,
}) => {
  if (!isOpen || !order) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Confirmed':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Confirmed' };
      case 'Ready for Pickup':
        return { bg: 'bg-farm-gold', text: 'text-farm-text', label: 'Ready for Pickup' };
      case 'In Transit':
        return { bg: 'bg-farm-terracotta', text: 'text-white', label: 'In Transit' };
      case 'Delivered':
        return { bg: 'bg-farm-brand', text: 'text-white', label: 'Delivered' };
      case 'Completed':
        return { bg: 'bg-farm-brand', text: 'text-farm-gold', label: 'Completed & Paid' };
      case 'Pending':
      default:
        return { bg: 'bg-farm-terracotta', text: 'text-white', label: 'Pending Confirmation' };
    }
  };

  const statusBadge = getStatusBadge(order.status);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-farm-brand/75 backdrop-blur-xs overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="bg-farm-surface w-full max-w-3xl rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Banner */}
          <div className="bg-farm-brand text-white p-5 sm:p-6 border-b border-farm-brand flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center font-bold text-xl border border-farm-border shrink-0">
                {order.cropName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-farm-gold px-2 py-0.5 rounded-md bg-farm-brand border border-farm-brand">
                    {order.orderCode}
                  </span>
                  {order.harvestRef && (
                    <span className="font-mono text-[11px] font-bold text-white/80 px-2 py-0.5 rounded-md bg-farm-brand">
                      Lot: {order.harvestRef}
                    </span>
                  )}
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusBadge.bg} ${statusBadge.text}`}>
                    {statusBadge.label}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                  {order.cropName} &bull; {order.quantity} {order.unit}
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

          {/* Scrollable Modal Content */}
          <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong">
                <div className="text-[11px] font-bold uppercase tracking-wider text-farm-brand flex items-center gap-1.5 mb-1">
                  <Layers className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Order Quantity</span>
                </div>
                <div className="text-xl font-display font-bold text-farm-brand">
                  {order.quantity} <span className="text-xs font-semibold">{order.unit}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-farm-terracotta-soft border border-farm-terracotta/40">
                <div className="text-[11px] font-bold uppercase tracking-wider text-farm-terracotta flex items-center gap-1.5 mb-1">
                  <Tag className="w-3.5 h-3.5 text-farm-terracotta" />
                  <span>Total Value</span>
                </div>
                <div className="text-xl font-display font-bold text-farm-terracotta">
                  ₹{order.totalAmount ? order.totalAmount.toLocaleString() : 'Pending'}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-farm-gold-soft border border-farm-gold/40">
                <div className="text-[11px] font-bold uppercase tracking-wider text-farm-gold flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Order Date</span>
                </div>
                <div className="text-xs font-bold text-farm-gold">
                  {order.orderDate}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40">
                <div className="text-[11px] font-bold uppercase tracking-wider text-farm-info flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-farm-brand" />
                  <span>Expected Date</span>
                </div>
                <div className="text-xs font-bold text-farm-brand">
                  {order.expectedDate}
                </div>
              </div>
            </div>

            {/* Buyer & Payment Security Box */}
            <div className="p-5 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand pb-2 border-b border-farm-border flex items-center justify-between">
                <span>Buyer & Payment Security</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong">
                  {order.escrowStatus || 'Mandi Escrow Secured'}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-farm-text-secondary font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-farm-brand" /> Buyer Organization:
                  </span>
                  <p className="font-bold text-farm-text text-sm">{order.buyerName}</p>
                  <p className="text-[11px] text-farm-text-secondary">{order.buyerType || 'Verified Buyer'} &bull; {order.buyerLocation}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-farm-text-secondary font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-farm-brand" /> Settlement Guarantee:
                  </span>
                  <p className="font-bold text-farm-text">100% Escrow Protection</p>
                  <p className="text-[11px] text-farm-text-secondary">Payout released directly upon digital delivery verification.</p>
                </div>
              </div>
            </div>

            {/* Route & Pickup/Delivery Details */}
            <div className="p-5 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand pb-2 border-b border-farm-border flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-farm-terracotta" />
                <span>Logistics Route & Address Points</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-farm-brand block">
                    Farmgate Pickup Location
                  </span>
                  <p className="font-bold text-farm-text">{order.pickupLocation}</p>
                </div>

                <div className="p-3 rounded-xl bg-farm-surface border border-farm-border space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-farm-terracotta block">
                    Buyer Delivery Destination
                  </span>
                  <p className="font-bold text-farm-text">{order.deliveryLocation}</p>
                </div>
              </div>

              {order.deliveryInstructions && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider block mb-1">
                    Special Handling / Delivery Instructions:
                  </span>
                  <p className="text-xs text-farm-text font-medium bg-farm-surface p-3 rounded-xl border border-farm-border">
                    {order.deliveryInstructions}
                  </p>
                </div>
              )}
            </div>

            {/* Assigned Logistics Provider */}
            {order.logisticsProvider && (
              <div className="p-5 rounded-2xl bg-farm-surface border border-farm-border space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand pb-2 border-b border-farm-border flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-farm-brand" />
                    <span>Assigned Logistics Fleet</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onOpenContactLogistics(order)}
                    className="text-xs font-bold text-farm-brand hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Contact Driver</span>
                  </button>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-farm-text-secondary block font-semibold">Transport Company:</span>
                    <span className="font-bold text-farm-text">{order.logisticsProvider.name}</span>
                  </div>
                  <div>
                    <span className="text-farm-text-secondary block font-semibold">Assigned Vehicle:</span>
                    <span className="font-mono font-bold text-farm-brand">{order.logisticsProvider.vehicleNo}</span>
                  </div>
                  <div>
                    <span className="text-farm-text-secondary block font-semibold">Driver & Status:</span>
                    <span className="font-bold text-farm-text">{order.logisticsProvider.driverName}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Timeline */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-farm-brand flex items-center gap-2">
                <Clock className="w-4 h-4 text-farm-gold" />
                <span>Order Activity Timeline</span>
              </h3>

              <div className="space-y-2.5">
                {order.timeline.map((event, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-farm-text">{event.title}</span>
                        {event.statusBadge && (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong">
                            {event.statusBadge}
                          </span>
                        )}
                      </div>
                      <p className="text-farm-text-secondary font-medium">{event.description}</p>
                    </div>
                    <span className="text-[11px] font-bold text-farm-text-secondary shrink-0">
                      {event.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-farm-surface-secondary p-4 sm:p-5 border-t border-farm-border flex flex-wrap items-center justify-between gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenTracking(order)}
                className="px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
              >
                <Navigation className="w-3.5 h-3.5 text-farm-gold" />
                <span>Track Delivery</span>
              </button>

              {order.status === 'Confirmed' && (
                <button
                  type="button"
                  onClick={() => onOpenReadyForPickup(order)}
                  className="px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
                >
                  <PackageCheck className="w-3.5 h-3.5 text-farm-gold" />
                  <span>Mark Ready for Pickup</span>
                </button>
              )}

              {order.status === 'Delivered' && (
                <button
                  type="button"
                  onClick={() => onOpenConfirmCompletion(order)}
                  className="px-4 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-subtle"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Confirm Completion</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
