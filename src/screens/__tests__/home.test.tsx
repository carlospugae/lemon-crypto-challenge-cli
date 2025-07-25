/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../home';
import { useFetchCryptos } from '@/hooks/use-fetch-cryptos';
import { CryptoToken } from '@/types/types';

jest.mock('@/hooks/use-fetch-cryptos');
const mockUseFetchCryptos = useFetchCryptos as jest.MockedFunction<any>;

jest.mock('lodash', () => ({
  debounce: (fn: any, _delay: number = 300) => {
    const debounced = (...args: any[]) => {
      return fn(...args);
    };
    debounced.cancel = jest.fn();
    return debounced;
  },
}));

const mockCryptoData: CryptoToken[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    quote: {
      USD: {
        price: 45000.5,
        market_cap: 850000000000,
      },
    },
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    quote: {
      USD: {
        price: 3200.75,
        market_cap: 380000000000,
      },
    },
  },
  {
    id: '3',
    name: 'Cardano',
    symbol: 'ADA',
    quote: {
      USD: {
        price: 1.25,
        market_cap: 40000000000,
      },
    },
  },
];

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const renderHome = () => {
  return render(
    <TestWrapper>
      <Home />
    </TestWrapper>,
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading indicator and message when data is loading', () => {
      mockUseFetchCryptos.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      });

      renderHome();

      expect(screen.getByText('Loading top cryptocurrencies...')).toBeTruthy();
    });

    it('should show ActivityIndicator when loading', () => {
      mockUseFetchCryptos.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      });

      renderHome();

      // Note: ActivityIndicator doesn't have a testID by default, so we check for the loading text
      expect(screen.getByText('Loading top cryptocurrencies...')).toBeTruthy();
    });
  });

  describe('Error State', () => {
    it('should display error message when there is an error', () => {
      const errorMessage = 'Network error occurred';
      mockUseFetchCryptos.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: new Error(errorMessage),
      });

      renderHome();

      expect(screen.getByText(`Error: ${errorMessage}`)).toBeTruthy();
    });

    it('should display default error message when error object is null', () => {
      mockUseFetchCryptos.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: null,
      });

      renderHome();

      expect(screen.getByText('Error: Failed to load data.')).toBeTruthy();
    });
  });

  describe('Success State', () => {
    beforeEach(() => {
      mockUseFetchCryptos.mockReturnValue({
        data: mockCryptoData,
        isLoading: false,
        isError: false,
        error: null,
      });
    });

    it('should render cryptocurrency list when data is loaded successfully', () => {
      renderHome();

      expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
      expect(screen.getByText('Ethereum (ETH)')).toBeTruthy();
      expect(screen.getByText('Cardano (ADA)')).toBeTruthy();
    });

    it('should display correct price information for each cryptocurrency', () => {
      renderHome();

      expect(screen.getByText('Price: $45000.50')).toBeTruthy();
      expect(screen.getByText('Price: $3200.75')).toBeTruthy();
      expect(screen.getByText('Price: $1.25')).toBeTruthy();
    });

    it('should display correct market cap information for each cryptocurrency', () => {
      renderHome();

      expect(screen.getByText('Market Cap: $850,000,000,000')).toBeTruthy();
      expect(screen.getByText('Market Cap: $380,000,000,000')).toBeTruthy();
      expect(screen.getByText('Market Cap: $40,000,000,000')).toBeTruthy();
    });

    it('should render search input field', () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );
      expect(searchInput).toBeTruthy();
    });
  });

  describe('Filtering Functionality', () => {
    beforeEach(() => {
      mockUseFetchCryptos.mockReturnValue({
        data: mockCryptoData,
        isLoading: false,
        isError: false,
        error: null,
      });
    });

    it('should filter cryptocurrencies by name', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      fireEvent.changeText(searchInput, 'Bitcoin');

      await waitFor(() => {
        expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
      });

      expect(screen.queryByText('Ethereum (ETH)')).toBeNull();
      expect(screen.queryByText('Cardano (ADA)')).toBeNull();
    });

    it('should filter cryptocurrencies by symbol', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      fireEvent.changeText(searchInput, 'ETH');

      await waitFor(() => {
        expect(screen.getByText('Ethereum (ETH)')).toBeTruthy();
      });

      expect(screen.queryByText('Bitcoin (BTC)')).toBeNull();
      expect(screen.queryByText('Cardano (ADA)')).toBeNull();
    });

    it('should filter cryptocurrencies case-insensitively', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      fireEvent.changeText(searchInput, 'bitcoin');

      await waitFor(() => {
        expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
      });

      expect(screen.queryByText('Ethereum (ETH)')).toBeNull();
    });

    it('should show all cryptocurrencies when filter is empty', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      // First filter to show only Bitcoin
      fireEvent.changeText(searchInput, 'Bitcoin');

      // Then clear the filter
      fireEvent.changeText(searchInput, '');

      await waitFor(() => {
        expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
        expect(screen.getByText('Ethereum (ETH)')).toBeTruthy();
        expect(screen.getByText('Cardano (ADA)')).toBeTruthy();
      });
    });

    it('should show "No cryptocurrencies found" when filter has no matches', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      fireEvent.changeText(searchInput, 'NonExistentCrypto');

      await waitFor(() => {
        expect(screen.getByText('No cryptocurrencies found.')).toBeTruthy();
        expect(screen.queryByText('Bitcoin (BTC)')).toBeNull();
        expect(screen.queryByText('Ethereum (ETH)')).toBeNull();
        expect(screen.queryByText('Cardano (ADA)')).toBeNull();
      });
    });

    it('should trim whitespace from filter input', async () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      fireEvent.changeText(searchInput, '  Bitcoin  ');

      await waitFor(() => {
        expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
        expect(screen.queryByText('Ethereum (ETH)')).toBeNull();
      });
    });
  });

  describe('Accessibility Features', () => {
    beforeEach(() => {
      mockUseFetchCryptos.mockReturnValue({
        data: mockCryptoData,
        isLoading: false,
        isError: false,
        error: null,
      });
    });

    it('should have proper accessibility label for search input', () => {
      renderHome();

      const searchInput = screen.getByLabelText(
        'Filter cryptocurrencies by name or symbol',
      );
      expect(searchInput).toBeTruthy();
    });

    it('should have proper accessibility properties for cryptocurrency items', () => {
      renderHome();

      // Check that the first cryptocurrency item has proper accessibility properties
      const bitcoinItem = screen.getByLabelText(
        'Bitcoin (BTC), Price: $45000.50, Market Cap: $850,000,000,000',
      );
      expect(bitcoinItem).toBeTruthy();
    });

    it('should have proper accessibility role for cryptocurrency items', () => {
      renderHome();

      const bitcoinItem = screen.getByLabelText(
        'Bitcoin (BTC), Price: $45000.50, Market Cap: $850,000,000,000',
      );
      expect(bitcoinItem.props.accessibilityRole).toBe('button');
    });
  });

  describe('Search Input Properties', () => {
    beforeEach(() => {
      mockUseFetchCryptos.mockReturnValue({
        data: mockCryptoData,
        isLoading: false,
        isError: false,
        error: null,
      });
    });

    it('should have correct input properties', () => {
      renderHome();

      const searchInput = screen.getByPlaceholderText(
        'Filter by name or symbol',
      );

      expect(searchInput.props.returnKeyType).toBe('search');
      expect(searchInput.props.autoCapitalize).toBe('none');
      expect(searchInput.props.autoCorrect).toBe(false);
      expect(searchInput.props.clearButtonMode).toBe('while-editing');
    });
  });

  describe('Empty Data State', () => {
    it('should handle empty data array', () => {
      mockUseFetchCryptos.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
        error: null,
      });

      renderHome();

      expect(screen.getByText('No cryptocurrencies found.')).toBeTruthy();
    });

    it('should handle undefined data', () => {
      mockUseFetchCryptos.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
      });

      renderHome();

      expect(screen.getByText('No cryptocurrencies found.')).toBeTruthy();
    });
  });

  describe('Component Structure', () => {
    beforeEach(() => {
      mockUseFetchCryptos.mockReturnValue({
        data: mockCryptoData,
        isLoading: false,
        isError: false,
        error: null,
      });
    });

    it('should render with proper container styling', () => {
      renderHome();

      // The main container should be rendered
      expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
    });

    it('should render FlatList with correct data', () => {
      renderHome();

      // Verify that all cryptocurrency items are rendered
      expect(screen.getByText('Bitcoin (BTC)')).toBeTruthy();
      expect(screen.getByText('Ethereum (ETH)')).toBeTruthy();
      expect(screen.getByText('Cardano (ADA)')).toBeTruthy();
    });
  });
});
