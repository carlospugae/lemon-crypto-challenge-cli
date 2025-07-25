import * as React from 'react';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '@/screens/details';
import Login from '@/screens/login';
import Home from '@/screens/home';
import { useIsSignedIn, useIsSignedOut } from '@/context/AuthContext';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof RootStack> {}
  }
}
export const SCREENS = {
  HOME: 'Home',
  LOGIN: 'Login',
  DETAILS: 'Details',
};

const RootStack = createNativeStackNavigator({
  groups: {
    authenticated: {
      if: useIsSignedIn,
      screens: {
        [SCREENS.HOME]: Home,
        [SCREENS.DETAILS]: Details,
      },
    },
    unauthenticated: {
      if: useIsSignedOut,
      screens: {
        [SCREENS.LOGIN]: Login,
      },
    },
  },
});

const NavigationStack = createStaticNavigation(RootStack);

export default function Navigation() {
  return <NavigationStack />;
}
