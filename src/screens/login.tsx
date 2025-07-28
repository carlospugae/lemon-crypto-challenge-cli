import React from 'react';
import {
  View,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAuth } from '@/context';
import { Text } from '@/components';
import { theme } from '@/theme';

const { width, height } = Dimensions.get('window');

function Login() {
  const { signIn, isLoading, error } = useAuth();

  const handleGoogleLogin = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#fefce8', '#fed7aa', '#dcfce7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.content}>
        <View style={styles.brandingContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/icon-1753486212062.png')}
              style={styles.appIcon}
              resizeMode="cover"
            />
          </View>
          <Text variant="h1" style={styles.title} align="center">
            Welcome Back
          </Text>
          <Text
            variant="body"
            color="gray.600"
            style={styles.subtitle}
            align="center"
          >
            Sign in to continue your crypto journey
          </Text>
        </View>
        <View style={styles.spacer}></View>
        <View style={styles.card}>
          <Pressable
            onPress={handleGoogleLogin}
            disabled={isLoading}
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.colors.gray[900]} />
            ) : (
              <>
                {/* Google Icon */}
                <View style={styles.googleIcon}>
                  <Text style={styles.googleIconText}>G</Text>
                </View>
                <Text
                  variant="button"
                  color="gray.900"
                  style={styles.buttonText}
                >
                  Continue with Google
                </Text>
              </>
            )}
          </Pressable>

          {/* Error Message */}
        </View>
        {error && (
          <Text
            variant="bodySmall"
            color="error.500"
            style={styles.errorText}
            align="center"
            fontWeight="bold"
          >
            {error}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing['4xl'],
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['6xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    marginBottom: theme.spacing['3xl'],
    borderRadius: theme.borderRadius['3xl'],
    ...theme.shadows.lg,
  },
  appIcon: {
    width: '100%',
    height: '100%',
    borderRadius: theme.borderRadius['3xl'],
  },
  title: {
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.lg,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: theme.borderRadius['2xl'],
    ...theme.shadows.xl,
    borderWidth: 0,
  },
  cardContent: {
    padding: theme.spacing['4xl'],
  },
  loginButton: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
    borderRadius: theme.borderRadius['2xl'],
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.sm,
  },
  loginButtonDisabled: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[300],
  },
  googleIcon: {
    width: 20,
    height: 20,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconText: {
    color: theme.colors.white,
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.bold,
  },
  buttonText: {
    fontWeight: theme.fontWeight.semibold,
  },
  errorText: {
    marginTop: theme.spacing.lg,
  },
  spacer: {
    flex: 1,
  },
});

export default Login;
