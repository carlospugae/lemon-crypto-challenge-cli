import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { theme } from '@/theme';
import { Text } from '@/components';

/**
 * Profile screen component that displays user information and logout functionality
 *
 * @example
 * ```tsx
 * <Profile />
 * ```
 */
const Profile: React.FC = () => {
  const { user, signOut, isLoading } = useAuth();

  /**
   * Handles the logout process with confirmation dialog
   */
  const handleLogout = (): void => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
          } catch (error) {
            console.error('Logout failed:', error);
            Alert.alert('Error', 'Failed to logout. Please try again.');
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text variant="body" color="gray.500">
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text variant="h3" fontWeight="bold" color="gray.900">
            Profile
          </Text>
          <Text variant="body" color="gray.600" style={styles.subtitle}>
            Manage your account settings
          </Text>
        </View>

        {/* User Information Section */}
        <View style={styles.section}>
          <Text
            variant="h5"
            fontWeight="semibold"
            color="gray.900"
            style={styles.sectionTitle}
          >
            Account Information
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text variant="body" color="gray.600" style={styles.label}>
                Name
              </Text>
              <Text variant="body" fontWeight="medium" color="gray.900">
                {user?.user?.givenName} {user?.user?.familyName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text variant="body" color="gray.600" style={styles.label}>
                Email
              </Text>
              <Text variant="body" fontWeight="medium" color="gray.900">
                {user?.user?.email}
              </Text>
            </View>

            {user?.user?.id && (
              <View style={styles.infoRow}>
                <Text variant="body" color="gray.600" style={styles.label}>
                  User ID
                </Text>
                <Text
                  variant="body"
                  fontWeight="medium"
                  color="gray.900"
                  numberOfLines={1}
                >
                  {user.user.id}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* App Information Section */}
        <View style={styles.section}>
          <Text
            variant="h5"
            fontWeight="semibold"
            color="gray.900"
            style={styles.sectionTitle}
          >
            App Information
          </Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text variant="body" color="gray.600" style={styles.label}>
                App Version
              </Text>
              <Text variant="body" fontWeight="medium" color="gray.900">
                1.0.0
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text variant="body" color="gray.600" style={styles.label}>
                Platform
              </Text>
              <Text variant="body" fontWeight="medium" color="gray.900">
                React Native
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
            accessible={true}
            accessibilityLabel="Logout from the app"
            accessibilityRole="button"
            accessibilityHint="Double tap to logout from your account"
          >
            <Text variant="button" fontWeight="semibold" color="white">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[50],
  },
  content: {
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: theme.spacing['3xl'],
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
  section: {
    marginBottom: theme.spacing['3xl'],
  },
  sectionTitle: {
    marginBottom: theme.spacing.lg,
  },
  infoCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing['2xl'],
    ...theme.shadows.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },
  label: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: theme.colors.error[600],
    borderRadius: theme.borderRadius.lg,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
});

export default Profile;
