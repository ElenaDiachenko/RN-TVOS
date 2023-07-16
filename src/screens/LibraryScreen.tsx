import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';

const LibraryScreen = () => {
  const navigation =
    useNavigation<AppStackScreenProps<'Library'>['navigation']>();
  return (
    <View>
      <Text>LibraryScreen</Text>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {movieId: '1'})}>
          <Text>Card 1</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({});
