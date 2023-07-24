import {useIsFocused, useRoute} from '@react-navigation/native';

import React, {memo, ReactNode, useEffect} from 'react';
import {TVEventControl, TVFocusGuideView, View, ViewStyle} from 'react-native';
import {AppStackScreenProps} from '../navigation/types';

type ScreenProps = {
  children: ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const ScreenWrapper = ({children, style, contentStyle}: ScreenProps) => {
  const isFocused = useIsFocused();
  const {name: route} = useRoute<AppStackScreenProps<'Home'>['route']>();

  useEffect(() => {
    if (isFocused) {
      if (route === 'Home') {
        TVEventControl.disableTVMenuKey();
      } else {
        TVEventControl.enableTVMenuKey();
      }
    }
  }, [isFocused, route]);

  return (
    <TVFocusGuideView style={style} autoFocus>
      <View style={[contentStyle]}>{children}</View>
    </TVFocusGuideView>
  );
};

export default memo(ScreenWrapper);
