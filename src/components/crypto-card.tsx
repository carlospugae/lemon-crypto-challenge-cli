import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '@/theme';
import { formatPrice, formatMarketCap } from '@/utils/crypto';
import { CryptoToken } from '@/types/types';
import { Text } from '@/components';

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
      return 'trending-up';
    } else if (crypto.quote.USD.percent_change_24h < 0) {
      return 'trending-down';
    }
    return 'minus';
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
          <View style={styles.iconContainer} testID="crypto-icon-container">
            <Text
              variant="caption"
              fontWeight="semibold"
              color="white"
              numberOfLines={1}
              ellipsize={true}
            >
              {crypto.symbol}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.nameRow}>
              <Text
                variant="caption"
                fontWeight="semibold"
                color="gray.900"
                style={styles.nameText}
                ellipsize={true}
                numberOfLines={1}
              >
                {`${crypto.name} (${crypto.symbol})`}
              </Text>
            </View>
            <Text variant="caption" color="gray.500">
              Market Cap: {formatMarketCap(crypto.quote.USD.market_cap)}
            </Text>
          </View>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.priceContainer}>
            <Text variant="bodySmall" fontWeight="semibold" color="gray.900">
              {formatPrice(crypto.quote.USD.price)}
            </Text>
            <View style={styles.changeContainer}>
              <Feather
                name={getChangeIcon()}
                size={12}
                color={getChangeColor()}
                style={styles.changeIcon}
              />
              <Text
                variant="caption"
                fontWeight="medium"
                color={getChangeColor()}
              >
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
            testID="favorite-button"
            accessibilityLabel={
              isFavorite
                ? `Unfavorite ${crypto.name}`
                : `Favorite ${crypto.name}`
            }
          >
            <FontAwesome5
              name="star"
              size={20}
              color={
                isFavorite ? theme.colors.warning[500] : theme.colors.gray[300]
              }
              solid={isFavorite}
            />
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
  infoContainer: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  nameText: {
    marginRight: theme.spacing.sm,
  },
  badge: {
    marginLeft: 0,
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[300],
  },
  symbolText: {
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing.xs,
  },
  changeIcon: {
    marginRight: theme.spacing.xs,
  },
  favoriteButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
});

export default CryptoCard;
