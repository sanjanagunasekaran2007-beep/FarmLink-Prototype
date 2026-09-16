import { useState } from 'react';
import { Truck, MapPin, ShieldCheck, Phone, Eye, AlertCircle } from 'lucide-react';
import { OrderDeliveryItem } from '@/types';
import { BuyerOrderDetailModal } from '../BuyerOrderDetailModal';

interface BuyerOrdersViewProps {
  orders: OrderDeliveryItem[];
}

export const BuyerOrdersView = ({ orders }: BuyerOrdersViewProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderDeliveryItem | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-farm-brand text-white border-farm-border';
      case 'Delivered':
      case 'Completed':
        return 'bg-farm-brand-soft text-farm-brand border-farm-brand';
      case 'Ready for Pickup':
        return 'bg-farm-surface-secondary text-farm-terracotta border-farm-gold';
      default:
        return 'bg-farm-surface text-farm-terracotta border-farm-border';
    }
  };

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              Confirmed Orders & Dispatches
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-white text-xs font-bold">
              {orders.length} Consignments
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-0.5">
            Monitor consignment tracking, assigned fleet vehicles, and verified escrow releases
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-farm-text-secondary bg-farm-surface px-3 py-1 rounded-xl border border-farm-border">
            Demo Tracking Data
          </span>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="p-12 text-center bg-farm-surface rounded-3xl border border-farm-border shadow-card space-y-3">
          <div className="w-12 h-12 rounded-full bg-farm-surface text-farm-text-secondary mx-auto flex items-center justify-center border border-farm-border">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-farm-text">No Active Orders</h3>
          <p className="text-xs text-farm-text-secondary">
            When an interest request is accepted and escrow locked, your order tracking begins here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-farm-surface rounded-3xl border border-farm-border shadow-card p-5 sm:p-6 space-y-4 hover:border-farm-brand transition-all"
            >
              {/* Top Row: Order ID, Crop, Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-farm-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-farm-brand text-white flex items-center justify-center font-display font-bold">
                    <Truck className="w-5 h-5 text-farm-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-base sm:text-lg text-farm-text">
                        {ord.cropName} {ord.variety ? `(${ord.variety})` : ''}
                      </h3>
                      <span className="text-xs font-mono text-farm-text-secondary bg-farm-surface-secondary px-2 py-0.5 rounded-md border border-farm-border">
                        {ord.orderCode}
                      </span>
                    </div>
                    <p className="text-xs text-farm-text-secondary">
                      Lot Ref: {ord.harvestRef || 'Direct Batch'} &bull; Ordered on: {ord.orderDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Total Escrow</span>
                    <span className="text-base font-display font-bold text-farm-brand">
                      ₹{ord.totalAmount?.toLocaleString('en-IN') || '0'}
                    </span>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                      ord.status
                    )}`}
                  >
                    {ord.status}
                  </span>
                </div>
              </div>

              {/* Middle Row: Quantity, Locations, Fleet */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-farm-text">
                <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-1">
                  <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Quantity & Lot</span>
                  <span className="font-bold text-sm text-farm-text">
                    {ord.quantity} {ord.unit}
                  </span>
                  <span className="text-[11px] text-farm-text-secondary block">
                    Expected: {ord.expectedDate}
                  </span>
                </div>

                <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-1">
                  <span className="text-[10px] font-bold text-farm-text-secondary uppercase block flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-farm-terracotta" />
                    <span>Origin to Destination</span>
                  </span>
                  <p className="font-bold truncate">{ord.pickupLocation}</p>
                  <p className="text-[11px] text-farm-text-secondary truncate">→ {ord.deliveryLocation}</p>
                </div>

                <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-1">
                  <span className="text-[10px] font-bold text-farm-text-secondary uppercase block flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-farm-brand" />
                    <span>Logistics Carrier</span>
                  </span>
                  {ord.logisticsProvider ? (
                    <div>
                      <span className="font-bold block">{ord.logisticsProvider.vehicleNo}</span>
                      <span className="text-[11px] text-farm-brand font-mono font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{ord.logisticsProvider.driverName} ({ord.logisticsProvider.driverPhone})</span>
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-farm-text-secondary">Carrier being assigned</span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-xs text-farm-brand font-semibold">
                  <ShieldCheck className="w-4 h-4 text-farm-brand" />
                  <span>{ord.escrowStatus || 'Guaranteed Escrow Payout'}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrder(ord)}
                  className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
                >
                  <Eye className="w-3.5 h-3.5 text-farm-gold" />
                  <span>View Order & Tracking Steps</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 bg-farm-surface-secondary rounded-3xl border border-farm-border flex items-center gap-2.5 text-xs text-farm-text-secondary">
        <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
        <span>Delivery tracking is illustrative. Live tracking is not connected.</span>
      </div>

      {/* Order Detail Modal */}
      <BuyerOrderDetailModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};
