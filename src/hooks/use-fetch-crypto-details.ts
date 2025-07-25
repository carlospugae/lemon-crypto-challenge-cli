import { useQuery } from '@tanstack/react-query';
import { CryptoDetails } from '@/types/types';
import { CMC_API_KEY } from '@env';
export const CMC_DOMAIN = 'https://pro-api.coinmarketcap.com';
export const CMC_ENDPOINT = '/v1/cryptocurrency/quotes/latest?id=';

export const COINMARKETCAP_URL = `${CMC_DOMAIN}${CMC_ENDPOINT}`;

export const fetchCryptoDetails = async (
  id: string,
): Promise<CryptoDetails> => {
  const response = await fetch(`${COINMARKETCAP_URL}${id}`, {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch crypto details');
  }
  const { data } = await response.json();

  return data[id];
};

export const useFetchCryptoDetails = (id: string) => {
  return useQuery<CryptoDetails, Error>({
    queryKey: ['cryptoDetails', id],
    queryFn: () => fetchCryptoDetails(id),
    enabled: !!id,
    refetchInterval: 30000, // 30 seconds
  });
};
