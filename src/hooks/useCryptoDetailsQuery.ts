import { useQuery } from '@tanstack/react-query';
import { CMC_API_KEY } from '@env';
import { CryptoDetails } from '@/types/crypto';

/**
 * Fetches crypto details from CoinMarketCap API
 * @param id - Crypto ID
 * @returns CryptoDetails object
 */
const fetchCryptoDetails = async (id: string): Promise<CryptoDetails> => {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
        Accept: 'application/json',
      },
    },
  );
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
  return data.data[id];
};

/**
 * React Query hook to fetch crypto details by ID
 * @param id - Crypto ID
 * @returns Query result with data, loading, error, and refetch
 * @example
 * const { data, isLoading, error, refetch } = useCryptoDetailsQuery('1');
 */
export const useCryptoDetailsQuery = (id: string) => {
  return useQuery<CryptoDetails, Error>({
    queryKey: ['crypto-details', id],
    queryFn: () => fetchCryptoDetails(id),
    enabled: !!id,
    refetchInterval: 30000, // 30 seconds
  });
};
