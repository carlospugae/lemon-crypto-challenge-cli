import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '../theme';

interface SearchSkeletonProps {
  /**
   * Additional styles for the skeleton container
   */
  style?: object;
}

/**
 * SearchSkeleton component for displaying loading state that matches SearchInput structure
 * Uses react-native-skeleton-placeholder for best-practice skeletons
 *
 * @example
 * ```tsx
 * <SearchSkeleton />
 * ```
 */
const SearchSkeleton: React.FC<SearchSkeletonProps> = ({ style }) => {
  return (
    <SkeletonPlaceholder
      backgroundColor={theme.colors.gray[200]}
      highlightColor={theme.colors.gray[100]}
      borderRadius={theme.borderRadius.lg}
      speed={800}
    >
      <SkeletonPlaceholder.Item style={{ flex: 1, ...style }}>
        <SkeletonPlaceholder.Item
          height={44}
          borderRadius={theme.borderRadius.lg}
          borderWidth={1}
          borderColor={theme.colors.gray[200]}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SearchSkeleton;
