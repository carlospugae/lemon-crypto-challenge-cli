import { useState, useCallback, useEffect } from 'react';
import {
  GoogleSignin,
  User as GoogleUser,
} from '@react-native-google-signin/google-signin';
import * as Keychain from 'react-native-keychain';
import { GOOGLE_CONFIG } from '../config/google';

export type GoogleAuthUser = {
  idToken: string;
  user: {
    email: string;
    name: string;
    photo?: string;
    id: string;
  };
};

// Keychain keys
const KEYCHAIN_TOKEN_KEY = 'google_id_token';
const KEYCHAIN_USER_KEY = 'google_user_info';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: GOOGLE_CONFIG.webClientId,
  iosClientId: GOOGLE_CONFIG.iosClientId,
  offlineAccess: false,
  scopes: GOOGLE_CONFIG.scopes,
});

export const useGoogleAuth = () => {
  const [userInfo, setUserInfo] = useState<GoogleAuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uiError, setUiError] = useState<string>('');

  useEffect(() => {
    const restoreSession = async () => {
      try {
        setLoading(true);
        setUiError('');
        // Retrieve token and user info from Keychain
        const tokenResult = await Keychain.getGenericPassword({
          service: KEYCHAIN_TOKEN_KEY,
        });
        const userResult = await Keychain.getGenericPassword({
          service: KEYCHAIN_USER_KEY,
        });
        if (tokenResult && userResult) {
          const idToken = tokenResult.password;
          const user = JSON.parse(userResult.password);
          setUserInfo({ idToken, user });
        }
      } catch (error) {
        setUiError('Failed to restore session');
      } finally {
        setLoading(false);
      }
    };
    restoreSession();
  }, []);

  const performGoogleSignIn = useCallback(async (): Promise<GoogleAuthUser> => {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (response && response.type === 'success' && response.data) {
      const { idToken, user } = response.data;
      if (!idToken || !user || !user.email || !user.name || !user.id) {
        throw new Error('Missing required user info from Google response');
      }
      return {
        idToken,
        user: {
          email: user.email,
          name: user.name,
          photo: user.photo || undefined,
          id: user.id,
        },
      };
    }
    throw new Error('Sign-in was not successful');
  }, []);

  const signIn = useCallback(async () => {
    setLoading(true);
    setUiError('');
    try {
      const userData = await performGoogleSignIn();
      setUserInfo(userData);
      // Store token and user info securely
      await Keychain.setGenericPassword('token', userData.idToken, {
        service: KEYCHAIN_TOKEN_KEY,
      });
      await Keychain.setGenericPassword('user', JSON.stringify(userData.user), {
        service: KEYCHAIN_USER_KEY,
      });
    } catch (apiError: unknown) {
      let errorMessage = 'Sign-in failed';
      if (
        typeof apiError === 'object' &&
        apiError !== null &&
        'message' in apiError
      ) {
        errorMessage = (apiError as { message: string }).message;
      }
      setUiError(errorMessage);
      setUserInfo(null);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [performGoogleSignIn]);

  const signOut = useCallback(async () => {
    setLoading(true);
    setUiError('');
    try {
      await GoogleSignin.signOut();
      setUserInfo(null);
      // Remove credentials from Keychain
      await Keychain.resetGenericPassword({ service: KEYCHAIN_TOKEN_KEY });
      await Keychain.resetGenericPassword({ service: KEYCHAIN_USER_KEY });
    } catch (error) {
      setUiError('Sign-out failed');
    } finally {
      setLoading(false);
    }
  }, []);

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
