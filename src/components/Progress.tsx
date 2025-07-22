import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

/**
 * Simple progress bar component
 * @param value - Progress value (0-100)
 * @param color - Bar color
 * @param style - Additional style
 * @example
 * <Progress value={75} color="#00f" />
 */
export const Progress: React.FC<{
  value: number;
  color?: string;
  style?: object;
}> = ({ value, color = theme.colors.primary[500], style }) => (
  <View
    style={[styles.track, style]}
    accessibilityRole="progressbar"
    accessibilityValue={{ now: value, min: 0, max: 100 }}
  >
    <View
      style={[styles.bar, { width: `${value}%`, backgroundColor: color }]}
    />
  </View>
);

const styles = StyleSheet.create({
  track: {
    height: 8,
    backgroundColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
});
