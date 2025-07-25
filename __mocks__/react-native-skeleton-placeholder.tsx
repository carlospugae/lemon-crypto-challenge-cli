import React from 'react';
import { View } from 'react-native';

/**
 * Mock component for react-native-skeleton-placeholder
 * Used in tests to avoid Jest configuration issues
 */
interface SkeletonPlaceholderProps {
  backgroundColor?: string;
  highlightColor?: string;
  children?: React.ReactNode;
}

interface SkeletonItemProps {
  children?: React.ReactNode;
  [key: string]: any;
}

const SkeletonPlaceholder: React.FC<SkeletonPlaceholderProps> & {
  Item: React.FC<SkeletonItemProps>;
} = ({ children, backgroundColor = '#e5e7eb', highlightColor = '#f3f4f6' }) => {
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: 4,
        padding: 8,
      }}
      testID="skeleton-placeholder"
    >
      {children}
    </View>
  );
};

SkeletonPlaceholder.Item = ({ children, ...props }: SkeletonItemProps) => {
  return (
    <View
      style={{
        backgroundColor: '#d1d5db',
        borderRadius: 4,
        ...props,
      }}
      testID="skeleton-item"
    >
      {children}
    </View>
  );
};

export default SkeletonPlaceholder;
