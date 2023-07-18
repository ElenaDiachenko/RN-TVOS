import {StyleSheet, View} from 'react-native';
import React from 'react';

import {MovieGallery} from '../components';
import {movieRequests} from '../API';
import {useMovieQuery} from '../hooks';

import {palette} from '../styles';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MovieGallery
        movieHandler={useMovieQuery}
        fetchData={movieRequests.fetchMovies}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
