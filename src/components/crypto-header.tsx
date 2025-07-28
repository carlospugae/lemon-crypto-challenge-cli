import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Badge, Text, Icon } from './index';

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
    <View>
      <View style={styles.headerTextContainer}>
        <View style={styles.headerActions}>
          <Badge
            variant="primary"
            style={styles.rankBadge}
            textStyle={styles.rankBadgeText}
          >
            Rank #{crypto.cmc_rank}
          </Badge>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite
                ? `Unfavorite ${crypto.name}`
                : `Favorite ${crypto.name}`
            }
            style={styles.actionButton}
          >
            <Icon
              family="fontawesome6"
              name="star"
              size={20}
              color={
                isFavorite ? theme.colors.warning[400] : theme.colors.gray[400]
              }
              solid={isFavorite}
              testID={isFavorite ? 'favorited' : 'not-favorited'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconCircle}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            {crypto.symbol}
          </Text>
        </View>
        <View style={styles.titleRow}>
          <Text
            variant="h4"
            color="gray.900"
            numberOfLines={1}
            accessibilityRole="header"
            fontWeight="bold"
          >
            {crypto.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconCircle: {
    width: 92,
    height: 92,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[400],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  titleRow: {
    gap: theme.spacing.sm,
  },

  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[300],
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
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
    alignSelf: 'center',
  },
  rankBadgeText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary[700],
    fontWeight: theme.fontWeight.semibold,
    textAlign: 'center',
  },
  headerActions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
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
