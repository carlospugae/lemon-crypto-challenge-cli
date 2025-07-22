import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface SearchInputProps {
  /**
   * The current value of the search input
   */
  value: string;
  /**
   * Callback when the input value changes
   */
  onChangeText: (text: string) => void;
  /**
   * Placeholder text for the input
   * @default "Search coins..."
   */
  placeholder?: string;
  /**
   * Additional styles for the container
   */
  style?: any;
  /**
   * Additional styles for the input
   */
  inputStyle?: any;
}

/**
 * SearchInput component with consistent styling and accessibility
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   placeholder="Search cryptocurrencies..."
 * />
 * ```
 */
const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search coins...',
  style,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.gray[400]}
        style={[styles.input, inputStyle]}
        accessible={true}
        accessibilityLabel="Search cryptocurrencies"
        accessibilityRole="search"
        accessibilityHint="Enter text to search for cryptocurrencies"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        textContentType="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
    backgroundColor: theme.colors.gray[50],
    borderWidth: 0,
    borderRadius: theme.borderRadius.xl,
    height: 40,
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[900],
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
});

export default SearchInput;
