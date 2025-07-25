import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { theme } from '@/theme';
import { formatPrice, formatMarketCap, getCryptoIcon } from '@/utils/crypto';
import Badge from './Badge';
import { CryptoToken } from '@/types/types';

interface CryptoCardProps {
  crypto: CryptoToken;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  style?: any;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isFavorite,
  onPress,
  onToggleFavorite,
  style,
}) => {
  const handlePress = () => {
    onPress(crypto.id);
  };

  const handleFavoritePress = () => {
    onToggleFavorite(crypto.id);
  };

  const getChangeColor = () => {
    if (crypto.quote.USD.percent_change_24h > 0) {
      return theme.colors.success[600];
    } else if (crypto.quote.USD.percent_change_24h < 0) {
      return theme.colors.error[600];
    }
    return theme.colors.gray[500];
  };

  const getChangeIcon = () => {
    if (crypto.quote.USD.percent_change_24h > 0) {
      return '↗';
    } else if (crypto.quote.USD.percent_change_24h < 0) {
      return '↘';
    }
    return '→';
  };

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={handlePress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${crypto.name} (${
        crypto.symbol
      }), Price: ${formatPrice(
        crypto.quote.USD.price,
      )}, 24h change: ${crypto.quote.USD.percent_change_24h.toFixed(2)}%`}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{getCryptoIcon(crypto.symbol)}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{crypto.name}</Text>
              <Text style={styles.symbolText}>{crypto.symbol}</Text>
            </View>
            <Text style={styles.marketCapText}>
              Market Cap: {formatMarketCap(crypto.quote.USD.market_cap)}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>
              {formatPrice(crypto.quote.USD.price)}
            </Text>
            <View style={styles.changeContainer}>
              <Text style={styles.changeIcon}>{getChangeIcon()}</Text>
              <Text style={[styles.changeText, { color: getChangeColor() }]}>
                {crypto.quote.USD.percent_change_24h > 0 ? '+' : ''}
                {crypto.quote.USD.percent_change_24h.toFixed(2)}%
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite
                ? `Unfavorite ${crypto.name}`
                : `Favorite ${crypto.name}`
            }
          >
            <Text
              style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}
            >
              {isFavorite ? '★' : '☆'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  },
  iconText: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.white,
  },
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  nameText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginRight: theme.spacing.sm,
  },
  badge: {
    marginLeft: 0,
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[300],
  },
  symbolText: {
    color: theme.colors.gray[600],
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  marketCapText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  changeIcon: {
    fontSize: theme.fontSize.xs,
    marginRight: theme.spacing.xs,
  },
  changeText: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
  favoriteButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  favoriteIcon: {
    fontSize: theme.fontSize.xl,
    color: theme.colors.gray[300],
  },
  favoriteActive: {
    color: theme.colors.warning[500],
  },
});

export default CryptoCard;
