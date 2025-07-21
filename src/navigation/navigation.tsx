import * as React from 'react';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from '@/screens/details';
import Login from '@/screens/login';
import Home from '@/screens/home';

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
  screens: {
    [SCREENS.HOME]: Home,
    [SCREENS.LOGIN]: Login,
    [SCREENS.DETAILS]: Details,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
