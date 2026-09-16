import { X, Truck, MapPin, ShieldCheck, Phone, AlertCircle } from 'lucide-react';
import { OrderDeliveryItem } from '@/types';

interface BuyerOrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderDeliveryItem | null;
}

export const BuyerOrderDetailModal = ({
  isOpen,
  onClose,
  order,
}: BuyerOrderDetailModalProps) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto select-none">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-2xl shadow-elevated overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-white">
              <Truck className="w-5 h-5 text-farm-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                  Order {order.orderCode}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-farm-brand text-farm-gold border border-farm-brand">
                  {order.status}
                </span>
              </div>
              <p className="text-xs text-white/70 font-medium">
                {order.cropName} &bull; {order.quantity} {order.unit}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Escrow Settlement & Cost Summary */}
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-farm-text-secondary block">Total Order Settlement</span>
              <div className="text-2xl font-display font-bold text-farm-brand">
                ₹{order.totalAmount?.toLocaleString('en-IN') || '0'}
              </div>
              <div className="text-[11px] text-farm-text-secondary mt-0.5">
                Quantity: <span className="font-bold text-farm-text">{order.quantity} {order.unit}</span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold uppercase text-farm-brand block">Escrow Security</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-xs font-bold border border-farm-border mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{order.escrowStatus || 'Locked in Escrow'}</span>
              </span>
            </div>
          </div>

          {/* Interactive Delivery Tracking Progression */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-farm-text tracking-wider flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-farm-brand" />
              <span>Consignment Live Tracking</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              {[
                { stage: 'Confirmed', isDone: true, label: 'Order Locked' },
                { stage: 'Ready for Pickup', isDone: true, label: 'Crated at Farm' },
                { stage: 'In Transit', isDone: order.status === 'In Transit' || order.status === 'Delivered' || order.status === 'Completed', label: 'On Route' },
                { stage: 'Delivered', isDone: order.status === 'Delivered' || order.status === 'Completed', label: 'Warehouse Intake' },
              ].map((st, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    st.isDone
                      ? 'bg-farm-brand-soft border-farm-brand text-farm-brand'
                      : 'bg-farm-surface border-farm-border text-farm-text-secondary opacity-60'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold bg-white/60">
                    {st.isDone ? '✓' : idx + 1}
                  </div>
                  <div className="font-bold text-xs">{st.stage}</div>
                  <div className="text-[10px]">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logistics Carrier & Driver Details */}
          {order.logisticsProvider && (
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-farm-border">
                <span className="text-xs font-bold text-farm-brand uppercase tracking-wider">
                  Assigned Logistics Carrier
                </span>
                <span className="text-[10px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded-full border border-farm-border">
                  {order.logisticsProvider.contactStatus}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-farm-text">
                <div>
                  <span className="text-farm-text-secondary block text-[11px]">Carrier Fleet</span>
                  <span className="font-bold">{order.logisticsProvider.name}</span>
                  <span className="text-[11px] text-farm-text-secondary block mt-0.5">
                    Vehicle: <span className="font-mono font-bold">{order.logisticsProvider.vehicleNo}</span> ({order.logisticsProvider.vehicleType})
                  </span>
                </div>

                <div>
                  <span className="text-farm-text-secondary block text-[11px]">Designated Driver</span>
                  <span className="font-bold">{order.logisticsProvider.driverName}</span>
                  <span className="text-[11px] text-farm-brand font-mono font-bold flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3" />
                    <span>{order.logisticsProvider.driverPhone}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Route Locations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-farm-text">
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border space-y-1">
              <span className="text-[10px] font-bold uppercase text-farm-text-secondary flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-farm-terracotta" />
                <span>Farmgate Collection Point</span>
              </span>
              <p className="font-bold">{order.pickupLocation}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border space-y-1">
              <span className="text-[10px] font-bold uppercase text-farm-text-secondary flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-farm-brand" />
                <span>Destination Intake Warehouse</span>
              </span>
              <p className="font-bold">{order.deliveryLocation}</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-3 bg-farm-surface-secondary rounded-2xl border border-farm-border flex items-center gap-2 text-[11px] text-farm-text-secondary">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
            <span>Delivery tracking is illustrative. Live tracking is not connected.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface-secondary border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer border border-farm-brand"
          >
            Close Order Details
          </button>
        </div>
      </div>
    </div>
  );
};
