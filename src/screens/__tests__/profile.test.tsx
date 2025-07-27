import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Profile from '../profile';
import { AuthContext } from '@/context/AuthContext';
import { User } from '@react-native-google-signin/google-signin';

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
  }),
}));

describe('Profile', () => {
  const mockUser: User = {
    user: {
      id: 'test-user-id',
      name: 'John Doe',
      email: 'john.doe@example.com',
      photo: 'https://example.com/photo.jpg',
      familyName: 'Doe',
      givenName: 'John',
    },
    scopes: ['email', 'profile'],
    idToken: 'mock-id-token',
    serverAuthCode: null,
  };

  const mockSignOut = jest.fn();

  const defaultContextValue = {
    user: null as User | null,
    isAuthenticated: false,
    isLoading: false,
    signIn: jest.fn(),
    signOut: mockSignOut,
    getCurrentUser: jest.fn(),
    error: '',
  };

  const renderProfile = (contextValue = defaultContextValue) => {
    return render(
      <AuthContext.Provider value={contextValue}>
        <Profile />
      </AuthContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test that profile screen renders loading state correctly
   */
  describe('Loading State', () => {
    it('should render loading message when isLoading is true', () => {
      const contextValue = {
        ...defaultContextValue,
        isLoading: true,
      };

      const { getByText } = renderProfile(contextValue);

      expect(getByText('Loading profile...')).toBeTruthy();
    });
  });

  /**
   * Test that profile screen renders user information correctly
   */
  describe('User Information Display', () => {
    it('should render user information when user is available', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);

      expect(getByText('Profile')).toBeTruthy();
      expect(getByText('Manage your account settings')).toBeTruthy();
      expect(getByText('Account Information')).toBeTruthy();
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('john.doe@example.com')).toBeTruthy();
      expect(getByText('test-user-id')).toBeTruthy();
    });

    it('should handle missing user data gracefully', () => {
      const userWithMissingData: User = {
        user: {
          id: 'test-user-id',
          name: null,
          email: 'john.doe@example.com',
          photo: null,
          familyName: null,
          givenName: null,
        },
        scopes: ['email', 'profile'],
        idToken: 'mock-id-token',
        serverAuthCode: null,
      };

      const contextValue = {
        ...defaultContextValue,
        user: userWithMissingData,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);

      expect(getByText('Profile')).toBeTruthy();
      expect(getByText('john.doe@example.com')).toBeTruthy();
      expect(getByText('test-user-id')).toBeTruthy();
    });
  });

  /**
   * Test logout functionality
   */
  describe('Logout Functionality', () => {
    it('should show confirmation dialog when logout button is pressed', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);
      const logoutButton = getByText('Logout');

      fireEvent.press(logoutButton);

      expect(Alert.alert).toHaveBeenCalledWith(
        'Logout',
        'Are you sure you want to logout?',
        expect.arrayContaining([
          expect.objectContaining({
            text: 'Cancel',
            style: 'cancel',
          }),
          expect.objectContaining({
            text: 'Logout',
            style: 'destructive',
          }),
        ]),
      );
    });

    it('should call signOut when user confirms logout', async () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);
      const logoutButton = getByText('Logout');

      fireEvent.press(logoutButton);

      // Get the onPress function from the Alert.alert call
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const logoutOption = alertCall[2].find(
        (option: any) => option.text === 'Logout',
      );

      await logoutOption.onPress();

      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });

    it('should show error alert when logout fails', async () => {
      const mockSignOutWithError = jest
        .fn()
        .mockRejectedValue(new Error('Logout failed'));
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
        signOut: mockSignOutWithError,
      };

      const { getByText } = renderProfile(contextValue);
      const logoutButton = getByText('Logout');

      fireEvent.press(logoutButton);

      // Get the onPress function from the Alert.alert call
      const alertCall = (Alert.alert as jest.Mock).mock.calls[0];
      const logoutOption = alertCall[2].find(
        (option: any) => option.text === 'Logout',
      );

      await logoutOption.onPress();

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Error',
          'Failed to logout. Please try again.',
        );
      });
    });
  });

  /**
   * Test accessibility features
   */
  describe('Accessibility', () => {
    it('should have proper accessibility labels', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByLabelText } = renderProfile(contextValue);

      expect(getByLabelText('Logout from the app')).toBeTruthy();
    });

    it('should have proper accessibility role for logout button', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByRole } = renderProfile(contextValue);

      expect(getByRole('button')).toBeTruthy();
    });
  });

  /**
   * Test component structure
   */
  describe('Component Structure', () => {
    it('should render all main sections', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);

      // Check main sections
      expect(getByText('Profile')).toBeTruthy();
      expect(getByText('Account Information')).toBeTruthy();
      expect(getByText('Logout')).toBeTruthy();
    });

    it('should render user data fields correctly', () => {
      const contextValue = {
        ...defaultContextValue,
        user: mockUser,
        isAuthenticated: true,
      };

      const { getByText } = renderProfile(contextValue);

      // Check user data fields
      expect(getByText('Name')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('User ID')).toBeTruthy();
    });
  });
});
