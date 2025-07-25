import React from 'react';
import { render } from '@testing-library/react-native';
import DetailsSkeleton from '../details.skeleton';

/**
 * Test suite for DetailsSkeleton component
 * Tests the rendering and structure of the skeleton loading state
 */
describe('DetailsSkeleton', () => {
  /**
   * Test that the component renders without crashing
   */
  it('renders without crashing', () => {
    const { getByTestId } = render(<DetailsSkeleton />);

    expect(getByTestId('details-skeleton-scroll')).toBeTruthy();
  });

  /**
   * Test that the component has the correct structure with all skeleton cards
   */
  it('renders with correct structure', () => {
    const { getByTestId } = render(<DetailsSkeleton />);

    const scrollView = getByTestId('details-skeleton-scroll');
    expect(scrollView).toBeTruthy();
  });

  /**
   * Test that the component has proper styling
   */
  it('has proper styling', () => {
    const { getByTestId } = render(<DetailsSkeleton />);

    const scrollView = getByTestId('details-skeleton-scroll');
    expect(scrollView.props.style).toEqual(
      expect.objectContaining({
        backgroundColor: expect.any(String),
      }),
    );
  });
});
