import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { User } from '@react-native-google-signin/google-signin';
import {
  configureGoogleSignIn,
  performGoogleSignIn,
  getCurrentUser,
  signOutUser,
  getCredentialsFromKeychain,
} from '../utils/auth';

configureGoogleSignIn();

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  getCurrentUser: () => Promise<void>;
  error: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {
    throw new Error('AuthContext not initialized');
  },
  signOut: async () => {
    throw new Error('AuthContext not initialized');
  },
  getCurrentUser: async () => {
    throw new Error('AuthContext not initialized');
  },
  error: '',
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleGetCurrentUser = async (): Promise<void> => {
    try {
      const currentUser = await getCredentialsFromKeychain();
      if (currentUser) {
        setUser(JSON.parse(currentUser.userInfo) as User);
      }
    } catch (err) {
      console.error('Failed to get current user:', err);
      setUser(null);
    }
  };

  const handleSignIn = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const isSignedIn = await performGoogleSignIn();
      console.log('Google Sign-In successful:', isSignedIn);
      if (isSignedIn) {
        const userInfo = await getCredentialsFromKeychain();
        if (userInfo) {
          setUser(JSON.parse(userInfo.userInfo) as User);
        }
      }
    } catch (apiError: any) {
      const errorMessage = apiError?.message || 'Something went wrong';
      setError(errorMessage);
      console.error('Google Sign-In error:', apiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signOutUser();
      setUser(null);
    } catch (err) {
      console.error('Sign-out failed:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = user !== null;

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signIn: handleSignIn,
    signOut: handleSignOut,
    getCurrentUser: handleGetCurrentUser,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useIsSignedIn = (): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

const useIsSignedOut = (): boolean => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated;
};

export { useIsSignedIn, useIsSignedOut };
