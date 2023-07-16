import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createAuthSlice, AuthSlice} from './createAuthSlice';
import {createMovieSlice, MovieSlice} from './createMovieSlice';

export const useStore = create<AuthSlice & MovieSlice>()(
  immer(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createMovieSlice(...a),
      }),
      {
        name: 'state',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

export type PersistState = {
  state: (AuthSlice & MovieSlice) | '';
};

export const getAuthUser = () => useStore.getState().authUser;
