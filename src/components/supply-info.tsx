import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Text } from './index';
import Progress from './progress';

interface SupplyInfoProps {
  circulatingSupply: number;
  totalSupply: number | null;
  maxSupply: number | null;
  symbol: string;
}

const formatSupply = (value: number | null): string => {
  if (!value) return 'N/A';

  // Handle very large numbers with abbreviations
  if (value >= 1e12) {
    return `${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }

  // For smaller numbers, use the original formatting
  const numStr = value.toFixed(3);
  const [integerPart, decimalPart] = numStr.split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedInteger},${decimalPart}`;
};

const getSupplyPercentage = (
  circulating: number,
  max: number | null,
): number => {
  if (!max || max === 0) return 0;
  return (circulating / max) * 100;
};

const SupplyInfo: React.FC<SupplyInfoProps> = ({
  circulatingSupply,
  totalSupply,
  maxSupply,
  symbol,
}) => {
  const supplyPercentage = getSupplyPercentage(circulatingSupply, maxSupply);

  return (
    <View style={styles.container}>
      <Text variant="h4" color="gray.900" accessibilityRole="header">
        Supply Information
      </Text>
      <View style={styles.supplyProgressSection}>
        <View style={styles.supplyProgressHeader}>
          <Text variant="caption" color="gray.600">
            Circulating Supply
          </Text>
          <Text variant="caption" color="gray.900" fontWeight="semibold">
            {supplyPercentage.toFixed(1)}%
          </Text>
        </View>
        <Progress
          value={supplyPercentage}
          style={styles.supplyProgressBar}
          color={theme.colors.primary[500]}
        />
        <View style={styles.supplyProgressFooter}>
          <Text variant="caption" color="gray.500">
            {formatSupply(circulatingSupply)} {symbol}
          </Text>
          <Text variant="caption" color="gray.500">
            {formatSupply(maxSupply)} {symbol}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <Text variant="caption" color="gray.600" style={styles.labelText}>
            Circulating Supply
          </Text>
          <Text
            variant="caption"
            color="gray.900"
            fontWeight="semibold"
            style={styles.valueText}
          >
            {formatSupply(circulatingSupply)} {symbol}
          </Text>
        </View>
        <View style={styles.statsRowSeparator} />
        <View style={[styles.statsRow]}>
          <Text variant="caption" color="gray.600" style={styles.labelText}>
            Total Supply
          </Text>
          <Text
            variant="caption"
            color="gray.900"
            fontWeight="semibold"
            style={styles.valueText}
          >
            {formatSupply(totalSupply)} {symbol}
          </Text>
        </View>
        <View style={styles.statsRowSeparator} />
        <View style={[styles.statsRow]}>
          <Text variant="caption" color="gray.600" style={styles.labelText}>
            Max Supply
          </Text>
          <Text
            variant="caption"
            color="gray.900"
            fontWeight="semibold"
            style={styles.valueText}
          >
            {formatSupply(maxSupply)} {symbol}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing['3xl'],
  },
  supplyProgressSection: {},
  supplyProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    flex: 1,
  },
  valueText: {
    flex: 1,
    textAlign: 'right',
  },
  statsRowSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  statsContainer: {
    gap: theme.spacing['2xl'],
  },
});

export default SupplyInfo;
