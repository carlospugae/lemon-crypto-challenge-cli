import React from 'react';
import { View, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { theme } from '../theme';
import {
  CryptoHeader,
  PriceDisplay,
  MarketStats,
  SupplyInfo,
  Text,
  DetailsSkeleton,
} from '../components';
import { useFavoritesStore } from '@/store/favorites';
import { useFetchCryptoDetails } from '@/hooks/use-fetch-crypto-details';

interface DetailsScreenParams {
  id: string;
}

type DetailsRouteProp = RouteProp<{ Details: DetailsScreenParams }, 'Details'>;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;

  const favorites = useFavoritesStore(state => state.favorites);
  const isFavorite = favorites.includes(id);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const {
    data: crypto,
    isLoading: loading,
    isRefetching: refreshing,
    refetch,
    error,
  } = useFetchCryptoDetails(id);

  const handleRefresh = () => {
    refetch();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(id);
  };

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text variant="body" color="error.600" accessibilityRole="text">
          Error loading crypto details. Please try again.
        </Text>
      </View>
    );
  }

  if (!crypto) {
    return (
      <View style={styles.centered}>
        <Text variant="body" accessibilityRole="text">
          No data available.
        </Text>
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
      <View style={styles.card}>
        <CryptoHeader
          crypto={{
            name: crypto.name,
            symbol: crypto.symbol,
            cmc_rank: crypto.cmc_rank,
          }}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
        <PriceDisplay
          price={crypto.quote.USD.price}
          percentChange24h={crypto.quote.USD.percent_change_24h}
        />
      </View>

      <View style={styles.card}>
        <MarketStats
          marketCap={crypto.quote.USD.market_cap}
          volume24h={crypto.quote.USD.volume_24h}
        />
      </View>

      <View style={styles.card}>
        <SupplyInfo
          circulatingSupply={crypto.circulating_supply}
          totalSupply={crypto.total_supply}
          maxSupply={crypto.max_supply}
          symbol={crypto.symbol}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: theme.spacing['2xl'],
    flexGrow: 1,
    gap: theme.spacing['2xl'],
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
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
    gap: theme.spacing['2xl'],
    ...theme.shadows.md,
  },
});

export default Details;
