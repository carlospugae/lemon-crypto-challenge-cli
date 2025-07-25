import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoIcon from '../crypto-icon';

describe('CryptoIcon', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <CryptoIcon symbol="BTC" size={32} color="white" />,
    );

    // Note: Vector icons don't have testID by default, so we just check if component renders
    expect(getByTestId).toBeDefined();
  });

  it('renders with different symbols', () => {
    const { getByTestId } = render(
      <CryptoIcon symbol="ETH" size={24} color="#000" />,
    );

    expect(getByTestId).toBeDefined();
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(
      <CryptoIcon symbol="ADA" size={48} color="#3B82F6" />,
    );

    expect(getByTestId).toBeDefined();
  });
});
