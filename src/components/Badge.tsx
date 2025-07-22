import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface BadgeProps {
  /**
   * The text content to display in the badge
   */
  children: React.ReactNode;
  /**
   * The variant style of the badge
   * @default 'secondary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  /**
   * Additional styles to apply to the badge container
   */
  style?: any;
  /**
   * Additional styles to apply to the badge text
   */
  textStyle?: any;
}

/**
 * Badge component for displaying small status indicators or labels
 *
 * @example
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="success">Active</Badge>
 * ```
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  style,
  textStyle,
}) => {
  // Debug: Log children prop
  // eslint-disable-next-line no-console
  console.log('Badge children:', children);
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: theme.colors.primary[100],
            borderColor: theme.colors.primary[200],
          },
          text: {
            color: theme.colors.primary[700],
          },
        };
      case 'success':
        return {
          container: {
            backgroundColor: theme.colors.success[100],
            borderColor: theme.colors.success[200],
          },
          text: {
            color: theme.colors.success[700],
          },
        };
      case 'error':
        return {
          container: {
            backgroundColor: theme.colors.error[100],
            borderColor: theme.colors.error[200],
          },
          text: {
            color: theme.colors.error[700],
          },
        };
      case 'warning':
        return {
          container: {
            backgroundColor: theme.colors.warning[100],
            borderColor: theme.colors.warning[200],
          },
          text: {
            color: theme.colors.warning[700],
          },
        };
      case 'secondary':
      default:
        return {
          container: {
            backgroundColor: theme.colors.gray[200],
            borderColor: theme.colors.gray[300],
          },
          text: {
            color: theme.colors.gray[800],
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  console.log(variantStyles);
  return (
    <View
      style={[styles.container, variantStyles.container, style]}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel={`Badge: ${children}`}
    >
      <Text style={[styles.text, variantStyles.text, textStyle]}>
        {children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.medium,
  },
});

export default Badge;
