import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import {
  formatSupply,
  getSupplyPercentage,
  CryptoDetails,
} from '../types/crypto';
import { Progress } from './Progress';

/**
 * Supply information card for the crypto details screen.
 * Displays supply progress, circulating/total/max supply.
 * @param props.crypto - CryptoDetails object
 * @example
 * <SupplyInfo crypto={crypto} />
 */
export const SupplyInfo: React.FC<{ crypto: CryptoDetails }> = ({ crypto }) => {
  const supplyPercentage = getSupplyPercentage(
    crypto.circulating_supply,
    crypto.max_supply,
  );
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle} accessibilityRole="header">
        Supply Information
      </Text>
      {/* Supply Progress */}
      <View style={styles.supplyProgressSection}>
        <View style={styles.supplyProgressHeader}>
          <Text style={styles.supplyProgressLabel}>Circulating Supply</Text>
          <Text style={styles.supplyProgressPercent}>
            {supplyPercentage.toFixed(1)}%
          </Text>
        </View>
        <Progress
          value={supplyPercentage}
          style={styles.supplyProgressBar}
          color={theme.colors.primary[500]}
        />
        <View style={styles.supplyProgressFooter}>
          <Text style={styles.supplyProgressFooterText}>
            {formatSupply(crypto.circulating_supply)} {crypto.symbol}
          </Text>
          <Text style={styles.supplyProgressFooterText}>
            {formatSupply(crypto.max_supply)} {crypto.symbol}
          </Text>
        </View>
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.statsLabel}>Circulating Supply</Text>
        <Text style={styles.statsValue}>
          {formatSupply(crypto.circulating_supply)} {crypto.symbol}
        </Text>
      </View>
      <View style={[styles.statsRow, styles.statsRowBorder]}>
        <Text style={styles.statsLabel}>Total Supply</Text>
        <Text style={styles.statsValue}>
          {formatSupply(crypto.total_supply)} {crypto.symbol}
        </Text>
      </View>
      <View style={[styles.statsRow, styles.statsRowBorder]}>
        <Text style={styles.statsLabel}>Max Supply</Text>
        <Text style={styles.statsValue}>
          {formatSupply(crypto.max_supply)} {crypto.symbol}
        </Text>
      </View>
    </View>
  );
};

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
  supplyProgressSection: {
    marginBottom: theme.spacing['2xl'],
  },
  supplyProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  supplyProgressLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    fontWeight: theme.fontWeight.medium,
  },
  supplyProgressPercent: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[900],
    fontWeight: theme.fontWeight.semibold,
  },
  supplyProgressBar: {
    height: 8,
    marginBottom: theme.spacing.xs,
  },
  supplyProgressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  supplyProgressFooterText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
  },
});
