import React from 'react';
import { ScrollView } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { theme } from '../theme';

/**
 * Skeleton loader for the Details screen
 * Uses shimmer animation and matches the layout of the Details screen
 *
 * @example
 * <DetailsSkeleton />
 */
export const DetailsSkeleton: React.FC = () => (
  <ScrollView
    style={{ backgroundColor: theme.colors.gray[50] }}
    contentContainerStyle={{ padding: theme.spacing['2xl'], flexGrow: 1 }}
    accessibilityLabel="Loading crypto details"
  >
    <SkeletonPlaceholder
      backgroundColor={theme.colors.gray[200]}
      highlightColor={theme.colors.gray[100]}
      borderRadius={theme.borderRadius.sm}
      speed={800}
    >
      {/* Header Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        {/* Badges Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={60}
            height={28}
            borderRadius={theme.borderRadius.full}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={28}
            borderRadius={theme.borderRadius.full}
          />
        </SkeletonPlaceholder.Item>
        {/* Icon Circle */}
        <SkeletonPlaceholder.Item
          width={72}
          height={72}
          borderRadius={theme.borderRadius.full}
          alignSelf="center"
          marginBottom={theme.spacing.md}
        />
        {/* Crypto Name */}
        <SkeletonPlaceholder.Item
          width={120}
          height={28}
          borderRadius={theme.borderRadius.md}
          alignSelf="center"
        />
        {/* Price Section */}
        <SkeletonPlaceholder.Item
          alignItems="center"
          marginTop={theme.spacing.lg}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={32}
            borderRadius={theme.borderRadius.md}
            marginBottom={theme.spacing.md}
          />
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
            <SkeletonPlaceholder.Item
              width={16}
              height={16}
              borderRadius={8}
              marginRight={theme.spacing.xs}
            />
            <SkeletonPlaceholder.Item
              width={60}
              height={20}
              borderRadius={theme.borderRadius.md}
              marginRight={theme.spacing.xs}
            />
            <SkeletonPlaceholder.Item
              width={24}
              height={16}
              borderRadius={theme.borderRadius.md}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      {/* Market Stats Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        <SkeletonPlaceholder.Item
          width={140}
          height={20}
          borderRadius={theme.borderRadius.md}
          marginBottom={theme.spacing.lg}
        />
        {/* Market Cap Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* 24h Volume Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
      {/* Supply Info Card */}
      <SkeletonPlaceholder.Item
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius['3xl'],
          padding: theme.spacing['3xl'],
          marginBottom: theme.spacing['2xl'],
          borderWidth: 1,
          borderColor: theme.colors.gray[100],
          ...theme.shadows.md,
        }}
      >
        <SkeletonPlaceholder.Item
          width={140}
          height={20}
          borderRadius={theme.borderRadius.md}
          marginBottom={theme.spacing.lg}
        />
        {/* Supply Progress Header */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.xs}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={40}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Progress Bar */}
        <SkeletonPlaceholder.Item
          width="100%"
          height={8}
          borderRadius={theme.borderRadius.full}
          marginBottom={theme.spacing.xs}
        />
        {/* Supply Progress Footer */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          marginTop={2}
          marginBottom={theme.spacing.lg}
        >
          <SkeletonPlaceholder.Item
            width={80}
            height={12}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={12}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Circulating Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Total Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom={theme.spacing.md}
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
        {/* Max Supply Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <SkeletonPlaceholder.Item
            width={100}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
          <SkeletonPlaceholder.Item
            width={80}
            height={16}
            borderRadius={theme.borderRadius.md}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  </ScrollView>
);
