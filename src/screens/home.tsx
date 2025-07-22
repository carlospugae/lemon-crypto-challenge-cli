import {
  View,
  Text,
  FlatList,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import { useCoinMarketCapTop100 } from '../hooks/useCoinMarketCapTop100';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { theme } from '../theme';
import {
  CryptoCard,
  CryptoSkeleton,
  SearchInput,
  SearchSkeleton,
} from '../components';

type RootStackParamList = {
  Home: undefined;
  Details: { id: string };
  Login: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type DisplayItem =
  | {
      id: string;
      name: string;
      symbol: string;
      price: number;
      marketCap: number;
      change24h: number;
    }
  | { id: string; type: 'skeleton' };

/**
 * Error state component with retry functionality and helpful information
 */
const ErrorState = ({
  error,
  onRetry,
  isRetrying,
}: {
  error?: Error;
  onRetry: () => void;
  isRetrying: boolean;
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const spinValue = useRef(new Animated.Value(0)).current;

  /**
   * Handle navigation to home screen
   */
  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  /**
   * Start spinning animation when retrying
   */
  useEffect(() => {
    if (isRetrying) {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      );
      spinAnimation.start();
      return () => spinAnimation.stop();
    } else {
      spinValue.setValue(0);
    }
  }, [isRetrying, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView
      style={styles.errorScrollContainer}
      contentContainerStyle={styles.errorScrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Error State Content */}
      <View style={styles.errorContentContainer}>
        <View style={styles.errorCard}>
          {/* Error Icon */}
          <View style={styles.errorIconContainer}>
            <Icon name="wifi-off" size={40} color={theme.colors.error[500]} />
          </View>

          {/* Error Title */}
          <Text style={styles.errorTitle}>Connection Failed</Text>

          {/* Error Description */}
          <View style={styles.errorDescriptionContainer}>
            <Text
              style={styles.errorDescription}
              numberOfLines={0}
              allowFontScaling={true}
            >
              We're having trouble loading your cryptocurrency data.{'\n'}Please
              check your internet connection and try again.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.errorActionsContainer}>
            <TouchableOpacity
              style={[
                styles.errorPrimaryButton,
                isRetrying && styles.errorPrimaryButtonDisabled,
              ]}
              onPress={onRetry}
              disabled={isRetrying}
              accessible={true}
              accessibilityLabel="Try again to load cryptocurrency data"
              accessibilityRole="button"
            >
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Icon name="refresh-cw" size={16} color={theme.colors.white} />
              </Animated.View>
              <Text style={styles.errorPrimaryButtonText}>
                {isRetrying ? 'Retrying...' : 'Try Again'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.errorSecondaryButton}
              onPress={handleGoHome}
              accessible={true}
              accessibilityLabel="Go to home screen"
              accessibilityRole="button"
            >
              <Icon name="home" size={16} color={theme.colors.gray[600]} />
              <Text style={styles.errorSecondaryButtonText}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Additional Help Section */}
      <View style={styles.helpSectionContainer}>
        <View style={styles.helpCard}>
          <View style={styles.helpHeader}>
            <View style={styles.helpIconContainer}>
              <Icon
                name="alert-circle"
                size={20}
                color={theme.colors.primary[600]}
              />
            </View>
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Still having trouble?</Text>
              <Text style={styles.helpDescription}>
                If the problem persists, try these troubleshooting steps:
              </Text>

              <View style={styles.helpStepsContainer}>
                <View style={styles.helpStep}>
                  <View style={styles.helpStepBullet} />
                  <Text style={styles.helpStepText}>
                    Check your internet connection
                  </Text>
                </View>
                <View style={styles.helpStep}>
                  <View style={styles.helpStepBullet} />
                  <Text style={styles.helpStepText}>Restart the app</Text>
                </View>
                <View style={styles.helpStep}>
                  <View style={styles.helpStepBullet} />
                  <Text style={styles.helpStepText}>Check for app updates</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * Home screen component displaying the list of top cryptocurrencies
 * Features search, filtering, and favorites functionality
 */
const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { data, isLoading, isError, error, isFetching, refetch } =
    useCoinMarketCapTop100();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

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

  /**
   * Handle retry functionality with loading state
   */
  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await refetch();
    } finally {
      setIsRetrying(false);
    }
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

  // Add skeleton items at the end when fetching
  const displayData: DisplayItem[] =
    isFetching && !isLoading
      ? [
          ...(transformedData || []),
          ...Array.from({ length: 3 }, (_, index) => ({
            id: `skeleton-${index}`,
            type: 'skeleton' as const,
          })),
        ]
      : transformedData || [];

  // Show full skeleton loading when initially loading
  if (isLoading) {
    return (
      <View style={styles.container}>
        {/* Search and Filter Header */}
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <SearchSkeleton />
            <View style={styles.filterContainer}>
              <Switch
                value={false}
                onValueChange={() => {}}
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

        {/* Skeleton List */}
        <View style={styles.listContainer}>
          <FlatList
            data={Array.from({ length: 10 }, (_, index) => ({
              id: `skeleton-${index}`,
            }))}
            keyExtractor={item => item.id}
            renderItem={() => <CryptoSkeleton />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  // Show error state when there's an error
  if (isError) {
    return (
      <ErrorState
        error={error || undefined}
        onRetry={handleRetry}
        isRetrying={isRetrying}
      />
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
            {isFetching && !isLoading && (
              <View style={styles.refreshIndicator}>
                <Text style={styles.refreshText}>Refreshing...</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Crypto List */}
      <View style={styles.listContainer}>
        <FlatList
          data={displayData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            // Check if this is a skeleton item
            if ('type' in item && item.type === 'skeleton') {
              return <CryptoSkeleton />;
            }

            // Regular crypto card - TypeScript knows this is a crypto item now
            const cryptoItem = item as {
              id: string;
              name: string;
              symbol: string;
              price: number;
              marketCap: number;
              change24h: number;
            };
            return (
              <CryptoCard
                crypto={cryptoItem}
                isFavorite={isFavorite(cryptoItem.id)}
                onPress={handleCryptoPress}
                onToggleFavorite={handleToggleFavorite}
              />
            );
          }}
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
  errorScrollContainer: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  errorScrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing['3xl'],
  },
  errorContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
  },
  errorCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing['2xl'],
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    minHeight: 300,
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  errorIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: theme.colors.error[50],
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  errorTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  errorDescriptionContainer: {
    marginBottom: theme.spacing['2xl'],
    paddingHorizontal: theme.spacing.sm,
  },
  errorDescription: {
    fontSize: theme.fontSize.lg,
    color: theme.colors.gray[800],
    textAlign: 'center',
    lineHeight: theme.lineHeight.relaxed,
    fontWeight: theme.fontWeight.medium,
  },
  errorActionsContainer: {
    width: '100%',
    gap: theme.spacing.md,
  },
  errorPrimaryButton: {
    backgroundColor: theme.colors.primary[600],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  errorPrimaryButtonDisabled: {
    backgroundColor: theme.colors.gray[400],
  },
  errorPrimaryButtonText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  errorSecondaryButton: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: theme.borderRadius.xl,
    paddingVertical: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.transparent,
  },
  errorSecondaryButtonText: {
    color: theme.colors.gray[600],
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
  },
  helpSectionContainer: {
    marginTop: theme.spacing.lg,
  },
  helpCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    ...theme.shadows.sm,
    borderWidth: 1,
    borderColor: theme.colors.gray[100],
  },
  helpHeader: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  helpIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary[50],
    borderRadius: theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.gray[900],
    marginBottom: theme.spacing.sm,
  },
  helpDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[600],
    marginBottom: theme.spacing.lg,
  },
  helpStepsContainer: {
    gap: theme.spacing.sm,
  },
  helpStep: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  helpStepBullet: {
    width: 6,
    height: 6,
    backgroundColor: theme.colors.gray[400],
    borderRadius: theme.borderRadius.full,
  },
  helpStepText: {
    fontSize: theme.fontSize.sm,
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
  refreshIndicator: {
    marginLeft: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.primary[100],
    borderRadius: theme.borderRadius.full,
  },
  refreshText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary[600],
    fontWeight: theme.fontWeight.medium,
  },
});

export default Home;
