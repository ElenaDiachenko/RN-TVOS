// import {StyleSheet, ViewStyle, TouchableOpacity, ViewProps} from 'react-native';
// import React, {FC, ReactNode, useState} from 'react';
// import {palette} from '../../styles';

// type FocusedType = {
//   children: ReactNode | ReactNode[];
//   style?: ViewStyle;
//   props?: ViewProps;
//   focusedStyle?: ViewStyle;

//   handlePress?: () => void;
// };
// const Focused: FC<FocusedType> = ({
//   style,
//   focusedStyle,
//   handlePress,
//   children,
//   ...props
// }) => {
//   const [focus, setFocus] = useState(false);

//   const handleFocus = () => {
//     setFocus(true);
//   };

//   const handleBlur = () => {
//     setFocus(false);
//   };

//   return (
//     <TouchableOpacity
//       {...props}
//       style={[style, focus ? focusedStyle || styles.focused : null]}
//       onPress={handlePress}
//       activeOpacity={1}
//       onFocus={handleFocus}
//       onBlur={handleBlur}>
//       {children}
//     </TouchableOpacity>
//   );
// };

// export default Focused;

// const styles = StyleSheet.create({
//   focused: {
//     borderColor: palette.accentColor,
//   },
// });

import {StyleSheet, TouchableOpacity, ViewProps, ViewStyle} from 'react-native';
import React, {
  FC,
  ReactNode,
  useState,
  forwardRef,
  ForwardedRef,
  Ref,
} from 'react';

import {palette} from '../../styles';

type FocusedType = {
  children: ReactNode | ReactNode[];
  style?: ViewStyle;
  focusedStyle?: ViewStyle;
  handlePress?: () => void;
  ref?: Ref<TouchableOpacity>;
};

const Focused: FC<FocusedType & ViewProps> = forwardRef(
  (
    {style, focusedStyle, handlePress, children, ...props}: FocusedType,
    ref: ForwardedRef<TouchableOpacity>,
  ) => {
    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
      setFocus(true);
    };

    const handleBlur = () => {
      setFocus(false);
    };

    return (
      <TouchableOpacity
        {...props}
        style={[style, focus ? focusedStyle || styles.focused : null]}
        onPress={handlePress}
        activeOpacity={1}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}>
        {children}
      </TouchableOpacity>
    );
  },
);

export default Focused;

const styles = StyleSheet.create({
  focused: {
    borderColor: palette.accentColor,
  },
});
