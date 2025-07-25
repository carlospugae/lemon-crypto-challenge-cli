import React from 'react';
import { render } from '@testing-library/react-native';
import CryptoCardSkeleton from '../crypto-card.skeleton';

describe('CryptoCardSkeleton', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<CryptoCardSkeleton />);
    expect(getByTestId('crypto-card-skeleton-container')).toBeDefined();
  });

  it('has proper container styling', () => {
    const { getByTestId } = render(<CryptoCardSkeleton />);
    const container = getByTestId('crypto-card-skeleton-container');

    expect(container).toBeDefined();
    expect(container.props.style).toMatchObject({
      backgroundColor: '#ffffff',
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
    });
  });

  it('renders skeleton content structure', () => {
    const { getByTestId } = render(<CryptoCardSkeleton />);
    const container = getByTestId('crypto-card-skeleton-container');

    // Verify the container renders
    expect(container).toBeDefined();

    // The skeleton should have children (SkeletonPlaceholder and its items)
    expect(container.props.children).toBeDefined();
  });
});
