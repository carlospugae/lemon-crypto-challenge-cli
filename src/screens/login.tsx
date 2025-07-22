import React from 'react';
import { View, Pressable, Text, ActivityIndicator, Alert } from 'react-native';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
  const { userInfo, loading, error, signIn } = useGoogleAuth();
  const navigation = useNavigation();

  const handleGoogleLogin = async () => {
    try {
      await signIn();

      // Show success message if user info is available
      if (userInfo?.user?.name) {
        Alert.alert('Success!', `Welcome ${userInfo.user.name}!`, [
          { text: 'OK' },
        ]);
      }
      navigation.navigate('Home');
      if (userInfo?.idToken) {
        // Send to your backend API
        // const response = await authAPI.validateToken({
        //   token: userInfo.idToken,
        //   email: userInfo.user.email,
        // });
      }
    } catch (apiError: any) {
      // Error is already handled in the hook, but you can add additional handling here
      console.error('Login component error:', apiError);
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
