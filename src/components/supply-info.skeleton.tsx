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
          marginBottom={theme.spacing['3xl']}
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

        {/* Stats Container */}
        <View style={styles.statsContainer}>
          {/* Circulating Supply Row */}
          <View style={styles.statsRow}>
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

          {/* Separator */}
          <View style={styles.statsRowSeparator} />

          {/* Total Supply Row */}
          <View style={styles.statsRow}>
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

          {/* Separator */}
          <View style={styles.statsRowSeparator} />

          {/* Max Supply Row */}
          <View style={styles.statsRow}>
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
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spacing['3xl'],
  },
  supplyProgressSection: {
    marginBottom: theme.spacing['3xl'],
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
  statsContainer: {
    gap: theme.spacing['2xl'],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {},
  valueText: {},
  statsRowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
});

export default SupplyInfoSkeleton;
