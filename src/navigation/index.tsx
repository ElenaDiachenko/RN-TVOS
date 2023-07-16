import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {shallow} from 'zustand/shallow';

import {useStore} from '../stores/store';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const Navigation = () => {
  const {user} = useStore(
    state => ({
      user: state.authUser,
    }),
    shallow,
  );

  return (
    <NavigationContainer>
      {!user ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  );
};

export default Navigation;
