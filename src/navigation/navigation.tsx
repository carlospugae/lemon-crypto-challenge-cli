import * as React from 'react';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import Details from '@/screens/details';
import Login from '@/screens/login';
import Home from '@/screens/home';
import Profile from '@/screens/profile';
import { useIsSignedIn, useIsSignedOut } from '@/context/AuthContext';
import { theme } from '@/theme';
import { Icon } from '@/components';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof RootStack> {}
  }
}

export const SCREENS = {
  HOME: 'Home',
  LOGIN: 'Login',
  DETAILS: 'Details',
  PROFILE: 'Profile',
};

const AuthenticatedTabs = createBottomTabNavigator({
  screenOptions: {
    tabBarActiveTintColor: theme.colors.primary[500],
    tabBarInactiveTintColor: theme.colors.gray[400],
    tabBarStyle: {
      backgroundColor: theme.colors.white,
      borderTopColor: theme.colors.gray[200],
      borderTopWidth: 1,
      paddingBottom: 8,
      paddingTop: 8,
      height: 60,
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '500',
    },
    headerShown: false,
  },
  screens: {
    [SCREENS.HOME]: {
      screen: Home,
      options: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <Icon family="feather" name="home" size={size} color={color} />
        ),
      },
    },
    [SCREENS.PROFILE]: {
      screen: Profile,
      options: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <Icon family="feather" name="user" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    gestureEnabled: Platform.OS === 'ios',
    fullScreenGestureEnabled: true,
    animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
  },
  groups: {
    authenticated: {
      if: useIsSignedIn,
      screens: {
        Tabs: {
          screen: AuthenticatedTabs,
          options: {
            headerShown: false,
            gestureEnabled: false,
          },
        },
        [SCREENS.DETAILS]: {
          screen: Details,
          options: {
            headerShown: true,
            headerBackTitle: 'Back',
            gestureEnabled: true,
          },
        },
      },
    },
    unauthenticated: {
      if: useIsSignedOut,
      screens: {
        [SCREENS.LOGIN]: {
          screen: Login,
          options: {
            headerShown: false,
            gestureEnabled: false,
          },
        },
      },
    },
  },
});

const NavigationStack = createStaticNavigation(RootStack);

export default function Navigation() {
  return <NavigationStack />;
}
