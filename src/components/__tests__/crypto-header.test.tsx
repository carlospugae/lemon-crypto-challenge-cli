import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CryptoHeader from '../crypto-header';

const mockCrypto = {
  name: 'Bitcoin',
  symbol: 'BTC',
  cmc_rank: 1,
};

const mockOnToggleFavorite = jest.fn();

describe('CryptoHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with crypto data', () => {
    const { getByText, getByRole } = render(
      <CryptoHeader
        crypto={mockCrypto}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />,
    );

    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('BTC')).toBeTruthy();
    expect(getByText('Rank #1')).toBeTruthy();
  });

  it('shows favorite button when not favorited', () => {
    const { getByRole } = render(
      <CryptoHeader
        crypto={mockCrypto}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />,
    );

    const favoriteButton = getByRole('button');
    expect(favoriteButton).toBeTruthy();
  });

  it('shows favorite button when favorited', () => {
    const { getByRole } = render(
      <CryptoHeader
        crypto={mockCrypto}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />,
    );

    const favoriteButton = getByRole('button');
    expect(favoriteButton).toBeTruthy();
  });

  it('calls onToggleFavorite when favorite button is pressed', () => {
    const { getByRole } = render(
      <CryptoHeader
        crypto={mockCrypto}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />,
    );

    const favoriteButton = getByRole('button');
    fireEvent.press(favoriteButton);

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
  });

  it('renders with different crypto data', () => {
    const differentCrypto = {
      name: 'Ethereum',
      symbol: 'ETH',
      cmc_rank: 2,
    };

    const { getByText } = render(
      <CryptoHeader
        crypto={differentCrypto}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />,
    );

    expect(getByText('Ethereum')).toBeTruthy();
    expect(getByText('ETH')).toBeTruthy();
    expect(getByText('Rank #2')).toBeTruthy();
  });
});
