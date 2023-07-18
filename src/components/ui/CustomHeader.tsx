import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {shallow} from 'zustand/shallow';
import {useStore} from '../../stores/store';
import Feather from 'react-native-vector-icons/Feather';
import {AppStackScreenProps} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {commonStyles, palette} from '../../styles';

const CustomHeader = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const {logoutUser} = useStore(
    state => ({
      logoutUser: state.logoutUser,
    }),
    shallow,
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Library')}
        style={styles.logoutBtn}>
        <Text style={commonStyles.text}>Library</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logoutUser()}>
        <Feather name="log-out" size={26} color={palette.whiteColor} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    padding: 10,
    maxWidth: 100,
  },
});
