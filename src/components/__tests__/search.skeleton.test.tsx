import React from 'react';
import { render } from '@testing-library/react-native';
import SearchSkeleton from '../search-input.skeleton';

describe('SearchSkeleton', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<SearchSkeleton />);
    expect(getByTestId('search-skeleton-container')).toBeDefined();
  });

  it('has proper header styling', () => {
    const { getByTestId } = render(<SearchSkeleton />);
    const container = getByTestId('search-skeleton-container');

    expect(container).toBeDefined();
    expect(container.props.style).toMatchObject({
      backgroundColor: '#ffffff',
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
    });
  });

  it('renders skeleton content structure', () => {
    const { getByTestId } = render(<SearchSkeleton />);
    const container = getByTestId('search-skeleton-container');

    // Verify the container renders
    expect(container).toBeDefined();

    // The skeleton should have children (SkeletonPlaceholder and its items)
    expect(container.props.children).toBeDefined();
  });
});
