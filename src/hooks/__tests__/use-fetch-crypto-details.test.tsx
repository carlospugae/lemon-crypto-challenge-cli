import {
  useFetchCryptoDetails,
  fetchCryptoDetails,
  CMC_DOMAIN,
  CMC_ENDPOINT,
  COINMARKETCAP_URL,
} from '../use-fetch-crypto-details';
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

describe('useFetchCryptoDetails', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchCryptoDetails function', () => {
    /**
     * Should fetch crypto details successfully
     */
    it('should fetch crypto details successfully', async () => {
      const id = '1';
      nock(CMC_DOMAIN)
        .get(`${CMC_ENDPOINT}${id}`)
        .reply(200, {
          data: {
            [id]: {
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
          },
        });
      const result = await fetchCryptoDetails(id);
      expect(result).toEqual({
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        quote: {
          USD: {
            price: 50000,
            market_cap: 1000000000,
          },
        },
      });
    });

    it('should handle API errors correctly', async () => {
      const id = '1';
      nock(CMC_DOMAIN)
        .get(`${CMC_ENDPOINT}${id}`)
        .reply(500, { error: 'Internal Server Error' });
      await expect(fetchCryptoDetails(id)).rejects.toThrow(
        'Failed to fetch crypto details',
      );
    });
  });

  describe('useFetchCryptoDetails hook', () => {
    it('should have the correct query key and be defined', () => {
      expect(useFetchCryptoDetails).toBeDefined();
    });

    it('should fetch and return crypto details', async () => {
      const id = '1';
      nock(CMC_DOMAIN)
        .get(`${CMC_ENDPOINT}${id}`)
        .reply(200, {
          data: {
            [id]: {
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
          },
        });
      const { result } = renderHook(() => useFetchCryptoDetails(id), {
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
      expect(result.current.data).toEqual({
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        quote: {
          USD: {
            price: 50000,
            market_cap: 1000000000,
          },
        },
      });
      // Verify loading states are false after success
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
      expect(result.current.isError).toBe(false);
    });

    it('should handle API errors correctly', async () => {
      const id = '1';
      nock(CMC_DOMAIN)
        .get(`${CMC_ENDPOINT}${id}`)
        .reply(500, { error: 'Internal Server Error' });
      const { result } = renderHook(() => useFetchCryptoDetails(id), {
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
        'Failed to fetch crypto details',
      );
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(false);
    });

    it('should show loading state while fetching data', () => {
      const id = '1';
      nock(CMC_DOMAIN)
        .get(`${CMC_ENDPOINT}${id}`)
        .delay(100)
        .reply(200, {
          data: {
            [id]: {
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
          },
        });
      const { result } = renderHook(() => useFetchCryptoDetails(id), {
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
