import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Switch,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCoinMarketCapTop100 } from '../hooks/useCoinMarketCapTop100';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { theme } from '../theme';
import { CryptoCard, SearchInput } from '../components';

type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Login: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

/**
 * Home screen component displaying the list of top cryptocurrencies
 * Features search, filtering, and favorites functionality
 */
const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, isLoading, isError, error } = useCoinMarketCapTop100();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const favorites = useFavoritesStore(state => state.favorites);
  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);

  /**
   * Handle navigation to crypto details screen
   * @param id - The cryptocurrency ID
   */
  const handleCryptoPress = (id: string) => {
    navigation.navigate('Details', { id });
  };

  /**
   * Handle toggling favorite status for a cryptocurrency
   * @param id - The cryptocurrency ID
   */
  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
  };

  // Debounce search query to avoid excessive filtering
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Filter data based on search query and favorites toggle
  const filteredData = data?.filter(item => {
    const search = debouncedSearchQuery.trim().toLowerCase();
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.symbol.toLowerCase().includes(search);
    const matchesFavorite = !showFavorites || isFavorite(item.id);
    return matchesSearch && matchesFavorite;
  });

  // Transform data for CryptoCard component
  const transformedData = filteredData?.map(item => ({
    id: item.id,
    name: item.name,
    symbol: item.symbol,
    price: item.quote.USD.price,
    marketCap: item.quote.USD.market_cap,
    change24h: item.quote.USD.percent_change_24h,
  }));

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={styles.loadingText}>Loading top cryptocurrencies...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error: {error?.message || 'Failed to load data.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search and Filter Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search coins..."
          />
          <View style={styles.filterContainer}>
            <Switch
              value={showFavorites}
              onValueChange={setShowFavorites}
              trackColor={{
                false: theme.colors.gray[300],
                true: theme.colors.primary[600],
              }}
              thumbColor={theme.colors.white}
              accessible={true}
              accessibilityLabel="Show only favorites"
              accessibilityRole="switch"
            />
            <Text style={styles.filterLabel}>Favorites</Text>
          </View>
        </View>
      </View>

      {/* Crypto List */}
      <View style={styles.listContainer}>
        <FlatList
          data={transformedData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CryptoCard
              crypto={item}
              isFavorite={isFavorite(item.id)}
              onPress={handleCryptoPress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No cryptocurrencies found.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[600],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
  errorText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.error[600],
    textAlign: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  filterLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.gray[700],
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing['3xl'],
  },
  emptyText: {
    fontSize: theme.fontSize.base,
    color: theme.colors.gray[500],
    textAlign: 'center',
  },
});

export default Home;
