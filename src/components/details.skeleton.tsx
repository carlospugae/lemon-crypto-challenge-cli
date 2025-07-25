import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '@/theme';
import CryptoHeaderSkeleton from './crypto-header.skeleton';
import PriceDisplaySkeleton from './price-display.skeleton';
import MarketStatsSkeleton from './market-stats.skeleton';
import SupplyInfoSkeleton from './supply-info.skeleton';

/**
 * Comprehensive skeleton component for the crypto details screen
 * Combines all individual skeleton components to create a complete loading state
 *
 * @example
 * ```tsx
 * <DetailsSkeleton />
 * ```
 */
const DetailsSkeleton: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.gray[50] }}
      contentContainerStyle={[
        styles.scrollContainer,
        { paddingTop: insets.top + theme.spacing['2xl'] },
      ]}
      testID="details-skeleton-scroll"
    >
      {/* Header and Price Card */}
      <View style={styles.card}>
        <CryptoHeaderSkeleton />
        <PriceDisplaySkeleton />
      </View>

      {/* Market Stats Card */}
      <View style={styles.card}>
        <MarketStatsSkeleton />
      </View>

      {/* Supply Info Card */}
      <View style={styles.card}>
        <SupplyInfoSkeleton />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: theme.spacing['2xl'],
    flexGrow: 1,
    gap: theme.spacing['2xl'],
  },
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius['3xl'],
    padding: theme.spacing['3xl'],
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    gap: theme.spacing['2xl'],
    ...theme.shadows.md,
  },
});

export default DetailsSkeleton;
