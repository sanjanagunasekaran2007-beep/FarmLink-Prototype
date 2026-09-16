import { X, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal = ({ isOpen, onClose }: TermsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-farm-surface border border-farm-border rounded-3xl w-full max-w-lg shadow-card overflow-hidden my-8">
        {/* Header */}
        <div className="bg-farm-brand text-white p-5 sm:p-6 flex items-center justify-between border-b border-farm-brand">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-farm-brand border border-farm-brand flex items-center justify-center text-farm-gold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                Terms & Conditions
              </h2>
              <p className="text-xs text-white/70 font-medium">
                FarmLink Transparent Marketplace Guidelines
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-farm-brand text-white/80 hover:text-white flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-farm-text/90 leading-relaxed">
          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <ShieldCheck className="w-4 h-4 text-farm-brand" />
              <span>1. Direct & Guaranteed Escrow Trading</span>
            </div>
            <p className="text-farm-text-secondary">
              FarmLink operates on guaranteed escrow settlement. All buyer purchase funds are verified and held in protected escrow before harvest collection. No hidden broker deductions or post-dispatch arbitrary rejections.
            </p>
          </div>

          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <CheckCircle2 className="w-4 h-4 text-farm-brand" />
              <span>2. Transparent Listing & Quality Assurance</span>
            </div>
            <p className="text-farm-text-secondary">
              Farmers accurately declare crop variety, quality grade, quantity, and harvest dates. Accurate declarations establish reliable producer ratings and unlock preferential logistics dispatch.
            </p>
          </div>

          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <CheckCircle2 className="w-4 h-4 text-farm-brand" />
              <span>3. Scheduled Logistics & Farmgate Pickup</span>
            </div>
            <p className="text-farm-text-secondary">
              Designated carriers will collect shipments according to agreed harvest dates. Farmers receive digital weighment receipts and instantaneous dispatch confirmation.
            </p>
          </div>

          <div className="p-3.5 bg-farm-surface rounded-2xl border border-farm-border space-y-2">
            <div className="flex items-center gap-2 font-bold text-farm-brand">
              <CheckCircle2 className="w-4 h-4 text-farm-brand" />
              <span>4. Fair Pricing & Zero Price Alteration</span>
            </div>
            <p className="text-farm-text-secondary">
              Once an order is confirmed, the agreed price is locked and settled without arbitrary deductions or unilateral adjustments.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-farm-surface-secondary border-t border-farm-border flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
