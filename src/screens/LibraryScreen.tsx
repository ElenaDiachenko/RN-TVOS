import {StyleSheet} from 'react-native';
import React from 'react';

import {MovieGallery, ScreenWrapper} from '../components';
import {libraryRequests} from '../API';
import {useLibraryQuery} from '../hooks';

import {palette} from '../styles';

const LibraryScreen = () => {
  return (
    <ScreenWrapper style={styles.container}>
      <MovieGallery
        movieHandler={useLibraryQuery}
        fetchData={libraryRequests.fetchMovies}
      />
    </ScreenWrapper>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
