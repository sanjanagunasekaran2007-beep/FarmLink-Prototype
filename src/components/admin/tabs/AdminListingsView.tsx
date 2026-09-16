import { useState } from 'react';
import { 
  Package, 
  Search, 
  Eye, 
  MapPin, 
  RotateCcw,
  Sprout
} from 'lucide-react';
import { AdminListingItem, AdminListingStatus } from '@/types';
import { AdminListingDetailModal } from '../modals/AdminListingDetailModal';
import { AdminActionConfirmModal } from '../modals/AdminActionConfirmModal';

interface AdminListingsViewProps {
  listings: AdminListingItem[];
  onUpdateListingStatus: (listingId: string, newStatus: AdminListingStatus) => void;
}

export const AdminListingsView = ({
  listings,
  onUpdateListingStatus,
}: AdminListingsViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | AdminListingStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const [selectedListing, setSelectedListing] = useState<AdminListingItem | null>(null);

  // Confirmation Modal State
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    listingId: string;
    cropName: string;
    newStatus: AdminListingStatus;
    actionType: string;
  }>({
    isOpen: false,
    listingId: '',
    cropName: '',
    newStatus: 'Published',
    actionType: '',
  });

  const categories = ['All', 'Vegetables', 'Grains', 'Fruits', 'Spices', 'Pulses'];

  // Filter listings
  const filteredListings = listings.filter((item) => {
    const matchesSearch = 
      item.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.listingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleTriggerAction = (action: 'review' | 'pause' | 'restore' | 'archive', listing: AdminListingItem) => {
    let targetStatus: AdminListingStatus = 'Published';
    let actionDesc = '';

    if (action === 'review') {
      targetStatus = 'Published';
      actionDesc = 'Approve and Publish';
    } else if (action === 'pause') {
      targetStatus = 'Paused';
      actionDesc = 'Pause Marketplace Visibility for';
    } else if (action === 'restore') {
      targetStatus = 'Published';
      actionDesc = 'Restore and Re-Publish';
    } else if (action === 'archive') {
      targetStatus = 'Archived';
      actionDesc = 'Archive';
    }

    setConfirmModalState({
      isOpen: true,
      listingId: listing.id,
      cropName: `${listing.cropName} (${listing.listingId})`,
      newStatus: targetStatus,
      actionType: actionDesc,
    });
  };

  const handleConfirmStatusChange = () => {
    if (confirmModalState.listingId) {
      onUpdateListingStatus(confirmModalState.listingId, confirmModalState.newStatus);
      if (selectedListing && selectedListing.id === confirmModalState.listingId) {
        setSelectedListing({ ...selectedListing, status: confirmModalState.newStatus });
      }
    }
    setConfirmModalState({ isOpen: false, listingId: '', cropName: '', newStatus: 'Published', actionType: '' });
  };

  const getStatusStyle = (status: AdminListingStatus) => {
    switch (status) {
      case 'Published':
        return { bg: '#E8EFE5', text: '#164A36', border: '#164A36' };
      case 'Pending Review':
        return { bg: '#FFF3D6', text: '#8A6812', border: '#D9A441' };
      case 'Paused':
        return { bg: '#FDEAE8', text: '#B94A48', border: '#B94A48' };
      case 'Archived':
        return { bg: '#F7F4EC', text: '#66736A', border: '#DCE2D9' };
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-farm-surface p-6 rounded-3xl border border-farm-border shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold border border-farm-brand/30 uppercase tracking-wider mb-2">
            <Sprout className="w-3.5 h-3.5" />
            <span>Marketplace Moderation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text">
            Harvest Listings (Demo Management)
          </h1>
          <p className="text-xs text-farm-text-secondary mt-1">
            Review quality ratings, pause inactive batches, or verify new farmer produce listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text">
            Showing <strong className="text-farm-brand">{filteredListings.length}</strong> of {listings.length} Lots
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-farm-surface p-4 sm:p-5 rounded-2xl border border-farm-border shadow-subtle space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by crop, farmer name, ID, or district..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs text-farm-text placeholder-farm-text-muted focus:outline-none focus:border-farm-brand transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'All' ? 'All Crop Categories' : `${cat} Category`}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="sm:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-semibold text-farm-text focus:outline-none focus:border-farm-brand transition-colors cursor-pointer"
            >
              <option value="All">All Listing Statuses</option>
              <option value="Published">Published (Active)</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Paused">Paused</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button if filtered */}
        {(searchTerm || statusFilter !== 'All' || categoryFilter !== 'All') && (
          <div className="flex items-center justify-between pt-2 border-t border-farm-border text-xs text-farm-text-secondary">
            <span>Active filters applied</span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setCategoryFilter('All');
              }}
              className="inline-flex items-center gap-1 font-bold text-farm-brand hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Listings Table / Cards */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border shadow-subtle overflow-hidden">
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-farm-surface text-farm-text-secondary flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base text-farm-text">
              No harvest listings match your criteria
            </h3>
            <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
              Try adjusting your search query or selecting a different crop category.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-farm-surface text-farm-text font-bold border-b border-farm-border select-none">
                <tr>
                  <th className="px-5 py-3.5">Listing ID & Crop</th>
                  <th className="px-4 py-3.5">Farmer & Location</th>
                  <th className="px-4 py-3.5">Quantity & Price</th>
                  <th className="px-4 py-3.5">Grade</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Published Date</th>
                  <th className="px-5 py-3.5 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-farm-border">
                {filteredListings.map((item) => {
                  const statusStyle = getStatusStyle(item.status);

                  return (
                    <tr key={item.id} className="hover:bg-farm-surface/40 transition-colors">
                      {/* Crop & ID */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-sm text-farm-text">{item.cropName}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-mono text-farm-text-secondary">{item.listingId}</span>
                          <span className="text-[10px] font-semibold text-farm-brand bg-farm-brand-soft px-1.5 py-0.2 rounded border border-farm-brand/20">
                            {item.category}
                          </span>
                        </div>
                      </td>

                      {/* Farmer & Location */}
                      <td className="px-4 py-4">
                        <div className="font-semibold text-farm-text">{item.farmerName}</div>
                        <div className="text-[11px] text-farm-text-secondary flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-farm-brand" />
                          <span>{item.district}, {item.state}</span>
                        </div>
                      </td>

                      {/* Quantity & Price */}
                      <td className="px-4 py-4">
                        <div className="font-bold text-farm-brand">{item.quantity.toLocaleString()} {item.unit}</div>
                        <div className="text-[11px] text-farm-text font-medium">₹{item.expectedPrice} / kg</div>
                      </td>

                      {/* Grade */}
                      <td className="px-4 py-4 font-bold text-farm-text">
                        {item.qualityGrade}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block"
                          style={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.text,
                            borderColor: statusStyle.border,
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Published Date */}
                      <td className="px-4 py-4 text-farm-text-secondary font-medium">
                        {item.publishedDate}
                      </td>

                      {/* Moderation Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedListing(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-brand-soft hover:text-farm-brand transition-colors cursor-pointer"
                            title="Inspect Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          {item.status === 'Pending Review' && (
                            <button
                              type="button"
                              onClick={() => handleTriggerAction('review', item)}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                              title="Approve Listing"
                            >
                              Approve
                            </button>
                          )}

                          {item.status === 'Published' && (
                            <button
                              type="button"
                              onClick={() => handleTriggerAction('pause', item)}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-surface border border-farm-border text-farm-danger text-xs font-bold hover:bg-farm-surface transition-colors cursor-pointer"
                              title="Pause Demo Listing"
                            >
                              Pause
                            </button>
                          )}

                          {item.status === 'Paused' && (
                            <button
                              type="button"
                              onClick={() => handleTriggerAction('restore', item)}
                              className="px-2.5 py-1.5 rounded-lg bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand-hover transition-colors cursor-pointer"
                              title="Restore Listing"
                            >
                              Restore
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Listing Details Modal */}
      <AdminListingDetailModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        onAction={(action, listing) => handleTriggerAction(action, listing)}
      />

      {/* Confirmation Modal */}
      <AdminActionConfirmModal
        isOpen={confirmModalState.isOpen}
        title={`Confirm ${confirmModalState.actionType} Listing`}
        description={`Are you sure you want to perform "${confirmModalState.actionType}" on ${confirmModalState.cropName}?`}
        confirmLabel={`Confirm ${confirmModalState.newStatus}`}
        variant={confirmModalState.newStatus === 'Paused' ? 'danger' : 'success'}
        onConfirm={handleConfirmStatusChange}
        onCancel={() => setConfirmModalState({ isOpen: false, listingId: '', cropName: '', newStatus: 'Published', actionType: '' })}
      />
    </div>
  );
};
