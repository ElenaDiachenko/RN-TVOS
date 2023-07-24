import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {shallow} from 'zustand/shallow';
import {useStore} from '../../stores/store';
import Feather from 'react-native-vector-icons/Feather';
import {AppStackScreenProps} from '../../navigation/types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {palette} from '../../styles';
import Focused from './Focused';
import {useFocusState} from '../../hooks';

const CustomHeader = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const {name: route} = useRoute<AppStackScreenProps<'Home'>['route']>();
  const [isFocusedLibrary, handleFocusChangeLibrary] = useFocusState();
  const [isFocusedLogout, handleFocusChangeLogout] = useFocusState();

  const {logoutUser} = useStore(
    state => ({
      logoutUser: state.logoutUser,
    }),
    shallow,
  );

  return (
    <View style={styles.container}>
      <Focused
        onFocus={() => handleFocusChangeLibrary(true)}
        onBlur={() => handleFocusChangeLibrary(false)}
        handlePress={() =>
          navigation.navigate(route === 'Home' ? 'Library' : 'Home')
        }
        style={{...styles.logoutBtn}}>
        <Text
          style={{
            color: isFocusedLibrary ? palette.accentColor : palette.whiteColor,
          }}>
          {route === 'Home' ? 'Library' : 'Home'}
        </Text>
      </Focused>
      <Focused
        handlePress={() => logoutUser()}
        onFocus={() => handleFocusChangeLogout(true)}
        onBlur={() => handleFocusChangeLogout(false)}>
        <Feather
          name="log-out"
          size={26}
          color={isFocusedLogout ? palette.accentColor : palette.whiteColor}
        />
      </Focused>
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
