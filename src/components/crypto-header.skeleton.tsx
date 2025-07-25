import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

/**
 * Skeleton component for the crypto header section
 * Mimics the structure of CryptoHeader component with loading placeholders
 *
 * @example
 * ```tsx
 * <CryptoHeaderSkeleton />
 * ```
 */
const CryptoHeaderSkeleton: React.FC = () => {
  return (
    <View style={styles.container} testID="crypto-header-skeleton-container">
      <SkeletonPlaceholder
        backgroundColor={theme.colors.gray[200]}
        highlightColor={theme.colors.gray[100]}
      >
        <View style={styles.headerTextContainer}>
          {/* Header Actions - Rank Badge and Favorite Button */}
          <View style={styles.headerActions}>
            {/* Rank Badge */}
            <SkeletonPlaceholder.Item
              width={80}
              height={28}
              borderRadius={theme.borderRadius.full}
            />

            {/* Favorite Button */}
            <SkeletonPlaceholder.Item
              width={40}
              height={40}
              borderRadius={theme.borderRadius.lg}
            />
          </View>

          {/* Crypto Icon Circle */}
          <SkeletonPlaceholder.Item
            width={92}
            height={92}
            borderRadius={theme.borderRadius.full}
          />

          {/* Title Row */}
          <View style={styles.titleRow}>
            {/* Crypto Name */}
            <SkeletonPlaceholder.Item
              width={150}
              height={24}
              borderRadius={theme.borderRadius.sm}
              marginBottom={theme.spacing.sm}
            />

            {/* Symbol Badge */}
            <SkeletonPlaceholder.Item
              width={60}
              height={24}
              borderRadius={theme.borderRadius.full}
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
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  headerActions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  titleRow: {
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
});

export default CryptoHeaderSkeleton;
