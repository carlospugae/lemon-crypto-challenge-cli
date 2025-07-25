import React from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleSheet,
} from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { theme, FontSizeToken, FontWeightToken, ColorToken } from '@/theme';

/**
 * Text component variants for different use cases
 */
export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'overline'
  | 'button'
  | 'label';

/**
 * Text component props extending React Native's TextProps
 */
export interface TextProps extends RNTextProps {
  /** Text variant for consistent typography */
  variant?: TextVariant;
  /** Font size token from theme */
  fontSize?: FontSizeToken;
  /** Font weight token from theme */
  fontWeight?: FontWeightToken;
  /** Text color token from theme (e.g., "primary.500", "gray.900", "#ff0000") */
  color?: string;
  /** Line height multiplier */
  lineHeight?: number;
  /** Text alignment */
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  /** Whether text should be truncated with ellipsis */
  ellipsize?: boolean;
  /** Number of lines to show before truncating */
  numberOfLines?: number;
  /** Whether text should be selectable */
  selectable?: boolean;
  /** Whether text should be disabled (grayed out) */
  disabled?: boolean;
  /** Custom style to merge with component styles */
  style?: RNTextProps['style'];
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Default text styles for each variant
 */
const getVariantStyles = (variant: TextVariant) => {
  switch (variant) {
    case 'h1':
      return {
        fontSize: scale(theme.fontSize['4xl']),
        fontWeight: theme.fontWeight.bold,
        lineHeight: scale(theme.fontSize['4xl'] * theme.lineHeight.tight),
      };
    case 'h2':
      return {
        fontSize: scale(theme.fontSize['3xl']),
        fontWeight: theme.fontWeight.bold,
        lineHeight: scale(theme.fontSize['3xl'] * theme.lineHeight.tight),
      };
    case 'h3':
      return {
        fontSize: scale(theme.fontSize['2xl']),
        fontWeight: theme.fontWeight.semibold,
        lineHeight: scale(theme.fontSize['2xl'] * theme.lineHeight.snug),
      };
    case 'h4':
      return {
        fontSize: scale(theme.fontSize.xl),
        fontWeight: theme.fontWeight.semibold,
        lineHeight: scale(theme.fontSize.xl * theme.lineHeight.snug),
      };
    case 'h5':
      return {
        fontSize: scale(theme.fontSize.lg),
        fontWeight: theme.fontWeight.medium,
        lineHeight: scale(theme.fontSize.lg * theme.lineHeight.normal),
      };
    case 'h6':
      return {
        fontSize: scale(theme.fontSize.base),
        fontWeight: theme.fontWeight.medium,
        lineHeight: scale(theme.fontSize.base * theme.lineHeight.normal),
      };
    case 'body':
      return {
        fontSize: scale(theme.fontSize.base),
        fontWeight: theme.fontWeight.normal,
        lineHeight: scale(theme.fontSize.base * theme.lineHeight.normal),
      };
    case 'bodySmall':
      return {
        fontSize: scale(theme.fontSize.sm),
        fontWeight: theme.fontWeight.normal,
        lineHeight: scale(theme.fontSize.sm * theme.lineHeight.normal),
      };
    case 'caption':
      return {
        fontSize: scale(theme.fontSize.xs),
        fontWeight: theme.fontWeight.normal,
        lineHeight: scale(theme.fontSize.xs * theme.lineHeight.normal),
      };
    case 'overline':
      return {
        fontSize: scale(theme.fontSize.xs),
        fontWeight: theme.fontWeight.medium,
        lineHeight: scale(theme.fontSize.xs * theme.lineHeight.normal),
        textTransform: 'uppercase' as const,
        letterSpacing: moderateScale(1),
      };
    case 'button':
      return {
        fontSize: scale(theme.fontSize.base),
        fontWeight: theme.fontWeight.medium,
        lineHeight: scale(theme.fontSize.base * theme.lineHeight.normal),
      };
    case 'label':
      return {
        fontSize: scale(theme.fontSize.sm),
        fontWeight: theme.fontWeight.medium,
        lineHeight: scale(theme.fontSize.sm * theme.lineHeight.normal),
      };
    default:
      return {
        fontSize: scale(theme.fontSize.base),
        fontWeight: theme.fontWeight.normal,
        lineHeight: scale(theme.fontSize.base * theme.lineHeight.normal),
      };
  }
};

/**
 * Get color value from theme or use provided color string
 */
const getColorValue = (color?: string): string => {
  if (!color) return theme.colors.gray[900];

  // Handle nested color tokens (e.g., "primary.500")
  if (color.includes('.')) {
    const [category, shade] = color.split('.');
    const colorCategory = theme.colors[category as keyof typeof theme.colors];
    if (
      colorCategory &&
      typeof colorCategory === 'object' &&
      shade in colorCategory
    ) {
      return (colorCategory as any)[shade];
    }
  }

  // Handle direct color tokens
  if (color in theme.colors) {
    const colorValue = theme.colors[color as keyof typeof theme.colors];
    if (typeof colorValue === 'string') {
      return colorValue;
    }
  }

  // Return the color as is (could be a hex, rgb, etc.)
  return color;
};

const Text: React.FC<TextProps> = React.forwardRef<RNText, TextProps>(
  (
    {
      variant = 'body',
      fontSize,
      fontWeight,
      color,
      lineHeight,
      align = 'auto',
      ellipsize = false,
      numberOfLines,
      selectable = false,
      disabled = false,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    // Get base styles for the variant
    const variantStyles = getVariantStyles(variant);

    // Override with custom props if provided
    const customStyles = {
      fontSize: fontSize
        ? scale(theme.fontSize[fontSize])
        : variantStyles.fontSize,
      fontWeight: fontWeight
        ? theme.fontWeight[fontWeight]
        : variantStyles.fontWeight,
      lineHeight: lineHeight
        ? scale(variantStyles.fontSize * lineHeight)
        : variantStyles.lineHeight,
      textAlign: align,
      color: disabled ? theme.colors.gray[400] : getColorValue(color),
    };

    // Handle ellipsis
    const ellipsisProps = ellipsize
      ? {
          numberOfLines: numberOfLines || 1,
          ellipsizeMode: 'tail' as const,
        }
      : {};

    return (
      <RNText
        ref={ref}
        style={[variantStyles, customStyles, style]}
        selectable={selectable}
        {...ellipsisProps}
        {...props}
      >
        {children}
      </RNText>
    );
  },
);

Text.displayName = 'Text';

export default Text;
