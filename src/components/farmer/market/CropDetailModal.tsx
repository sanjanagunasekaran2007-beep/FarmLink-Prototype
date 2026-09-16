import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  MapPin, 
  Store, 
  PlusCircle, 
  Calendar,
  Sparkles,
  Info,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { MarketPriceItem } from '@/types';

interface CropDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  crop: MarketPriceItem | null;
  onUseCropInAddHarvest: (crop: MarketPriceItem) => void;
}

export const getCropTheme = (cropName: string) => {
  switch (cropName.toLowerCase()) {
    case 'tomato':
      return {
        accent: '#C66B45',      // Terracotta
        bgLight: '#F3D6C4',     // Soft Peach
        border: '#E8BCA6',
        textDark: '#7A3215',
        barColor: '#C66B45',
        badgeBg: '#FFF8ED',
        symbol: '🍅',
      };
    case 'onion':
      return {
        accent: '#8A5A3B',      // Earth Brown
        bgLight: '#FFF8ED',     // Warm Cream
        border: '#E2D1B8',
        textDark: '#54331D',
        barColor: '#8A5A3B',
        badgeBg: '#F3EBDD',
        symbol: '🧅',
      };
    case 'potato':
      return {
        accent: '#D9A441',      // Mustard Gold
        bgLight: '#F6E7B8',     // Pale Gold
        border: '#E4CC8B',
        textDark: '#694708',
        barColor: '#D9A441',
        badgeBg: '#FFF8ED',
        symbol: '🥔',
      };
    case 'wheat':
      return {
        accent: '#8A5A3B',      // Earth Brown
        bgLight: '#F3EBDD',     // Light Sand
        border: '#D5C9B5',
        textDark: '#4A3319',
        barColor: '#8A5A3B',
        badgeBg: '#FFFDF7',
        symbol: '🌾',
      };
    case 'cotton':
      return {
        accent: '#245B5A',      // Deep Teal
        bgLight: '#DCEAF2',     // Soft Blue
        border: '#B6D3E3',
        textDark: '#1F4765',
        barColor: '#245B5A',
        badgeBg: '#FFFDF7',
        symbol: '☁️',
      };
    case 'green chili':
      return {
        accent: '#164A36',      // Deep Forest
        bgLight: '#DCE8D7',     // Soft Sage
        border: '#BFD4B8',
        textDark: '#164A36',
        barColor: '#164A36',
        badgeBg: '#FFF8ED',
        symbol: '🌶️',
      };
    default:
      return {
        accent: '#164A36',
        bgLight: '#F3EBDD',
        border: '#D5C9B5',
        textDark: '#17211C',
        barColor: '#164A36',
        badgeBg: '#FFF8ED',
        symbol: '🌱',
      };
  }
};

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  isOpen,
  onClose,
  crop,
  onUseCropInAddHarvest,
}) => {
  if (!isOpen || !crop) return null;

  const theme = getCropTheme(crop.cropName);
  const isUp = crop.trend === 'up';
  const isDown = crop.trend === 'down';

  // Calculate 7-day bar chart scales
  const prices = crop.history7Days.map((p) => p.price);
  const minP = Math.min(...prices) * 0.95;
  const maxP = Math.max(...prices) * 1.05;
  const range = maxP - minP || 1;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-farm-brand/60 flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-3xl bg-farm-surface rounded-3xl border border-farm-border shadow-elevated overflow-hidden my-auto flex flex-col max-h-[90vh]"
        >
          {/* Top Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-farm-border bg-farm-surface shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-farm-surface-secondary border border-farm-border text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
                title="Back to Market Prices"
                id="crop-detail-back-btn"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{theme.symbol}</span>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-farm-text">
                    {crop.cropName} Market Intelligence
                  </h3>
                </div>
                <p className="text-xs text-farm-text-secondary">
                  APMC benchmark rate &bull; {crop.marketLocation} &bull; {crop.lastUpdated}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-farm-text-secondary hover:text-farm-text hover:bg-farm-surface-secondary flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* 1. HERO PRICE SNAPSHOT */}
            <div 
              className="p-5 sm:p-6 rounded-3xl border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              style={{ backgroundColor: theme.bgLight, borderColor: theme.border }}
            >
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-farm-surface text-farm-text text-[11px] font-bold border" style={{ borderColor: theme.border }}>
                    {crop.category}
                  </span>
                  {crop.variety && (
                    <span className="px-2.5 py-0.5 rounded-md bg-farm-surface text-farm-text text-[11px] font-bold border" style={{ borderColor: theme.border }}>
                      {crop.variety}
                    </span>
                  )}
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1"
                    style={{
                      backgroundColor: isUp ? '#DCE8D7' : isDown ? '#FFF5F5' : '#FFFDF7',
                      color: isUp ? '#164A36' : isDown ? '#B94A48' : '#66736A',
                      borderColor: isUp ? '#BFD4B8' : isDown ? '#F5C2C2' : theme.border,
                    }}
                  >
                    {isUp ? <TrendingUp className="w-3 h-3" /> : isDown ? <TrendingDown className="w-3 h-3" /> : <Minus className="w-3 h-3" />}
                    <span>{crop.change}</span>
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-display font-bold" style={{ color: theme.textDark }}>
                  {crop.cropName}
                </h1>
                <p className="text-xs font-semibold text-farm-text-secondary mt-0.5 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  <span>Primary Mandi: <strong>{crop.marketLocation}</strong></span>
                </p>
              </div>

              {/* Price Callout */}
              <div className="bg-farm-surface p-4 rounded-2xl border shadow-subtle shrink-0" style={{ borderColor: theme.border }}>
                <div className="text-xs font-bold text-farm-text-secondary">Today&apos;s Modal Price</div>
                <div className="text-3xl sm:text-4xl font-display font-bold text-farm-brand">
                  ₹{crop.price.toLocaleString('en-IN')}
                  <span className="text-sm font-semibold text-farm-text-secondary">/{crop.unit}</span>
                </div>
                {crop.minPrice && crop.maxPrice && (
                  <div className="text-[11px] font-bold text-farm-text-secondary mt-1 flex items-center gap-2">
                    <span>Min: ₹{crop.minPrice}</span>
                    <span>&bull;</span>
                    <span>Max: ₹{crop.maxPrice}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 2. 7-DAY PRICE HISTORY (Solid Bar Chart) */}
            <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-subtle space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-farm-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-farm-gold text-farm-text flex items-center justify-center font-display font-bold text-xs shadow-subtle">
                    <Calendar className="w-4 h-4 text-farm-text" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-farm-text">
                      7-Day Price Movement Trend
                    </h3>
                    <p className="text-xs text-farm-text-secondary">
                      Historical mandi modal rates over the last 7 sessions
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-farm-brand bg-farm-brand-soft px-2.5 py-1 rounded-lg border border-farm-border-strong flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-farm-brand" />
                    <span>7-Day Gain: {crop.change}</span>
                  </span>
                </div>
              </div>

              {/* Visual Solid-Bar Chart */}
              <div className="pt-4 pb-2">
                <div className="h-44 sm:h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-farm-border">
                  {crop.history7Days.map((item, idx) => {
                    const heightPercent = Math.max(18, Math.min(100, ((item.price - minP) / range) * 100));
                    const isLatest = idx === crop.history7Days.length - 1;

                    return (
                      <div key={item.date} className="flex-1 flex flex-col items-center justify-end h-full group">
                        {/* Tooltip value */}
                        <div className={`mb-1 text-[11px] font-bold transition-all ${
                          isLatest ? 'text-farm-brand scale-110' : 'text-farm-text-secondary'
                        }`}>
                          ₹{item.price}
                        </div>

                        {/* Bar */}
                        <div 
                          className={`w-full max-w-[38px] rounded-t-xl transition-all duration-300 ${
                            isLatest ? 'ring-2 ring-farm-brand' : ''
                          }`}
                          style={{
                            height: `${heightPercent}%`,
                            backgroundColor: isLatest ? theme.barColor : `${theme.barColor}99`,
                          }}
                        />

                        {/* Day & Date Label */}
                        <div className="mt-2 text-center">
                          <div className={`text-xs font-bold leading-tight ${isLatest ? 'text-farm-brand' : 'text-farm-text'}`}>
                            {item.dayLabel}
                          </div>
                          <div className="text-[10px] text-farm-text-secondary font-medium hidden sm:block">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-farm-text-secondary font-medium pt-3 px-2">
                  <span>* Rates reflect verified APMC standard lot arrivals</span>
                  <span>Arrival Volume: ~{crop.arrivalTons || 140} Tons/day</span>
                </div>
              </div>
            </div>

            {/* 3. PLAIN-LANGUAGE PRICE MOVEMENT INSIGHT */}
            <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-farm-terracotta">
                <Info className="w-4 h-4 text-farm-terracotta" />
                <span>Market Price Explanation</span>
              </div>
              <h4 className="text-base font-display font-bold text-farm-text">
                Why did prices move this week?
              </h4>
              <p className="text-xs sm:text-sm text-farm-text-secondary leading-relaxed bg-farm-surface-secondary p-4 rounded-2xl border border-farm-border">
                {crop.movementExplanation}
              </p>
            </div>

            {/* 4. COMPARE NEARBY MARKETS */}
            <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-subtle space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-farm-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-farm-brand text-white flex items-center justify-center font-display font-bold text-xs shadow-subtle">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-farm-text">
                      Compare Nearby Markets
                    </h3>
                    <p className="text-xs text-farm-text-secondary">
                      Discover alternative mandis within transport radius
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-farm-brand bg-farm-eucalyptus-soft px-2.5 py-1 rounded-lg border border-farm-info/40">
                  {crop.nearbyMarkets.length} Nearby Mandis
                </span>
              </div>

              {/* Nearby Markets List */}
              <div className="space-y-2.5">
                {crop.nearbyMarkets.map((mkt) => {
                  return (
                    <div
                      key={mkt.marketName}
                      className="p-3.5 rounded-2xl bg-farm-surface border border-farm-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-farm-brand transition-all shadow-subtle"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-farm-surface-secondary border border-farm-border flex items-center justify-center text-farm-terracotta shrink-0 font-bold text-xs">
                          {mkt.distanceKm} km
                        </div>
                        <div>
                          <h5 className="text-xs sm:text-sm font-bold text-farm-text">
                            {mkt.marketName}
                          </h5>
                          <p className="text-[11px] text-farm-text-secondary font-medium">
                            {mkt.location} &bull; Approx. {mkt.distanceKm} km away
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-farm-border">
                        <div className="text-right">
                          <div className="text-base font-display font-bold text-farm-brand">
                            ₹{mkt.price}/{mkt.unit}
                          </div>
                          <div className="text-[10px] font-bold text-farm-text-secondary">
                            Spot Rate
                          </div>
                        </div>

                        <span
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1 ${
                            mkt.isHigher
                              ? 'bg-farm-brand-soft text-farm-brand border-farm-border-strong'
                              : 'bg-farm-terracotta-soft text-farm-terracotta border-farm-terracotta/40'
                          }`}
                        >
                          {mkt.isHigher ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          <span>{mkt.change}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prototype Notice */}
            <div className="p-3.5 rounded-2xl bg-farm-gold-soft border border-farm-gold/40 flex items-start gap-2.5 text-xs text-farm-gold">
              <Info className="w-4 h-4 text-farm-gold shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Notice:</strong> Demo market prices are for interface testing. Live integration with Agmarknet &amp; e-NAM data feeds will be added in upcoming phases.
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 sm:p-6 border-t border-farm-border bg-farm-surface flex flex-col-reverse sm:flex-row items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-farm-border bg-farm-surface text-farm-text font-display font-bold text-xs sm:text-sm hover:bg-farm-surface-secondary active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Market Prices</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onUseCropInAddHarvest(crop);
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-farm-brand text-white font-display font-bold text-xs sm:text-sm hover:bg-farm-brand active:scale-95 transition-all shadow-subtle flex items-center justify-center gap-2 cursor-pointer border border-farm-brand"
              id="use-crop-in-harvest-btn"
            >
              <PlusCircle className="w-4 h-4 text-farm-gold" />
              <span>Use This Crop in Add Harvest</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
