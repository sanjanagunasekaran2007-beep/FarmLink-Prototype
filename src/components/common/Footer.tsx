import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-farm-surface text-farm-text border-t border-farm-border py-4 px-4 sm:px-8 mt-auto z-10 select-none transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left: Network Title */}
        <div className="flex items-center gap-2">
          <span className="farmlink-logo-text whitespace-nowrap font-display font-bold text-sm tracking-wider text-farm-brand">
            FARMLINK
          </span>
          <span className="text-xs text-farm-text-muted hidden sm:inline">&bull;</span>
          <span className="text-xs text-farm-text-secondary font-medium">
            National Agricultural Trading Network
          </span>
        </div>

        {/* Center/Right: Trust Pillars */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-medium text-farm-text-secondary">
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-farm-brand" />
            <span>APMC Certified Mandis</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-farm-terracotta" />
            <span>100% Escrow Protected</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-farm-teal" />
            <span>Direct Farmgate Trade</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
