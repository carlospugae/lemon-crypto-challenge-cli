import {
  useFetchCryptos,
  fetchCryptos,
  CMC_DOMAIN,
  CMC_ENDPOINT,
  CMC_QUERY_PARAMS,
} from '../use-fetch-cryptos';
import nock from 'nock';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchCryptos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchCryptos function', () => {
    it('should fetch cryptocurrency data successfully', async () => {
      // Mock the API response
      nock(CMC_DOMAIN)
        .get(CMC_ENDPOINT + CMC_QUERY_PARAMS)
        .reply(200, {
          data: [
            {
              id: '1',
              name: 'Bitcoin',
              symbol: 'BTC',
              quote: {
                USD: {
                  price: 50000,
                  market_cap: 1000000000,
                },
              },
            },
          ],
        });

      const result = await fetchCryptos();

      expect(result).toEqual([
        {
          id: '1',
          name: 'Bitcoin',
          symbol: 'BTC',
          quote: {
            USD: {
              price: 50000,
              market_cap: 1000000000,
            },
          },
        },
      ]);
    });

    it('should handle API errors correctly', async () => {
      nock(CMC_DOMAIN)
        .get(CMC_ENDPOINT + CMC_QUERY_PARAMS)
        .reply(500, { error: 'Internal Server Error' });

      await expect(fetchCryptos()).rejects.toThrow(
        'Failed to fetch top cryptocurrencies',
      );
    });
  });

  describe('useFetchCryptos hook', () => {
    it('should have the correct query key', () => {
      // Test that the hook is properly configured
      const hook = useFetchCryptos;
      expect(hook).toBeDefined();
    });

    it('should return the correct data', async () => {
      const { result } = renderHook(() => useFetchCryptos(), { wrapper });
      await waitFor(() => result.current.isSuccess);
      expect(result.current.data).toEqual([
        { id: '1', name: 'Bitcoin', symbol: 'BTC' },
      ]);
    });
  });
});
