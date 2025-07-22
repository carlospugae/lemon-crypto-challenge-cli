import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

interface CryptoSkeletonProps {
  /**
   * Additional styles for the skeleton container
   */
  style?: any;
}

/**
 * CryptoSkeleton component for displaying loading state that matches CryptoCard structure
 * Uses animated opacity to create a shimmer effect
 *
 * @example
 * ```tsx
 * <CryptoSkeleton />
 * ```
 */
const CryptoSkeleton: React.FC<CryptoSkeletonProps> = ({ style }) => {
  const animatedValue = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {/* Icon skeleton */}
          <Animated.View
            style={[styles.iconSkeleton, { opacity: animatedValue }]}
          />

          <View style={styles.infoContainer}>
            {/* Name skeleton */}
            <View style={styles.nameRow}>
              <Animated.View
                style={[styles.nameSkeleton, { opacity: animatedValue }]}
              />
              <Animated.View
                style={[styles.symbolSkeleton, { opacity: animatedValue }]}
              />
            </View>

            {/* Market cap skeleton */}
            <Animated.View
              style={[styles.marketCapSkeleton, { opacity: animatedValue }]}
            />
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.priceContainer}>
            {/* Price skeleton */}
            <Animated.View
              style={[styles.priceSkeleton, { opacity: animatedValue }]}
            />

            {/* Change skeleton */}
            <Animated.View
              style={[styles.changeSkeleton, { opacity: animatedValue }]}
            />
          </View>

          {/* Favorite button skeleton */}
          <Animated.View
            style={[styles.favoriteSkeleton, { opacity: animatedValue }]}
          />
        </View>
      </View>
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
  iconSkeleton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
    marginRight: theme.spacing.md,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    gap: theme.spacing.sm,
  },
  nameSkeleton: {
    width: 120,
    height: 16,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray[200],
  },
  symbolSkeleton: {
    width: 40,
    height: 16,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.gray[200],
  },
  marketCapSkeleton: {
    width: 100,
    height: 14,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray[200],
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceSkeleton: {
    width: 80,
    height: 16,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray[200],
  },
  changeSkeleton: {
    width: 60,
    height: 14,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.gray[200],
    marginTop: theme.spacing.xs,
  },
  favoriteSkeleton: {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray[200],
  },
});

export default CryptoSkeleton;
