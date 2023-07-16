import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';

const VideoScreen = () => {
  const route = useRoute<AppStackScreenProps<'Video'>['route']>();
  const {uri} = route.params;

  return (
    <View>
      <Text>VideoScreen - Movie ID: {uri}</Text>
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({});
