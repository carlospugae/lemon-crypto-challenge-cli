import React from 'react';
import { render } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import Details from '../details';
import { useFetchCryptoDetails } from '@/hooks/use-fetch-crypto-details';
import { useFavoritesStore } from '@/store/favorites';

// Mock the navigation hook
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
}));

// Mock the hooks
jest.mock('@/hooks/use-fetch-crypto-details');
jest.mock('@/store/favorites');

// Mock react-native-encrypted-storage
jest.mock('react-native-encrypted-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock the components
jest.mock('@/components', () => ({
  CryptoHeader: () => null,
  PriceDisplay: () => null,
  MarketStats: () => null,
  SupplyInfo: () => null,
  Text: ({ children }: any) => children,
  DetailsSkeleton: () => {
    const React = require('react');
    const { View } = require('react-native');
    return React.createElement(View, { testID: 'details-skeleton-scroll' });
  },
}));

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseFetchCryptoDetails = useFetchCryptoDetails as jest.MockedFunction<
  typeof useFetchCryptoDetails
>;
const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>;

/**
 * Test suite for Details screen
 * Tests the rendering and behavior of the details screen including skeleton states
 */
describe('Details', () => {
  const mockRoute = {
    params: {
      id: '1',
    },
  };

  beforeEach(() => {
    mockUseRoute.mockReturnValue(mockRoute as any);
    mockUseFavoritesStore.mockReturnValue({
      isFavorite: jest.fn().mockReturnValue(false),
      toggleFavorite: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that the skeleton is shown during loading
   */
  it('shows skeleton during loading', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: true,
      isRefetching: false,
      refetch: jest.fn(),
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    // The skeleton should be rendered when loading
    expect(getByTestId('details-skeleton-scroll')).toBeTruthy();
  });

  /**
   * Test that the skeleton is not shown when refreshing
   */
  it('does not show skeleton when refreshing', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: {
        id: '1',
        name: 'Bitcoin',
        symbol: 'BTC',
        cmc_rank: 1,
        circulating_supply: 19500000,
        total_supply: 21000000,
        max_supply: 21000000,
        quote: {
          USD: {
            price: 50000,
            percent_change_24h: 2.5,
            market_cap: 1000000000000,
            volume_24h: 50000000000,
          },
        },
      } as any,
      isLoading: false,
      isRefetching: true,
      refetch: jest.fn(),
      error: null,
    } as any);

    const { queryByTestId } = render(<Details />);

    // The skeleton should not be rendered when refreshing
    expect(queryByTestId('details-skeleton-scroll')).toBeNull();
  });
});
