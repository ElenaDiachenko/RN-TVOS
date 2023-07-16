import {useQuery} from '@tanstack/react-query';
import {shallow} from 'zustand/shallow';
import {useStore} from '../stores/store';
import {FetchMoviesType} from '../API/movieRequests';
import {getSerializedSearchParameters} from '../utils';

export const useMovieQuery = (fetchData: FetchMoviesType) => {
  const {searchParameters, setSearchParameters} = useStore(
    state => ({
      searchParameters: state.searchParameters,
      setSearchParameters: state.setSearchParameters,
    }),
    shallow,
  );

  const serializedSearchParameters =
    getSerializedSearchParameters(searchParameters);

  const {data, isLoading, isError, isSuccess} = useQuery(
    ['movies', serializedSearchParameters],
    () => fetchData(searchParameters),
  );

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    setSearchParameters,
    searchParameters,
  };
};

export type UseMovieQueryType = typeof useMovieQuery;
