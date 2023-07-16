import React from 'react';
import * as Screens from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StackNavigatorOptions,
  AuthStackParamList,
  AuthStackRoutesType,
} from './types';

const authStackRoutes: AuthStackRoutesType = [
  {
    name: 'Register',
    component: Screens.RegisterScreen,
  },
  {
    name: 'Login',
    component: Screens.LoginScreen,
  },
];

const authStackNavigatorProps: Omit<
  StackNavigatorOptions<AuthStackParamList>,
  'children'
> = {
  initialRouteName: 'Login',
  screenOptions: {
    headerShown: false,

    headerTitleStyle: {
      fontSize: 24,
      color: 'olivedrab',
    },
  },
};

const Stack = createStackNavigator<AuthStackParamList>();

const Auth = () => {
  return (
    <Stack.Navigator {...authStackNavigatorProps}>
      {authStackRoutes.map(stackRoute => (
        <Stack.Screen key={stackRoute.name} {...stackRoute} />
      ))}
    </Stack.Navigator>
  );
};

export default Auth;
