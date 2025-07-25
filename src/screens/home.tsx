import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { useFetchCryptos } from '@/hooks/use-fetch-cryptos';

const Home = () => {
  const { data, isLoading, isError, error } = useFetchCryptos();

  const [filter, setFilter] = useState('');
  const [debouncedFilter, setDebouncedFilter] = useState('');

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

    if (!search) return true;

    return (
      item.name.toLowerCase().includes(search) ||
      item.symbol.toLowerCase().includes(search)
    );
  });

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
      <TextInput
        value={filter}
        onChangeText={setFilter}
        placeholder="Filter by name or symbol"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          marginBottom: 16,
        }}
        accessible={true}
        accessibilityLabel="Filter cryptocurrencies by name or symbol"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
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
            onPress={() => {}}
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
          </Pressable>
        )}
        ListEmptyComponent={<Text>No cryptocurrencies found.</Text>}
      />
    </View>
  );
};

export default Home;
