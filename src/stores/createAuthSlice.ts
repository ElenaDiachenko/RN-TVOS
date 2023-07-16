import {StateCreator} from 'zustand';
import {MovieSlice, initialState} from './createMovieSlice';
import auth from '@react-native-firebase/auth';

import {UserType, SignupData, LoginData} from '../types';

export type AuthSlice = {
  authUser: UserType | null;
  loading: boolean;
  error: string | null;
  registerUser: (data: SignupData) => void;
  loginUser: (data: LoginData) => void;
  logoutUser: () => void;
  checkUser: () => void;
};

export const createAuthSlice: StateCreator<
  AuthSlice & MovieSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  AuthSlice
> = set => ({
  authUser: null,
  loading: false,
  error: null,
  checkUser: async () => {
    set({loading: true, error: null});
    console.log('checkUser');
    try {
      const unsubscribe = auth().onAuthStateChanged(async user => {
        if (user && user.displayName) {
          const token = await user.getIdToken();
          const currentUser = {
            username: user.displayName,
            token,
          };
          set({
            authUser: currentUser,
            error: null,
          });
        }
      });
      return () => {
        unsubscribe();
      };
    } catch (error: any) {
      set({error: error.message});
      console.log(error);
    } finally {
      set({loading: false});
    }
  },

  registerUser: async ({username, email, password}) => {
    set({loading: true, error: null});
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      if (auth()?.currentUser) {
        await auth().currentUser?.updateProfile({
          displayName: username,
        });
      }
      const createdUser = auth().currentUser;
      const token = await createdUser?.getIdToken();

      const user: UserType = {
        username: createdUser?.displayName || '',
        token: token || '',
      };
      set({
        authUser: user,
        error: null,
      });
    } catch (error: any) {
      set({error: error.message});
      console.log(error);
    } finally {
      set({loading: false});
    }
  },

  loginUser: async ({email, password}) => {
    set({loading: true, error: null});
    try {
      await auth().signInWithEmailAndPassword(email, password);

      const currentUser = auth().currentUser;
      const token = await currentUser?.getIdToken();
      const user: UserType = {
        username: currentUser?.displayName || '',
        token: token || '',
      };
      set({
        authUser: user,
        error: null,
      });
      console.log(user, 'user => Login');
    } catch (error: any) {
      set({error: error.message});
      console.log(error);
    } finally {
      set({loading: false});
    }
  },

  logoutUser: async () => {
    set({loading: true, error: null});
    try {
      await auth().signOut();
      set({
        authUser: null,
        error: null,
        searchParameters: initialState,
        librarySearchParameters: initialState,
      });
    } catch (error: any) {
      set({error: error.message});
      console.log(error);
    } finally {
      set({loading: false});
    }
  },
});
