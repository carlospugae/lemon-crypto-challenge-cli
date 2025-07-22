/**
 * Type for the crypto details from CoinMarketCap
 */
export interface CryptoDetails {
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
}

/**
 * Formats supply numbers with commas
 * @param value - The supply value
 * @returns Formatted string
 * @example formatSupply(21000000) // '21,000,000'
 */
export const formatSupply = (value: number | null): string => {
  if (!value) return 'N/A';
  return value.toLocaleString();
};

/**
 * Calculates the circulating supply percentage
 * @param circulating - Circulating supply
 * @param max - Max supply
 * @returns Percentage (0-100)
 * @example getSupplyPercentage(19000000, 21000000) // 90.5
 */
export const getSupplyPercentage = (
  circulating: number,
  max: number | null,
): number => {
  if (!max || max === 0) return 0;
  return (circulating / max) * 100;
};
