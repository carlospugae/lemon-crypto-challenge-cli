import { useQuery } from '@tanstack/react-query';
import { CryptoToken } from '@/types/types';

export const CMC_DOMAIN = 'https://pro-api.coinmarketcap.com';
export const CMC_ENDPOINT = '/v1/cryptocurrency/listings/latest';
export const CMC_QUERY_PARAMS = '?limit=100&convert=USD';

export const COINMARKETCAP_URL = `${CMC_DOMAIN}${CMC_ENDPOINT}${CMC_QUERY_PARAMS}`;

export const fetchCryptos = async (): Promise<CryptoToken[]> => {
  // Import CMC_API_KEY here so jest mock is used in tests
  const { CMC_API_KEY } = require('@env');
  const response = await fetch(COINMARKETCAP_URL, {
    headers: {
      'X-CMC_PRO_API_KEY': CMC_API_KEY,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch top cryptocurrencies');
  }
  const { data } = await response.json();

  return data;
};

export const useFetchCryptos = () => {
  return useQuery<CryptoToken[], Error>({
    queryKey: ['top100cryptos'],
    queryFn: fetchCryptos,
  });
};
