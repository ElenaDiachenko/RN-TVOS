import {
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {FC, ReactNode, useState, useCallback} from 'react';

import {palette} from '../../styles';

type FocusedType = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
  focusedStyle?: ViewStyle;
  handlePress?: () => void;
};

const Focused: FC<FocusedType & ViewProps & TouchableOpacityProps> = ({
  onFocus,
  onBlur,
  style,
  focusedStyle,
  handlePress,
  children,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setFocus(true);
      onFocus?.(e);
    },
    [onFocus],
  );
  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      setFocus(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  return (
    <TouchableOpacity
      {...props}
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
