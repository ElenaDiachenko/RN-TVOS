import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {FC, ReactNode, useState} from 'react';
import {palette} from '../../styles';

type FocusedType = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
  focusedStyle?: ViewStyle;
  accessibilityLabel?: string;
  handlePress?: () => void;
};
const Focused: FC<FocusedType> = ({
  style,
  focusedStyle,
  handlePress,
  children,
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <TouchableOpacity
      style={[style, focus ? focusedStyle || styles.focused : null]}
      onPress={handlePress}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      {children}
    </TouchableOpacity>
  );
};

export default Focused;

const styles = StyleSheet.create({
  focused: {
    borderColor: palette.accentColor,
  },
});
