import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '@/theme';

const SearchSkeleton: React.FC = () => {
  return (
    <View style={styles.header} testID="search-skeleton-container">
      <SkeletonPlaceholder
        backgroundColor={theme.colors.gray[200]}
        highlightColor={theme.colors.gray[100]}
      >
        <View style={styles.searchContainer}>
          {/* Search Input */}
          <SkeletonPlaceholder.Item
            width={200}
            height={40}
            borderRadius={theme.borderRadius.lg}
            flex={1}
          />

          {/* Filter Container */}
          <View style={styles.filterContainer}>
            {/* Switch */}
            <SkeletonPlaceholder.Item
              width={40}
              height={24}
              borderRadius={theme.borderRadius.full}
              marginRight={theme.spacing.sm}
            />

            {/* Filter Label */}
            <SkeletonPlaceholder.Item
              width={60}
              height={14}
              borderRadius={theme.borderRadius.sm}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchSkeleton;
