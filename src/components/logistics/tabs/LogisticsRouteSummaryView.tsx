import { useState } from 'react';
import { MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LogisticsDeliveryItem } from '@/types';

interface LogisticsRouteSummaryViewProps {
  deliveries: LogisticsDeliveryItem[];
  onViewDelivery: (delivery: LogisticsDeliveryItem) => void;
  onOpenRouteSummary: (delivery: LogisticsDeliveryItem) => void;
}

export const LogisticsRouteSummaryView = ({
  deliveries,
  onViewDelivery,
  onOpenRouteSummary,
}: LogisticsRouteSummaryViewProps) => {
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string>(
    deliveries[0]?.id || ''
  );

  const activeDelivery = deliveries.find((d) => d.id === selectedDeliveryId) || deliveries[0];

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-text">
              Route & Corridor Summaries
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-brand text-white text-xs font-bold">
              {deliveries.length} Corridors
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-1">
            Highway route profiles, collection waypoints, and travel time estimates
          </p>
        </div>
        <span className="text-[11px] font-bold text-farm-terracotta bg-farm-surface px-3 py-1.5 rounded-2xl border border-farm-border shrink-0 self-start sm:self-center">
          Illustrative Demo Data
        </span>
      </div>

      {/* Demo notice */}
      <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border flex items-start gap-2.5 text-xs text-farm-terracotta">
        <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Illustrative Navigation Notice:</strong> Route profiles and travel durations are pre-calculated demo representations for standard Tamil Nadu and South Indian agricultural corridors. No live GPS or real-time road API is connected.
        </p>
      </div>

      {/* Corridor Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {deliveries.map((delivery) => {
          const isSelected = activeDelivery?.id === delivery.id;
          return (
            <button
              key={delivery.id}
              type="button"
              onClick={() => setSelectedDeliveryId(delivery.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-farm-brand text-white border-farm-brand shadow-card'
                  : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`font-mono text-xs font-bold ${isSelected ? 'text-farm-gold' : 'text-farm-brand'}`}>
                    {delivery.deliveryCode}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-farm-surface/20 text-white' : 'bg-farm-brand-soft text-farm-brand'
                  }`}>
                    {delivery.status}
                  </span>
                </div>
                <h4 className="text-xs font-bold line-clamp-1 mb-1">
                  {delivery.produceName}
                </h4>
                <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-farm-text-secondary' : 'text-farm-text-secondary'}`}>
                  {delivery.pickupLocation} &rarr; {delivery.deliveryLocation}
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[11px] ${
                isSelected ? 'border-white/20 text-farm-text-secondary' : 'border-farm-border text-farm-text-secondary'
              }`}>
                <span>{delivery.routeInfo.approxDistanceKm} km</span>
                <span>{delivery.routeInfo.estimatedTravelTime}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Route Spotlight Detail */}
      {activeDelivery && (
        <div className="bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card space-y-5">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-farm-border">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-sm font-bold text-farm-brand bg-farm-brand-soft px-2.5 py-0.5 rounded-xl">
                  {activeDelivery.deliveryCode}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-farm-text">
                  {activeDelivery.routeInfo.highwayCorridor}
                </h2>
              </div>
              <p className="text-xs text-farm-text-secondary mt-0.5">
                Produce: {activeDelivery.produceName} ({activeDelivery.quantity} {activeDelivery.unit})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onViewDelivery(activeDelivery)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-farm-surface text-farm-text hover:bg-farm-surface-secondary border border-farm-border cursor-pointer"
              >
                Delivery Details
              </button>
              <button
                type="button"
                onClick={() => onOpenRouteSummary(activeDelivery)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover cursor-pointer shadow-subtle"
              >
                Inspect Modal
              </button>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Approx Distance (Demo)</span>
              <span className="text-lg font-bold text-farm-brand">
                {activeDelivery.routeInfo.approxDistanceKm} km
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Est. Transit Time (Demo)</span>
              <span className="text-lg font-bold text-farm-brand">
                {activeDelivery.routeInfo.estimatedTravelTime}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-farm-surface border border-farm-border text-center">
              <span className="text-[11px] text-farm-text-secondary block">Road Condition</span>
              <span className="text-xs font-bold text-farm-text line-clamp-1 mt-1">
                {activeDelivery.routeInfo.routeStatus}
              </span>
            </div>
          </div>

          {/* Step-by-Step Waypoint Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-farm-text-secondary mb-3">
              Route Waypoint Sequence
            </h3>
            <div className="space-y-3 pl-2">
              {activeDelivery.routeInfo.waypoints.map((wp, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === activeDelivery.routeInfo.waypoints.length - 1;
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
                    <div className="flex-1 p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <div className="flex items-center gap-1.5">
                          {isFirst && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-gold text-farm-text">ORIGIN / PICKUP</span>}
                          {isLast && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-brand text-white">DESTINATION</span>}
                          {!isFirst && !isLast && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-farm-brand text-white">CORRIDOR NODE</span>}
                          <span className="text-xs font-bold text-farm-text">{wp.name}</span>
                        </div>
                        {wp.eta && (
                          <span className="text-xs font-mono text-farm-text-secondary flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {wp.eta}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-farm-text-secondary flex items-start gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-farm-terracotta" />
                        {wp.address}
                      </p>
                      {wp.contactPerson && (
                        <div className="text-xs text-farm-brand font-bold mt-2 pt-2 border-t border-farm-border">
                          POC: {wp.contactPerson} {wp.contactPhone ? `• ${wp.contactPhone}` : ''}
                        </div>
                      )}
                      {wp.notes && (
                        <p className="text-[11px] text-farm-terracotta italic mt-1">
                          {wp.notes}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
