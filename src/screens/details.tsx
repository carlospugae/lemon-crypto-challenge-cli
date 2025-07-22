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

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          color={theme.colors.primary[500]}
          accessibilityLabel="Loading crypto details"
        />
      </View>
    );
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
          <View style={styles.headerLeft}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText} accessibilityRole="image">
                {getCryptoIcon(crypto.symbol)}
              </Text>
            </View>
            <View style={styles.headerTextContainer}>
              <View style={styles.titleRow}>
                <Text
                  style={styles.cryptoName}
                  accessibilityRole="header"
                  numberOfLines={1}
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
              onPress={() => toggleFavorite(id)}
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite
                  ? `Unfavorite ${crypto.name}`
                  : `Favorite ${crypto.name}`
              }
              style={styles.actionButton}
            >
              {isFavorite ? (
                <FontAwesome
                  name="star"
                  size={20}
                  color={theme.colors.warning[400]}
                  accessibilityLabel="Favorited"
                />
              ) : (
                <Feather
                  name="star"
                  size={20}
                  color={theme.colors.gray[400]}
                  accessibilityLabel="Not favorited"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Set alert for price changes"
              style={styles.actionButton}
            >
              <Feather name="bell" size={20} color={theme.colors.gray[400]} />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Share crypto details"
              style={styles.actionButton}
            >
              <Feather name="share" size={20} color={theme.colors.gray[400]} />
            </TouchableOpacity>
          </View>
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
    flexShrink: 1,
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
  priceSection: {
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  priceText: {
    fontSize: theme.fontSize['5xl'],
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
});

export default Details;
