import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useFetchCryptoDetails } from '@/hooks/use-fetch-crypto-details';

interface DetailsScreenParams {
  id: string;
}

type DetailsRouteProp = RouteProp<{ Details: DetailsScreenParams }, 'Details'>;

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;

  const {
    data: crypto,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useFetchCryptoDetails(id);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          accessibilityLabel="Loading crypto details"
        />
      </View>
    );
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
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={handleRefresh}
          accessibilityLabel="Pull to refresh crypto details"
        />
      }
    >
      <Text style={styles.title} accessibilityRole="header">
        {crypto.name} ({crypto.symbol})
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Rank: {crypto.cmc_rank}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Price: ${crypto.quote.USD.price.toFixed(2)}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Market Cap: ${crypto.quote.USD.market_cap.toLocaleString()}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Volume (24Hr): ${crypto.quote.USD.volume_24h.toLocaleString()}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Change (24Hr): {crypto.quote.USD.percent_change_24h.toFixed(2)}%
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Circulating Supply: {crypto.circulating_supply.toLocaleString()}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Total Supply: {crypto.total_supply.toLocaleString()}
      </Text>
      <Text style={styles.detail} accessibilityRole="text">
        Max Supply:{' '}
        {crypto.max_supply ? crypto.max_supply.toLocaleString() : 'N/A'}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default Details;
