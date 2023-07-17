import {StateCreator} from 'zustand';
import {AuthSlice} from './createAuthSlice';

export type MovieSlice = {
  searchParameters: {
    page: number;
    limit: number;
    query: string;
    sort: string;
    order: string;
  };
  librarySearchParameters: {
    page: number;
    limit: number;
    query: string;
    sort: string;
    order: string;
  };
  setSearchParameters: (
    searchParams: Partial<MovieSlice['searchParameters']>,
  ) => void;
  setLibrarySearchParameters: (
    searchParams: Partial<MovieSlice['librarySearchParameters']>,
  ) => void;
};

export const initialState = {
  page: 1,
  limit: 10,
  query: '',
  sort: 'rating',
  order: '1',
};

export const createMovieSlice: StateCreator<
  MovieSlice & AuthSlice,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  MovieSlice
> = (set, get) => ({
  searchParameters: initialState,
  librarySearchParameters: initialState,
  setSearchParameters: searchParams => {
    const updatedSearchParams = {...get().searchParameters, ...searchParams};
    set({searchParameters: updatedSearchParams});
  },
  setLibrarySearchParameters: searchParams => {
    const updatedSearchParams = {
      ...get().librarySearchParameters,
      ...searchParams,
    };
    set({librarySearchParameters: updatedSearchParams});
  },
});
