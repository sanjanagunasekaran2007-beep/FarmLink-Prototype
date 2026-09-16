import { TrendingUp, TrendingDown, Minus, ArrowRight, Store, Sparkles } from 'lucide-react';
import { MarketPriceItem } from '@/types';

interface MarketPricesSectionProps {
  prices: MarketPriceItem[];
  onViewAll: () => void;
}

export const MarketPricesSection = ({
  prices,
  onViewAll,
}: MarketPricesSectionProps) => {
  const previewPrices = prices.slice(0, 5);

  const getCropCardTheme = (cropName: string) => {
    switch (cropName.toLowerCase()) {
      case 'tomato':
        return {
          bg: '#F3D6C4',           // Soft Peach
          accent: '#C66B45',       // Terracotta
          text: '#7A3215',
          pillBg: '#FFF8ED',
          border: '#E8BCA6',
          symbol: '🍅',
        };
      case 'onion':
        return {
          bg: '#FFF8ED',           // Warm Cream
          accent: '#8A5A3B',       // Earth Brown
          text: '#54331D',
          pillBg: '#F3EBDD',
          border: '#E2D1B8',
          symbol: '🧅',
        };
      case 'potato':
        return {
          bg: '#F6E7B8',           // Pale Gold
          accent: '#D9A441',       // Mustard Gold
          text: '#694708',
          pillBg: '#FFF8ED',
          border: '#E4CC8B',
          symbol: '🥔',
        };
      case 'wheat':
        return {
          bg: '#DCE8D7',           // Soft Sage
          accent: '#8A5A3B',       // Earth Brown
          text: '#34452F',
          pillBg: '#FFFDF7',
          border: '#BFD4B8',
          symbol: '🌾',
        };
      case 'cotton':
        return {
          bg: '#DCEAF2',           // Soft Blue
          accent: '#5C91B8',       // Sky Blue
          text: '#1F4765',
          pillBg: '#FFFDF7',
          border: '#B6D3E3',
          symbol: '☁️',
        };
      default:
        return {
          bg: '#FFF8ED',
          accent: '#164A36',
          text: '#17211C',
          pillBg: '#F3EBDD',
          border: '#DCE2D9',
          symbol: '🌱',
        };
    }
  };

  return (
    <div className="bg-farm-surface rounded-3xl border border-farm-border p-5 sm:p-6 shadow-card select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-farm-border">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-farm-gold flex items-center justify-center text-farm-text shadow-subtle">
            <Store className="w-5 h-5 text-farm-text" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-bold text-lg text-farm-text leading-tight">
                Today&apos;s Mandi Spot Prices
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-farm-gold/20 text-farm-gold text-[10px] font-bold">
                <Sparkles className="w-3 h-3" /> APMC Live
              </span>
            </div>
            <p className="text-xs text-farm-text-secondary font-medium">
              Regional benchmark spot rates across Tamil Nadu, Maharashtra & Punjab
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-farm-surface border border-farm-border text-xs font-bold text-farm-text hover:bg-farm-surface-secondary transition-colors cursor-pointer self-start sm:self-auto shadow-subtle"
          id="view-all-prices-btn"
        >
          <span>View All Mandi Rates</span>
          <ArrowRight className="w-3.5 h-3.5 text-farm-terracotta" />
        </button>
      </div>

      {/* Grid of Distinctly-Coloured Commodity Spot Rate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {previewPrices.map((item) => {
          const theme = getCropCardTheme(item.cropName);
          const isUp = item.trend === 'up';
          const isDown = item.trend === 'down';

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.02] shadow-subtle"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
              }}
            >
              <div>
                {/* Top Row with Crop Symbol & Movement Pill */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base leading-none">{theme.symbol}</span>
                    <span
                      className="text-xs font-bold leading-none"
                      style={{ color: theme.text }}
                    >
                      {item.cropName}
                    </span>
                  </div>

                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 border"
                    style={{
                      backgroundColor: theme.pillBg,
                      borderColor: theme.border,
                      color: isUp ? '#164A36' : isDown ? '#B94A48' : '#66736A',
                    }}
                  >
                    {isUp ? (
                      <TrendingUp className="w-3 h-3 text-farm-brand" />
                    ) : isDown ? (
                      <TrendingDown className="w-3 h-3 text-farm-danger" />
                    ) : (
                      <Minus className="w-3 h-3 text-farm-text-secondary" />
                    )}
                  </div>
                </div>

                {/* Mandi Location */}
                <div className="text-[11px] text-farm-text-secondary font-medium truncate mb-3">
                  {item.marketLocation}
                </div>
              </div>

              {/* Price & Movement Pill */}
              <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-xl font-display font-bold"
                    style={{ color: theme.text }}
                  >
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-farm-text-secondary font-medium">
                    /{item.unit}
                  </span>
                </div>

                <div
                  className="mt-1 px-2 py-0.5 rounded-md inline-block text-[10px] font-bold border"
                  style={{
                    backgroundColor: theme.pillBg,
                    borderColor: theme.border,
                    color: isUp ? '#164A36' : isDown ? '#B94A48' : '#66736A',
                  }}
                >
                  {item.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
