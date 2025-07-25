import * as auth from '../auth';
import { GOOGLE_CONFIG } from '../../config/google';

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    getCurrentUser: jest.fn(),
    signOut: jest.fn(),
  },
  statusCodes: {
    SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
    IN_PROGRESS: 'IN_PROGRESS',
    PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  },
}));
jest.mock('react-native-keychain', () => ({
  setGenericPassword: jest.fn(),
  getGenericPassword: jest.fn(),
  resetGenericPassword: jest.fn(),
  ACCESSIBLE: { WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'mock-accessible' },
}));
jest.mock('../../config/google', () => ({
  GOOGLE_CONFIG: {
    webClientId: 'test-web-client-id',
    iosClientId: 'test-ios-client-id',
    scopes: ['email', 'profile'],
  },
}));

const {
  GoogleSignin,
  statusCodes,
} = require('@react-native-google-signin/google-signin');
const Keychain = require('react-native-keychain');

describe('auth utils', () => {
  describe('configureGoogleSignIn', () => {
    it('should call GoogleSignin.configure with correct config', () => {
      auth.configureGoogleSignIn();
      expect(GoogleSignin.configure).toHaveBeenCalledWith({
        webClientId: GOOGLE_CONFIG.webClientId,
        iosClientId: GOOGLE_CONFIG.iosClientId,
        offlineAccess: false,
        scopes: GOOGLE_CONFIG.scopes,
      });
    });
  });

  describe('saveCredentialsToKeychain', () => {
    it('should call Keychain.setGenericPassword with correct args', async () => {
      await auth.saveCredentialsToKeychain({ userInfo: 'test-user-info' });
      expect(Keychain.setGenericPassword).toHaveBeenCalledWith(
        'google',
        JSON.stringify({ userInfo: 'test-user-info' }),
        {
          accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
          service: 'com.lemoncryptochallenge.auth',
        },
      );
    });

    it('should throw and log error if setGenericPassword fails', async () => {
      (Keychain.setGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('fail'),
      );
      const spy = jest.spyOn(console, 'error').mockImplementation();
      await expect(
        auth.saveCredentialsToKeychain({ userInfo: 'test-user-info' }),
      ).rejects.toThrow('Failed to save credentials securely');
      expect(spy).toHaveBeenCalledWith(
        'Failed to save credentials to keychain:',
        expect.any(Error),
      );
      spy.mockRestore();
    });
  });

  describe('getCredentialsFromKeychain', () => {
    it('should return parsed credentials if present', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce({
        password: JSON.stringify({ userInfo: 'test-user-info' }),
      });
      const result = await auth.getCredentialsFromKeychain();
      expect(result).toEqual({ userInfo: 'test-user-info' });
    });

    it('should return null if credentials are not present', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockResolvedValueOnce(false);
      const result = await auth.getCredentialsFromKeychain();
      expect(result).toBeNull();
    });

    it('should log error and return null if getGenericPassword throws', async () => {
      (Keychain.getGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('fail'),
      );
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const result = await auth.getCredentialsFromKeychain();
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(
        'Failed to retrieve credentials from keychain:',
        expect.any(Error),
      );
      spy.mockRestore();
    });
  });

  describe('removeCredentialsFromKeychain', () => {
    it('should call Keychain.resetGenericPassword with correct service', async () => {
      await auth.removeCredentialsFromKeychain();
      expect(Keychain.resetGenericPassword).toHaveBeenCalledWith({
        service: 'com.lemoncryptochallenge.auth',
      });
    });

    it('should throw and log error if resetGenericPassword fails', async () => {
      (Keychain.resetGenericPassword as jest.Mock).mockRejectedValueOnce(
        new Error('fail'),
      );
      const spy = jest.spyOn(console, 'error').mockImplementation();
      await expect(auth.removeCredentialsFromKeychain()).rejects.toThrow(
        'Failed to remove credentials securely',
      );
      expect(spy).toHaveBeenCalledWith(
        'Failed to remove credentials from keychain:',
        expect.any(Error),
      );
      spy.mockRestore();
    });
  });

  describe('performGoogleSignIn', () => {
    beforeEach(() => {
      (GoogleSignin.hasPlayServices as jest.Mock).mockResolvedValue(true);
    });

    xit('should save credentials and return true on success', async () => {
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({
        type: 'success',
        data: { id: 'user-id', name: 'Test User' },
      });
      const saveSpy = jest
        .spyOn(auth, 'saveCredentialsToKeychain')
        .mockResolvedValue();
      const result = await auth.performGoogleSignIn();
      expect(GoogleSignin.hasPlayServices).toHaveBeenCalled();
      expect(GoogleSignin.signIn).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalledWith({
        userInfo: JSON.stringify({ id: 'user-id', name: 'Test User' }),
      });
      expect(result).toBe(true);
      saveSpy.mockRestore();
    });

    it('should throw if sign-in is not successful', async () => {
      (GoogleSignin.signIn as jest.Mock).mockResolvedValue({ type: 'fail' });
      await expect(auth.performGoogleSignIn()).rejects.toThrow(
        'Sign-in was not successful',
      );
    });

    it('should throw correct error for SIGN_IN_CANCELLED', async () => {
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
        code: statusCodes.SIGN_IN_CANCELLED,
      });
      await expect(auth.performGoogleSignIn()).rejects.toThrow(
        'Sign-in was cancelled',
      );
    });

    it('should throw correct error for IN_PROGRESS', async () => {
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
        code: statusCodes.IN_PROGRESS,
      });
      await expect(auth.performGoogleSignIn()).rejects.toThrow(
        'Sign-in is already in progress',
      );
    });
    it('should throw correct error for PLAY_SERVICES_NOT_AVAILABLE', async () => {
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
        code: statusCodes.PLAY_SERVICES_NOT_AVAILABLE,
      });
      await expect(auth.performGoogleSignIn()).rejects.toThrow(
        'Play Services are not available',
      );
    });

    it('should throw generic error for unknown error', async () => {
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({
        message: 'Unknown error',
      });
      await expect(auth.performGoogleSignIn()).rejects.toThrow('Unknown error');
    });

    it('should throw generic error if error has no message', async () => {
      (GoogleSignin.signIn as jest.Mock).mockRejectedValue({});
      await expect(auth.performGoogleSignIn()).rejects.toThrow(
        'Sign-in failed',
      );
    });
  });

  describe('getCurrentUser', () => {
    it('should return user if present', async () => {
      (GoogleSignin.getCurrentUser as jest.Mock).mockResolvedValue({
        id: 'user-id',
      });
      const result = await auth.getCurrentUser();
      expect(result).toEqual({ id: 'user-id' });
    });

    it('should return null and log error if getCurrentUser throws', async () => {
      (GoogleSignin.getCurrentUser as jest.Mock).mockRejectedValue(
        new Error('fail'),
      );
      const spy = jest.spyOn(console, 'error').mockImplementation();
      const result = await auth.getCurrentUser();
      expect(result).toBeNull();
      expect(spy).toHaveBeenCalledWith(
        'Failed to get current user:',
        expect.any(Error),
      );
      spy.mockRestore();
    });
  });

  describe('signOutUser', () => {
    xit('should call GoogleSignin.signOut and removeCredentialsFromKeychain', async () => {
      const removeSpy = jest
        .spyOn(auth, 'removeCredentialsFromKeychain')
        .mockResolvedValue();
      await auth.signOutUser();
      expect(GoogleSignin.signOut).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
      removeSpy.mockRestore();
    });

    it('should log if user was not signed in during sign out', async () => {
      (GoogleSignin.signOut as jest.Mock).mockRejectedValue(new Error('fail'));
      const spy = jest.spyOn(console, 'log').mockImplementation();
      await auth.signOutUser();
      expect(spy).toHaveBeenCalledWith(
        'User was not signed in during sign out',
      );
      spy.mockRestore();
    });
  });
});
