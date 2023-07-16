import React from 'react';
import * as Screens from '../screens';

import {createStackNavigator} from '@react-navigation/stack';
import {
  StackNavigatorOptions,
  AppStackParamList,
  AppStackRoutesType,
} from './types';

const appStackRoutes: AppStackRoutesType = [
  {
    name: 'Home',
    component: Screens.HomeScreen,
  },
  {
    name: 'Library',
    component: Screens.LibraryScreen,
  },
  {
    name: 'Details',
    component: Screens.DetailsScreen,
  },
  {
    name: 'Video',
    component: Screens.VideoScreen,
  },
];

const appStackNavigatorProps: Omit<
  StackNavigatorOptions<AppStackParamList>,
  'children'
> = {
  initialRouteName: 'Home',
  screenOptions: {
    // headerShown: false,

    headerTitleStyle: {
      fontSize: 24,
      color: 'green',
    },
  },
};

const Stack = createStackNavigator<AppStackParamList>();

const MainStack = () => (
  <Stack.Navigator {...appStackNavigatorProps}>
    {appStackRoutes.map(stackRoute => (
      <Stack.Screen key={stackRoute.name} {...stackRoute} />
    ))}
  </Stack.Navigator>
);

export default MainStack;
