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
        <View style={styles.content}>
          {/* Header */}
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

          {/* Separator */}
          <View style={styles.statsRowSeparator} />

          {/* 24h Volume Row */}
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
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: theme.spacing['2xl'],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
});

export default MarketStatsSkeleton;
