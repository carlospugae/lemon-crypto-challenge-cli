import React from 'react';
import { render } from '@testing-library/react-native';
import MarketStatsSkeleton from '../market-stats.skeleton';

/**
 * Test suite for MarketStatsSkeleton component
 * Tests the rendering and structure of the market stats skeleton
 */
describe('MarketStatsSkeleton', () => {
  /**
   * Test that the component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(<MarketStatsSkeleton />);

    expect(getByTestId('market-stats-skeleton-container')).toBeTruthy();
  });

  /**
   * Test that the component has the correct structure
   */
  it('renders with correct structure', () => {
    const { getByTestId } = render(<MarketStatsSkeleton />);

    const container = getByTestId('market-stats-skeleton-container');
    expect(container).toBeTruthy();
  });

  /**
   * Test that the component has proper styling
   */
  it('has proper styling', () => {
    const { getByTestId } = render(<MarketStatsSkeleton />);

    const container = getByTestId('market-stats-skeleton-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });
});
