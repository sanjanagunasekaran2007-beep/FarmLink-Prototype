import React, { useState, useMemo } from 'react';
import { 
  PlusCircle, 
  Search, 
  Calendar, 
  MapPin, 
  Leaf, 
  Layers, 
  Clock, 
  CheckCircle2, 
  Archive, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Send, 
  Eye, 
  Package, 
  X, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { HarvestItem, HarvestStatus } from '@/types';
import { HarvestDetailsModal } from '../harvest/HarvestDetailsModal';
import { EditHarvestModal } from '../harvest/EditHarvestModal';
import { DeleteConfirmModal } from '../harvest/DeleteConfirmModal';

interface FarmerHarvestViewProps {
  harvests: HarvestItem[];
  onOpenAddHarvest: () => void;
  onUpdateHarvest?: (updated: HarvestItem) => void;
  onDeleteHarvest?: (harvestId: string) => void;
  onStatusChange?: (harvestId: string, newStatus: HarvestStatus) => void;
}

type StatusTab = 'all' | 'published' | 'drafts' | 'completed' | 'archived';

export const FarmerHarvestView: React.FC<FarmerHarvestViewProps> = ({
  harvests,
  onOpenAddHarvest,
  onUpdateHarvest,
  onDeleteHarvest,
  onStatusChange,
}) => {
  // Navigation & Filter State
  const [activeTab, setActiveTab] = useState<StatusTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Active Dropdown Menu
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Modal States
  const [selectedHarvestForDetails, setSelectedHarvestForDetails] = useState<HarvestItem | null>(null);
  const [selectedHarvestForEdit, setSelectedHarvestForEdit] = useState<HarvestItem | null>(null);
  const [selectedHarvestForDelete, setSelectedHarvestForDelete] = useState<HarvestItem | null>(null);

  // Status Badge Helper
  const getStatusBadgeStyle = (status: HarvestStatus) => {
    switch (status) {
      case 'Published':
      case 'Active':
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: 'Published',
        };
      case 'Draft':
        return {
          bg: 'bg-farm-gold',
          text: 'text-farm-text',
          label: 'Draft',
        };
      case 'Completed':
      case 'Sold':
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: 'Completed',
        };
      case 'Archived':
        return {
          bg: 'bg-farm-terracotta',
          text: 'text-white',
          label: 'Archived',
        };
      default:
        return {
          bg: 'bg-farm-brand',
          text: 'text-white',
          label: status,
        };
    }
  };

  // Counts Calculation
  const counts = useMemo(() => {
    const total = harvests.length;
    const published = harvests.filter((h) => h.status === 'Published' || h.status === 'Active').length;
    const drafts = harvests.filter((h) => h.status === 'Draft').length;
    const completed = harvests.filter((h) => h.status === 'Completed' || h.status === 'Sold').length;
    const archived = harvests.filter((h) => h.status === 'Archived').length;
    return { total, published, drafts, completed, archived };
  }, [harvests]);

  // Filtered Harvests
  const filteredHarvests = useMemo(() => {
    return harvests.filter((item) => {
      // 1. Status Tab filter
      if (activeTab === 'published' && item.status !== 'Published' && item.status !== 'Active') return false;
      if (activeTab === 'drafts' && item.status !== 'Draft') return false;
      if (activeTab === 'completed' && item.status !== 'Completed' && item.status !== 'Sold') return false;
      if (activeTab === 'archived' && item.status !== 'Archived') return false;

      // 2. Category filter
      if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;

      // 3. Search query (crop name, harvestCode, variety, location)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const cropMatch = item.cropName.toLowerCase().includes(query);
        const codeMatch = (item.harvestCode || item.id).toLowerCase().includes(query);
        const varietyMatch = item.variety ? item.variety.toLowerCase().includes(query) : false;
        const locMatch = item.pickupLocation.toLowerCase().includes(query);
        if (!cropMatch && !codeMatch && !varietyMatch && !locMatch) return false;
      }

      return true;
    });
  }, [harvests, activeTab, categoryFilter, searchQuery]);

  // Categories present in harvests for quick filter
  const categories = useMemo(() => {
    const set = new Set<string>();
    harvests.forEach((h) => {
      if (h.category) set.add(h.category);
    });
    return Array.from(set);
  }, [harvests]);

  const handleStatusChangeInternal = (harvestId: string, newStatus: HarvestStatus) => {
    if (onStatusChange) {
      onStatusChange(harvestId, newStatus);
    }
    // Update local modal view if open
    if (selectedHarvestForDetails && selectedHarvestForDetails.id === harvestId) {
      setSelectedHarvestForDetails((prev) => prev ? { ...prev, status: newStatus } : null);
    }
    setActiveMenuId(null);
  };

  const handleUpdateHarvestInternal = (updated: HarvestItem) => {
    if (onUpdateHarvest) {
      onUpdateHarvest(updated);
    }
    if (selectedHarvestForDetails && selectedHarvestForDetails.id === updated.id) {
      setSelectedHarvestForDetails(updated);
    }
  };

  const handleDeleteHarvestInternal = (harvestId: string) => {
    if (onDeleteHarvest) {
      onDeleteHarvest(harvestId);
    }
    if (selectedHarvestForDetails && selectedHarvestForDetails.id === harvestId) {
      setSelectedHarvestForDetails(null);
    }
  };

  return (
    <div className="space-y-6 select-none" onClick={() => activeMenuId && setActiveMenuId(null)}>
      {/* 1. PAGE HEADER */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-7 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-brand-soft text-farm-brand text-[11px] font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-farm-brand" />
              <span>Farm Inventory & Lot Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-farm-text tracking-tight">
              My Harvest
            </h1>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-0.5">
              Manage your crops and track your harvest listings.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAddHarvest}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand shrink-0"
            id="my-harvest-add-btn"
          >
            <PlusCircle className="w-5 h-5 text-farm-gold" />
            <span>+ Add Harvest</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="pt-3 border-t border-farm-border flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-farm-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by crop or harvest ID"
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs sm:text-sm text-farm-text font-semibold focus:outline-hidden focus:border-farm-brand focus:bg-farm-surface transition-all"
              id="harvest-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-text-secondary hover:text-farm-text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Category Selector */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-farm-text-secondary">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text focus:outline-hidden focus:border-farm-brand"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className="sm:hidden flex items-center justify-between w-full gap-2">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-farm-border bg-farm-surface text-xs font-bold text-farm-text flex items-center justify-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-farm-brand" />
              <span>Filters {categoryFilter !== 'all' ? `(${categoryFilter})` : ''}</span>
            </button>
            {categoryFilter !== 'all' && (
              <button
                type="button"
                onClick={() => setCategoryFilter('all')}
                className="px-3 py-2.5 rounded-xl bg-farm-terracotta-soft text-farm-terracotta text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Sheet */}
        {isMobileFiltersOpen && (
          <div className="sm:hidden p-3 rounded-2xl bg-farm-surface border border-farm-border space-y-2">
            <div className="text-xs font-bold text-farm-text flex items-center justify-between">
              <span>Filter by Category</span>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-[11px] text-farm-text-secondary font-bold"
              >
                Close
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setIsMobileFiltersOpen(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  categoryFilter === 'all'
                    ? 'bg-farm-brand text-white'
                    : 'bg-farm-surface text-farm-text border border-farm-border'
                }`}
              >
                All Categories
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategoryFilter(cat);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    categoryFilter === cat
                      ? 'bg-farm-brand text-white'
                      : 'bg-farm-surface text-farm-text border border-farm-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. HARVEST SUMMARY (SOLID COLOUR ACCENTS: Deep Forest, Terracotta, Mustard Gold, Deep Teal) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Total Harvests (Deep Forest #164A36) */}
        <div 
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-3xl bg-farm-brand-soft border ${activeTab === 'all' ? 'border-farm-brand ring-2 ring-farm-brand' : 'border-farm-border-strong'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Layers className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {counts.total}
            </div>
            <div className="text-xs font-bold text-farm-brand">
              Total Harvests
            </div>
          </div>
        </div>

        {/* 2. Published (Terracotta #C66B45) */}
        <div 
          onClick={() => setActiveTab('published')}
          className={`p-4 rounded-3xl bg-farm-terracotta-soft border ${activeTab === 'published' ? 'border-farm-terracotta ring-2 ring-farm-terracotta' : 'border-farm-terracotta/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-terracotta transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-terracotta">
              {counts.published}
            </div>
            <div className="text-xs font-bold text-farm-terracotta">
              Published
            </div>
          </div>
        </div>

        {/* 3. Drafts (Mustard Gold #D9A441) */}
        <div 
          onClick={() => setActiveTab('drafts')}
          className={`p-4 rounded-3xl bg-farm-gold-soft border ${activeTab === 'drafts' ? 'border-farm-gold ring-2 ring-farm-gold' : 'border-farm-gold/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-gold transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle">
            <Clock className="w-5 h-5 text-farm-text" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-gold">
              {counts.drafts}
            </div>
            <div className="text-xs font-bold text-farm-gold">
              Drafts
            </div>
          </div>
        </div>

        {/* 4. Completed (Deep Teal #245B5A) */}
        <div 
          onClick={() => setActiveTab('completed')}
          className={`p-4 rounded-3xl bg-farm-eucalyptus-soft border ${activeTab === 'completed' ? 'border-farm-brand ring-2 ring-farm-brand' : 'border-farm-info/40'} flex items-center gap-3.5 shadow-subtle cursor-pointer hover:border-farm-brand transition-all`}
        >
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {counts.completed}
            </div>
            <div className="text-xs font-bold text-farm-info">
              Completed
            </div>
          </div>
        </div>
      </div>

      {/* 3. HARVEST STATUS TABS */}
      <div className="bg-farm-surface p-2 rounded-2xl border border-farm-border shadow-card flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all' as StatusTab, label: 'All', count: counts.total },
          { id: 'published' as StatusTab, label: 'Published', count: counts.published },
          { id: 'drafts' as StatusTab, label: 'Drafts', count: counts.drafts },
          { id: 'completed' as StatusTab, label: 'Completed', count: counts.completed },
          { id: 'archived' as StatusTab, label: 'Archived', count: counts.archived },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-farm-brand text-white shadow-subtle'
                  : 'text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary'
              }`}
              id={`harvest-tab-${tab.id}`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-farm-gold text-farm-text' : 'bg-farm-surface-secondary text-farm-text-secondary'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. HARVEST LISTINGS GRID */}
      {filteredHarvests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHarvests.map((item) => {
            const badge = getStatusBadgeStyle(item.status);
            const isMenuOpen = activeMenuId === item.id;

            return (
              <div
                key={item.id}
                className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card hover:border-farm-brand transition-all flex flex-col justify-between relative group"
              >
                <div>
                  {/* Card Top: Harvest ID + Status Badge + Actions Menu */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-farm-surface-secondary text-farm-text border border-farm-border">
                        {item.harvestCode || item.id}
                      </span>
                      {item.grade && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-farm-brand-soft text-farm-brand border border-farm-border-strong">
                          {item.grade}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 relative">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>

                      {/* Three Dots Menu Button */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(isMenuOpen ? null : item.id);
                          }}
                          className="w-8 h-8 rounded-full bg-farm-surface border border-farm-border flex items-center justify-center text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary transition-colors cursor-pointer"
                          aria-label="Harvest actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* 7. HARVEST ACTIONS MENU DROPDOWN */}
                        {isMenuOpen && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-9 z-30 w-48 bg-farm-surface rounded-2xl border border-farm-border shadow-elevated py-1.5 select-none text-xs"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedHarvestForDetails(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-farm-text font-semibold hover:bg-farm-surface-secondary flex items-center gap-2 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5 text-farm-brand" />
                              <span>View Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedHarvestForEdit(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-farm-text font-semibold hover:bg-farm-surface-secondary flex items-center gap-2 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-farm-brand" />
                              <span>Edit Harvest</span>
                            </button>

                            {/* Status-specific actions */}
                            {item.status === 'Published' || item.status === 'Active' ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleStatusChangeInternal(item.id, 'Draft')}
                                  className="w-full px-3.5 py-2 text-left text-farm-gold font-semibold hover:bg-farm-gold-soft flex items-center gap-2 cursor-pointer"
                                >
                                  <Clock className="w-3.5 h-3.5 text-farm-gold" />
                                  <span>Save as Draft</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleStatusChangeInternal(item.id, 'Completed')}
                                  className="w-full px-3.5 py-2 text-left text-farm-brand font-semibold hover:bg-farm-eucalyptus-soft flex items-center gap-2 cursor-pointer"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-farm-brand" />
                                  <span>Mark as Completed</span>
                                </button>
                              </>
                            ) : item.status === 'Draft' ? (
                              <button
                                type="button"
                                onClick={() => handleStatusChangeInternal(item.id, 'Published')}
                                className="w-full px-3.5 py-2 text-left text-farm-brand font-semibold hover:bg-farm-brand-soft flex items-center gap-2 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5 text-farm-brand" />
                                <span>Publish Listing</span>
                              </button>
                            ) : item.status === 'Completed' || item.status === 'Sold' ? (
                              <button
                                type="button"
                                onClick={() => handleStatusChangeInternal(item.id, 'Published')}
                                className="w-full px-3.5 py-2 text-left text-farm-brand font-semibold hover:bg-farm-brand-soft flex items-center gap-2 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5 text-farm-brand" />
                                <span>Re-publish Listing</span>
                              </button>
                            ) : null}

                            {item.status !== 'Archived' ? (
                              <button
                                type="button"
                                onClick={() => handleStatusChangeInternal(item.id, 'Archived')}
                                className="w-full px-3.5 py-2 text-left text-farm-terracotta font-semibold hover:bg-farm-surface-secondary flex items-center gap-2 cursor-pointer"
                              >
                                <Archive className="w-3.5 h-3.5 text-farm-terracotta" />
                                <span>Archive</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleStatusChangeInternal(item.id, 'Draft')}
                                className="w-full px-3.5 py-2 text-left text-farm-text font-semibold hover:bg-farm-surface-secondary flex items-center gap-2 cursor-pointer"
                              >
                                <Archive className="w-3.5 h-3.5 text-farm-gold" />
                                <span>Restore to Draft</span>
                              </button>
                            )}

                            <div className="my-1 border-t border-farm-border" />

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedHarvestForDelete(item);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3.5 py-2 text-left text-farm-terracotta font-bold hover:bg-farm-terracotta-soft flex items-center gap-2 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-farm-terracotta" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Crop Image or Fallback */}
                  {item.imageUrl ? (
                    <div className="w-full h-36 mb-3 rounded-2xl overflow-hidden border border-farm-border bg-farm-surface-secondary relative">
                      <img
                        src={item.imageUrl}
                        alt={item.cropName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-farm-brand/85 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {item.category}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-24 mb-3 rounded-2xl border border-dashed border-farm-border bg-farm-surface-secondary flex items-center justify-center text-farm-terracotta text-xs font-semibold gap-2">
                      <Package className="w-4 h-4 text-farm-terracotta" />
                      <span>{item.category} &bull; Standard Batch</span>
                    </div>
                  )}

                  {/* Crop Name & Variety */}
                  <h3 className="text-xl font-display font-bold text-farm-text mb-0.5">
                    {item.cropName}
                  </h3>

                  {item.variety && (
                    <p className="text-xs text-farm-text-secondary font-semibold mb-2">
                      Variety: <span className="text-farm-text font-bold">{item.variety}</span>
                    </p>
                  )}

                  {/* Quantity & Expected Rate */}
                  <div className="flex items-baseline gap-1.5 text-farm-brand mb-3">
                    <span className="text-2xl font-display font-bold">
                      {item.quantity}
                    </span>
                    <span className="text-xs font-semibold text-farm-text-secondary">
                      {item.unit} &bull; Expected ₹{item.expectedPrice}/{item.unit === 'Quintals' ? 'kg' : item.unit}
                    </span>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-1.5 text-xs text-farm-text-secondary pt-3 border-t border-farm-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-farm-brand shrink-0" />
                      <span className="truncate">Harvest Date: {item.harvestDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                      <span className="truncate">{item.pickupLocation}</span>
                    </div>
                    {item.farmingMethod && item.farmingMethod !== 'Not specified' && (
                      <div className="flex items-center gap-2 text-farm-gold">
                        <Leaf className="w-3.5 h-3.5 text-farm-gold shrink-0" />
                        <span className="truncate font-semibold">{item.farmingMethod}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-farm-border flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-[11px] text-farm-text-secondary font-medium">
                    <span>Listed: {item.createdAt}</span>
                    {item.updatedAt && <span>Updated: {item.updatedAt}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedHarvestForDetails(item)}
                      className="px-3 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-brand text-xs font-bold hover:bg-farm-brand-soft active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-farm-brand" />
                      <span>View Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedHarvestForEdit(item)}
                      className="px-3 py-2 rounded-xl bg-farm-surface border border-farm-border text-farm-text text-xs font-bold hover:bg-farm-surface-secondary active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-farm-brand" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* 8. EMPTY & ERROR STATES */
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-8 sm:p-12 text-center shadow-card space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-farm-surface-secondary border border-farm-border flex items-center justify-center mx-auto text-farm-brand">
            {searchQuery ? (
              <Search className="w-8 h-8 text-farm-text-secondary" />
            ) : activeTab === 'drafts' ? (
              <Clock className="w-8 h-8 text-farm-gold" />
            ) : activeTab === 'completed' ? (
              <CheckCircle2 className="w-8 h-8 text-farm-brand" />
            ) : activeTab === 'archived' ? (
              <Archive className="w-8 h-8 text-farm-terracotta" />
            ) : (
              <Package className="w-8 h-8 text-farm-brand" />
            )}
          </div>

          <div>
            <h3 className="text-xl font-display font-bold text-farm-text">
              {searchQuery
                ? 'No matching harvests found'
                : activeTab === 'all'
                ? 'Your harvest journey starts here.'
                : `No ${activeTab} harvests yet`}
            </h3>
            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium mt-1">
              {searchQuery
                ? `No harvests match "${searchQuery}". Try searching by crop name (e.g. Tomato) or ID (e.g. FL-2026-001).`
                : activeTab === 'drafts'
                ? 'You do not have any saved harvest drafts. Add a harvest and choose "Save as Draft" to review later.'
                : activeTab === 'completed'
                ? 'Completed harvest batches with verified delivery and settled payouts will appear here.'
                : activeTab === 'archived'
                ? 'Archived past season crops and inactive listings will appear here.'
                : 'List your first crop batch to reach verified buyers and get guaranteed mandi pricing.'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-center gap-3">
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setCategoryFilter('all');
                }}
                className="px-5 py-2.5 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand cursor-pointer"
              >
                Clear Search
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenAddHarvest}
                className="px-6 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-bold hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer"
                id="empty-state-add-btn"
              >
                <PlusCircle className="w-4 h-4 text-farm-gold" />
                <span>Add Your First Harvest</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. HARVEST DETAILS MODAL */}
      <HarvestDetailsModal
        isOpen={!!selectedHarvestForDetails}
        harvest={selectedHarvestForDetails}
        onClose={() => setSelectedHarvestForDetails(null)}
        onOpenEdit={(harvest) => {
          setSelectedHarvestForDetails(null);
          setSelectedHarvestForEdit(harvest);
        }}
        onOpenDelete={(harvest) => {
          setSelectedHarvestForDelete(harvest);
        }}
        onStatusChange={handleStatusChangeInternal}
      />

      {/* 6. EDIT HARVEST MODAL */}
      <EditHarvestModal
        isOpen={!!selectedHarvestForEdit}
        harvest={selectedHarvestForEdit}
        onClose={() => setSelectedHarvestForEdit(null)}
        onSave={handleUpdateHarvestInternal}
      />

      {/* 7. DELETE CONFIRMATION MODAL */}
      <DeleteConfirmModal
        isOpen={!!selectedHarvestForDelete}
        harvest={selectedHarvestForDelete}
        onClose={() => setSelectedHarvestForDelete(null)}
        onConfirmDelete={handleDeleteHarvestInternal}
      />
    </div>
  );
};
