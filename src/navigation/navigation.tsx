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

const RootStack = createNativeStackNavigator({
  screens: {
    Home: Home,
    Login: Login,
    Details: Details,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
