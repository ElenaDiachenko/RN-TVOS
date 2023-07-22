import {StyleSheet, View, FlatList, ListRenderItem} from 'react-native';
import React, {useRef, useEffect, memo, FC} from 'react';

import {constants} from '../../utils';
import {palette} from '../../styles';
import {MemoizedGenreItem} from './GenreItem';

type GenreListProps = {
  handleChange: ChangeHandler;
  query: string;
};
type ChangeHandler = (newQuery: string) => void;
type GenreType = (typeof constants.genreList)[number];

const GenreList: FC<GenreListProps> = ({handleChange, query}) => {
  const flatListRef = useRef<FlatList<GenreType>>(null);

  const renderItem: ListRenderItem<GenreType> = ({item}) => {
    return (
      <MemoizedGenreItem
        item={item}
        handleChange={handleChange}
        pressedGenre={query ? query : 'all genres'}
      />
    );
  };

  const renderSeparator = (): JSX.Element => {
    return <View style={styles.separator} />;
  };

  useEffect(() => {
    if (flatListRef.current) {
      const index = constants.genreList.findIndex(item => item.value === query);
      if (index !== -1) {
        flatListRef.current.scrollToIndex({index, animated: true});
      }
    }
  }, [query]);

  const getItemLayout = (_: any, index: number) => ({
    length: styles.item.width,
    offset: styles.item.width * index,
    index,
  });

  const onScrollToIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    const {index} = info;
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 0, animated: true});
    }
    console.log('Scroll to index failed for index:', index);
  };

  return (
    <FlatList
      ref={flatListRef}
      data={constants.genreList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      initialNumToRender={constants.genreList.length}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={onScrollToIndexFailed}
    />
  );
};

export default memo(GenreList);

const styles = StyleSheet.create({
  separator: {
    width: 1,
    height: '60%',
    alignSelf: 'center',
    backgroundColor: palette.footerTextColor,
    marginHorizontal: 10,
  },
  item: {
    width: 90,
  },
});
