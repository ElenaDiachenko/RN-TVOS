import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';
import {MovieDetailsContent, ScreenWrapper} from '../components';
import {palette} from '../styles';

const DetailsScreen = () => {
  const route = useRoute<AppStackScreenProps<'Details'>['route']>();
  const navigation =
    useNavigation<AppStackScreenProps<'Details'>['navigation']>();
  const {movieId} = route.params;
  const uri = 'URL';
  return (
    <ScreenWrapper style={styles.container}>
      <Text>DetailsScreen - Movie ID: {movieId}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Video', {uri})}>
        <Text>Video</Text>
      </TouchableOpacity>
      <MovieDetailsContent movieId={movieId} navigation={navigation} />
    </ScreenWrapper>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.mainBgColor,
  },
});
