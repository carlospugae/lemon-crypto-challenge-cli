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
    <>
      <Text variant="h5" color="gray.900" accessibilityRole="header">
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
      <View style={[styles.statsRow, styles.statsRowBorder]}>
        <Text variant="caption" color="gray.600">
          24h Volume
        </Text>
        <Text variant="caption" color="gray.900" fontWeight="semibold">
          {formatMarketCap(volume24h)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default MarketStats;
