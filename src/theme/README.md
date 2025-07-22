# Theme System Documentation

This directory contains the comprehensive theme system for the LemonCryptoChallenge app, providing consistent design tokens across the application.

## Structure

```
src/theme/
├── index.ts          # Main theme tokens and types
├── utils.ts          # Utility functions for theme usage
└── README.md         # This documentation
```

## Design Tokens

### Colors

The color system includes:

- **Primary Colors**: Blue scale for primary actions and branding
- **Gray Scale**: Neutral colors for text, backgrounds, and borders
- **Semantic Colors**: Success (green), Error (red), Warning (yellow)
- **Base Colors**: White, black, and transparent

```typescript
import { theme } from '../theme';

// Access colors
theme.colors.primary[500]; // Primary blue
theme.colors.gray[100]; // Light gray
theme.colors.success[600]; // Success green
theme.colors.error[500]; // Error red
```

### Spacing

Consistent spacing scale from 4px to 64px:

```typescript
theme.spacing.xs; // 4px
theme.spacing.sm; // 8px
theme.spacing.md; // 12px
theme.spacing.lg; // 16px
theme.spacing.xl; // 20px
theme.spacing['2xl']; // 24px
// ... up to 64px
```

### Typography

Font sizes and weights:

```typescript
theme.fontSize.xs; // 12px
theme.fontSize.sm; // 14px
theme.fontSize.base; // 16px
theme.fontSize.lg; // 18px
// ... up to 60px

theme.fontWeight.normal; // 400
theme.fontWeight.medium; // 500
theme.fontWeight.semibold; // 600
theme.fontWeight.bold; // 700
```

### Border Radius

```typescript
theme.borderRadius.sm; // 4px
theme.borderRadius.md; // 8px
theme.borderRadius.lg; // 12px
theme.borderRadius.xl; // 16px
theme.borderRadius.full; // 9999px (circular)
```

### Shadows

Predefined shadow styles for elevation:

```typescript
theme.shadows.sm; // Light shadow
theme.shadows.md; // Medium shadow
theme.shadows.lg; // Large shadow
theme.shadows.xl; // Extra large shadow
```

## Utility Functions

### Color Utilities

```typescript
import { getColor, getNestedColor } from '../theme/utils';

// Get base colors
getColor('white'); // '#ffffff'

// Get nested colors
getNestedColor('primary.500'); // '#3b82f6'
getNestedColor('gray.100'); // '#f3f4f6'
```

### Spacing and Typography

```typescript
import { getSpacing, getFontSize, getFontWeight } from '../theme/utils';

getSpacing('lg'); // 16
getFontSize('base'); // 16
getFontWeight('bold'); // '700'
```

### Formatting Utilities

```typescript
import { formatPrice, formatMarketCap, getCryptoIcon } from '../theme/utils';

formatPrice(1234.56); // '$1,234.56'
formatMarketCap(1234567890); // '$1.23B'
getCryptoIcon('BTC'); // '₿'
```

## Usage in Components

### Basic Usage

```typescript
import { StyleSheet } from 'react-native';
import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[50],
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.gray[900],
  },
});
```

### Using Utility Functions

```typescript
import { getNestedColor, getSpacing } from '../theme/utils';

const styles = StyleSheet.create({
  button: {
    backgroundColor: getNestedColor('primary.500'),
    paddingHorizontal: getSpacing('lg'),
    paddingVertical: getSpacing('md'),
  },
});
```

### Shadow Usage

```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.md, // Spread shadow properties
  },
});
```

## Best Practices

1. **Always use theme tokens** instead of hardcoded values
2. **Use utility functions** for complex color access
3. **Maintain consistency** by reusing existing tokens
4. **Use semantic colors** for different states (success, error, warning)
5. **Follow the spacing scale** for consistent layouts
6. **Use appropriate font sizes** for hierarchy

## Adding New Tokens

When adding new design tokens:

1. Add them to the appropriate section in `index.ts`
2. Export the type if needed
3. Add utility functions in `utils.ts` if required
4. Update this documentation
5. Ensure all components use the new tokens consistently

## Type Safety

The theme system is fully typed, providing:

- Autocomplete for all token names
- Type checking for color paths
- IntelliSense support in IDEs
- Compile-time error detection

This ensures consistency and prevents runtime errors from typos or invalid token names.
