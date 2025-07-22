import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { formatMarketCap } from '../theme/utils';
import type { CryptoDetails } from '../types/crypto';

/**
 * Market statistics card for the crypto details screen.
 * Displays market cap and 24h volume.
 * @param props.crypto - CryptoDetails object
 * @example
 * <MarketStats crypto={crypto} />
 */
export const MarketStats: React.FC<{ crypto: CryptoDetails }> = ({
  crypto,
}) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle} accessibilityRole="header">
      Market Statistics
    </Text>
    <View style={styles.statsRow}>
      <Text style={styles.statsLabel}>Market Cap</Text>
      <Text style={styles.statsValue}>
        {formatMarketCap(crypto.quote.USD.market_cap)}
      </Text>
    </View>
    <View style={[styles.statsRow, styles.statsRowBorder]}>
      <Text style={styles.statsLabel}>24h Volume</Text>
      <Text style={styles.statsValue}>
        {formatMarketCap(crypto.quote.USD.volume_24h)}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius['3xl'],
    padding: theme.spacing['3xl'],
    marginBottom: theme.spacing['2xl'],
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    ...theme.shadows.md,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.lg,
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
  statsLabel: {
    color: theme.colors.gray[600],
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.base,
  },
  statsValue: {
    color: theme.colors.gray[900],
    fontWeight: theme.fontWeight.semibold,
    fontSize: theme.fontSize.base,
  },
});
