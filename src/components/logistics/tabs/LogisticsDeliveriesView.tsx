import { useState, useMemo } from 'react';
import { 
  Search, 
  Truck, 
  Clock, 
  Eye, 
  RotateCcw, 
  CheckCircle2, 
  Route, 
  ArrowUpDown
} from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsDeliveriesViewProps {
  deliveries: LogisticsDeliveryItem[];
  onViewDelivery: (delivery: LogisticsDeliveryItem) => void;
  onOpenStatusUpdate: (delivery: LogisticsDeliveryItem) => void;
  onOpenRouteSummary: (delivery: LogisticsDeliveryItem) => void;
  onOpenPOD: (delivery: LogisticsDeliveryItem) => void;
}

export const LogisticsDeliveriesView = ({
  deliveries,
  onViewDelivery,
  onOpenStatusUpdate,
  onOpenRouteSummary,
  onOpenPOD,
}: LogisticsDeliveriesViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'time' | 'quantity' | 'code'>('time');

  const statusFilters: { id: string; label: string }[] = [
    { id: 'ALL', label: 'All Deliveries' },
    { id: 'Assigned', label: 'Assigned' },
    { id: 'Pickup Pending', label: 'Pickup Pending' },
    { id: 'Picked Up', label: 'Picked Up' },
    { id: 'In Transit', label: 'In Transit' },
    { id: 'Delivered', label: 'Delivered' },
    { id: 'Cancelled', label: 'Cancelled' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Assigned':
        return 'bg-farm-surface text-farm-terracotta border-farm-gold';
      case 'Pickup Pending':
        return 'bg-farm-surface text-farm-terracotta border-farm-terracotta';
      case 'Picked Up':
        return 'bg-farm-eucalyptus-soft text-farm-brand border-farm-info';
      case 'In Transit':
        return 'bg-farm-brand text-white border-farm-brand';
      case 'Delivered':
        return 'bg-farm-brand text-white border-farm-brand';
      case 'Cancelled':
        return 'bg-farm-danger-soft text-farm-danger border-farm-danger';
      default:
        return 'bg-farm-surface-secondary text-farm-text border-farm-border';
    }
  };

  const filteredDeliveries = useMemo(() => {
    let result = deliveries.filter((d) => {
      const matchesSearch =
        d.deliveryCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.produceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.buyerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatus === 'ALL' || d.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    if (sortBy === 'quantity') {
      result = [...result].sort((a, b) => b.quantity - a.quantity);
    } else if (sortBy === 'code') {
      result = [...result].sort((a, b) => a.deliveryCode.localeCompare(b.deliveryCode));
    }

    return result;
  }, [deliveries, searchQuery, selectedStatus, sortBy]);

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-text">
              Delivery Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-white text-xs font-bold">
              {deliveries.length} Total
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-1">
            Track, update transit status, and confirm delivery handovers for farm produce
          </p>
        </div>

        {/* Demo Disclaimer */}
        <span className="text-[11px] font-bold text-farm-terracotta bg-farm-surface px-3 py-1.5 rounded-2xl border border-farm-border shrink-0 self-start sm:self-center">
          Illustrative Demo Data
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-farm-surface p-4 rounded-3xl border border-farm-border shadow-subtle space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search delivery ID, crop, farmer, or destination..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs text-farm-text focus:outline-none focus:border-farm-brand"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-farm-text-secondary hover:text-farm-text text-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <div className="flex items-center gap-1.5 bg-farm-surface border border-farm-border px-3 py-2 rounded-2xl text-xs text-farm-text">
              <ArrowUpDown className="w-3.5 h-3.5 text-farm-text-secondary" />
              <span className="text-farm-text-secondary">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-bold focus:outline-none cursor-pointer"
              >
                <option value="time">Pickup Time</option>
                <option value="quantity">Quantity</option>
                <option value="code">Delivery Code</option>
              </select>
            </div>

            {(searchQuery || selectedStatus !== 'ALL') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('ALL');
                }}
                className="p-2.5 rounded-2xl border border-farm-border bg-farm-surface text-farm-terracotta hover:bg-farm-surface-secondary text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                title="Reset Filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {statusFilters.map((sf) => {
            const isSelected = selectedStatus === sf.id;
            return (
              <button
                key={sf.id}
                type="button"
                onClick={() => setSelectedStatus(sf.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-farm-brand text-white shadow-subtle'
                    : 'bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary'
                }`}
              >
                {sf.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Deliveries List */}
      {filteredDeliveries.length === 0 ? (
        <div className="bg-farm-surface p-10 rounded-3xl border border-farm-border text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-farm-text">No deliveries match your filter</h3>
          <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
            Try adjusting your search terms or status filter to see other scheduled agricultural dispatches.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('ALL');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Show All Deliveries
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-farm-surface p-5 rounded-3xl border border-farm-border shadow-subtle hover:border-farm-brand transition-all"
            >
              {/* Card Top Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-farm-border">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono font-bold text-sm text-farm-brand bg-farm-brand-soft px-2.5 py-0.5 rounded-xl">
                    {delivery.deliveryCode}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(delivery.status)}`}>
                    {delivery.status}
                  </span>
                  <span className="text-xs text-farm-text-secondary">
                    Order: {delivery.orderCode} &bull; Assigned: {delivery.assignedDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-farm-brand bg-farm-surface px-2.5 py-1 rounded-xl border border-farm-border">
                    {delivery.quantity.toLocaleString()} {delivery.unit}
                  </span>
                </div>
              </div>

              {/* Produce & Route Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Produce & Packaging */}
                <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary block mb-1">
                    Produce & Cargo
                  </span>
                  <h4 className="text-sm font-bold text-farm-text mb-0.5">
                    {delivery.produceName}
                  </h4>
                  <p className="text-xs text-farm-text-secondary">{delivery.packagingType}</p>
                </div>

                {/* Pickup Origin */}
                <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-farm-terracotta">
                      Pickup Origin
                    </span>
                    <span className="text-[11px] font-mono font-bold text-farm-text">
                      {delivery.pickupTime}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-farm-text mb-0.5 truncate">
                    {delivery.pickupLocation}
                  </h4>
                  <p className="text-[11px] text-farm-text-secondary truncate">
                    Farmer: {delivery.farmerName}
                  </p>
                </div>

                {/* Delivery Destination */}
                <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-farm-brand">
                      Destination
                    </span>
                    <span className="text-[11px] font-mono font-bold text-farm-text">
                      {delivery.expectedTime}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-farm-text mb-0.5 truncate">
                    {delivery.deliveryLocation}
                  </h4>
                  <p className="text-[11px] text-farm-text-secondary truncate">
                    Buyer: {delivery.buyerName}
                  </p>
                </div>
              </div>

              {/* Card Action Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-farm-border">
                <div className="text-[11px] text-farm-text-secondary">
                  Fleet: <strong className="font-mono text-farm-text">{delivery.vehicleNo}</strong> &bull; Approx {delivery.routeInfo.approxDistanceKm} km
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => onViewDelivery(delivery)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text hover:bg-farm-surface-secondary border border-farm-border transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenRouteSummary(delivery)}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-brand hover:bg-farm-brand-soft border border-farm-border transition-all cursor-pointer"
                  >
                    <Route className="w-3.5 h-3.5" />
                    Route
                  </button>

                  {delivery.status !== 'Delivered' && delivery.status !== 'Cancelled' && (
                    <>
                      <button
                        type="button"
                        onClick={() => onOpenStatusUpdate(delivery)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer shadow-subtle"
                      >
                        <Clock className="w-3.5 h-3.5" />
                        Update Status
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenPOD(delivery)}
                        className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer shadow-subtle"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Confirm POD
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
