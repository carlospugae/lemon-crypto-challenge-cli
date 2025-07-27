import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Text, Icon } from './index';
import { formatPrice } from '@/utils/crypto';

interface PriceDisplayProps {
  price: number;
  percentChange24h: number;
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  percentChange24h,
}) => {
  const isPositive = percentChange24h >= 0;

  return (
    <View style={styles.priceSection}>
      <Text variant="h2" color="gray.900" accessibilityRole="text">
        {formatPrice(price)}
      </Text>
      <View style={styles.priceChangeRow}>
        {isPositive ? (
          <Icon
            family="feather"
            name="trending-up"
            size={16}
            color={theme.colors.success[600]}
          />
        ) : (
          <Icon
            family="feather"
            name="trending-down"
            size={16}
            color={theme.colors.error[600]}
          />
        )}
        <Text
          variant="body"
          color={isPositive ? 'success.600' : 'error.600'}
          accessibilityRole="text"
          fontWeight="bold"
        >
          {isPositive ? '+' : ''}
          {percentChange24h.toFixed(2)}%
        </Text>
        <Text variant="caption" color="gray.500" accessibilityRole="text">
          24h
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceSection: {
    alignItems: 'center',
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});

export default PriceDisplay;
