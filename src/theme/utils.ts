/**
 * Theme utility functions for type-safe theme access
 */

import {
  theme,
  Theme,
  ColorToken,
  SpacingToken,
  BorderRadiusToken,
  FontSizeToken,
  FontWeightToken,
} from './index';

/**
 * Get a color value from the theme
 * @param color - The color token to retrieve
 * @returns The color value
 */
export const getColor = (color: ColorToken): string => {
  const colorValue = theme.colors[color];
  return typeof colorValue === 'string' ? colorValue : theme.colors.white;
};

/**
 * Get a nested color value from the theme (e.g., 'primary.500')
 * @param colorPath - The color path in format 'category.shade'
 * @returns The color value
 */
export const getNestedColor = (colorPath: string): string => {
  const [category, shade] = colorPath.split('.');
  const colorCategory = theme.colors[category as keyof typeof theme.colors];

  if (typeof colorCategory === 'object' && shade && colorCategory !== null) {
    const nestedColor = (colorCategory as Record<string, string>)[shade];
    if (nestedColor) {
      return nestedColor;
    }
  }

  return typeof colorCategory === 'string' ? colorCategory : theme.colors.white;
};

/**
 * Get a spacing value from the theme
 * @param spacing - The spacing token to retrieve
 * @returns The spacing value in pixels
 */
export const getSpacing = (spacing: SpacingToken): number => {
  return theme.spacing[spacing];
};

/**
 * Get a border radius value from the theme
 * @param radius - The border radius token to retrieve
 * @returns The border radius value in pixels
 */
export const getBorderRadius = (radius: BorderRadiusToken): number => {
  return theme.borderRadius[radius];
};

/**
 * Get a font size value from the theme
 * @param size - The font size token to retrieve
 * @returns The font size value in pixels
 */
export const getFontSize = (size: FontSizeToken): number => {
  return theme.fontSize[size];
};

/**
 * Get a font weight value from the theme
 * @param weight - The font weight token to retrieve
 * @returns The font weight value
 */
export const getFontWeight = (weight: FontWeightToken): string => {
  return theme.fontWeight[weight];
};

/**
 * Get a shadow style from the theme
 * @param shadow - The shadow token to retrieve
 * @returns The shadow style object
 */
export const getShadow = (shadow: keyof typeof theme.shadows) => {
  return theme.shadows[shadow];
};

/**
 * Create a gradient color array for React Native LinearGradient
 * @param startColor - The starting color path
 * @param endColor - The ending color path
 * @returns Array of colors for LinearGradient
 */
export const createGradient = (
  startColor: string,
  endColor: string,
): string[] => {
  return [getNestedColor(startColor), getNestedColor(endColor)];
};

/**
 * Format price with proper currency formatting
 * @param price - The price to format
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  if (price >= 1) {
    return `$${price.toLocaleString()}`;
  } else if (price >= 0.01) {
    return `$${price.toLocaleString()}`;
  } else {
    return `$${price.toLocaleString()}`;
  }
};

/**
 * Format market cap with proper abbreviation
 * @param marketCap - The market cap value
 * @returns Formatted market cap string
 */
export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else if (marketCap >= 1e3) {
    return `$${(marketCap / 1e3).toFixed(2)}K`;
  } else {
    return `$${marketCap.toFixed(2)}`;
  }
};

/**
 * Get crypto icon emoji based on symbol
 * @param symbol - The cryptocurrency symbol
 * @returns Emoji icon for the crypto
 */
export const getCryptoIcon = (symbol: string): string => {
  const iconMap: Record<string, string> = {
    BTC: '₿',
    ETH: 'Ξ',
    USDT: '₮',
    USDC: '💵',
    BNB: '🟡',
    XRP: '✖',
    ADA: '₳',
    SOL: '◎',
    DOT: '●',
    DOGE: '🐕',
    AVAX: '❄',
    MATIC: '🔷',
    LINK: '🔗',
    UNI: '🦄',
    LTC: 'Ł',
    BCH: '₿',
    XLM: '⭐',
    VET: '🔷',
    FIL: '📁',
    ATOM: '⚛',
  };

  return iconMap[symbol.toUpperCase()] || '🪙';
};
