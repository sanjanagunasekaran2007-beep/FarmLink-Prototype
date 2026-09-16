import { X, AlertCircle, MessageSquare } from 'lucide-react';
import { SupportRequestItem } from '@/types';

interface SupportRequestDetailModalProps {
  request: SupportRequestItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SupportRequestDetailModal = ({
  request,
  isOpen,
  onClose,
}: SupportRequestDetailModalProps) => {
  if (!isOpen || !request) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-farm-surface text-farm-terracotta border-farm-border';
      case 'Under Review':
        return 'bg-farm-surface-secondary text-farm-terracotta border-farm-gold';
      case 'Resolved':
        return 'bg-farm-brand-soft text-farm-brand border-farm-brand';
      default:
        return 'bg-farm-surface-secondary text-farm-text border-farm-border';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-none select-none animate-fadeIn overflow-y-auto">
      <div className="bg-farm-surface w-full max-w-lg rounded-3xl border border-farm-border shadow-card overflow-hidden my-auto flex flex-col">
        {/* Header */}
        <div className="p-5 bg-farm-brand text-white flex items-center justify-between shrink-0 border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand text-farm-gold flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-display font-bold">
                  {request.referenceId}
                </h2>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <p className="text-xs text-farm-text-secondary">
                Category: {request.category} &bull; Created: {request.createdAt}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-farm-text-secondary hover:text-white hover:bg-farm-brand cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-4 text-farm-text overflow-y-auto">
          {/* Disclaimer */}
          <div className="p-3 bg-farm-surface rounded-xl border border-farm-border flex items-center gap-2 text-xs text-farm-terracotta">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Illustrative demo support record &bull; Saved locally in session</span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary block mb-1">
              Subject
            </span>
            <h3 className="text-sm font-bold text-farm-text">
              {request.subject}
            </h3>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary block mb-1">
              Description
            </span>
            <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border text-xs text-farm-text leading-relaxed">
              {request.description}
            </div>
          </div>

          {request.relatedEntityId && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary block mb-1">
                Related Order / Delivery Code
              </span>
              <span className="font-mono font-bold text-xs bg-farm-brand-soft text-farm-brand px-2.5 py-1 rounded-xl">
                {request.relatedEntityId}
              </span>
            </div>
          )}

          {request.responseNote && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-farm-brand block mb-1">
                FarmLink Support Response (Demo)
              </span>
              <div className="p-3.5 bg-farm-brand-soft rounded-2xl border border-farm-brand/30 text-xs text-farm-brand leading-relaxed">
                {request.responseNote}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-farm-brand text-white hover:bg-farm-brand-hover transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
