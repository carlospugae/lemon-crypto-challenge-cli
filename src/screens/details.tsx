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
import {
  CryptoHeader,
  MarketStats,
  SupplyInfo,
  DetailsSkeleton,
} from '../components';
import { CryptoDetails } from '@/types/crypto';

/**
 * Type for the crypto details from CoinMarketCap
 */

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
    return <DetailsSkeleton />;
  }

  if (!crypto) {
    return (
      <View style={styles.centered}>
        <Text accessibilityRole="text">No data available.</Text>
      </View>
    );
  }

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
      <CryptoHeader crypto={crypto} />
      <MarketStats crypto={crypto} />
      <SupplyInfo crypto={crypto} />
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
