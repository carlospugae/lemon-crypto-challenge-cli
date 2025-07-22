import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

interface SearchSkeletonProps {
  /**
   * Additional styles for the skeleton container
   */
  style?: any;
}

/**
 * SearchSkeleton component for displaying loading state that matches SearchInput structure
 * Uses animated opacity to create a shimmer effect
 *
 * @example
 * ```tsx
 * <SearchSkeleton />
 * ```
 */
const SearchSkeleton: React.FC<SearchSkeletonProps> = ({ style }) => {
  const animatedValue = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.7,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  return (
    <Animated.View
      style={[styles.container, { opacity: animatedValue }, style]}
    >
      <View style={styles.inputSkeleton} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputSkeleton: {
    height: 44,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },
});

export default SearchSkeleton;
