import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { theme } from '../theme';
import { useFavoritesStore } from '../store/useFavoritesStore';

import {
  CryptoHeader,
  MarketStats,
  SupplyInfo,
  DetailsSkeleton,
} from '../components';
import { useCryptoDetailsQuery } from '../hooks/useCryptoDetailsQuery';

interface DetailsScreenParams {
  id: string;
}

type DetailsRouteProp = RouteProp<{ Details: DetailsScreenParams }, 'Details'>;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;

  // Favorites store
  const isFavorite = useFavoritesStore(state => state.isFavorite(id));
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);

  const {
    data: crypto,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useCryptoDetailsQuery(id);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  if (error || !crypto) {
    return (
      <View style={styles.centered}>
        <Text accessibilityRole="text">No data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
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
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing['2xl'],
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
});

export default Details;
