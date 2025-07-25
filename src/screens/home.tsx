import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
  Switch,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { useFetchCryptos } from '@/hooks/use-fetch-cryptos';
import { useFavoritesStore } from '@/store/favorites';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

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
  console.log(useFavoritesStore.toString());
  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorite = useFavoritesStore(state => state.toggleFavorite);
  const isFavorite = useFavoritesStore(state => state.isFavorite);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading top cryptocurrencies...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error?.message || 'Failed to load data.'}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
      >
        <TextInput
          value={filter}
          onChangeText={setFilter}
          placeholder="Filter by name or symbol"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginRight: 8,
          }}
          accessible={true}
          accessibilityLabel="Filter cryptocurrencies by name or symbol"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch
            value={showFavorites}
            onValueChange={setShowFavorites}
            accessibilityLabel="Show only favorites"
          />
          <Text style={{ marginLeft: 4 }}>Show Favorites</Text>
        </View>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${item.name} (${
              item.symbol
            }), Price: $${item.quote.USD.price.toFixed(
              2,
            )}, Market Cap: $${item.quote.USD.market_cap.toLocaleString()}`}
            tabIndex={0}
            onPress={() => handleGoToDetails(item.id)}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                {item.name} ({item.symbol})
              </Text>
              <Text>Price: ${item.quote.USD.price.toFixed(2)}</Text>
              <Text>
                Market Cap: ${item.quote.USD.market_cap.toLocaleString()}
              </Text>
            </View>
            <Pressable
              onPress={() => toggleFavorite(item.id)}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                isFavorite(item.id)
                  ? `Unfavorite ${item.name}`
                  : `Favorite ${item.name}`
              }
              style={{ marginLeft: 12 }}
            >
              <Text style={{ fontSize: 24 }}>
                {isFavorite(item.id) ? '★' : '☆'}
              </Text>
            </Pressable>
          </Pressable>
        )}
        ListEmptyComponent={<Text>No cryptocurrencies found.</Text>}
      />
    </View>
  );
};

export default Home;
