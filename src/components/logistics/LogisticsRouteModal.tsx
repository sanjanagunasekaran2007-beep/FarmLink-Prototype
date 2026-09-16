import { X, Route, MapPin, Clock, AlertCircle, Compass, CheckCircle2 } from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsRouteModalProps {
  delivery: LogisticsDeliveryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LogisticsRouteModal = ({
  delivery,
  isOpen,
  onClose,
}: LogisticsRouteModalProps) => {
  if (!isOpen || !delivery) return null;

  const { routeInfo } = delivery;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-xl rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-farm-brand text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-surface/15 flex items-center justify-center">
              <Route className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold">
                Route Summary & Waypoints
              </h2>
              <p className="text-xs text-farm-text-secondary">
                {delivery.deliveryCode} &bull; {delivery.produceName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl bg-farm-surface/10 hover:bg-farm-surface/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-farm-text overflow-y-auto max-h-[75vh]">
          {/* Demo disclaimer */}
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
            <p className="text-xs text-farm-terracotta leading-relaxed">
              <strong className="font-bold">Illustrative Demo Data:</strong> Route distance and travel estimates are simulated approximations. No live GPS or real-time road API is connected.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Approx Distance</span>
              <span className="text-base sm:text-lg font-bold text-farm-brand">
                {routeInfo.approxDistanceKm} km
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Est. Travel Time</span>
              <span className="text-base sm:text-lg font-bold text-farm-brand">
                {routeInfo.estimatedTravelTime}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Corridor</span>
              <span className="text-xs font-bold text-farm-text line-clamp-1 mt-0.5">
                {routeInfo.highwayCorridor}
              </span>
            </div>
          </div>

          {/* Route Status Notice */}
          <div className="p-3.5 rounded-2xl bg-farm-brand-soft border border-farm-brand/20 flex items-center justify-between gap-2 text-xs">
            <span className="font-bold text-farm-brand flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-farm-brand" />
              Corridor Status:
            </span>
            <span className="text-farm-text font-medium">{routeInfo.routeStatus}</span>
          </div>

          {/* Connected Waypoint Map Visual (Clean SVG / Solid CSS lines) */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text-secondary mb-3">
              Route Waypoint Steps
            </h3>
            <div className="space-y-4 pl-2">
              {routeInfo.waypoints.map((wp, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === routeInfo.waypoints.length - 1;
                return (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {!isLast && (
                      <div className="absolute left-3.5 top-7 bottom-0 w-0.5 bg-farm-brand" />
                    )}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        isFirst
                          ? 'bg-farm-gold text-farm-text'
                          : isLast
                          ? 'bg-farm-brand text-white'
                          : 'bg-farm-brand text-white'
                      }`}
                    >
                      {wp.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-[11px] font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 p-3.5 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-farm-text flex items-center gap-1.5">
                          {isFirst && <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-farm-gold text-farm-text">ORIGIN</span>}
                          {isLast && <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-farm-brand text-white">DESTINATION</span>}
                          {!isFirst && !isLast && <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-farm-brand text-white">WAYPOINT</span>}
                          {wp.name}
                        </span>
                        {wp.eta && (
                          <span className="text-[11px] font-mono text-farm-text-secondary flex items-center gap-1">
                            <Clock className="w-3 h-3 text-farm-text-secondary" />
                            {wp.eta}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-farm-text-secondary flex items-start gap-1">
                        <MapPin className="w-3 h-3 shrink-0 mt-0.5 text-farm-terracotta" />
                        {wp.address}
                      </p>
                      {wp.contactPerson && (
                        <div className="text-[11px] text-farm-brand font-bold mt-1.5 pt-1.5 border-t border-farm-border">
                          Contact: {wp.contactPerson} {wp.contactPhone ? `(${wp.contactPhone})` : ''}
                        </div>
                      )}
                      {wp.notes && (
                        <div className="text-[11px] text-farm-terracotta italic mt-1">
                          {wp.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer"
          >
            Close Route View
          </button>
        </div>
      </div>
    </div>
  );
};
