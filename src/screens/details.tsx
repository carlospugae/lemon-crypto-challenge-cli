import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { CMC_API_KEY } from '@env';

// Define the type for the crypto details from CoinMarketCap
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

// Define the type for route params
interface DetailsScreenParams {
  id: string;
}

type DetailsRouteProp = RouteProp<{ Details: DetailsScreenParams }, 'Details'>;

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

const Details = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  const [crypto, setCrypto] = useState<CryptoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
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
