import {StyleSheet} from 'react-native';
import React from 'react';

import {MovieGallery, ScreenWrapper} from '../components';
import {movieRequests} from '../API';
import {useMovieQuery} from '../hooks';

import {palette} from '../styles';

const HomeScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <MovieGallery
        movieHandler={useMovieQuery}
        fetchData={movieRequests.fetchMovies}
      />
    </ScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
