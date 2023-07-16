import {AxiosError} from 'axios';
import {Movie, MovieDataType} from '../types';
import $api from './instance';

export type LibrarySearchParamsType = {
  page: number;
  limit: number;
  query: string;
  sort: string;
  order: string;
};

export const fetchMovies = async (searchParams: LibrarySearchParamsType) => {
  const {page, limit, query} = searchParams;

  let queryParams = `page=${page}&limit=${limit}`;
  if (query) {
    queryParams += `&query=${encodeURIComponent(query)}`;
  }

  try {
    const response = await $api.get<MovieDataType>(`/library?${queryParams}`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log('Error Response:', error?.response?.data);
      console.log('Status Code:', error?.response?.status);
      console.log('Headers:', error?.response?.headers);
    }
    console.log(error);
  }
};

export const addMovie = async (id: string) => {
  const {data} = await $api.post<Movie>(`/library/${id}`);

  return data;
};

export const deleteMovie = async (id: string) => {
  const {data} = await $api.delete<Movie>(`/library/${id}`);

  return data;
};

export type FetchMoviesType = typeof fetchMovies;
