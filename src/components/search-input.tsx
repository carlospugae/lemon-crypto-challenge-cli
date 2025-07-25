import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { theme } from '@/theme';

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: any;
  inputStyle?: any;
}

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
