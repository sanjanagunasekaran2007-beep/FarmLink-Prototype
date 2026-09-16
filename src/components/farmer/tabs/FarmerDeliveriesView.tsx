import React, { useState, useMemo } from 'react';
import { 
  Truck, 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Calendar,
  Clock, 
  Eye, 
  Navigation, 
  CheckCircle2, 
  ShieldCheck, 
  PackageCheck, 
  X, 
  Layers
} from 'lucide-react';
import { OrderDeliveryItem, OrderStatus } from '@/types';
import { OrderDetailsModal } from '../deliveries/OrderDetailsModal';
import { DeliveryTrackingModal } from '../deliveries/DeliveryTrackingModal';
import { ContactLogisticsModal } from '../deliveries/ContactLogisticsModal';
import { ReadyForPickupConfirmModal } from '../deliveries/ReadyForPickupConfirmModal';
import { ConfirmCompletionModal } from '../deliveries/ConfirmCompletionModal';

interface FarmerDeliveriesViewProps {
  orders: OrderDeliveryItem[];
  onNavigateHarvest?: () => void;
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void;
}

type TabType = 'all' | 'pending' | 'confirmed' | 'ready_for_pickup' | 'in_transit' | 'delivered' | 'completed';

export const FarmerDeliveriesView: React.FC<FarmerDeliveriesViewProps> = ({
  orders,
  onNavigateHarvest,
  onUpdateOrderStatus,
}) => {
  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Modals State
  const [selectedOrderForDetails, setSelectedOrderForDetails] = useState<OrderDeliveryItem | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<OrderDeliveryItem | null>(null);
  const [selectedOrderForContact, setSelectedOrderForContact] = useState<OrderDeliveryItem | null>(null);
  const [selectedOrderForReady, setSelectedOrderForReady] = useState<OrderDeliveryItem | null>(null);
  const [selectedOrderForCompletion, setSelectedOrderForCompletion] = useState<OrderDeliveryItem | null>(null);

  // Status Badge Helper
  const getStatusBadgeStyle = (status: OrderStatus) => {
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
        return { bg: 'bg-farm-terracotta', text: 'text-white', label: 'Pending' };
    }
  };

  // Counts Calculation
  const counts = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === 'Pending').length;
    const confirmed = orders.filter((o) => o.status === 'Confirmed').length;
    const readyForPickup = orders.filter((o) => o.status === 'Ready for Pickup').length;
    const inTransit = orders.filter((o) => o.status === 'In Transit').length;
    const delivered = orders.filter((o) => o.status === 'Delivered').length;
    const completed = orders.filter((o) => o.status === 'Completed').length;
    const inProgress = confirmed + readyForPickup + inTransit;
    return { total, pending, confirmed, readyForPickup, inTransit, delivered, completed, inProgress };
  }, [orders]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // 1. Tab filter
      if (activeTab === 'pending' && order.status !== 'Pending') return false;
      if (activeTab === 'confirmed' && order.status !== 'Confirmed') return false;
      if (activeTab === 'ready_for_pickup' && order.status !== 'Ready for Pickup') return false;
      if (activeTab === 'in_transit' && order.status !== 'In Transit') return false;
      if (activeTab === 'delivered' && order.status !== 'Delivered') return false;
      if (activeTab === 'completed' && order.status !== 'Completed') return false;

      // 2. Category filter
      if (categoryFilter !== 'all' && order.category !== categoryFilter) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const codeMatch = order.orderCode.toLowerCase().includes(query);
        const cropMatch = order.cropName.toLowerCase().includes(query);
        const buyerMatch = order.buyerName.toLowerCase().includes(query);
        const locMatch = (order.pickupLocation + ' ' + order.deliveryLocation).toLowerCase().includes(query);
        if (!codeMatch && !cropMatch && !buyerMatch && !locMatch) return false;
      }

      return true;
    });
  }, [orders, activeTab, categoryFilter, searchQuery]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    orders.forEach((o) => {
      if (o.category) set.add(o.category);
    });
    return Array.from(set);
  }, [orders]);

  const handleConfirmReadyForPickup = (orderId: string) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, 'Ready for Pickup');
    }
    if (selectedOrderForDetails && selectedOrderForDetails.id === orderId) {
      setSelectedOrderForDetails((prev) => prev ? { ...prev, status: 'Ready for Pickup' } : null);
    }
    if (selectedOrderForTracking && selectedOrderForTracking.id === orderId) {
      setSelectedOrderForTracking((prev) => prev ? { ...prev, status: 'Ready for Pickup' } : null);
    }
  };

  const handleConfirmOrderCompletion = (orderId: string) => {
    if (onUpdateOrderStatus) {
      onUpdateOrderStatus(orderId, 'Completed');
    }
    if (selectedOrderForDetails && selectedOrderForDetails.id === orderId) {
      setSelectedOrderForDetails((prev) => prev ? { ...prev, status: 'Completed' } : null);
    }
    if (selectedOrderForTracking && selectedOrderForTracking.id === orderId) {
      setSelectedOrderForTracking((prev) => prev ? { ...prev, status: 'Completed' } : null);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* 1. PAGE HEADER */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-7 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5 text-farm-brand" />
                <span>Farmgate Logistics & Delivery Tracking</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-farm-gold-soft text-farm-gold text-[10px] font-bold border border-farm-gold/40">
                Demo tracking data
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text tracking-tight">
              Orders & Delivery
            </h1>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-0.5">
              Track your harvest orders and delivery progress.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text-secondary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-farm-brand" />
              <span>Escrow Payout Protected</span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-3 border-t border-farm-border flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, crop, or buyer"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs sm:text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand focus:bg-farm-surface transition-all"
              id="order-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-text-secondary hover:text-farm-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Category Selector */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-farm-text-secondary">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text focus:outline-hidden focus:border-farm-brand"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="sm:hidden flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text flex items-center justify-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-farm-brand" />
              <span>Filters {categoryFilter !== 'all' ? `(${categoryFilter})` : ''}</span>
            </button>
            {categoryFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className="px-3 py-2.5 rounded-xl bg-farm-terracotta-soft text-farm-terracotta text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        {isMobileFiltersOpen && (
          <div className="sm:hidden p-3 rounded-2xl bg-farm-surface border border-farm-border space-y-2">
            <div className="text-xs font-bold text-farm-text flex items-center justify-between">
              <span>Filter by Category</span>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-[11px] text-farm-text-secondary font-bold"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setIsMobileFiltersOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  categoryFilter === 'all'
                    ? 'bg-farm-brand text-white'
                    : 'bg-farm-surface text-farm-text border border-farm-border'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(cat);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    categoryFilter === cat
                      ? 'bg-farm-brand text-white'
                      : 'bg-farm-surface text-farm-text border border-farm-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. ORDER SUMMARY (SOLID COLOUR ACCENTS: Deep Forest, Mustard Gold, Terracotta, Deep Teal) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Total Orders (Deep Forest #164A36) */}
        <div 
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-3xl bg-farm-brand-soft border ${activeTab === 'all' ? 'border-farm-brand ring-2 ring-farm-brand' : 'border-farm-border-strong'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {counts.total}
            </div>
            <div className="text-xs font-bold text-farm-brand">
              Total Orders
            </div>
          </div>
        </div>

        {/* 2. Awaiting Confirmation (Mustard Gold #D9A441) */}
        <div 
          onClick={() => setActiveTab('pending')}
          className={`p-4 rounded-3xl bg-farm-gold-soft border ${activeTab === 'pending' ? 'border-farm-gold ring-2 ring-farm-gold' : 'border-farm-gold/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-gold transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle">
            <Clock className="w-5 h-5 text-farm-text" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-gold">
              {counts.pending}
            </div>
            <div className="text-xs font-bold text-farm-gold">
              Awaiting Confirmation
            </div>
          </div>
        </div>

        {/* 3. In Progress (Terracotta #C66B45) */}
        <div 
          onClick={() => setActiveTab('in_transit')}
          className={`p-4 rounded-3xl bg-farm-terracotta-soft border ${activeTab === 'in_transit' ? 'border-farm-terracotta ring-2 ring-farm-terracotta' : 'border-farm-terracotta/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-terracotta transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Truck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-terracotta">
              {counts.inProgress}
            </div>
            <div className="text-xs font-bold text-farm-terracotta">
              In Progress
            </div>
          </div>
        </div>

        {/* 4. Completed (Deep Teal #245B5A) */}
        <div 
          onClick={() => setActiveTab('completed')}
          className={`p-4 rounded-3xl bg-farm-eucalyptus-soft border ${activeTab === 'completed' ? 'border-farm-brand ring-2 ring-farm-brand' : 'border-farm-info/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {counts.completed}
            </div>
            <div className="text-xs font-bold text-farm-info">
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* 3. ORDER STATUS TABS */}
      <div className="bg-farm-surface p-2 rounded-2xl border border-farm-border shadow-card flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as TabType, label: 'All', count: counts.total },
          { id: 'pending' as TabType, label: 'Pending', count: counts.pending },
          { id: 'confirmed' as TabType, label: 'Confirmed', count: counts.confirmed },
          { id: 'ready_for_pickup' as TabType, label: 'Ready for Pickup', count: counts.readyForPickup },
          { id: 'in_transit' as TabType, label: 'In Transit', count: counts.inTransit },
          { id: 'delivered' as TabType, label: 'Delivered', count: counts.delivered },
          { id: 'completed' as TabType, label: 'Completed', count: counts.completed },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-farm-brand text-white shadow-subtle'
                  : 'text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary'
              }`}
              id={`order-tab-${tab.id}`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-farm-gold text-farm-text' : 'bg-farm-surface-secondary text-farm-text-secondary'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. ORDER LIST */}
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredOrders.map((order) => {
            const badge = getStatusBadgeStyle(order.status);

            return (
              <div
                key={order.id}
                className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card hover:border-farm-brand transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Line: Order Code + Status Badge */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-farm-border">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-farm-surface-secondary text-farm-text border border-farm-border">
                        {order.orderCode}
                      </span>
                      {order.harvestRef && (
                        <span className="text-[11px] font-semibold text-farm-text-secondary">
                          Lot: {order.harvestRef}
                        </span>
                      )}
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>

                  {/* Main Crop & Buyer Information */}
                  <div className="pt-3 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-display font-bold text-farm-text">
                        {order.cropName}
                      </h3>
                      {order.variety && (
                        <p className="text-xs text-farm-text-secondary font-semibold">
                          Variety: <span className="text-farm-text font-bold">{order.variety}</span>
                        </p>
                      )}
                      <p className="text-xs text-farm-text-secondary font-medium mt-1">
                        Buyer: <span className="font-bold text-farm-text">{order.buyerName}</span> ({order.buyerLocation})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-2xl font-display font-bold text-farm-brand">
                        {order.quantity} <span className="text-xs font-semibold text-farm-text-secondary">{order.unit}</span>
                      </span>
                      {order.totalAmount && (
                        <p className="text-xs font-bold text-farm-terracotta">
                          ₹{order.totalAmount.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Route & Timing Box */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-farm-surface border border-farm-border space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-farm-text-secondary flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-farm-brand" /> Order Date:
                      </span>
                      <span className="font-bold text-farm-text">{order.orderDate}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-farm-text-secondary flex items-center gap-1.5 font-semibold">
                        <Clock className="w-3.5 h-3.5 text-farm-brand" /> Expected Dispatch:
                      </span>
                      <span className="font-bold text-farm-text">{order.expectedDate}</span>
                    </div>

                    <div className="flex items-start gap-1.5 pt-1 text-[11px] text-farm-text-secondary border-t border-farm-border/60">
                      <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0 mt-0.5" />
                      <span className="truncate">Pickup: {order.pickupLocation}</span>
                    </div>
                  </div>

                  {/* Assigned Logistics Info */}
                  {order.logisticsProvider && (
                    <div className="mt-3 p-3 rounded-xl bg-farm-brand-soft/60 border border-farm-border-strong flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-farm-brand shrink-0" />
                        <div>
                          <span className="font-bold text-farm-brand">{order.logisticsProvider.name}</span>
                          <span className="text-[11px] text-farm-brand block font-mono font-semibold">
                            {order.logisticsProvider.vehicleNo} &bull; Driver: {order.logisticsProvider.driverName}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedOrderForContact(order)}
                        className="px-2.5 py-1 rounded-lg bg-farm-surface border border-farm-border-strong text-[11px] font-bold text-farm-brand hover:bg-farm-brand-soft transition-colors cursor-pointer shrink-0"
                      >
                        Contact
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-farm-border flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedOrderForDetails(order)}
                      className="px-4 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-brand hover:bg-farm-brand-soft active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-farm-brand" />
                      <span>View Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedOrderForTracking(order)}
                      className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                    >
                      <Navigation className="w-3.5 h-3.5 text-farm-gold" />
                      <span>Track Delivery</span>
                    </button>
                  </div>

                  {/* Context-specific action */}
                  {order.status === 'Confirmed' && (
                    <button
                      type="button"
                      onClick={() => setSelectedOrderForReady(order)}
                      className="px-3.5 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                    >
                      <PackageCheck className="w-3.5 h-3.5 text-farm-gold" />
                      <span>Mark Ready</span>
                    </button>
                  )}

                  {order.status === 'Delivered' && (
                    <button
                      type="button"
                      onClick={() => setSelectedOrderForCompletion(order)}
                      className="px-3.5 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-subtle"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      <span>Confirm Done</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 10. EMPTY & ERROR STATES */
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-8 sm:p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-farm-surface-secondary border border-farm-border flex items-center justify-center mx-auto text-farm-brand">
            {searchQuery ? (
              <Search className="w-8 h-8 text-farm-text-secondary" />
            ) : (
              <Truck className="w-8 h-8 text-farm-brand" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-farm-text">
              {searchQuery
                ? 'No matching orders found'
                : activeTab === 'all'
                ? 'Your order activity will appear here.'
                : `No ${activeTab.replace('_', ' ')} orders`}
            </h3>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-1">
              {searchQuery
                ? `No orders match "${searchQuery}". Try searching by order code (e.g. FL-ORD-001) or crop name.`
                : 'Confirmed buyer purchase orders and farmgate collection dispatches will be tracked here.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand cursor-pointer"
              >
                Clear Search
              </button>
            ) : onNavigateHarvest ? (
              <button
                type="button"
                onClick={onNavigateHarvest}
                className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-bold hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4 text-farm-gold" />
                <span>Return to My Harvest</span>
              </button>
            ) : null}
          </div>
        </div>
      )}

      {/* 5. ORDER DETAILS MODAL */}
      <OrderDetailsModal
        isOpen={!!selectedOrderForDetails}
        order={selectedOrderForDetails}
        onClose={() => setSelectedOrderForDetails(null)}
        onOpenTracking={(order) => {
          setSelectedOrderForDetails(null);
          setSelectedOrderForTracking(order);
        }}
        onOpenReadyForPickup={(order) => {
          setSelectedOrderForReady(order);
        }}
        onOpenContactLogistics={(order) => {
          setSelectedOrderForContact(order);
        }}
        onOpenConfirmCompletion={(order) => {
          setSelectedOrderForCompletion(order);
        }}
      />

      {/* 6. DELIVERY TRACKING MODAL */}
      <DeliveryTrackingModal
        isOpen={!!selectedOrderForTracking}
        order={selectedOrderForTracking}
        onClose={() => setSelectedOrderForTracking(null)}
        onOpenReadyForPickup={(order) => {
          setSelectedOrderForReady(order);
        }}
        onOpenContactLogistics={(order) => {
          setSelectedOrderForContact(order);
        }}
        onOpenConfirmCompletion={(order) => {
          setSelectedOrderForCompletion(order);
        }}
      />

      {/* 7. CONTACT LOGISTICS MODAL */}
      <ContactLogisticsModal
        isOpen={!!selectedOrderForContact}
        provider={selectedOrderForContact?.logisticsProvider || null}
        orderCode={selectedOrderForContact?.orderCode || ''}
        onClose={() => setSelectedOrderForContact(null)}
      />

      {/* 8. MARK READY FOR PICKUP CONFIRM MODAL */}
      <ReadyForPickupConfirmModal
        isOpen={!!selectedOrderForReady}
        order={selectedOrderForReady}
        onClose={() => setSelectedOrderForReady(null)}
        onConfirm={handleConfirmReadyForPickup}
      />

      {/* 9. CONFIRM COMPLETION MODAL */}
      <ConfirmCompletionModal
        isOpen={!!selectedOrderForCompletion}
        order={selectedOrderForCompletion}
        onClose={() => setSelectedOrderForCompletion(null)}
        onConfirm={handleConfirmOrderCompletion}
      />
    </div>
  );
};
