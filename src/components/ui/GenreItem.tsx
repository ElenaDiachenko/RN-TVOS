import {Text} from 'react-native';
import React, {FC, memo} from 'react';
import {constants} from '../../utils';
import {palette} from '../../styles';
import {useOrientation} from '../../hooks';
import Focused from './Focused';

type GenreType = (typeof constants.genreList)[number];

type RenderItemType = {
  item: GenreType;
  pressedGenre: string;
  handleChange: (newQuery: string) => void;
};

const GenreItem: FC<RenderItemType> = ({item, pressedGenre, handleChange}) => {
  const {isPortrait} = useOrientation();

  const isPressed = pressedGenre === item.value;

  const textStyle = [
    {fontSize: isPortrait ? 20 : 24},
    {color: isPressed ? palette.accentColor : palette.whiteColor},
  ];

  return (
    <Focused
      handlePress={() => handleChange(item.value)}
      style={{borderColor: 'red', borderWidth: 1}}>
      <Text style={textStyle}>{item.value}</Text>
    </Focused>
  );
};

export const MemoizedGenreItem = memo(GenreItem);
