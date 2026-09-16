import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Package, 
  Send, 
  Store, 
  ShieldCheck, 
  Eye, 
  Users,
  RotateCcw
} from 'lucide-react';
import { BuyerProfile, BuyerType, HarvestItem, InterestRequest } from '@/types';
import { DEMO_BUYERS, INITIAL_INTEREST_REQUESTS } from '@/data/buyerData';
import { BuyerProfileModal } from './BuyerProfileModal';
import { ExpressInterestModal } from './ExpressInterestModal';
import { MyInterestRequestsModal } from './MyInterestRequestsModal';

interface FindBuyersPageProps {
  harvests: HarvestItem[];
  interestRequests?: InterestRequest[];
  onAddInterestRequest?: (request: InterestRequest) => void;
}

export const FindBuyersPage: React.FC<FindBuyersPageProps> = ({
  harvests,
  interestRequests: externalRequests,
  onAddInterestRequest,
}) => {
  const [buyers] = useState<BuyerProfile[]>(DEMO_BUYERS);
  const [requests, setRequests] = useState<InterestRequest[]>(externalRequests || INITIAL_INTEREST_REQUESTS);
  
  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLocationScope, setSelectedLocationScope] = useState<string>('All');
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [selectedQuantityTier, setSelectedQuantityTier] = useState<string>('All');

  // Modals state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedBuyerForProfile, setSelectedBuyerForProfile] = useState<BuyerProfile | null>(null);
  const [selectedBuyerForInterest, setSelectedBuyerForInterest] = useState<BuyerProfile | null>(null);
  const [isMyRequestsOpen, setIsMyRequestsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredBuyers = buyers.filter((buyer) => {
    // Search query matching buyer name, crops, or location
    const matchesQuery =
      buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      buyer.cropsRequired.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    // Crop filter
    const matchesCrop =
      selectedCrop === 'All' ||
      buyer.cropsRequired.some((c) => c.toLowerCase() === selectedCrop.toLowerCase());

    // Buyer type filter
    const matchesType = selectedType === 'All' || buyer.buyerType === selectedType;

    // Location Scope
    let matchesLocation = true;
    if (selectedLocationScope === 'Nearby') {
      matchesLocation = buyer.distanceKm !== undefined && buyer.distanceKm <= 50;
    } else if (selectedLocationScope === 'Same District') {
      matchesLocation = buyer.district.toLowerCase() === 'dindigul' || (buyer.distanceKm !== undefined && buyer.distanceKm <= 75);
    } else if (selectedLocationScope === 'Same State') {
      matchesLocation = buyer.state === 'Tamil Nadu';
    }

    // Verification
    const matchesVerification = !onlyVerified || buyer.isVerified;

    // Quantity Tier
    const matchesQuantity =
      selectedQuantityTier === 'All' || buyer.quantityCategory === selectedQuantityTier;

    return matchesQuery && matchesCrop && matchesType && matchesLocation && matchesVerification && matchesQuantity;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCrop('All');
    setSelectedType('All');
    setSelectedLocationScope('All');
    setOnlyVerified(false);
    setSelectedQuantityTier('All');
  };

  const handleSendInterest = (request: InterestRequest) => {
    setRequests((prev) => [request, ...prev]);
    if (onAddInterestRequest) {
      onAddInterestRequest(request);
    }
    setToastMessage(`Your interest request has been sent to ${request.buyerName}!`);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const activeFilterCount = 
    (selectedCrop !== 'All' ? 1 : 0) +
    (selectedType !== 'All' ? 1 : 0) +
    (selectedLocationScope !== 'All' ? 1 : 0) +
    (onlyVerified ? 1 : 0) +
    (selectedQuantityTier !== 'All' ? 1 : 0);

  const getBuyerTypeColor = (type: BuyerType) => {
    switch (type) {
      case 'Wholesale Buyer':
        return { bg: '#DCEAF2', text: '#245B5A', border: '#B6D3E3' };
      case 'Retailer':
        return { bg: '#F3D6C4', text: '#C66B45', border: '#E8BCA6' };
      case 'Food Processing Company':
        return { bg: '#F6E7B8', text: '#694708', border: '#E4CC8B' };
      case 'Exporter':
        return { bg: '#DCE8D7', text: '#164A36', border: '#BFD4B8' };
      case 'FPO':
        return { bg: '#F3EBDD', text: '#8A5A3B', border: '#D5C9B5' };
      default:
        return { bg: '#F3EBDD', text: '#17211C', border: '#D5C9B5' };
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
          >
            <div className="bg-farm-brand text-white p-4 rounded-2xl shadow-elevated border border-farm-brand text-xs font-bold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-farm-gold shrink-0" />
                <span>{toastMessage}</span>
              </div>
              <button
                type="button"
                onClick={() => setToastMessage(null)}
                className="text-xs text-white hover:text-farm-gold font-bold"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. PAGE HEADER */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-8 shadow-card relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-farm-eucalyptus-soft text-farm-brand border border-farm-info/40 text-[11px] font-bold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5 text-farm-brand" />
                <span>Buyer Discovery Marketplace</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-farm-surface-secondary text-farm-text border border-farm-border text-[11px] font-bold">
                <MapPin className="w-3 h-3 text-farm-terracotta" />
                <span>Tamil Nadu &bull; Dindigul Hub</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-farm-text">
              Find Buyers
            </h1>

            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium leading-relaxed">
              Connect with trusted buyers for your harvest.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setIsMyRequestsOpen(true)}
              className="px-4 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer"
              id="open-my-requests-btn"
            >
              <Send className="w-4 h-4 text-farm-terracotta" />
              <span>My Interest Requests</span>
              <span className="w-5 h-5 rounded-full bg-farm-terracotta text-white text-[10px] font-bold flex items-center justify-center">
                {requests.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. BUYER SUMMARY SECTION (4 Solid Colour Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Verified Buyers (Deep Teal on Soft Blue) */}
        <div className="p-4 rounded-2xl bg-farm-eucalyptus-soft border border-farm-info/40 flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              24
            </div>
            <div className="text-xs font-bold text-farm-info">
              Verified Buyers
            </div>
          </div>
        </div>

        {/* Card 2: Buyers Looking for My Crops (Terracotta on Soft Peach) */}
        <div className="p-4 rounded-2xl bg-farm-terracotta-soft border border-farm-terracotta/40 flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-terracotta text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-terracotta">
              8
            </div>
            <div className="text-xs font-bold text-farm-terracotta">
              Looking for My Crops
            </div>
          </div>
        </div>

        {/* Card 3: Nearby Buyers (Mustard Gold on Pale Gold) */}
        <div className="p-4 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-gold text-farm-text flex items-center justify-center shrink-0 shadow-subtle">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-gold">
              12
            </div>
            <div className="text-xs font-bold text-farm-gold">
              Nearby (&lt;50 km)
            </div>
          </div>
        </div>

        {/* Card 4: Active Interest Requests (Deep Forest on Soft Sage) */}
        <div className="p-4 rounded-2xl bg-farm-brand-soft border border-farm-border-strong flex items-center gap-3.5 shadow-subtle">
          <div className="w-11 h-11 rounded-2xl bg-farm-brand text-white flex items-center justify-center shrink-0 shadow-subtle">
            <Send className="w-5 h-5 text-farm-gold" />
          </div>
          <div>
            <div className="text-2xl font-display font-bold text-farm-brand">
              {requests.length}
            </div>
            <div className="text-xs font-bold text-farm-brand">
              Active Requests
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH & FILTER TOOLBAR */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 shadow-card space-y-4">
        {/* Search Bar & Mobile Filter Trigger */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-farm-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by buyer name, crop, or location (e.g. Tomato, Chennai, Retailer)..."
              className="w-full pl-10 pr-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand"
              id="buyer-search-input"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center gap-2 cursor-pointer shadow-subtle shrink-0"
            id="mobile-filters-btn"
          >
            <Filter className="w-4 h-4 text-farm-brand" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-farm-brand text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Filter Pills Row */}
        <div className="hidden lg:grid grid-cols-5 gap-3 pt-3 border-t border-farm-border">
          {/* Crop Filter */}
          <div>
            <label className="block text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
              Crop Required
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 bg-farm-surface border border-farm-border rounded-xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
            >
              <option value="All">All Crops</option>
              <option value="Tomato">Tomato</option>
              <option value="Onion">Onion</option>
              <option value="Potato">Potato</option>
              <option value="Wheat">Wheat</option>
              <option value="Cotton">Cotton</option>
              <option value="Green Chili">Green Chili</option>
            </select>
          </div>

          {/* Buyer Type */}
          <div>
            <label className="block text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
              Buyer Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-farm-surface border border-farm-border rounded-xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Wholesale Buyer">Wholesale Buyer</option>
              <option value="Retailer">Retailer</option>
              <option value="Food Processing Company">Food Processing</option>
              <option value="Exporter">Exporter</option>
              <option value="FPO">FPO</option>
            </select>
          </div>

          {/* Location Scope */}
          <div>
            <label className="block text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
              Location Radius
            </label>
            <select
              value={selectedLocationScope}
              onChange={(e) => setSelectedLocationScope(e.target.value)}
              className="w-full px-3 py-2 bg-farm-surface border border-farm-border rounded-xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Nearby">Nearby (&lt; 50 km)</option>
              <option value="Same District">Same District</option>
              <option value="Same State">Same State (TN)</option>
            </select>
          </div>

          {/* Quantity Requirement */}
          <div>
            <label className="block text-[11px] font-bold text-farm-text-secondary uppercase tracking-wider mb-1">
              Quantity Needed
            </label>
            <select
              value={selectedQuantityTier}
              onChange={(e) => setSelectedQuantityTier(e.target.value)}
              className="w-full px-3 py-2 bg-farm-surface border border-farm-border rounded-xl text-xs font-semibold text-farm-text focus:outline-none cursor-pointer"
            >
              <option value="All">All Quantities</option>
              <option value="Small">Small (&lt; 500 kg)</option>
              <option value="Medium">Medium (500–2k kg)</option>
              <option value="Large">Large (&gt; 2k kg)</option>
            </select>
          </div>

          {/* Verified Toggle & Clear */}
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => setOnlyVerified((prev) => !prev)}
              className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                onlyVerified
                  ? 'bg-farm-brand text-white border-farm-brand'
                  : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Only</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="p-2 rounded-xl bg-farm-surface border border-farm-border text-farm-text-secondary hover:bg-farm-surface-secondary cursor-pointer"
                title="Reset filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. BUYER CARDS GRID */}
      {filteredBuyers.length === 0 ? (
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-12 text-center shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-surface-secondary text-farm-terracotta flex items-center justify-center mx-auto border border-farm-border">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-farm-text">
            No buyers match your criteria
          </h3>
          <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
            Try loosening your filters, broadening your location radius, or searching for other staple crops.
          </p>
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBuyers.map((buyer) => {
            const typeStyle = getBuyerTypeColor(buyer.buyerType);

            return (
              <div
                key={buyer.id}
                className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card hover:border-farm-brand transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  {/* Card Top: Type & Verification Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold border truncate max-w-[65%]"
                      style={{
                        backgroundColor: typeStyle.bg,
                        color: typeStyle.text,
                        borderColor: typeStyle.border,
                      }}
                    >
                      {buyer.buyerType}
                    </span>

                    {buyer.isVerified ? (
                      <span className="px-2 py-0.5 rounded-full bg-farm-brand-soft text-farm-brand border border-farm-border-strong text-[10px] font-bold flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-farm-brand" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-farm-gold-soft text-farm-gold border border-farm-gold/40 text-[10px] font-bold flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-farm-gold" />
                        <span>Pending</span>
                      </span>
                    )}
                  </div>

                  {/* Buyer Name & Location */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-farm-text">
                      {buyer.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-farm-terracotta shrink-0" />
                      <span className="truncate">{buyer.location}</span>
                      {buyer.distanceKm !== undefined && (
                        <span className="text-[11px] font-semibold text-farm-terracotta shrink-0">
                          ({buyer.distanceKm} km)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Crops Required Pills */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary mb-1.5 flex items-center gap-1">
                      <Package className="w-3 h-3 text-farm-terracotta" />
                      <span>Crops Needed</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {buyer.cropsRequired.map((crop) => (
                        <span
                          key={crop}
                          className="px-2 py-0.5 rounded-lg bg-farm-terracotta-soft text-farm-terracotta text-[11px] font-bold border border-farm-terracotta/40"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Logistics & Requirements Specs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-farm-border text-xs">
                    <div className="bg-farm-surface-secondary p-2 rounded-xl border border-farm-border">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary">
                        Required Volume
                      </div>
                      <div className="text-xs font-bold text-farm-text mt-0.5 truncate">
                        {buyer.quantityRequirement}
                      </div>
                    </div>

                    <div className="bg-farm-surface-secondary p-2 rounded-xl border border-farm-border">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary">
                        Logistics
                      </div>
                      <div className="text-xs font-bold text-farm-brand mt-0.5 truncate">
                        {buyer.pickupPreference}
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-farm-text-secondary leading-relaxed line-clamp-2">
                    {buyer.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-farm-border flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBuyerForProfile(buyer)}
                    className="px-3.5 py-2 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                    id={`view-profile-${buyer.id}-btn`}
                  >
                    <Eye className="w-3.5 h-3.5 text-farm-text-secondary" />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedBuyerForInterest(buyer)}
                    className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-1.5 cursor-pointer border border-farm-brand"
                    id={`express-interest-${buyer.id}-btn`}
                  >
                    <Send className="w-3.5 h-3.5 text-farm-gold" />
                    <span>Express Interest</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MOBILE SLIDE-IN FILTER MODAL */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full max-w-lg bg-farm-surface rounded-t-3xl sm:rounded-3xl border border-farm-border p-6 shadow-elevated space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-farm-border pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-farm-brand" />
                  <h3 className="font-display font-bold text-base text-farm-text">
                    Filter Buyers
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-lg text-farm-text-secondary hover:bg-farm-surface-secondary flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Crop Filter */}
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Crop Required
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-semibold text-farm-text"
                >
                  <option value="All">All Crops</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Onion">Onion</option>
                  <option value="Potato">Potato</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Green Chili">Green Chili</option>
                </select>
              </div>

              {/* Buyer Type */}
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Buyer Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-semibold text-farm-text"
                >
                  <option value="All">All Types</option>
                  <option value="Wholesale Buyer">Wholesale Buyer</option>
                  <option value="Retailer">Retailer</option>
                  <option value="Food Processing Company">Food Processing</option>
                  <option value="Exporter">Exporter</option>
                  <option value="FPO">FPO</option>
                </select>
              </div>

              {/* Location Scope */}
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Location Radius
                </label>
                <select
                  value={selectedLocationScope}
                  onChange={(e) => setSelectedLocationScope(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-semibold text-farm-text"
                >
                  <option value="All">All Locations</option>
                  <option value="Nearby">Nearby (&lt; 50 km)</option>
                  <option value="Same District">Same District (Dindigul)</option>
                  <option value="Same State">Same State (Tamil Nadu)</option>
                </select>
              </div>

              {/* Quantity Requirement */}
              <div>
                <label className="block text-xs font-bold text-farm-text mb-1.5">
                  Quantity Requirement
                </label>
                <select
                  value={selectedQuantityTier}
                  onChange={(e) => setSelectedQuantityTier(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-semibold text-farm-text"
                >
                  <option value="All">All Quantities</option>
                  <option value="Small">Small (&lt; 500 kg)</option>
                  <option value="Medium">Medium (500–2,000 kg)</option>
                  <option value="Large">Large (&gt; 2,000 kg)</option>
                </select>
              </div>

              {/* Verified Only Pill */}
              <div>
                <button
                  type="button"
                  onClick={() => setOnlyVerified((prev) => !prev)}
                  className={`w-full py-3 px-4 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    onlyVerified
                      ? 'bg-farm-brand text-white border-farm-brand'
                      : 'bg-farm-surface text-farm-text border-farm-border'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Buyers Only</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-farm-border">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex-1 py-3 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text-secondary"
                >
                  Clear Filters
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 py-3 rounded-2xl bg-farm-brand text-white text-xs font-bold"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUYER PROFILE MODAL */}
      <BuyerProfileModal
        isOpen={!!selectedBuyerForProfile}
        onClose={() => setSelectedBuyerForProfile(null)}
        buyer={selectedBuyerForProfile}
        onExpressInterest={(buyer) => setSelectedBuyerForInterest(buyer)}
      />

      {/* EXPRESS INTEREST MODAL */}
      <ExpressInterestModal
        isOpen={!!selectedBuyerForInterest}
        onClose={() => setSelectedBuyerForInterest(null)}
        buyer={selectedBuyerForInterest}
        harvests={harvests}
        onSubmitInterest={handleSendInterest}
      />

      {/* MY INTEREST REQUESTS MODAL */}
      <MyInterestRequestsModal
        isOpen={isMyRequestsOpen}
        onClose={() => setIsMyRequestsOpen(false)}
        requests={requests}
      />
    </div>
  );
};
