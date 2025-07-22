import { useQuery } from '@tanstack/react-query';
import { CMC_API_KEY } from '@env';

export type CoinMarketCapCrypto = {
  id: string;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      percent_change_24h: number;
    };
  };
};

const COINMARKETCAP_URL =
  'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100&convert=USD';

const fetchTop100Cryptos = async (): Promise<CoinMarketCapCrypto[]> => {
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

export const useCoinMarketCapTop100 = () => {
  return useQuery<CoinMarketCapCrypto[], Error>({
    queryKey: ['top100cryptos'],
    queryFn: fetchTop100Cryptos,
  });
};
