import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface ProgressProps {
  value: number;
  color?: string;
  style?: object;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  color = theme.colors.primary[500],
  style,
}) => (
  <View
    style={[progressStyles.track, style]}
    accessibilityRole="progressbar"
    accessibilityValue={{ now: value, min: 0, max: 100 }}
  >
    <View
      style={[
        progressStyles.bar,
        { width: `${value}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const progressStyles = StyleSheet.create({
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

export default Progress;
