import { 
  X, 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  ShieldCheck, 
  Route, 
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  Check
} from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsDeliveryDetailModalProps {
  delivery: LogisticsDeliveryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenStatusUpdate: (delivery: LogisticsDeliveryItem) => void;
  onOpenRouteSummary: (delivery: LogisticsDeliveryItem) => void;
  onOpenPOD: (delivery: LogisticsDeliveryItem) => void;
}

export const LogisticsDeliveryDetailModal = ({
  delivery,
  isOpen,
  onClose,
  onOpenStatusUpdate,
  onOpenRouteSummary,
  onOpenPOD,
}: LogisticsDeliveryDetailModalProps) => {
  if (!isOpen || !delivery) return null;

  const getStatusBadgeClass = (status: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-2xl rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface/15 flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg sm:text-xl font-display font-bold">
                  {delivery.deliveryCode}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeClass(delivery.status)}`}>
                  {delivery.status}
                </span>
              </div>
              <p className="text-xs text-farm-text-secondary mt-0.5">
                Order Ref: {delivery.orderCode} &bull; Assigned: {delivery.assignedDate}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl bg-farm-surface/10 hover:bg-farm-surface/20 text-white transition-all cursor-pointer"
            id="close-delivery-detail-modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-farm-text">
          {/* Demo Notice */}
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
            <p className="text-xs text-farm-terracotta leading-relaxed">
              <strong className="font-bold">Illustrative Demo Record:</strong> All vehicle manifests, driver phone numbers, and addresses are fictional for simulation.
            </p>
          </div>

          {/* Cargo Details */}
          <div className="bg-farm-surface p-4 sm:p-5 rounded-2xl border border-farm-border">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-4 h-4 text-farm-brand" />
              <h3 className="text-sm font-bold text-farm-brand">Produce & Cargo Specifications</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-farm-text-secondary block">Produce</span>
                <strong className="font-bold text-farm-text text-sm">{delivery.produceName}</strong>
              </div>
              <div>
                <span className="text-farm-text-secondary block">Total Quantity</span>
                <strong className="font-bold text-farm-text text-sm">{delivery.quantity.toLocaleString()} {delivery.unit}</strong>
              </div>
              <div>
                <span className="text-farm-text-secondary block">Category</span>
                <strong className="font-bold text-farm-text">{delivery.category}</strong>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-2 border-t border-farm-border">
                <span className="text-farm-text-secondary block">Packaging</span>
                <strong className="font-medium text-farm-text">{delivery.packagingType}</strong>
              </div>
            </div>
          </div>

          {/* Pickup and Drop-off Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pickup Info */}
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-gold text-farm-text">
                    PICKUP
                  </span>
                  <span className="text-xs text-farm-text-secondary">{delivery.pickupDate} &bull; {delivery.pickupTime}</span>
                </div>
                <h4 className="text-sm font-bold text-farm-text mb-1">
                  {delivery.pickupLocation}
                </h4>
                <p className="text-xs text-farm-text-secondary leading-relaxed mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0 mt-0.5" />
                  {delivery.pickupAddress}
                </p>
              </div>
              <div className="pt-2.5 border-t border-farm-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary">Farmer Contact:</span>
                  <span className="font-bold text-farm-brand">{delivery.farmerName}</span>
                </div>
                {delivery.farmerPhone && (
                  <div className="flex items-center justify-between">
                    <span className="text-farm-text-secondary">Phone (Demo):</span>
                    <span className="font-mono text-farm-text">{delivery.farmerPhone}</span>
                  </div>
                )}
                {delivery.pickupInstructions && (
                  <p className="text-[11px] text-farm-terracotta bg-farm-surface p-2 rounded-xl mt-2">
                    <strong>Note:</strong> {delivery.pickupInstructions}
                  </p>
                )}
              </div>
            </div>

            {/* Dropoff Info */}
            <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-brand text-white">
                    DROP-OFF
                  </span>
                  <span className="text-xs text-farm-text-secondary">{delivery.expectedDate} &bull; {delivery.expectedTime}</span>
                </div>
                <h4 className="text-sm font-bold text-farm-text mb-1">
                  {delivery.deliveryLocation}
                </h4>
                <p className="text-xs text-farm-text-secondary leading-relaxed mb-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-farm-brand shrink-0 mt-0.5" />
                  {delivery.deliveryAddress}
                </p>
              </div>
              <div className="pt-2.5 border-t border-farm-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-farm-text-secondary">Buyer Entity:</span>
                  <span className="font-bold text-farm-brand">{delivery.buyerName}</span>
                </div>
                {delivery.buyerPhone && (
                  <div className="flex items-center justify-between">
                    <span className="text-farm-text-secondary">Phone (Demo):</span>
                    <span className="font-mono text-farm-text">{delivery.buyerPhone}</span>
                  </div>
                )}
                {delivery.deliveryInstructions && (
                  <p className="text-[11px] text-farm-brand bg-farm-brand-soft p-2 rounded-xl mt-2">
                    <strong>Note:</strong> {delivery.deliveryInstructions}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Assigned Fleet & Vehicle */}
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-farm-brand" />
              <h3 className="text-sm font-bold text-farm-brand">Assigned Fleet & Driver</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-farm-text-secondary block">Logistics Partner</span>
                <strong className="font-bold text-farm-text">{delivery.logisticsPartner}</strong>
              </div>
              <div>
                <span className="text-farm-text-secondary block">Vehicle Type</span>
                <strong className="font-bold text-farm-text">{delivery.vehicleType}</strong>
              </div>
              <div>
                <span className="text-farm-text-secondary block">Vehicle Plate</span>
                <strong className="font-bold text-farm-brand font-mono">{delivery.vehicleNo}</strong>
              </div>
              <div>
                <span className="text-farm-text-secondary block">Assigned Driver</span>
                <strong className="font-bold text-farm-text">{delivery.driverName}</strong>
              </div>
            </div>
          </div>

          {/* Vertical Tracking Timeline */}
          <div>
            <h3 className="text-sm font-bold text-farm-text mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-farm-brand" />
              Delivery Progress Timeline
            </h3>
            <div className="space-y-3 pl-2">
              {delivery.timeline.map((event, idx) => {
                const isLast = idx === delivery.timeline.length - 1;
                return (
                  <div key={event.id || idx} className="flex items-start gap-3 relative">
                    {!isLast && (
                      <div
                        className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${
                          event.isCompleted ? 'bg-farm-brand' : 'bg-farm-surface-secondary'
                        }`}
                      />
                    )}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        event.isCompleted
                          ? 'bg-farm-brand text-white'
                          : event.isCurrent
                          ? 'bg-farm-gold text-farm-text'
                          : 'bg-farm-surface-secondary text-farm-text-secondary border border-farm-border'
                      }`}
                    >
                      {event.isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-farm-text">
                          {event.title}
                        </span>
                        <span className="text-[11px] text-farm-text-secondary">
                          {event.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-farm-text-secondary mt-0.5 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Proof of Delivery Details if Completed */}
          {delivery.podConfirmation && (
            <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-brand/30">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck2 className="w-4 h-4 text-farm-brand" />
                <h4 className="text-xs font-bold text-farm-brand">Digital Proof of Delivery (POD) Recorded</h4>
              </div>
              <p className="text-xs text-farm-text leading-relaxed">
                Method: <strong>{delivery.podConfirmation.method}</strong> &bull; Code: <strong className="font-mono">{delivery.podConfirmation.verifiedCode || 'VERIFIED'}</strong>
              </p>
              {delivery.podConfirmation.note && (
                <p className="text-[11px] text-farm-text-secondary mt-1 italic">
                  &ldquo;{delivery.podConfirmation.note}&rdquo; — {delivery.podConfirmation.receivedBy || 'Buyer'}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-farm-surface border-t border-farm-border flex flex-wrap items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenRouteSummary(delivery)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-brand border border-farm-border hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer"
            id="view-route-from-detail"
          >
            <Route className="w-4 h-4" />
            Route Summary
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {delivery.status !== 'Delivered' && delivery.status !== 'Cancelled' && (
              <>
                <button
                  type="button"
                  onClick={() => onOpenStatusUpdate(delivery)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all cursor-pointer shadow-subtle"
                  id="update-status-from-detail"
                >
                  <Clock className="w-4 h-4" />
                  Update Status
                </button>
                <button
                  type="button"
                  onClick={() => onOpenPOD(delivery)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover active:scale-95 transition-all cursor-pointer shadow-subtle"
                  id="confirm-pod-from-detail"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm POD
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-farm-surface text-farm-text border border-farm-border hover:bg-farm-surface-secondary cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
