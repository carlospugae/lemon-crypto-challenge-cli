import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CryptoCard from '../crypto-card';
import { CryptoToken } from '@/types/types';

const mockCryptoToken: CryptoToken = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  quote: {
    USD: {
      price: 45000.5,
      market_cap: 850000000000,
      percent_change_24h: 2.5,
    },
  },
};

const mockCryptoTokenNegative: CryptoToken = {
  id: 'ethereum',
  name: 'Ethereum',
  symbol: 'ETH',
  quote: {
    USD: {
      price: 3200.75,
      market_cap: 380000000000,
      percent_change_24h: -1.8,
    },
  },
};

const mockCryptoTokenZero: CryptoToken = {
  id: 'tether',
  name: 'Tether',
  symbol: 'USDT',
  quote: {
    USD: {
      price: 1.0,
      market_cap: 95000000000,
      percent_change_24h: 0,
    },
  },
};

const mockCryptoTokenLowPrice: CryptoToken = {
  id: 'shiba-inu',
  name: 'Shiba Inu',
  symbol: 'SHIB',
  quote: {
    USD: {
      price: 0.00001234,
      market_cap: 15000000000,
      percent_change_24h: 5.2,
    },
  },
};

const mockOnPress = jest.fn();
const mockOnToggleFavorite = jest.fn();

