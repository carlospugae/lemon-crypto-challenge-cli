import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '../theme';

interface CryptoSkeletonProps {
  /**
   * Additional styles for the skeleton container
   */
  style?: object;
}

/**
 * CryptoSkeleton component for displaying loading state that matches CryptoCard structure
 * Uses react-native-skeleton-placeholder for best-practice skeletons
 *
 * @example
 * ```tsx
 * <CryptoSkeleton />
 * ```
 */
const CryptoSkeleton: React.FC<CryptoSkeletonProps> = ({ style }) => {
  return (
    <SkeletonPlaceholder
      backgroundColor={theme.colors.gray[200]}
      highlightColor={theme.colors.gray[100]}
      borderRadius={theme.borderRadius.sm}
      speed={800}
    >
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['2xl'],
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.md,
          ...theme.shadows.sm,
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...style,
        }}
      >
        <SkeletonPlaceholder.Item
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left section: Icon and info */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            flex={1}
          >
            {/* Icon */}
            <SkeletonPlaceholder.Item
              width={48}
              height={48}
              borderRadius={theme.borderRadius.full}
              marginRight={theme.spacing.md}
            />
            {/* Info */}
            <SkeletonPlaceholder.Item flex={1}>
              {/* Name row */}
              <SkeletonPlaceholder.Item
                flexDirection="row"
                alignItems="center"
                marginBottom={theme.spacing.xs}
              >
                <SkeletonPlaceholder.Item
                  width={120}
                  height={16}
                  borderRadius={theme.borderRadius.sm}
                  marginRight={theme.spacing.sm}
                />
                <SkeletonPlaceholder.Item
                  width={40}
                  height={16}
                  borderRadius={theme.borderRadius.full}
                />
              </SkeletonPlaceholder.Item>
              {/* Market cap */}
              <SkeletonPlaceholder.Item
                width={100}
                height={14}
                borderRadius={theme.borderRadius.sm}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
          {/* Right section: Price, change, favorite */}
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            gap={theme.spacing.md}
          >
            <SkeletonPlaceholder.Item alignItems="flex-end">
              <SkeletonPlaceholder.Item
                width={80}
                height={16}
                borderRadius={theme.borderRadius.sm}
              />
              <SkeletonPlaceholder.Item
                width={60}
                height={14}
                borderRadius={theme.borderRadius.sm}
                marginTop={theme.spacing.xs}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item
              width={24}
              height={24}
              borderRadius={theme.borderRadius.md}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default CryptoSkeleton;
