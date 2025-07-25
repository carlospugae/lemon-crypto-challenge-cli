import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

/**
 * Skeleton component for the market statistics section
 * Mimics the structure of MarketStats component with loading placeholders
 *
 * @example
 * ```tsx
 * <MarketStatsSkeleton />
 * ```
 */
const MarketStatsSkeleton: React.FC = () => {
  return (
    <View style={styles.container} testID="market-stats-skeleton-container">
      <SkeletonPlaceholder
        backgroundColor={theme.colors.gray[200]}
        highlightColor={theme.colors.gray[100]}
      >
        {/* Section Title */}
        <SkeletonPlaceholder.Item
          width={140}
          height={20}
          borderRadius={theme.borderRadius.sm}
          marginBottom={theme.spacing['2xl']}
        />

        {/* Market Cap Row */}
        <View style={styles.statsRow}>
          <SkeletonPlaceholder.Item
            width={80}
            height={14}
            borderRadius={theme.borderRadius.sm}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
          />
        </View>

        {/* 24h Volume Row */}
        <View style={[styles.statsRow, styles.statsRowBorder]}>
          <SkeletonPlaceholder.Item
            width={80}
            height={14}
            borderRadius={theme.borderRadius.sm}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  statsRowBorder: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[100],
  },
});

export default MarketStatsSkeleton;
