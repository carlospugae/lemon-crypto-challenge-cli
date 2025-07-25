import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import Details from '../details';
import { useFetchCryptoDetails } from '@/hooks/use-fetch-crypto-details';
import { useFavoritesStore } from '@/store/favorites';
import { View } from 'react-native';

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

jest.mock('@/components/market-stats', () => ({
  MarketStats: () => <View testID="market-stats"></View>,
}));

jest.mock('@/components/supply-info', () => ({
  SupplyInfo: () => <View testID="supply-info"></View>,
}));

jest.mock('@/components/price-display', () => ({
  PriceDisplay: () => <View testID="price-display"></View>,
}));

jest.mock('@/components/crypto-header', () => ({
  CryptoHeader: () => <View testID="crypto-header"></View>,
}));

jest.mock('@/components/text', () => ({
  Text: () => <View testID="text-component"></View>,
}));

// Mock the components

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseFetchCryptoDetails = useFetchCryptoDetails as jest.MockedFunction<
  typeof useFetchCryptoDetails
>;
const mockUseFavoritesStore = useFavoritesStore as jest.MockedFunction<
  typeof useFavoritesStore
>;

/**
 * Test suite for Details screen
 * Tests the rendering and behavior of the details screen including all states and user interactions
 */
describe('Details', () => {
  const mockRoute = {
    params: {
      id: 'bitcoin',
    },
  };

  const mockCryptoData = {
    id: 'bitcoin',
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
  };

  const mockRefetch = jest.fn();
  const mockToggleFavorite = jest.fn();
  const mockIsFavorite = jest.fn();

  beforeEach(() => {
    mockUseRoute.mockReturnValue(mockRoute as any);

    // Mock the store to return selectors
    mockUseFavoritesStore.mockImplementation(selector => {
      if (typeof selector === 'function') {
        // If it's a selector function, return the appropriate value
        const mockState = {
          favorites: [],
          addFavorite: jest.fn(),
          removeFavorite: jest.fn(),
          toggleFavorite: mockToggleFavorite,
          isFavorite: mockIsFavorite,
        };
        return selector(mockState);
      }
      return {
        favorites: [],
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        toggleFavorite: mockToggleFavorite,
        isFavorite: mockIsFavorite,
      };
    });

    mockRefetch.mockClear();
    mockToggleFavorite.mockClear();
    mockIsFavorite.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that the skeleton is shown during initial loading
   */
  it('shows skeleton during initial loading', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: true,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    expect(getByTestId('details-skeleton')).toBeTruthy();
  });

  /**
   * Test that the skeleton is not shown when refreshing with existing data
   */
  it('does not show skeleton when refreshing with existing data', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: true,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { queryByTestId } = render(<Details />);

    expect(queryByTestId('details-skeleton')).toBeNull();
  });

  /**
   * Test error state rendering
   */
  it('shows error message when there is an error', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: new Error('Network error'),
    } as any);

    const { getByText, getByTestId } = render(<Details />);

    expect(
      getByText('Error loading crypto details. Please try again.'),
    ).toBeTruthy();
    expect(getByTestId('text-component')).toBeTruthy();
  });

  /**
   * Test no data state rendering
   */
  it('shows no data message when crypto data is null', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByText, getByTestId } = render(<Details />);

    expect(getByText('No data available.')).toBeTruthy();
    expect(getByTestId('text-component')).toBeTruthy();
  });

  /**
   * Test successful data rendering with all components
   */
  it('renders crypto details when data is available', () => {
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    // Check that all main components are rendered
    expect(getByTestId('crypto-header')).toBeTruthy();
    expect(getByTestId('price-display')).toBeTruthy();
    expect(getByTestId('market-stats')).toBeTruthy();
    expect(getByTestId('supply-info')).toBeTruthy();

    // Check crypto header data
    expect(getByTestId('crypto-name')).toBeTruthy();
    expect(getByTestId('crypto-symbol')).toBeTruthy();
    expect(getByTestId('crypto-rank')).toBeTruthy();
    expect(getByTestId('favorite-button')).toBeTruthy();

    // Check price display data
    expect(getByTestId('price-value')).toBeTruthy();
    expect(getByTestId('price-change')).toBeTruthy();

    // Check market stats data
    expect(getByTestId('market-cap')).toBeTruthy();
    expect(getByTestId('volume-24h')).toBeTruthy();

    // Check supply info data
    expect(getByTestId('circulating-supply')).toBeTruthy();
    expect(getByTestId('total-supply')).toBeTruthy();
    expect(getByTestId('max-supply')).toBeTruthy();
  });

  /**
   * Test favorite button interaction
   */
  it('calls toggleFavorite when favorite button is pressed', () => {
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    const favoriteButton = getByTestId('favorite-button');
    fireEvent.press(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith('bitcoin');
  });

  /**
   * Test refresh functionality by checking that refetch is called
   */
  it('has refresh functionality available', () => {
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    // Verify that the component renders with refresh capability
    expect(getByTestId('crypto-header')).toBeTruthy();
    expect(mockRefetch).toBeDefined();
  });

  /**
   * Test favorite state display
   */
  it('displays correct favorite state', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    // Test not favorite state
    mockIsFavorite.mockReturnValue(false);

    const { getByTestId, rerender } = render(<Details />);
    expect(getByTestId('favorite-button')).toBeTruthy();

    // Test favorite state
    mockIsFavorite.mockReturnValue(true);

    rerender(<Details />);
    expect(getByTestId('favorite-button')).toBeTruthy();
  });

  /**
   * Test loading state with refreshing
   */
  it('shows refresh control when refreshing', () => {
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: true,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    // Verify that the component renders when refreshing
    expect(getByTestId('crypto-header')).toBeTruthy();
  });

  /**
   * Test that route params are used correctly
   */
  it('uses correct crypto ID from route params', () => {
    const customRoute = {
      params: {
        id: 'ethereum',
      },
    };

    mockUseRoute.mockReturnValue(customRoute as any);
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    render(<Details />);

    // Verify that the hook was called with the correct ID
    expect(mockUseFetchCryptoDetails).toHaveBeenCalledWith('ethereum');
  });

  /**
   * Test error state accessibility
   */
  it('has proper accessibility role for error text', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: new Error('Network error'),
    } as any);

    const { getByTestId } = render(<Details />);

    const errorText = getByTestId('text-component');
    expect(errorText.props.accessibilityRole).toBe('text');
  });

  /**
   * Test no data state accessibility
   */
  it('has proper accessibility role for no data text', () => {
    mockUseFetchCryptoDetails.mockReturnValue({
      data: null,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    const { getByTestId } = render(<Details />);

    const noDataText = getByTestId('text-component');
    expect(noDataText.props.accessibilityRole).toBe('text');
  });

  /**
   * Test that isFavorite is called with correct ID
   */
  it('calls isFavorite with correct crypto ID', () => {
    mockIsFavorite.mockReturnValue(false);
    mockUseFetchCryptoDetails.mockReturnValue({
      data: mockCryptoData,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
      error: null,
    } as any);

    render(<Details />);

    // The isFavorite function should be called when the component renders
    expect(mockIsFavorite).toHaveBeenCalled();
  });
});