describe('CryptoCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render crypto card with correct information', () => {
      const { getByText, getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      // Check if crypto name and symbol are displayed
      expect(getByText('Bitcoin (BTC)')).toBeTruthy();

      // Check if price is formatted correctly
      expect(getByText('$45000.50')).toBeTruthy();

      // Check if market cap is displayed
      expect(getByText('Market Cap: $850.00B')).toBeTruthy();

      // Check if percentage change is displayed with plus sign for positive
      expect(getByText('+2.50%')).toBeTruthy();

      // Check if crypto icon is displayed
      expect(getByText('₿')).toBeTruthy();

      // Check if favorite star is displayed (unfavorited)
      expect(getByText('☆')).toBeTruthy();

      // Check accessibility label
      expect(
        getByLabelText('Bitcoin (BTC), Price: $45000.50, 24h change: 2.50%'),
      ).toBeTruthy();
    });

    it('should render crypto card with negative percentage change', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoTokenNegative}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      // Check if percentage change is displayed without plus sign for negative
      expect(getByText('-1.80%')).toBeTruthy();
    });

    it('should render crypto card with zero percentage change', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoTokenZero}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      // Check if percentage change is displayed as 0.00%
      expect(getByText('0.00%')).toBeTruthy();
    });

    it('should render crypto card with very low price correctly', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoTokenLowPrice}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      // Check if very low price is formatted with 6 decimal places
      expect(getByText('$0.000012')).toBeTruthy();
    });

    it('should render crypto card with unknown symbol icon', () => {
      const unknownCrypto: CryptoToken = {
        ...mockCryptoToken,
        symbol: 'UNKNOWN',
      };

      const { getByText } = render(
        <CryptoCard
          crypto={unknownCrypto}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      // Check if default icon is displayed for unknown symbol
      expect(getByText('🪙')).toBeTruthy();
    });
  });

  describe('Favorite functionality', () => {
    it('should display unfavorited star when isFavorite is false', () => {
      const { getByText, getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('☆')).toBeTruthy();
      expect(getByLabelText('Favorite Bitcoin')).toBeTruthy();
    });

    it('should display favorited star when isFavorite is true', () => {
      const { getByText, getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={true}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('★')).toBeTruthy();
      expect(getByLabelText('Unfavorite Bitcoin')).toBeTruthy();
    });

    it('should call onToggleFavorite when favorite button is pressed', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const favoriteButton = getByLabelText('Favorite Bitcoin');
      fireEvent.press(favoriteButton);

      expect(mockOnToggleFavorite).toHaveBeenCalledWith('bitcoin');
      expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
    });
  });

  describe('Card press functionality', () => {
    it('should call onPress when card is pressed', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const card = getByLabelText(
        'Bitcoin (BTC), Price: $45000.50, 24h change: 2.50%',
      );
      fireEvent.press(card);

      expect(mockOnPress).toHaveBeenCalledWith('bitcoin');
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('should not call onPress when favorite button is pressed', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const favoriteButton = getByLabelText('Favorite Bitcoin');
      fireEvent.press(favoriteButton);

      expect(mockOnToggleFavorite).toHaveBeenCalledWith('bitcoin');
      expect(mockOnPress).not.toHaveBeenCalled();
    });
  });

  describe('Percentage change styling', () => {
    it('should display correct change icon for positive percentage', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('↗')).toBeTruthy();
    });

    it('should display correct change icon for negative percentage', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoTokenNegative}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('↘')).toBeTruthy();
    });

    it('should display correct change icon for zero percentage', () => {
      const { getByText } = render(
        <CryptoCard
          crypto={mockCryptoTokenZero}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('→')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have proper accessibility props for the main card', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const card = getByLabelText(
        'Bitcoin (BTC), Price: $45000.50, 24h change: 2.50%',
      );
      expect(card).toBeTruthy();
    });

    it('should have proper accessibility props for favorite button when unfavorited', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const favoriteButton = getByLabelText('Favorite Bitcoin');
      expect(favoriteButton).toBeTruthy();
    });

    it('should have proper accessibility props for favorite button when favorited', () => {
      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={true}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      const favoriteButton = getByLabelText('Unfavorite Bitcoin');
      expect(favoriteButton).toBeTruthy();
    });
  });

  describe('Edge cases', () => {
    it('should handle crypto with very large market cap', () => {
      const largeMarketCapCrypto: CryptoToken = {
        ...mockCryptoToken,
        quote: {
          USD: {
            ...mockCryptoToken.quote.USD,
            market_cap: 2500000000000, // 2.5T
          },
        },
      };

      const { getByText } = render(
        <CryptoCard
          crypto={largeMarketCapCrypto}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('Market Cap: $2.50T')).toBeTruthy();
    });

    it('should handle crypto with very small market cap', () => {
      const smallMarketCapCrypto: CryptoToken = {
        ...mockCryptoToken,
        quote: {
          USD: {
            ...mockCryptoToken.quote.USD,
            market_cap: 500, // $500
          },
        },
      };

      const { getByText } = render(
        <CryptoCard
          crypto={smallMarketCapCrypto}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('Market Cap: $500.00')).toBeTruthy();
    });

    it('should handle crypto with very high percentage change', () => {
      const highChangeCrypto: CryptoToken = {
        ...mockCryptoToken,
        quote: {
          USD: {
            ...mockCryptoToken.quote.USD,
            percent_change_24h: 150.75,
          },
        },
      };

      const { getByText } = render(
        <CryptoCard
          crypto={highChangeCrypto}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('+150.75%')).toBeTruthy();
    });

    it('should handle crypto with very negative percentage change', () => {
      const negativeChangeCrypto: CryptoToken = {
        ...mockCryptoToken,
        quote: {
          USD: {
            ...mockCryptoToken.quote.USD,
            percent_change_24h: -99.99,
          },
        },
      };

      const { getByText } = render(
        <CryptoCard
          crypto={negativeChangeCrypto}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
        />,
      );

      expect(getByText('-99.99%')).toBeTruthy();
    });
  });

  describe('Custom styling', () => {
    it('should apply custom style prop', () => {
      const customStyle = { backgroundColor: 'red' };

      const { getByLabelText } = render(
        <CryptoCard
          crypto={mockCryptoToken}
          isFavorite={false}
          onPress={mockOnPress}
          onToggleFavorite={mockOnToggleFavorite}
          style={customStyle}
        />,
      );

      const card = getByLabelText(
        'Bitcoin (BTC), Price: $45000.50, 24h change: 2.50%',
      );
      expect(card).toBeTruthy();
    });
  });
});
