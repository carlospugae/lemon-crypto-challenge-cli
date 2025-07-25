import React from 'react';
import { render } from '@testing-library/react-native';
import PriceDisplaySkeleton from '../price-display.skeleton';

/**
 * Test suite for PriceDisplaySkeleton component
 * Tests the rendering and structure of the price display skeleton
 */
describe('PriceDisplaySkeleton', () => {
  /**
   * Test that the component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(<PriceDisplaySkeleton />);

    expect(getByTestId('price-display-skeleton-container')).toBeTruthy();
  });

  /**
   * Test that the component has the correct structure
   */
  it('renders with correct structure', () => {
    const { getByTestId } = render(<PriceDisplaySkeleton />);

    const container = getByTestId('price-display-skeleton-container');
    expect(container).toBeTruthy();
  });

  /**
   * Test that the component has proper styling
   */
  it('has proper styling', () => {
    const { getByTestId } = render(<PriceDisplaySkeleton />);

    const container = getByTestId('price-display-skeleton-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });
});
