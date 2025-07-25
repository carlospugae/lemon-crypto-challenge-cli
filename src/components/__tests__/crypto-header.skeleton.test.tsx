import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoHeaderSkeleton from '../crypto-header.skeleton';

/**
 * Test suite for CryptoHeaderSkeleton component
 * Tests the rendering and structure of the crypto header skeleton
 */
describe('CryptoHeaderSkeleton', () => {
  /**
   * Test that the component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(<CryptoHeaderSkeleton />);

    expect(getByTestId('crypto-header-skeleton-container')).toBeTruthy();
  });

  /**
   * Test that the component has the correct structure
   */
  it('renders with correct structure', () => {
    const { getByTestId } = render(<CryptoHeaderSkeleton />);

    const container = getByTestId('crypto-header-skeleton-container');
    expect(container).toBeTruthy();
  });

  /**
   * Test that the component has proper styling
   */
  it('has proper styling', () => {
    const { getByTestId } = render(<CryptoHeaderSkeleton />);

    const container = getByTestId('crypto-header-skeleton-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });
});
