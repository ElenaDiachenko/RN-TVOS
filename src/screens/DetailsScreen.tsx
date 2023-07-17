import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';
import {MovieDetailsContent} from '../components';

const DetailsScreen = () => {
  const route = useRoute<AppStackScreenProps<'Details'>['route']>();
  const navigation =
    useNavigation<AppStackScreenProps<'Details'>['navigation']>();
  const {movieId} = route.params;
  const uri = 'URL';
  return (
    <View>
      <Text>DetailsScreen - Movie ID: {movieId}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Video', {uri})}>
        <Text>Video</Text>
      </TouchableOpacity>
      <MovieDetailsContent movieId={movieId} navigation={navigation} />
    </View>
  );
};

export default DetailsScreen;
