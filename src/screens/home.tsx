import {
  View,
  Switch,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { LegendList } from '@legendapp/list';
import { useFetchCryptos } from '@/hooks/use-fetch-cryptos';
import { useFavoritesStore } from '@/store/favorites';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@/theme';
import {
  CryptoCard,
  CryptoCardSkeleton,
  SearchInput,
  SearchSkeleton,
  Text,
} from '@/components';
import { CryptoToken } from '@/types/types';

type TabParamList = {
  Home: undefined;
  Profile: undefined;
};

type RootStackParamList = {
  Tabs: undefined;
  Details: { id: string };
  Login: undefined;
};

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const Home = () => {
  const { data, isLoading, isError, error } = useFetchCryptos();
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const favorites = useFavoritesStore(state => state.favorites);

  const isFavorite = useMemo(() => {
    return (id: string) => favorites.includes(id);
  }, [favorites]);

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

  const filteredData = useMemo(() => {
    return data?.filter(item => {
      const search = debouncedFilter.trim().toLowerCase();

      const matchesFilter =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.symbol.toLowerCase().includes(search);

      const matchesFavorite = !showFavorites || isFavorite(item.id);

      return matchesFilter && matchesFavorite;
    });
  }, [data, debouncedFilter, showFavorites, isFavorite]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleGoToDetails = (id: string) => {
    navigation.navigate('Details', { id });
  };

  const handleGoToProfile = () => {
    navigation.navigate('Profile');
  };

  const renderItem = ({ item }: { item: CryptoToken }) => (
    <CryptoCard
      crypto={item}
      onPress={handleGoToDetails}
      onToggleFavorite={toggleFavorite}
    />
  );

  const keyExtractor = (item: CryptoToken) => item.id;

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SearchSkeleton />
        <View style={styles.listContainer}>
          <FlatList
            data={Array.from({ length: 10 }, (_, index) => ({
              id: index.toString(),
            }))}
            keyExtractor={item => item.id}
            renderItem={() => <CryptoCardSkeleton />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
        <LegendList
          data={filteredData || []}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  profileButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.primary[50],
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
