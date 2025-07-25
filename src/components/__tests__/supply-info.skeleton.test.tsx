import React from 'react';
import { render } from '@testing-library/react-native';
import SupplyInfoSkeleton from '../supply-info.skeleton';

/**
 * Test suite for SupplyInfoSkeleton component
 * Tests the rendering and structure of the supply info skeleton
 */
describe('SupplyInfoSkeleton', () => {
  /**
   * Test that the component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(<SupplyInfoSkeleton />);

    expect(getByTestId('supply-info-skeleton-container')).toBeTruthy();
  });

  /**
   * Test that the component has the correct structure
   */
  it('renders with correct structure', () => {
    const { getByTestId } = render(<SupplyInfoSkeleton />);

    const container = getByTestId('supply-info-skeleton-container');
    expect(container).toBeTruthy();
  });

  /**
   * Test that the component has proper styling
   */
  it('has proper styling', () => {
    const { getByTestId } = render(<SupplyInfoSkeleton />);

    const container = getByTestId('supply-info-skeleton-container');
    expect(container.props.style).toEqual(
      expect.objectContaining({
        flex: 1,
      }),
    );
  });
});
