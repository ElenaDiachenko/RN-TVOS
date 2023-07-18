import {useIsFocused} from '@react-navigation/native';

import React, {memo, ReactNode, useEffect} from 'react';
import {TVEventControl, TVFocusGuideView, View, ViewStyle} from 'react-native';

type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const ScreenWrapper = ({children, style, contentStyle}: ScreenProps) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      TVEventControl.enableTVMenuKey();
    }
    return () => {
      TVEventControl.disableTVMenuKey();
    };
  }, [isFocused]);

  return (
    <TVFocusGuideView style={style} autoFocus>
      <View style={[contentStyle]}>{children}</View>
    </TVFocusGuideView>
  );
};

export default memo(ScreenWrapper);
