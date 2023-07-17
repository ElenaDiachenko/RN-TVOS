import {
  View,
  StyleSheet,
  TVFocusGuideView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';

import {MovieGallery} from '../components';
import {movieRequests} from '../API';
import {useMovieQuery} from '../hooks';
import {useStore} from '../stores/store';
import {shallow} from 'zustand/shallow';
import {palette} from '../styles';

const HomeScreen = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const {logoutUser} = useStore(
    state => ({
      logoutUser: state.logoutUser,
    }),
    shallow,
  );

  return (
    <TVFocusGuideView autoFocus style={styles.container}>
      <MovieGallery
        movieHandler={useMovieQuery}
        fetchData={movieRequests.fetchMovies}
      />
    </TVFocusGuideView>

    // <View style={{flex: 1}}>

    /* <TVFocusGuideView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Library')}
          style={{padding: 20, backgroundColor: 'red', maxWidth: 100}}>
          <Text>Library</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logoutUser()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </TVFocusGuideView> */

    // </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
  gallery: {
    // flex: 1,
    // backgroundColor: palette.mainBgColor,
  },

  innerContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
