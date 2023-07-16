import React, {FC, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {palette} from '../../styles';

type ButtonProps = {
  onPress: () => void;
};

const SearchButton: FC<ButtonProps> = ({onPress}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const buttonStyle = isPressed
    ? [styles.button, styles.pressedButton]
    : styles.button;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Ionicons
        name="search"
        size={24}
        color={palette.whiteColor}
        style={buttonStyle}
      />
    </TouchableWithoutFeedback>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  pressedButton: {
    color: palette.accentColor,
  },
});
