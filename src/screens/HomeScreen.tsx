import {
  ScrollView,
  StyleSheet,
  TVFocusGuideView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {AppStackScreenProps} from '../navigation/types';

import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Library')}
        style={{padding: 20, backgroundColor: 'red'}}>
        <Text>Library</Text>
      </TouchableOpacity>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {movieId: '1'})}>
          <Text>Card 1</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
