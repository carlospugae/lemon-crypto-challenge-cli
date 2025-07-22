import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../theme';
import Badge from './Badge';
import { formatPrice, getCryptoIcon } from '../theme/utils';
import type { CryptoDetails } from '../types/crypto';

/**
 * Header card for the crypto details screen.
 * Displays symbol, rank, icon, name, price, and price change.
 * @param props.crypto - CryptoDetails object
 * @example
 * <CryptoHeader crypto={crypto} />
 */
export const CryptoHeader: React.FC<{ crypto: CryptoDetails }> = ({
  crypto,
}) => (
  <View style={styles.card}>
    <View style={styles.headerRow}>
      <View style={styles.badgeContainer}>
        <Badge
          variant="secondary"
          style={styles.symbolBadge}
          textStyle={styles.symbolBadgeText}
        >
          {crypto.symbol}
        </Badge>
        <Badge
          variant="primary"
          style={styles.rankBadge}
          textStyle={styles.rankBadgeText}
        >
          {`Rank #${crypto.cmc_rank}`}
        </Badge>
      </View>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText} accessibilityRole="image">
          {getCryptoIcon(crypto.symbol)}
        </Text>
      </View>
      <Text style={styles.cryptoName} accessibilityRole="header">
        {crypto.name}
      </Text>
    </View>
    {/* Price Section */}
    <View style={styles.priceSection}>
      <Text style={styles.priceText} accessibilityRole="text">
        {formatPrice(crypto.quote.USD.price)}
      </Text>
      <View style={styles.priceChangeRow}>
        {crypto.quote.USD.percent_change_24h < 0 ? (
          <Feather
            name="trending-down"
            size={16}
            color={theme.colors.error[600]}
          />
        ) : (
          <Feather
            name="trending-up"
            size={16}
            color={theme.colors.success[600]}
          />
        )}
        <Text
          style={[
            styles.priceChangeText,
            crypto.quote.USD.percent_change_24h < 0
              ? styles.priceChangeNegative
              : styles.priceChangePositive,
          ]}
          accessibilityRole="text"
        >
          {crypto.quote.USD.percent_change_24h > 0 ? '+' : ''}
          {crypto.quote.USD.percent_change_24h.toFixed(2)}%
        </Text>
        <Text style={styles.priceChangeLabel} accessibilityRole="text">
          24h
        </Text>
      </View>
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
  headerRow: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.warning[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: theme.colors.white,
    fontWeight: theme.fontWeight.bold,
    fontSize: theme.fontSize['3xl'],
  },
  cryptoName: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: 0,
    flexShrink: 0,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  symbolBadge: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[300],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    minHeight: 28,
    justifyContent: 'center',
    flexShrink: 0,
  },
  symbolBadgeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[900],
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  rankBadge: {
    backgroundColor: theme.colors.primary[100],
    borderColor: theme.colors.primary[200],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    minHeight: 28,
    justifyContent: 'center',
    flexShrink: 0,
  },
  rankBadgeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary[700],
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  priceSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  priceText: {
    fontSize: theme.fontSize['4xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.md,
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  priceChangeText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    marginLeft: theme.spacing.xs,
  },
  priceChangePositive: {
    color: theme.colors.success[600],
  },
  priceChangeNegative: {
    color: theme.colors.error[600],
  },
  priceChangeLabel: {
    color: theme.colors.gray[500],
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
});
