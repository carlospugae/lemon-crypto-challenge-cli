import React, { useState } from 'react';
import { View, Pressable, Text, ActivityIndicator, Alert } from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_CONFIG } from '../config/google';

GoogleSignin.configure({
  webClientId: GOOGLE_CONFIG.webClientId,
  iosClientId: GOOGLE_CONFIG.iosClientId,
  offlineAccess: false,
  scopes: GOOGLE_CONFIG.scopes,
});

const performGoogleSignIn = async () => {
  try {
    // Check if Play Services are available (Android only)
    await GoogleSignin.hasPlayServices();

    // Perform the sign-in
    const response = await GoogleSignin.signIn();

    // In v15.0.0, the response structure is { type: 'success', data: User }
    if (response.type === 'success' && response.data) {
      return response.data;
    } else {
      throw new Error('Sign-in was not successful');
    }
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('Sign-in was cancelled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign-in is already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play Services are not available');
    } else {
      throw new Error(error.message || 'Sign-in failed');
    }
  }
};

export default function Login() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const userInfo = await performGoogleSignIn();

      console.log('Google Sign-In successful:', userInfo);

      // Here you would typically:
      // 1. Send the idToken to your backend for verification
      // 2. Store the user information in your app state
      // 3. Navigate to the main app screen

      // Example of what you might do with the user info:
      if (userInfo.idToken) {
        // Send to your backend API
        // const response = await authAPI.validateToken({
        //   token: userInfo.idToken,
        //   email: userInfo.user.email,
        // });

        // For now, just show success
        Alert.alert('Success!', `Welcome ${userInfo.user.name}!`, [
          { text: 'OK' },
        ]);
      }
    } catch (apiError: any) {
      const errorMessage = apiError?.message || 'Something went wrong';
      setError(errorMessage);
      console.error('Google Sign-In error:', apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}
    >
      <Pressable
        onPress={handleGoogleLogin}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#4285F4',
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
          minWidth: 200,
          alignItems: 'center',
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
            Continue with Google
          </Text>
        )}
      </Pressable>

      {error ? (
        <Text
          style={{
            color: '#d32f2f',
            marginTop: 16,
            textAlign: 'center',
            fontSize: 14,
          }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
