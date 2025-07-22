import { useState, useCallback } from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_CONFIG } from '../config/google';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_CONFIG.webClientId,
  iosClientId: GOOGLE_CONFIG.iosClientId,
  offlineAccess: false,
  scopes: GOOGLE_CONFIG.scopes,
});

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uiError, setUiError] = useState<string>('');

  const performGoogleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const response = await GoogleSignin.signIn();

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
  }, []);

  const signIn = useCallback(async () => {
    setLoading(true);
    setUiError('');

    try {
      const userData = await performGoogleSignIn();
      setUserInfo(userData);
      console.log('Google Sign-In successful:', userData);
    } catch (apiError: any) {
      const errorMessage = apiError?.message || 'Something went wrong';
      setUiError(errorMessage);
      console.error('Google Sign-In error:', apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, [performGoogleSignIn]);

  /**
   * Signs out the current user
   * @returns {Promise<void>}
   */
  const signOut = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      setUiError('');
      console.log('Google Sign-Out successful');
    } catch (error) {
      console.error('Google Sign-Out error:', error);
      setUiError('Sign-out failed');
    }
  }, []);

  // Check if user is currently signed in
  const isLoggedIn = !!userInfo;

  return {
    userInfo,
    isLoggedIn,
    loading,
    error: uiError,
    signIn,
    signOut,
  };
};
