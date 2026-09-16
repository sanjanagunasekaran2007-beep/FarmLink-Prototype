import React from 'react';
import { MarketPriceItem } from '@/types';
import { MarketPricesPage } from '../market/MarketPricesPage';

interface FarmerMarketViewProps {
  onOpenAddHarvestWithCrop?: (crop: MarketPriceItem) => void;
  onOpenAddHarvest: () => void;
}

export const FarmerMarketView: React.FC<FarmerMarketViewProps> = ({
  onOpenAddHarvestWithCrop,
  onOpenAddHarvest,
}) => {
  return (
    <MarketPricesPage
      onOpenAddHarvestWithCrop={onOpenAddHarvestWithCrop}
      onOpenGenericAddHarvest={onOpenAddHarvest}
    />
  );
};

