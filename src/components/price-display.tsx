import React from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { theme } from '../theme';
import { Text } from './index';
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
      <Text variant="h1" color="gray.900" accessibilityRole="text">
        {formatPrice(price)}
      </Text>
      <View style={styles.priceChangeRow}>
        {isPositive ? (
          <Feather
            name="trending-up"
            size={16}
            color={theme.colors.success[600]}
          />
        ) : (
          <Feather
            name="trending-down"
            size={16}
            color={theme.colors.error[600]}
          />
        )}
        <Text
          variant="h5"
          color={isPositive ? 'success.600' : 'error.600'}
          accessibilityRole="text"
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
    paddingVertical: theme.spacing.lg,
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
});

export default PriceDisplay;
