import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef} from 'react';
import {shallow} from 'zustand/shallow';
import {useStore} from '../../stores/store';
import Feather from 'react-native-vector-icons/Feather';
import {AppStackScreenProps} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import {commonStyles, palette} from '../../styles';
import Focused from './Focused';

const CustomHeader = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const focusedElementRef = useRef<TouchableOpacity | null>(null);

  const {logoutUser} = useStore(
    state => ({
      logoutUser: state.logoutUser,
    }),
    shallow,
  );

  const handleFocus = () => {
    // Access the focusedElementRef.current to get the focused element

    if (focusedElementRef.current) {
      // Do something with the focused element
      focusedElementRef.current.setNativeProps({
        style: {backgroundColor: 'red'}, // For example, change the background color
      });
    }
  };
  return (
    <View style={styles.container}>
      <Focused
        ref={focusedElementRef}
        handlePress={handleFocus}
        // handlePress={() => navigation.navigate('Library')}
        style={{...styles.logoutBtn, ...commonStyles.borderInit}}>
        <Text style={commonStyles.text}>Library</Text>
      </Focused>
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
    gap: 20,
    alignItems: 'center',
  },
  logoutBtn: {
    padding: 10,
    maxWidth: 100,
  },
});
