import type {
  DefaultNavigatorOptions,
  ParamListBase,
  RouteConfig,
  StackNavigationState,
} from '@react-navigation/core';
import {RouteProp} from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';

export type StackNavigatorOptions<ParamList extends ParamListBase> =
  DefaultNavigatorOptions<
    ParamList,
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap
  >;

export type StackRoutesType<ParamList extends ParamListBase> = Array<
  RouteConfig<
    ParamList,
    keyof ParamList,
    StackNavigationState<ParamList>,
    StackNavigationOptions,
    StackNavigationEventMap
  >
>;

export type AppStackParamList = {
  Home: undefined;
  Library: undefined;
  Details: {
    movieId: string;
  };
  Video: {
    uri: string;
  };
};

export type AppStackRoutesType = StackRoutesType<AppStackParamList>;

export type AppStackScreenProps<T extends keyof AppStackParamList> = {
  navigation: StackNavigationProp<AppStackParamList, T>;
  route: RouteProp<AppStackParamList, T>;
};

export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
};
export type AuthStackRoutesType = StackRoutesType<AuthStackParamList>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: StackNavigationProp<AuthStackParamList, T>;
  route: RouteProp<AuthStackParamList, T>;
};
