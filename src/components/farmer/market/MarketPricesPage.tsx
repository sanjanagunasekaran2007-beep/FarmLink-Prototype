import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  RotateCw, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Store, 
  Sparkles, 
  ArrowRight,
  Info,
  ArrowUpDown,
  Calendar
} from 'lucide-react';
import { MarketPriceItem } from '@/types';
import { COMPREHENSIVE_MARKET_PRICES } from '@/data/marketPriceData';
import { CropDetailModal, getCropTheme } from './CropDetailModal';

interface MarketPricesPageProps {
  onOpenAddHarvestWithCrop?: (crop: MarketPriceItem) => void;
  onOpenGenericAddHarvest: () => void;
}

type SortOption = 'name' | 'price-high' | 'movement';

export const MarketPricesPage: React.FC<MarketPricesPageProps> = ({
  onOpenAddHarvestWithCrop,
  onOpenGenericAddHarvest,
}) => {
  const [prices] = useState<MarketPriceItem[]>(COMPREHENSIVE_MARKET_PRICES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMarket, setSelectedMarket] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCrop, setSelectedCrop] = useState<MarketPriceItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState<string | null>(null);

  // Refresh Prices Handler
  const handleRefreshPrices = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshToast('Market prices refreshed with latest APMC mandi feeds.');
      setTimeout(() => setRefreshToast(null), 3500);
    }, 600);
  };

  // Filter & Sort Logic
  const filteredAndSortedPrices = prices
    .filter((p) => {
      const matchesSearch =
        p.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.marketLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.variety && p.variety.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Vegetables' && p.category === 'Vegetables') ||
        (selectedCategory === 'Grains' && p.category === 'Grains') ||
        (selectedCategory === 'Cash Crops' && (p.category === 'Other' || p.cropName === 'Cotton')) ||
        (selectedCategory === 'Fruits' && p.category === 'Fruits');

      const matchesMarket =
        selectedMarket === 'All' || p.marketLocation.toLowerCase().includes(selectedMarket.toLowerCase());

      return matchesSearch && matchesCategory && matchesMarket;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.cropName.localeCompare(b.cropName);
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'movement') {
        // Gainers first
        if (a.trend === 'up' && b.trend !== 'up') return -1;
        if (a.trend !== 'up' && b.trend === 'up') return 1;
        return 0;
      }
      return 0;
    });

  const handleUseCrop = (crop: MarketPriceItem) => {
    if (onOpenAddHarvestWithCrop) {
      onOpenAddHarvestWithCrop(crop);
    } else {
      onOpenGenericAddHarvest();
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* Refresh Toast Notification */}
      <AnimatePresence>
        {refreshToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
          >
            <div className="bg-farm-brand text-white p-4 rounded-2xl shadow-elevated border border-farm-brand text-xs font-bold flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-farm-gold shrink-0" />
                <span>{refreshToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setRefreshToast(null)}
                className="text-xs text-white hover:text-farm-gold"
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
                <Store className="w-3.5 h-3.5 text-farm-brand" />
                <span>Regional APMC Spot Feed</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-farm-surface-secondary text-farm-text border border-farm-border text-[11px] font-bold">
                <MapPin className="w-3 h-3 text-farm-terracotta" />
                <span>Tamil Nadu &bull; Dindigul Mandi Hub</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight text-farm-text">
              Today&apos;s Market Prices
            </h1>

            <p className="text-xs sm:text-sm text-farm-text-secondary font-medium leading-relaxed">
              Check current crop prices before you sell your harvest.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-farm-text-secondary font-medium pt-1">
              <Calendar className="w-3.5 h-3.5 text-farm-brand" />
              <span>Last updated: <strong>Today, 6:30 AM</strong></span>
              <span>&bull;</span>
              <span>Daily Modal Rates</span>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={handleRefreshPrices}
              disabled={isRefreshing}
              className="px-4 py-2.5 rounded-2xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer"
              id="refresh-prices-btn"
            >
              <RotateCw className={`w-3.5 h-3.5 text-farm-brand ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Prices'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenGenericAddHarvest}
              className="px-5 py-3 rounded-2xl bg-farm-brand text-white text-xs sm:text-sm font-display font-bold hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center gap-2 cursor-pointer border border-farm-brand"
              id="market-header-add-harvest-btn"
            >
              <Sparkles className="w-4 h-4 text-farm-gold" />
              <span>List Your Harvest</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PROTOTYPE NOTICE BANNER */}
      <div className="p-3.5 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 flex items-center gap-2.5 text-xs text-farm-gold shadow-subtle">
        <Info className="w-4 h-4 text-farm-gold shrink-0" />
        <span>
          <strong>Prototype data</strong> — live market integration will be added later. Prices shown represent regional benchmark spot rates for interface evaluation.
        </span>
      </div>

      {/* 3. SEARCH & CONTROLS TOOLBAR */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 shadow-card space-y-4">
        {/* Top Row: Search Input & Location Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-farm-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crop name, variety, or mandi hub..."
              className="w-full pl-10 pr-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand"
              id="market-search-input"
            />
          </div>

          <div className="relative">
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="w-full px-4 py-2.5 bg-farm-surface border border-farm-border rounded-2xl text-xs sm:text-sm font-bold text-farm-text focus:outline-none focus:ring-2 focus:ring-farm-brand cursor-pointer"
              id="select-market-filter"
            >
              <option value="All">All Mandi Hubs</option>
              <option value="Dindigul">Dindigul Mandi (TN)</option>
              <option value="Nashik">Nashik APMC (MH)</option>
              <option value="Agra">Agra Mandi (UP)</option>
              <option value="Khanna">Khanna Mandi (PB)</option>
              <option value="Rajkot">Rajkot APMC (GJ)</option>
              <option value="Guntur">Guntur Mandi (AP)</option>
              <option value="Theni">Theni Mandi (TN)</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Category Pills & Sort Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-farm-border">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Vegetables', 'Grains', 'Cash Crops', 'Fruits'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-farm-brand text-white border-farm-brand shadow-subtle'
                      : 'bg-farm-surface text-farm-text border-farm-border hover:bg-farm-surface-secondary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-farm-text-secondary" />
            <span className="text-xs font-bold text-farm-text-secondary">Sort:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSortBy('name')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  sortBy === 'name'
                    ? 'bg-farm-brand text-white border-farm-brand'
                    : 'bg-farm-surface text-farm-text border-farm-border'
                }`}
              >
                A-Z
              </button>
              <button
                type="button"
                onClick={() => setSortBy('price-high')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  sortBy === 'price-high'
                    ? 'bg-farm-brand text-white border-farm-brand'
                    : 'bg-farm-surface text-farm-text border-farm-border'
                }`}
              >
                Highest Price
              </button>
              <button
                type="button"
                onClick={() => setSortBy('movement')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  sortBy === 'movement'
                    ? 'bg-farm-brand text-white border-farm-brand'
                    : 'bg-farm-surface text-farm-text border-farm-border'
                }`}
              >
                Price Gainers
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. CROP PRICE LIST GRID */}
      {filteredAndSortedPrices.length === 0 ? (
        <div className="bg-farm-surface rounded-3xl border border-farm-border p-12 text-center shadow-card space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-farm-surface-secondary text-farm-terracotta flex items-center justify-center mx-auto border border-farm-border">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-display font-bold text-farm-text">
            No matching crops found
          </h3>
          <p className="text-xs text-farm-text-secondary max-w-sm mx-auto">
            Try adjusting your search terms, clearing filters, or switching to &quot;All Mandi Hubs&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedMarket('All');
            }}
            className="px-4 py-2 rounded-xl bg-farm-brand text-white text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSortedPrices.map((item) => {
            const theme = getCropTheme(item.cropName);
            const isUp = item.trend === 'up';
            const isDown = item.trend === 'down';

            return (
              <div
                key={item.id}
                className="rounded-3xl border p-5 sm:p-6 shadow-card hover:scale-[1.01] transition-all flex flex-col justify-between"
                style={{
                  backgroundColor: theme.bgLight,
                  borderColor: theme.border,
                }}
              >
                <div>
                  {/* Top Badges & Trend Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl leading-none">{theme.symbol}</span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: theme.badgeBg,
                          color: theme.textDark,
                          borderColor: theme.border,
                        }}
                      >
                        {item.category}
                      </span>
                    </div>

                    <div
                      className="px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 shadow-subtle"
                      style={{
                        backgroundColor: isUp ? '#DCE8D7' : isDown ? '#FFF5F5' : theme.badgeBg,
                        color: isUp ? '#164A36' : isDown ? '#B94A48' : '#66736A',
                        borderColor: isUp ? '#BFD4B8' : isDown ? '#F5C2C2' : theme.border,
                      }}
                    >
                      {isUp ? (
                        <TrendingUp className="w-3.5 h-3.5 text-farm-brand" />
                      ) : isDown ? (
                        <TrendingDown className="w-3.5 h-3.5 text-farm-danger" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 text-farm-text-secondary" />
                      )}
                      <span>{item.change}</span>
                    </div>
                  </div>

                  {/* Crop Name & Variety */}
                  <h3
                    className="text-2xl font-display font-bold mb-0.5"
                    style={{ color: theme.textDark }}
                  >
                    {item.cropName}
                  </h3>

                  {item.variety && (
                    <p className="text-xs font-semibold text-farm-text-secondary mb-2">
                      Variety: <strong className="text-farm-text">{item.variety}</strong>
                    </p>
                  )}

                  {/* Mandi Location */}
                  <div className="flex items-center gap-1.5 text-xs text-farm-text-secondary font-medium mb-4">
                    <Store className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                    <span className="truncate">{item.marketLocation}</span>
                  </div>

                  {/* Large Price Display */}
                  <div
                    className="p-3.5 rounded-2xl bg-farm-surface border mb-4 shadow-subtle"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-farm-text-secondary">
                      Today&apos;s APMC Modal Price
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-farm-brand mt-0.5">
                      ₹{item.price.toLocaleString('en-IN')}
                      <span className="text-xs font-semibold text-farm-text-secondary">/{item.unit}</span>
                    </div>
                    {item.minPrice && item.maxPrice && (
                      <div className="text-[10px] font-medium text-farm-text-secondary mt-1">
                        Range: ₹{item.minPrice} &ndash; ₹{item.maxPrice} &bull; Daily arrivals ~{item.arrivalTons}t
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  className="pt-3.5 border-t flex items-center justify-between gap-2"
                  style={{ borderColor: theme.border }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCrop(item)}
                    className="text-xs font-bold text-farm-text hover:underline flex items-center gap-1 cursor-pointer py-1"
                    id={`view-crop-${item.cropName.toLowerCase().replace(/\s+/g, '-')}-btn`}
                  >
                    <span>View Price History</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleUseCrop(item)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-subtle cursor-pointer active:scale-95 flex items-center gap-1.5"
                    style={{ backgroundColor: theme.accent }}
                    title="List harvest using this market price"
                  >
                    <span>List Crop</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. COMPARE NEARBY MARKETS SUMMARY SECTION */}
      <div className="bg-farm-surface rounded-3xl border border-farm-border p-6 sm:p-7 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-farm-border">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-farm-brand text-white flex items-center justify-center font-display font-bold shadow-subtle">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-farm-text">
                Compare Nearby Markets
              </h3>
              <p className="text-xs text-farm-text-secondary">
                Check how modal prices differ across neighbouring APMC mandis
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold text-farm-brand uppercase tracking-wider bg-farm-eucalyptus-soft px-3 py-1 rounded-full border border-farm-info/40 self-start sm:self-auto">
            Inter-Mandi Spreads
          </span>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle">
            <div className="text-[11px] font-bold text-farm-terracotta flex items-center gap-1 mb-1">
              <span>🍅 Tomato Opportunity</span>
            </div>
            <div className="text-sm font-bold text-farm-text">
              Oddanchatram APMC (28 km)
            </div>
            <div className="text-xs text-farm-brand font-bold mt-1">
              ₹30.50/kg <span className="text-[11px] font-normal text-farm-text-secondary">(+₹2.50 higher than Dindigul)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle">
            <div className="text-[11px] font-bold text-farm-terracotta flex items-center gap-1 mb-1">
              <span>🧅 Onion Benchmark</span>
            </div>
            <div className="text-sm font-bold text-farm-text">
              Lasalgaon APMC (32 km)
            </div>
            <div className="text-xs text-farm-brand font-bold mt-1">
              ₹35.50/kg <span className="text-[11px] font-normal text-farm-text-secondary">(+₹1.50 higher than Nashik)</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-farm-surface border border-farm-border shadow-subtle">
            <div className="text-[11px] font-bold text-farm-gold flex items-center gap-1 mb-1">
              <span>🌾 Wheat High Spread</span>
            </div>
            <div className="text-sm font-bold text-farm-text">
              Ludhiana APMC (42 km)
            </div>
            <div className="text-xs text-farm-brand font-bold mt-1">
              ₹2,480/qtl <span className="text-[11px] font-normal text-farm-text-secondary">(+₹30 higher than Khanna)</span>
            </div>
          </div>
        </div>
      </div>

      {/* CROP DETAIL MODAL */}
      <CropDetailModal
        isOpen={!!selectedCrop}
        onClose={() => setSelectedCrop(null)}
        crop={selectedCrop}
        onUseCropInAddHarvest={handleUseCrop}
      />
    </div>
  );
};
