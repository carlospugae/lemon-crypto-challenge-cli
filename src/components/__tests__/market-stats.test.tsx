import React from 'react';
import { render } from '@testing-library/react-native';
import MarketStats from '../market-stats';

describe('MarketStats', () => {
  it('renders correctly with market data', () => {
    const { getByText } = render(
      <MarketStats marketCap={850000000000} volume24h={25000000000} />,
    );

    expect(getByText('Market Statistics')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
  });

  it('renders with large market cap values', () => {
    const { getByText } = render(
      <MarketStats marketCap={1000000000000} volume24h={50000000000} />,
    );

    expect(getByText('Market Statistics')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
  });

  it('renders with small market cap values', () => {
    const { getByText } = render(
      <MarketStats marketCap={1000000} volume24h={50000} />,
    );

    expect(getByText('Market Statistics')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
  });

  it('renders with zero values', () => {
    const { getByText } = render(<MarketStats marketCap={0} volume24h={0} />);

    expect(getByText('Market Statistics')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
  });

  it('renders with very large values', () => {
    const { getByText } = render(
      <MarketStats marketCap={999999999999999} volume24h={99999999999999} />,
    );

    expect(getByText('Market Statistics')).toBeTruthy();
    expect(getByText('Market Cap')).toBeTruthy();
    expect(getByText('24h Volume')).toBeTruthy();
  });
});
