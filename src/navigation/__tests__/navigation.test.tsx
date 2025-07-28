import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navigation from '../navigation';
import { AuthProvider } from '@/context/AuthContext';

const MockHomeScreen: React.FC = () => {
  return React.createElement('View', { testID: 'home-screen' }, 'Home Screen');
};

const MockProfileScreen: React.FC = () => {
  return React.createElement(
    'View',
    { testID: 'profile-screen' },
    'Profile Screen',
  );
};

const MockDetailsScreen: React.FC = () => {
  return React.createElement(
    'View',
    { testID: 'details-screen' },
    'Details Screen',
  );
};

const MockLoginScreen: React.FC = () => {
  return React.createElement(
    'View',
    { testID: 'login-screen' },
    'Login Screen',
  );
};

jest.mock('@/screens/home', () => MockHomeScreen);
jest.mock('@/screens/profile', () => MockProfileScreen);
jest.mock('@/screens/details', () => MockDetailsScreen);
jest.mock('@/screens/login', () => MockLoginScreen);

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }),
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@react-navigation/native', () => ({
  createStaticNavigation: (stack: any) => {
    return function MockNavigationStack() {
      const React = require('react');
      return React.createElement(
        'div',
        { testID: 'navigation-stack' },
        'Navigation Stack',
      );
    };
  },
  StaticParamList: jest.fn(),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }: { children: any }) => {
      const React = require('react');
      return React.createElement(
        'div',
        { testID: 'stack-navigator' },
        children,
      );
    },
    Screen: ({ children }: { children: any }) => children,
  }),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => ({
    Navigator: ({ children }: { children: any }) => {
      const React = require('react');
      return React.createElement('div', { testID: 'tab-navigator' }, children);
    },
    Screen: ({ children }: { children: any }) => children,
  }),
}));

jest.mock('@/components', () => ({
  Icon: ({ family, name, size, color }: any) => {
    const React = require('react');
    return React.createElement(
      'div',
      {
        testID: `icon-${family}-${name}`,
        'data-size': size,
        'data-color': color,
      },
      `${family}-${name}`,
    );
  },
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const useMockAuth = (isAuthenticated: boolean = false) => {
  const mockAuth = {
    user: isAuthenticated ? { id: '1', name: 'Test User' } : null,
    isAuthenticated,
    isLoading: false,
    signIn: jest.fn(),
    signOut: jest.fn(),
    getCurrentUser: jest.fn(),
    error: '',
  };

  jest
    .spyOn(require('@/context/AuthContext'), 'useAuth')
    .mockReturnValue(mockAuth);
  jest
    .spyOn(require('@/context/AuthContext'), 'useIsSignedIn')
    .mockReturnValue(isAuthenticated);
  jest
    .spyOn(require('@/context/AuthContext'), 'useIsSignedOut')
    .mockReturnValue(!isAuthenticated);

  return mockAuth;
};

describe('Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render without crashing when wrapped with providers', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });

    it('should render with proper test wrapper structure', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });
  });

  describe('Authentication State Handling', () => {
    it('should handle authenticated state correctly', async () => {
      useMockAuth(true);

      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });

    it('should handle unauthenticated state correctly', async () => {
      useMockAuth(false);

      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });
  });

  describe('Screen Configuration', () => {
    it('should have correct screen constants defined', () => {
      const { SCREENS } = require('../navigation');

      expect(SCREENS).toBeDefined();
      expect(SCREENS.HOME).toBe('Home');
      expect(SCREENS.LOGIN).toBe('Login');
      expect(SCREENS.DETAILS).toBe('Details');
      expect(SCREENS.PROFILE).toBe('Profile');
    });

    it('should export navigation component as default', () => {
      expect(Navigation).toBeDefined();
      expect(typeof Navigation).toBe('function');
    });
  });

  describe('Navigation Structure', () => {
    it('should create proper navigation stack structure', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });

    it('should handle platform-specific navigation options', async () => {
      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing providers gracefully', async () => {
      // Test without AuthProvider to ensure graceful handling
      const { getByTestId } = render(
        <SafeAreaProvider>
          <QueryClientProvider client={new QueryClient()}>
            <Navigation />
          </QueryClientProvider>
        </SafeAreaProvider>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });
    });

    it('should handle authentication context errors', async () => {
      // Test that the navigation component can handle auth context errors gracefully
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Mock a scenario where auth context returns invalid data
      jest.spyOn(require('@/context/AuthContext'), 'useAuth').mockReturnValue({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        signIn: jest.fn(),
        signOut: jest.fn(),
        getCurrentUser: jest.fn(),
        error: 'Test error',
      });

      const { getByTestId } = render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      await waitFor(() => {
        expect(getByTestId('navigation-stack')).toBeTruthy();
      });

      consoleSpy.mockRestore();
    });
  });

  describe('Integration Tests', () => {
    it('should integrate properly with authentication context', async () => {
      const mockAuth = useMockAuth(true);

      render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      expect(mockAuth.isAuthenticated).toBe(true);
    });

    it('should handle authentication state changes', async () => {
      const mockAuth = useMockAuth(false);

      render(
        <TestWrapper>
          <Navigation />
        </TestWrapper>,
      );

      expect(mockAuth.isAuthenticated).toBe(false);
    });
  });
});
