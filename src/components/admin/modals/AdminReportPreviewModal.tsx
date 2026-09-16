import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, Calendar, Check, ShieldCheck } from 'lucide-react';
import { AdminReportItem } from '@/types';

interface AdminReportPreviewModalProps {
  report: AdminReportItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminReportPreviewModal = ({
  report,
  isOpen,
  onClose,
}: AdminReportPreviewModalProps) => {
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  if (!isOpen || !report) return null;

  const handleDemoExport = (format: 'CSV' | 'PDF') => {
    setExportedStatus(`Demo ${format} export generated for preview!`);
    setTimeout(() => {
      setExportedStatus(null);
    }, 3500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-farm-brand/60 backdrop-blur-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-farm-surface rounded-2xl border border-farm-border shadow-subtle overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-farm-brand text-white px-6 py-4 flex items-center justify-between border-b border-farm-brand">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-farm-brand flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">
                  Report Preview & Audit Summary
                </h3>
                <div className="flex items-center gap-2 text-xs text-farm-text-secondary/80">
                  <span>Category: {report.category}</span>
                  <span>&bull;</span>
                  <span className="text-farm-gold font-semibold">Demo Report</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-farm-brand text-farm-text-secondary hover:bg-farm-brand transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Title & Period */}
            <div className="pb-4 border-b border-farm-border space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-farm-brand bg-farm-brand-soft px-2.5 py-0.5 rounded-md border border-farm-brand/30">
                {report.category}
              </span>
              <h4 className="text-xl font-display font-bold text-farm-text mt-2">
                {report.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-farm-text-secondary">
                <Calendar className="w-3.5 h-3.5 text-farm-brand" />
                <span>Reporting Interval: <strong className="text-farm-text">{report.period}</strong></span>
              </div>
              <p className="text-xs text-farm-text-secondary mt-2 leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* Key Metric Highlight */}
            <div className="p-4 rounded-xl bg-farm-brand-soft border border-farm-brand flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-farm-brand uppercase tracking-wider">
                  Primary Audit Metric
                </span>
                <p className="text-lg sm:text-xl font-display font-bold text-farm-brand">
                  {report.keyMetric}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-farm-text-secondary">Records Audited</span>
                <p className="text-sm font-bold text-farm-text">{report.recordCount.toLocaleString()} Entries</p>
              </div>
            </div>

            {/* Structured Summary Table */}
            <div>
              <h5 className="text-xs font-bold text-farm-text uppercase tracking-wider mb-2.5">
                Summary Breakdown (Demo Dataset)
              </h5>
              <div className="rounded-xl border border-farm-border overflow-hidden bg-farm-surface">
                <table className="w-full text-xs text-left">
                  <thead className="bg-farm-surface text-farm-text font-bold border-b border-farm-border">
                    <tr>
                      <th className="px-4 py-2.5">Indicator</th>
                      <th className="px-4 py-2.5 text-right">Aggregated Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-farm-border">
                    {report.summaryData.map((item, idx) => (
                      <tr key={idx} className="hover:bg-farm-surface/50">
                        <td className="px-4 py-3 font-medium text-farm-text">{item.label}</td>
                        <td className="px-4 py-3 text-right font-bold text-farm-brand">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Notice / Actions */}
            <div className="p-4 rounded-xl bg-farm-surface border border-farm-gold space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-farm-text-secondary">
                <ShieldCheck className="w-4 h-4" />
                <span>Export Simulation Controls</span>
              </div>
              <p className="text-xs text-farm-text">
                Click below to simulate generating an administrative export package. This demonstration does not download external files.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleDemoExport('CSV')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Demo CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoExport('PDF')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Demo PDF Preview</span>
                </button>
              </div>

              {exportedStatus && (
                <div className="p-2.5 rounded-lg bg-farm-brand-soft border border-farm-brand text-xs font-bold text-farm-brand flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>{exportedStatus}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-farm-surface px-6 py-3.5 border-t border-farm-border flex items-center justify-between">
            <span className="text-xs text-farm-text-secondary">
              FarmLink Demonstration Platform
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
