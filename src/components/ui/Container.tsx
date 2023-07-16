import React from 'react';
import {View, ScrollView} from 'react-native';
import type {PropsWithChildren} from 'react';
import {commonStyles} from '../../styles';

type ContainerProps = PropsWithChildren<{}>;

const Container = ({children}: ContainerProps) => {
  return (
    <View style={{...commonStyles.container}}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
};

export default Container;
