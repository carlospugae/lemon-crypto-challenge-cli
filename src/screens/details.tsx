import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { theme } from '../theme';
import { Badge } from '../components';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { formatPrice, formatMarketCap, getCryptoIcon } from '../theme/utils';
import { CMC_API_KEY } from '@env';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

/**
 * Type for the crypto details from CoinMarketCap
 */
interface CryptoDetails {
  id: string;
  name: string;
  symbol: string;
  cmc_rank: number;
  quote: {
    USD: {
      price: number;
      market_cap: number;
      volume_24h: number;
      percent_change_24h: number;
    };
  };
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
}

interface DetailsScreenParams {
  id: string;
}

type DetailsRouteProp = RouteProp<{ Details: DetailsScreenParams }, 'Details'>;

/**
 * Fetches crypto details from CoinMarketCap API
 * @param id - Crypto ID
 * @returns CryptoDetails object
 */
const fetchCryptoDetails = async (id: string): Promise<CryptoDetails> => {
  const response = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_API_KEY,
        Accept: 'application/json',
      },
    },
  );
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
  return data.data[id];
};

/**
 * Formats supply numbers with commas
 * @param value - The supply value
 * @returns Formatted string
 * @example formatSupply(21000000) // '21,000,000'
 */
const formatSupply = (value: number | null): string => {
  if (!value) return 'N/A';
  return value.toLocaleString();
};

/**
 * Calculates the circulating supply percentage
 * @param circulating - Circulating supply
 * @param max - Max supply
 * @returns Percentage (0-100)
 * @example getSupplyPercentage(19000000, 21000000) // 90.5
 */
const getSupplyPercentage = (
  circulating: number,
  max: number | null,
): number => {
  if (!max || max === 0) return 0;
  return (circulating / max) * 100;
};

/**
 * Simple progress bar component
 * @param value - Progress value (0-100)
 * @param color - Bar color
 * @param style - Additional style
 */
const Progress: React.FC<{ value: number; color?: string; style?: object }> = ({
  value,
  color = theme.colors.primary[500],
  style,
}) => (
  <View
    style={[progressStyles.track, style]}
    accessibilityRole="progressbar"
    accessibilityValue={{ now: value, min: 0, max: 100 }}
  >
    <View
      style={[
        progressStyles.bar,
        { width: `${value}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const progressStyles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
});

/**
 * Skeleton loader for the Details screen
 * Uses shimmer animation and matches the layout of the Details screen
 *
 * @example
 * <DetailsSkeleton />
 */
const DetailsSkeleton: React.FC = () => (
  <ScrollView
    style={{ backgroundColor: theme.colors.gray[50] }}
    contentContainerStyle={styles.scrollContainer}
    accessibilityLabel="Loading crypto details"
  >
    <SkeletonPlaceholder
      backgroundColor={theme.colors.gray[200]}
      highlightColor={theme.colors.gray[100]}
      borderRadius={theme.borderRadius.sm}
      speed={800}
    >
      {/* Header Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        {/* Badges Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={60}
            height={28}
            borderRadius={theme.borderRadius.full}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={28}
            borderRadius={theme.borderRadius.full}
          />
        </SkeletonPlaceholder.Item>
        {/* Icon Circle */}
        <SkeletonPlaceholder.Item
          width={72}
          height={72}
          borderRadius={theme.borderRadius.full}
          alignSelf="center"
          marginBottom={theme.spacing.md}
        />
        {/* Crypto Name */}
        <SkeletonPlaceholder.Item
          width={120}
          height={28}
          borderRadius={theme.borderRadius.md}
          alignSelf="center"
        />
        {/* Price Section */}
        <SkeletonPlaceholder.Item
          alignItems="center"
          marginTop={theme.spacing.lg}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={32}
            borderRadius={theme.borderRadius.md}
            marginBottom={theme.spacing.md}
          />
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={16}
              height={16}
              borderRadius={8}
              marginRight={theme.spacing.xs}
            />
            <SkeletonPlaceholder.Item
              width={60}
              height={20}
              borderRadius={theme.borderRadius.md}
              marginRight={theme.spacing.xs}
            />
            <SkeletonPlaceholder.Item
              width={24}
              height={16}
              borderRadius={theme.borderRadius.md}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      {/* Market Stats Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        <SkeletonPlaceholder.Item
          width={140}
          height={20}
          borderRadius={theme.borderRadius.md}
          marginBottom={theme.spacing.lg}
        />
        {/* Market Cap Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* 24h Volume Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      {/* Supply Info Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        <SkeletonPlaceholder.Item
          width={140}
          height={20}
          borderRadius={theme.borderRadius.md}
          marginBottom={theme.spacing.lg}
        />
        {/* Supply Progress Header */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.xs}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={40}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Progress Bar */}
        <SkeletonPlaceholder.Item
          width="100%"
          height={8}
          borderRadius={theme.borderRadius.full}
          marginBottom={theme.spacing.xs}
        />
        {/* Supply Progress Footer */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginTop={2}
          marginBottom={theme.spacing.lg}
        >
          <SkeletonPlaceholder.Item
            width={80}
            height={12}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={12}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Circulating Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Total Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Max Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </ScrollView>
);

/**
 * Details screen for a cryptocurrency
 * Displays header, price, stats, and supply info
 */
const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  const [crypto, setCrypto] = useState<CryptoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Favorites store
  const isFavorite = useFavoritesStore(state => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const getDetails = useCallback(async () => {
    if (!id) return;
    try {
      if (!refreshing) setLoading(true);
      const data = await fetchCryptoDetails(id);
      setCrypto(data);
    } catch (e) {
      console.error('Error fetching crypto details:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [id, refreshing]);

  useEffect(() => {
    getDetails();
    const interval = setInterval(getDetails, 30000);
    return () => clearInterval(interval);
  }, [getDetails]);

  const handleRefresh = () => {
    setRefreshing(true);
    getDetails();
  };
  console.log({ crypto });

  if (loading && !refreshing) {
    return <DetailsSkeleton />;
  }

  if (!crypto) {
    return (
      <View style={styles.centered}>
        <Text accessibilityRole="text">No data available.</Text>
      </View>
    );
  }

  const supplyPercentage = getSupplyPercentage(
    crypto.circulating_supply,
    crypto.max_supply,
  );

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.gray[50] }}
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          accessibilityLabel="Pull to refresh crypto details"
        />
      }
    >
      {/* Header Card */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          {/* <View style={styles.iconContainer}> */}
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
          {/* </View> */}

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

      {/* Market Stats */}
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

      {/* Supply Information */}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: theme.spacing['2xl'],
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
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
  cryptoName: {
    fontSize: theme.fontSize['3xl'],
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    marginBottom: 0,
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
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Details;
