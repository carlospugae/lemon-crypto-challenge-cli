import { useQuery } from '@tanstack/react-query';
import { CMC_API_KEY } from '@env';
import { CryptoToken } from '@/types/types';

const COINMARKETCAP_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&convert=USD';

const fetchCryptos = async (): Promise<CryptoToken[]> => {
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
