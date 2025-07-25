import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

const CryptoCardSkeleton: React.FC = () => {
  return (
    <View style={styles.container} testID="crypto-card-skeleton-container">
      <SkeletonPlaceholder
        backgroundColor={theme.colors.gray[200]}
        highlightColor={theme.colors.gray[100]}
      >
        <View style={styles.content}>
          {/* Left Section - Icon and Info */}
          <View style={styles.leftSection}>
            {/* Crypto Icon */}
            <SkeletonPlaceholder.Item
              width={48}
              height={48}
              borderRadius={theme.borderRadius.full}
              marginRight={theme.spacing.md}
            />

            {/* Info Container */}
            <View style={styles.infoContainer}>
              {/* Name and Symbol */}
              <SkeletonPlaceholder.Item
                width={120}
                height={16}
                borderRadius={theme.borderRadius.sm}
                marginBottom={theme.spacing.xs}
              />

              {/* Market Cap */}
              <SkeletonPlaceholder.Item
                width={80}
                height={12}
                borderRadius={theme.borderRadius.sm}
              />
            </View>
          </View>

          {/* Right Section - Price and Favorite Button */}
          <View style={styles.rightSection}>
            {/* Price Container */}
            <View style={styles.priceContainer}>
              {/* Price */}
              <SkeletonPlaceholder.Item
                width={70}
                height={14}
                borderRadius={theme.borderRadius.sm}
                marginBottom={theme.spacing.xs}
              />

              {/* Change Percentage */}
              <SkeletonPlaceholder.Item
                width={50}
                height={12}
                borderRadius={theme.borderRadius.sm}
              />
            </View>

            {/* Favorite Button */}
            <SkeletonPlaceholder.Item
              width={32}
              height={32}
              borderRadius={theme.borderRadius.md}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius['2xl'],
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
});

export default CryptoCardSkeleton;
