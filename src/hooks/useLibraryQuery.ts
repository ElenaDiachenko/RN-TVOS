import {useQuery} from '@tanstack/react-query';
import {shallow} from 'zustand/shallow';
import {useStore} from '../stores/store';
import {FetchMoviesType} from '../API/libraryRequests';
import {getSerializedSearchParameters} from '../utils';

export const useLibraryQuery = (fetchData: FetchMoviesType) => {
  const {searchParameters, setSearchParameters} = useStore(
    state => ({
      searchParameters: state.librarySearchParameters,
      setSearchParameters: state.setLibrarySearchParameters,
    }),
    shallow,
  );
  const serializedSearchParameters =
    getSerializedSearchParameters(searchParameters);

  const {data, isLoading, isError, isSuccess} = useQuery(
    ['library', serializedSearchParameters],
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

export type UseLibraryQueryType = typeof useLibraryQuery;
