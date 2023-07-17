import React, {FC, useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {UseMovieQueryType} from '../hooks/useMovieQuery';
import {movieRequests, libraryRequests} from '../API';
import {UseLibraryQueryType} from '../hooks/useLibraryQuery';
import MovieCard from './MovieCard';
import {Movie} from '../types';
// import ActionSection from './ActionSection';
import {commonStyles, palette} from '../styles';
import {useOrientation} from '../hooks';
import {Pagination, Loader} from './ui';

import {AppStackScreenProps} from '../navigation/types';
import {useNavigation} from '@react-navigation/native';

type GalleryPropType = {
  movieHandler: UseMovieQueryType | UseLibraryQueryType;
  fetchData: movieRequests.FetchMoviesType | libraryRequests.FetchMoviesType;
};

const renderMovieCard = ({item}: {item: Movie}) => <MovieCard movie={item} />;

const MovieGallery: FC<GalleryPropType> = ({movieHandler, fetchData}) => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const {isPortrait, width, height} = useOrientation();
  const [numCols] = useState(6);
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    setSearchParameters,
    searchParameters,
  } = movieHandler(fetchData);

  const {data: movieData, currentPage, totalPages} = data || {};

  const paginate = (page: number) => {
    const updatedSearchParams = {...searchParameters, page};
    setSearchParameters(updatedSearchParams);
  };

  return (
    <View style={styles.gallery}>
      <View>
        <FlatList
          ListHeaderComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate('Library')}
              style={{padding: 10, backgroundColor: 'red', maxWidth: 100}}>
              <Text>Library</Text>
            </TouchableOpacity>
          }
          ListFooterComponent={
            currentPage && totalPages && totalPages > 1 ? (
              <Pagination
                limit={6}
                total={totalPages}
                paginate={paginate}
                currentPage={+currentPage}
                buttonConst={3}
                contentPerPage={5}
                siblingCount={1}
              />
            ) : null
          }
          key={numCols}
          data={movieData}
          renderItem={({item}) => renderMovieCard({item})}
          keyExtractor={item => item._id}
          numColumns={numCols}
          ListEmptyComponent={
            isSuccess && !movieData?.length ? (
              <View style={styles.innerContainer}>
                <Text style={commonStyles.text}>Not found</Text>
              </View>
            ) : null
          }
        />
        {isLoading && <Loader size={isPortrait ? width / 6 : height / 6} />}
        {isError && (
          <View style={styles.innerContainer}>
            <Text>An error has occurred. Try again later.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default MovieGallery;

const styles = StyleSheet.create({
  gallery: {
    backgroundColor: palette.mainBgColor,
  },

  innerContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
