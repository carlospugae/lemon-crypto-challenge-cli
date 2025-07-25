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

const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

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
      const hook = useFetchCryptos;
      expect(hook).toBeDefined();
    });

    it('should fetch and return cryptocurrency data', async () => {
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

      const { result } = renderHook(() => useFetchCryptos(), {
        wrapper: createTestWrapper(),
      });

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isFetching).toBe(true);

      // Wait for the query to be successful
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verify the returned data structure
      expect(result.current.data).toEqual([
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

      // Verify loading states are false after success
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle API errors correctly', async () => {
      // Mock a failed API response
      nock(CMC_DOMAIN)
        .get(CMC_ENDPOINT + CMC_QUERY_PARAMS)
        .reply(500, { error: 'Internal Server Error' });

      const { result } = renderHook(() => useFetchCryptos(), {
        wrapper: createTestWrapper(),
      });

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);

      // Wait for the query to fail
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      // Verify error state
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error?.message).toBe(
        'Failed to fetch top cryptocurrencies',
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
    });

    it('should show loading state while fetching data', () => {
      // Mock a delayed API response
      nock(CMC_DOMAIN)
        .get(CMC_ENDPOINT + CMC_QUERY_PARAMS)
        .delay(100)
        .reply(200, { data: [] });

      const { result } = renderHook(() => useFetchCryptos(), {
        wrapper: createTestWrapper(),
      });

      // Verify initial loading state
      expect(result.current.isLoading).toBe(true);
      expect(result.current.isFetching).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
    });
  });
});
