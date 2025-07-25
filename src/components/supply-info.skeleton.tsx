import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

/**
 * Skeleton component for the supply information section
 * Mimics the structure of SupplyInfo component with loading placeholders
 *
 * @example
 * ```tsx
 * <SupplyInfoSkeleton />
 * ```
 */
const SupplyInfoSkeleton: React.FC = () => {
  return (
    <View style={styles.container} testID="supply-info-skeleton-container">
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

        {/* Supply Progress Section */}
        <View style={styles.supplyProgressSection}>
          {/* Progress Header */}
          <View style={styles.supplyProgressHeader}>
            <SkeletonPlaceholder.Item
              width={120}
              height={14}
              borderRadius={theme.borderRadius.sm}
            />
            <SkeletonPlaceholder.Item
              width={40}
              height={14}
              borderRadius={theme.borderRadius.sm}
            />
          </View>

          {/* Progress Bar */}
          <SkeletonPlaceholder.Item
            width="100%"
            height={8}
            borderRadius={theme.borderRadius.sm}
            marginBottom={theme.spacing.xs}
          />

          {/* Progress Footer */}
          <View style={styles.supplyProgressFooter}>
            <SkeletonPlaceholder.Item
              width={80}
              height={12}
              borderRadius={theme.borderRadius.sm}
            />
            <SkeletonPlaceholder.Item
              width={80}
              height={12}
              borderRadius={theme.borderRadius.sm}
            />
          </View>
        </View>

        {/* Circulating Supply Row */}
        <View style={styles.statsRow}>
          <SkeletonPlaceholder.Item
            width={120}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.labelText}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.valueText}
          />
        </View>

        {/* Total Supply Row */}
        <View style={[styles.statsRow, styles.statsRowBorder]}>
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.labelText}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.valueText}
          />
        </View>

        {/* Max Supply Row */}
        <View style={[styles.statsRow, styles.statsRowBorder]}>
          <SkeletonPlaceholder.Item
            width={90}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.labelText}
          />
          <SkeletonPlaceholder.Item
            width={100}
            height={14}
            borderRadius={theme.borderRadius.sm}
            style={styles.valueText}
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
  supplyProgressSection: {
    marginBottom: theme.spacing['2xl'],
    marginTop: theme.spacing['2xl'],
  },
  supplyProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  supplyProgressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
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
  labelText: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  valueText: {
    flex: 1,
    textAlign: 'right',
  },
});

export default SupplyInfoSkeleton;
