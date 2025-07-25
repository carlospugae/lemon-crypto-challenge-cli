import {
  GoogleSignin,
  User,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GOOGLE_CONFIG } from '../config/google';
import * as Keychain from 'react-native-keychain';

export const configureGoogleSignIn = (): void => {
  GoogleSignin.configure({
    webClientId: GOOGLE_CONFIG.webClientId,
    iosClientId: GOOGLE_CONFIG.iosClientId,
    offlineAccess: false,
    scopes: GOOGLE_CONFIG.scopes,
  });
};

export const saveCredentialsToKeychain = async (tokens: {
  userInfo: string;
}): Promise<void> => {
  try {
    await Keychain.setGenericPassword('google', JSON.stringify(tokens), {
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      service: 'com.lemoncryptochallenge.auth',
    });
  } catch (error) {
    console.error('Failed to save credentials to keychain:', error);
    throw new Error('Failed to save credentials securely');
  }
};

export const getCredentialsFromKeychain = async (): Promise<{
  userInfo: string;
} | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'com.lemoncryptochallenge.auth',
    });

    if (credentials) {
      return JSON.parse(credentials.password);
    }

    return null;
  } catch (error) {
    console.error('Failed to retrieve credentials from keychain:', error);
    return null;
  }
};

export const removeCredentialsFromKeychain = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword({
      service: 'com.lemoncryptochallenge.auth',
    });
  } catch (error) {
    console.error('Failed to remove credentials from keychain:', error);
    throw new Error('Failed to remove credentials securely');
  }
};

export const performGoogleSignIn = async (): Promise<boolean> => {
  try {
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();

    if (response.type === 'success' && response.data) {
      const userInfo = response.data;

      if (userInfo) {
        await saveCredentialsToKeychain({ userInfo: JSON.stringify(userInfo) });
      }

      return true;
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

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser;
  } catch (err) {
    console.error('Failed to get current user:', err);
    return null;
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await GoogleSignin.signOut();
    await removeCredentialsFromKeychain();
  } catch (err) {
    console.log('User was not signed in during sign out');
  }
};
