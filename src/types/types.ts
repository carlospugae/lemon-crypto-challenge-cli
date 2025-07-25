export type CryptoToken = {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
    };
  };
};

export type CryptoDetails = {
  id: string;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
    };
  };
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
};
