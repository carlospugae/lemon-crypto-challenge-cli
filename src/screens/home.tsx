import {
  View,
  FlatList,
  ActivityIndicator,
  Switch,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { useFetchCryptos } from '@/hooks/use-fetch-cryptos';
import { useFavoritesStore } from '@/store/favorites';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@/theme';
import { CryptoCard, SearchInput, Text } from '@/components';

type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Login: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Home = () => {
  const { data, isLoading, isError, error } = useFetchCryptos();
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedFilter(value);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedSetFilter(filter);

    return () => {
      debouncedSetFilter.cancel();
    };
  }, [filter, debouncedSetFilter]);

  const filteredData = data?.filter(item => {
    const search = debouncedFilter.trim().toLowerCase();

    const matchesFilter =
      !search ||
      item.name.toLowerCase().includes(search) ||
      item.symbol.toLowerCase().includes(search);

    const matchesFavorite = !showFavorites || isFavorite(item.id);

    return matchesFilter && matchesFavorite;
  });
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleGoToDetails = (id: string) => {
    navigation.navigate('Details', { id });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text variant="body" color="gray.600" style={styles.loadingText}>
          Loading top cryptocurrencies...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="body" color="error.600" style={styles.errorText}>
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
            value={filter}
            onChangeText={setFilter}
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
            <Text variant="bodySmall" fontWeight="medium" color="gray.700">
              Favorites
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CryptoCard
              crypto={item}
              isFavorite={isFavorite(item.id)}
              onPress={handleGoToDetails}
              onToggleFavorite={toggleFavorite}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text variant="body" color="gray.500" style={styles.emptyText}>
                No cryptocurrencies found.
              </Text>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[50],
  },
  errorText: {
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
    textAlign: 'center',
  },
});
export default Home;
