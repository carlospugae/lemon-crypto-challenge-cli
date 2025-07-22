import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React from 'react';
import { useCoinMarketCapTop100 } from '../hooks/useCoinMarketCapTop100';

const Home = () => {
  const { data, isLoading, isError, error } = useCoinMarketCapTop100();

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
      <FlatList
        data={data}
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
