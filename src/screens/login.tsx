import React from 'react';
import {
  View,
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { useAuth } from '@/context';

function Login() {
  const { signIn, isLoading, error } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={signIn}
        disabled={isLoading}
        style={[
          styles.loginButton,
          { backgroundColor: isLoading ? '#ccc' : '#4285F4' },
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Continue with Google
          </Text>
        )}
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  errorText: {
    color: '#d32f2f',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Login;
