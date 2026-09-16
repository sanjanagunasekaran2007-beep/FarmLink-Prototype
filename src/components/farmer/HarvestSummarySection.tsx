import { Sprout, Layers, Clock, CheckCircle2 } from 'lucide-react';
import { HarvestItem } from '@/types';

interface HarvestSummarySectionProps {
  harvests: HarvestItem[];
  onViewAllHarvests: () => void;
}

export const HarvestSummarySection = ({
  harvests,
  onViewAllHarvests,
}: HarvestSummarySectionProps) => {
  const publishedCount = harvests.filter((h) => h.status === 'Published' || h.status === 'Active').length;
  const draftCount = harvests.filter((h) => h.status === 'Draft').length;
  const completedCount = harvests.filter((h) => h.status === 'Completed' || h.status === 'Sold').length;
  const totalCount = harvests.length;

  return (
    <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card select-none">
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-farm-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-farm-brand flex items-center justify-center text-white shadow-subtle">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-farm-text leading-tight">
              My Harvest & Trade Summary
            </h3>
            <p className="text-xs text-farm-text-secondary font-medium">
              Portfolio overview across active listings, drafts, and completed payouts
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAllHarvests}
          className="text-xs font-bold text-farm-brand hover:underline cursor-pointer bg-farm-surface-secondary px-3 py-1.5 rounded-xl border border-farm-border shadow-subtle"
        >
          Manage Listings ({harvests.length})
        </button>
      </div>

      {/* 4 Distinct Stat Cards with Purposeful Accents */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Total Harvests (Deep Forest) */}
        <div className="p-4 rounded-2xl bg-farm-surface-secondary border border-farm-border flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-text">
              {totalCount}
            </div>
            <div className="text-xs font-bold text-farm-text-secondary">
              Total Harvests
            </div>
          </div>
        </div>

        {/* 2. Published (Terracotta) */}
        <div className="p-4 rounded-2xl bg-farm-surface-secondary border border-farm-border flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-terracotta">
              {publishedCount}
            </div>
            <div className="text-xs font-bold text-farm-text-secondary">
              Published Lots
            </div>
          </div>
        </div>

        {/* 3. Drafts (Antique Gold) */}
        <div className="p-4 rounded-2xl bg-farm-surface-secondary border border-farm-border flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle">
            <Clock className="w-5 h-5 text-farm-text" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-gold">
              {draftCount}
            </div>
            <div className="text-xs font-bold text-farm-text-secondary">
              Saved Drafts
            </div>
          </div>
        </div>

        {/* 4. Completed (Eucalyptus) */}
        <div className="p-4 rounded-2xl bg-farm-surface-secondary border border-farm-border flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-eucalyptus text-white flex items-center justify-center shrink-0 shadow-subtle">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {completedCount}
            </div>
            <div className="text-xs font-bold text-farm-text-secondary">
              Completed Payouts
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
