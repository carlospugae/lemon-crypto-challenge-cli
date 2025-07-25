import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

/**
 * Skeleton component for the price display section
 * Mimics the structure of PriceDisplay component with loading placeholders
 *
 * @example
 * ```tsx
 * <PriceDisplaySkeleton />
 * ```
 */
const PriceDisplaySkeleton: React.FC = () => {
  return (
    <View style={styles.container} testID="price-display-skeleton-container">
      <SkeletonPlaceholder
        backgroundColor={theme.colors.gray[200]}
        highlightColor={theme.colors.gray[100]}
      >
        <View style={styles.priceSection}>
          {/* Main Price */}
          <SkeletonPlaceholder.Item
            width={120}
            height={32}
            borderRadius={theme.borderRadius.sm}
            marginBottom={theme.spacing.md}
          />

          {/* Price Change Row */}
          <View style={styles.priceChangeRow}>
            {/* Trend Icon */}
            <SkeletonPlaceholder.Item
              width={16}
              height={16}
              borderRadius={theme.borderRadius.sm}
            />

            {/* Change Percentage */}
            <SkeletonPlaceholder.Item
              width={60}
              height={16}
              borderRadius={theme.borderRadius.sm}
            />

            {/* 24h Label */}
            <SkeletonPlaceholder.Item
              width={30}
              height={12}
              borderRadius={theme.borderRadius.sm}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  priceSection: {
    alignItems: 'center',
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});

export default PriceDisplaySkeleton;
