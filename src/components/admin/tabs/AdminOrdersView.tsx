import { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  Truck, 
  ShieldCheck, 
  Clock, 
  FileText,
  X
} from 'lucide-react';
import { AdminOrderItem } from '@/types';

interface AdminOrdersViewProps {
  orders: AdminOrderItem[];
}

export const AdminOrdersView = ({
  orders,
}: AdminOrdersViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [logisticsFilter, setLogisticsFilter] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderItem | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.logisticsPartner.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOrder = orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
    const matchesLogistics = logisticsFilter === 'All' || o.logisticsStatus === logisticsFilter;

    return matchesSearch && matchesOrder && matchesLogistics;
  });

  const getOrderStatusStyle = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'In Transit':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Confirmed':
        return { bg: '#DDE8F0', text: '#2A5570', border: '#4A7C9D' };
      default:
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-surface-secondary text-farm-text-secondary text-[11px] font-bold border border-farm-gold/40 uppercase tracking-wider mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Read-only demonstration view</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            Orders & Deliveries Ledger
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Real-time trade fulfillment audit. Administrative accounts have read-only visibility over transactions and fleet corridors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text">
            Showing <strong className="text-farm-brand">{filteredOrders.length}</strong> of {orders.length} Trades
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-farm-surface p-4 sm:p-5 rounded-2xl border border-farm-border shadow-subtle space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID, Buyer, Farmer, Crop, or Fleet..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text placeholder-farm-text-muted focus:outline-none focus:border-farm-brand transition-colors"
            />
          </div>

          {/* Order Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={orderStatusFilter}
              onChange={(e) => setOrderStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              <option value="All">All Order Statuses</option>
              <option value="In Transit">In Transit</option>
              <option value="Confirmed">Confirmed (Processing)</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {/* Logistics Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={logisticsFilter}
              onChange={(e) => setLogisticsFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              <option value="All">All Delivery Statuses</option>
              <option value="Pickup Pending">Pickup Pending</option>
              <option value="In Transit">In Transit</option>
              <option value="Completed">Completed (Signed POD)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border shadow-subtle overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-farm-text">
              No trade records found
            </h3>
            <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
              Try modifying your search keywords or clear the status filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-farm-surface text-farm-text font-bold border-b border-farm-border select-none">
                <tr>
                  <th className="px-5 py-3.5">Order ID & Date</th>
                  <th className="px-4 py-3.5">Crop & Volume</th>
                  <th className="px-4 py-3.5">Trade Parties (Farmer &rarr; Buyer)</th>
                  <th className="px-4 py-3.5">Logistics & Corridor</th>
                  <th className="px-4 py-3.5">Total Amount & Escrow</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-farm-border">
                {filteredOrders.map((order) => {
                  const statusStyle = getOrderStatusStyle(order.orderStatus);

                  return (
                    <tr key={order.id} className="hover:bg-farm-surface/40 transition-colors">
                      {/* Order ID & Date */}
                      <td className="px-5 py-4">
                        <div className="font-mono font-bold text-sm text-farm-text">{order.orderId}</div>
                        <div className="text-[11px] text-farm-text-secondary mt-0.5">{order.createdDate}</div>
                      </td>

                      {/* Crop & Quantity */}
                      <td className="px-4 py-4">
                        <div className="font-bold text-sm text-farm-text">{order.cropName}</div>
                        <div className="text-[11px] text-farm-brand font-semibold">{order.quantity.toLocaleString()} {order.unit}</div>
                      </td>

                      {/* Trade Parties */}
                      <td className="px-4 py-4 space-y-0.5">
                        <div className="text-xs text-farm-text">
                          <strong className="text-farm-brand">From:</strong> {order.farmerName}
                        </div>
                        <div className="text-xs text-farm-text">
                          <strong className="text-farm-text-secondary">To:</strong> {order.buyerName}
                        </div>
                      </td>

                      {/* Logistics Partner */}
                      <td className="px-4 py-4">
                        <div className="font-medium text-farm-text flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-farm-text-secondary" />
                          <span>{order.logisticsPartner}</span>
                        </div>
                        <div className="text-[11px] text-farm-text-secondary mt-0.5">
                          Freight: <span className="font-semibold text-farm-text">{order.logisticsStatus}</span>
                        </div>
                      </td>

                      {/* Total Amount & Escrow */}
                      <td className="px-4 py-4">
                        <div className="font-bold text-sm text-farm-text">₹{order.totalAmount.toLocaleString()}</div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-farm-brand bg-farm-brand-soft px-2 py-0.5 rounded border border-farm-brand/30 mt-0.5">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{order.escrowStatus}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            borderColor: statusStyle.border,
                          }}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-brand-soft hover:text-farm-brand transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Summary</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Summary Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none">
          <div className="w-full max-w-lg bg-farm-surface rounded-2xl border border-farm-border shadow-subtle overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-brand">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-farm-brand flex items-center justify-center text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Trade Summary
                  </h3>
                  <p className="text-xs text-farm-text-secondary/80 font-mono">
                    {selectedOrder.orderId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg bg-farm-brand text-farm-text-secondary hover:bg-farm-brand transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="p-4 rounded-xl bg-farm-surface border border-farm-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-farm-text-secondary">Produce Item</span>
                  <span className="text-xs font-bold text-farm-brand">{selectedOrder.quantity} {selectedOrder.unit}</span>
                </div>
                <h4 className="text-lg font-display font-bold text-farm-text">{selectedOrder.cropName}</h4>
                <div className="text-xs text-farm-text-secondary">Associated Listing: {selectedOrder.listingId}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border">
                  <span className="text-xs font-bold text-farm-text-secondary">Farmer (Seller)</span>
                  <p className="text-sm font-bold text-farm-text mt-0.5">{selectedOrder.farmerName}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border">
                  <span className="text-xs font-bold text-farm-text-secondary">Buyer (Purchaser)</span>
                  <p className="text-sm font-bold text-farm-text mt-0.5">{selectedOrder.buyerName}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-farm-brand-soft border border-farm-brand space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-farm-brand">
                  <span>Total Escrow Value</span>
                  <span>{selectedOrder.escrowStatus}</span>
                </div>
                <div className="text-xl font-display font-bold text-farm-brand">
                  ₹{selectedOrder.totalAmount.toLocaleString()}
                </div>
                <p className="text-[11px] text-farm-text-secondary">
                  Protected in APMC demonstration escrow reserve until delivery confirmation.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-farm-surface border border-farm-border space-y-1 text-xs">
                <span className="font-bold text-farm-text-secondary">Transport & Dispatch</span>
                <p className="font-semibold text-farm-text">{selectedOrder.logisticsPartner}</p>
                <p className="text-farm-text-secondary">Status: <strong>{selectedOrder.logisticsStatus}</strong></p>
                {selectedOrder.deliveryDate && (
                  <p className="text-farm-text-secondary">Expected / Arrival: <strong>{selectedOrder.deliveryDate}</strong></p>
                )}
              </div>
            </div>

            <div className="bg-farm-surface px-6 py-3.5 border-t border-farm-border flex items-center justify-between">
              <span className="text-xs text-farm-text-secondary">Read-only demonstration audit</span>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
