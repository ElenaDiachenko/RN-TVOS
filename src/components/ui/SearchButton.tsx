import React, {FC} from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {palette} from '../../styles';
import Focused from './Focused';
type ButtonProps = {
  props?: ViewProps;
  isFocused: boolean;
};

const SearchButton: FC<ButtonProps> = ({isFocused, ...props}) => {
  const buttonStyle = isFocused
    ? [styles.button, styles.pressedButton]
    : styles.button;

  return (
    <Focused style={styles.button} {...props}>
      <Ionicons
        name="search"
        size={24}
        color={palette.blackColor}
        style={buttonStyle}
      />
    </Focused>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 2,
    top: 5,
  },
  pressedButton: {
    color: palette.accentColor,
  },
});
