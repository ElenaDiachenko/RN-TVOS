import {Alert} from 'react-native';
import {AxiosError} from 'axios';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {shallow} from 'zustand/shallow';

import {useStore} from '../stores/store';
import {getSerializedSearchParameters} from '../utils';
import {libraryRequests} from '../API';
import {Movie, MovieDataType} from '../types';

type useMovieProps = {
  isHomeScreen: boolean;
  goBack: () => void;
};

export const useMovie = ({isHomeScreen, goBack}: useMovieProps) => {
  const queryClient = useQueryClient();
  const {searchParameters, setSearchParameters} = useStore(
    state => ({
      searchParameters: state.librarySearchParameters,
      setSearchParameters: state.setLibrarySearchParameters,
    }),
    shallow,
  );

  const serializedSearchParameters =
    getSerializedSearchParameters(searchParameters);

  const addMovieMutation = useMutation(libraryRequests.addMovie, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['library']);
      Alert.alert('The movie has been saved successfully');
    },
    onError: error => {
      if (error instanceof AxiosError) {
        if (error?.response?.status === 403) {
          Alert.alert(error?.response?.data?.message);
        }
        return;
      }
      Alert.alert('Something went wrong.Try again later');
    },
  });

  const deleteMovieMutation = useMutation(libraryRequests.deleteMovie, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['library']);
      Alert.alert('The movie has been deleted successfully');
      const libraryQueryData = queryClient.getQueryData<MovieDataType>([
        'library',
        serializedSearchParameters,
      ]);

      if (
        libraryQueryData &&
        +libraryQueryData.currentPage !== 1 &&
        libraryQueryData.data.length === 0
      ) {
        const updatedSearchParams = {
          ...searchParameters,
          page: +libraryQueryData.currentPage - 1,
        };
        setSearchParameters(updatedSearchParams);
      }
      goBack();
    },
    onError: () => {
      Alert.alert('Something went wrong. Try again later');
    },
  });

  const toggleMovie = (selectedMovie: Movie): void => {
    isHomeScreen
      ? addMovieMutation.mutate(selectedMovie._id)
      : deleteMovieMutation.mutate(selectedMovie._id);
  };
  return {toggleMovie};
};
