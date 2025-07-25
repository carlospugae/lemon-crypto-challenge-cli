import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Text } from './index';
import { formatMarketCap } from '@/utils/crypto';

interface MarketStatsProps {
  marketCap: number;
  volume24h: number;
}

const MarketStats: React.FC<MarketStatsProps> = ({ marketCap, volume24h }) => {
  return (
    <View style={styles.container}>
      <Text variant="h4" color="gray.900" accessibilityRole="header">
        Market Statistics
      </Text>
      <View style={styles.statsRow}>
        <Text variant="caption" color="gray.600">
          Market Cap
        </Text>
        <Text variant="caption" color="gray.900" fontWeight="semibold">
          {formatMarketCap(marketCap)}
        </Text>
      </View>
      <View style={styles.statsRowSeparator} />
      <View style={[styles.statsRow]}>
        <Text variant="caption" color="gray.600">
          24h Volume
        </Text>
        <Text variant="caption" color="gray.900" fontWeight="semibold">
          {formatMarketCap(volume24h)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing['2xl'],
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: theme.spacing.sm,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  statsRowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
});

export default MarketStats;
