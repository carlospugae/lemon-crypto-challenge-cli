import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { theme } from '../theme';
import { Badge, Text } from './index';
import CryptoIcon from './crypto-icon';

interface CryptoHeaderProps {
  crypto: {
    name: string;
    symbol: string;
    cmc_rank: number;
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CryptoHeader: React.FC<CryptoHeaderProps> = ({
  crypto,
  isFavorite,
  onToggleFavorite,
}) => {
  const handleToggleFavorite = () => {
    onToggleFavorite();
  };

  return (
    <View style={styles.headerRow}>
      <View style={styles.headerLeft}>
        <View style={styles.iconCircle}>
          <CryptoIcon symbol={crypto.symbol} size={32} color="white" />
        </View>
        <View style={styles.headerTextContainer}>
          <View style={styles.titleRow}>
            <Text
              variant="h3"
              color="gray.900"
              numberOfLines={1}
              accessibilityRole="header"
            >
              {crypto.name}
            </Text>
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
                Rank #{crypto.cmc_rank}
              </Badge>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={handleToggleFavorite}
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? `Unfavorite ${crypto.name}` : `Favorite ${crypto.name}`
          }
          style={styles.actionButton}
        >
          <FontAwesome5
            name="star"
            size={20}
            color={
              isFavorite ? theme.colors.warning[400] : theme.colors.gray[400]
            }
            solid={isFavorite}
            accessibilityLabel={isFavorite ? 'Favorited' : 'Not favorited'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.warning[400],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.lg,
    flexShrink: 0,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    gap: theme.spacing.sm,
  },

  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexShrink: 0,
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
    color: theme.colors.gray[700],
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexShrink: 0,
  },
  actionButton: {
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gray[50],
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
});

export default CryptoHeader;
