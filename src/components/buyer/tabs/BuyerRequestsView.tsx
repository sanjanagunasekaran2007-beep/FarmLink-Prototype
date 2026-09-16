import { useState } from 'react';
import { FileText, Clock, ChevronDown, ChevronUp, MapPin, Store, AlertCircle, Calendar, Truck } from 'lucide-react';
import { BuyerInterestRequest, BuyerTab } from '@/types';

interface BuyerRequestsViewProps {
  requests: BuyerInterestRequest[];
  onNavigateTab: (tab: BuyerTab) => void;
}

export const BuyerRequestsView = ({ requests, onNavigateTab }: BuyerRequestsViewProps) => {
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-farm-surface text-farm-terracotta border-farm-border';
      case 'Under Review':
        return 'bg-farm-surface-secondary text-farm-terracotta border-farm-gold';
      case 'Accepted':
        return 'bg-farm-brand-soft text-farm-brand border-farm-brand';
      case 'Closed':
        return 'bg-farm-surface-secondary text-farm-text-secondary border-farm-border';
      default:
        return 'bg-farm-surface text-farm-text border-farm-border';
    }
  };

  return (
    <div className="space-y-5 select-none pb-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-farm-surface p-5 sm:p-6 rounded-3xl border border-farm-border shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-display font-bold text-farm-brand">
              My Purchase Requests
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-farm-terracotta text-white text-xs font-bold">
              {requests.length} Requests
            </span>
          </div>
          <p className="text-xs text-farm-text-secondary mt-0.5">
            Track purchase inquiries sent to growers across regional farm clusters
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('browse')}
          className="px-4 py-2.5 rounded-2xl bg-farm-surface text-farm-text text-xs font-bold hover:bg-farm-surface-secondary border border-farm-border flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Store className="w-4 h-4 text-farm-brand" />
          <span>Browse More Harvests</span>
        </button>
      </div>

      {/* Requests List */}
      {requests.length === 0 ? (
        <div className="p-12 text-center bg-farm-surface rounded-3xl border border-farm-border shadow-card space-y-4">
          <div className="w-14 h-14 rounded-full bg-farm-surface text-farm-text-secondary mx-auto flex items-center justify-center border border-farm-border">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-bold text-base text-farm-text">
              No Purchase Requests Submitted
            </h3>
            <p className="text-xs text-farm-text-secondary">
              When you express interest in a crop batch, your inquiry status will appear here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('browse')}
            className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer border border-farm-brand"
          >
            Browse Harvests
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((req) => {
            const isExpanded = selectedRequestId === req.id;

            return (
              <div
                key={req.id}
                className="bg-farm-surface rounded-3xl border border-farm-border shadow-card overflow-hidden transition-all"
              >
                {/* Main Card Summary */}
                <div
                  onClick={() => setSelectedRequestId(isExpanded ? null : req.id)}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-farm-surface/50 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center font-display font-bold text-lg shrink-0 border border-farm-border">
                      {req.cropName[0]}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display font-bold text-base text-farm-text">
                          {req.cropName} {req.variety ? `(${req.variety})` : ''}
                        </h3>
                        <span className="text-[10px] font-mono text-farm-text-secondary bg-farm-surface-secondary px-2 py-0.5 rounded-md border border-farm-border">
                          {req.id}
                        </span>
                        <span className="text-[10px] font-mono text-farm-text-secondary bg-farm-surface-secondary px-2 py-0.5 rounded-md border border-farm-border">
                          Lot: {req.harvestCode}
                        </span>
                      </div>

                      <p className="text-xs text-farm-text-secondary flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                        <span>{req.farmerName} &bull; {req.farmerLocation}</span>
                      </p>
                    </div>
                  </div>

                  {/* Quantity, Status & Expand */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-bold text-farm-text block">
                        {req.requestedQuantity} {req.unit}
                      </span>
                      <span className="text-[11px] text-farm-brand font-bold block">
                        Est: ₹{req.totalEstimatedValue?.toLocaleString('en-IN') || (req.requestedQuantity * req.expectedPrice).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(
                        req.status
                      )}`}
                    >
                      {req.status}
                    </span>

                    <div className="w-8 h-8 rounded-xl bg-farm-surface-secondary text-farm-text flex items-center justify-center shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-farm-border/70 bg-farm-surface space-y-4 text-xs text-farm-text">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                      <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border">
                        <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Intended Use</span>
                        <span className="font-bold">{req.intendedUse}</span>
                      </div>

                      <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border">
                        <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Fulfillment Method</span>
                        <span className="font-bold flex items-center gap-1 mt-0.5">
                          <Truck className="w-3.5 h-3.5 text-farm-brand" />
                          <span>{req.pickupPreference}</span>
                        </span>
                      </div>

                      <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border">
                        <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Preferred Collection Date</span>
                        <span className="font-bold flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-farm-brand" />
                          <span>{req.preferredDate}</span>
                        </span>
                      </div>
                    </div>

                    {req.message && (
                      <div className="p-3 bg-farm-surface rounded-2xl border border-farm-border space-y-1">
                        <span className="text-[10px] font-bold text-farm-text-secondary uppercase block">Your Message / Handling Note</span>
                        <p className="text-xs text-farm-text-secondary">{req.message}</p>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-farm-text-secondary">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-farm-text-secondary" />
                        <span>Submitted on: {req.submittedAt}</span>
                      </div>

                      <span className="text-farm-terracotta font-semibold">
                        Demo Workflow Status: Purchase order generates upon grower acceptance.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 bg-farm-surface-secondary rounded-3xl border border-farm-border flex items-center gap-2.5 text-xs text-farm-text-secondary">
        <AlertCircle className="w-4 h-4 text-farm-terracotta shrink-0" />
        <span>
          Purchase requests coordinate logistics and lock price expectations. All contracts are demo simulations in this prototype.
        </span>
      </div>
    </div>
  );
};
