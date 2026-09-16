import { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  ArrowRight
} from 'lucide-react';
import { AdminReportItem } from '@/types';
import { AdminReportPreviewModal } from '../modals/AdminReportPreviewModal';

interface AdminReportsViewProps {
  reports: AdminReportItem[];
}

export const AdminReportsView = ({
  reports,
}: AdminReportsViewProps) => {
  const [selectedReport, setSelectedReport] = useState<AdminReportItem | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Marketplace Activity':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Crop Listing Summary':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Delivery Summary':
        return { bg: '#DDE8F0', text: '#2A5570', border: '#4A7C9D' };
      case 'User Overview':
        return { bg: '#F1D8C8', text: '#8A4A28', border: '#B86B45' };
      default:
        return { bg: '#F7F4EC', text: '#17211C', border: '#DCE2D9' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-brand/30 uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Administrative Reporting</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            Reports & Export Previews (Demo View)
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Generate and preview consolidated operational summaries. Export previews are demonstration views and do not create local filesystem artifacts.
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text">
          Available Reports: <strong className="text-farm-brand">{reports.length} Categories</strong>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reports.map((report) => {
          const catStyle = getCategoryColor(report.category);

          return (
            <div
              key={report.id}
              className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle hover:shadow-card hover:border-farm-brand/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold border"
                    style={{
                      backgroundColor: catStyle.bg,
                      color: catStyle.text,
                      borderColor: catStyle.border,
                    }}
                  >
                    {report.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-farm-text-secondary">
                    <Calendar className="w-3.5 h-3.5 text-farm-brand" />
                    <span>{report.period}</span>
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-farm-text">
                  {report.title}
                </h3>

                <p className="text-xs text-farm-text-secondary leading-relaxed">
                  {report.description}
                </p>

                {/* Key Metric Card */}
                <div className="p-3 rounded-xl bg-farm-surface border border-farm-border flex items-center justify-between">
                  <span className="text-xs font-bold text-farm-text-secondary">Key Highlight</span>
                  <span className="text-xs font-bold text-farm-brand">{report.keyMetric}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-farm-border flex items-center justify-between">
                <span className="text-[11px] text-farm-text-secondary font-medium">
                  {report.recordCount.toLocaleString()} aggregated records
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer shadow-subtle"
                >
                  <span>Preview & Export</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview Modal */}
      <AdminReportPreviewModal
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
      />
    </div>
  );
};
