import React, {useState, FC, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {shallow} from 'zustand/shallow';
import {useStore} from '../stores/store';
import {GenreList} from './ui';
import Search from './Search';
import {commonStyles} from '../styles';
import Sort from './ui/Sort';
import {constants} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';

type ActionSectionProps = {
  // prevRoute: string;
};
const initialQuery = {
  keyword: '',
  genre: '',
};
export type InitialQueryType = typeof initialQuery;

const ActionSection: FC<ActionSectionProps> = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const [query, setQuery] = useState(initialQuery);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    searchParameters,
    setSearchParameters,
    setLibrarySearchParameters,
    librarySearchParameters,
  } = useStore(
    state => ({
      searchParameters: state.searchParameters,
      setSearchParameters: state.setSearchParameters,
      librarySearchParameters: state.librarySearchParameters,
      setLibrarySearchParameters: state.setLibrarySearchParameters,
    }),
    shallow,
  );

  const prevRoute = navigation.getState().routes[0].name;
  const handleSearch = (searchQuery: string) => {
    const evalGenre = searchQuery === 'all genres' ? '' : searchQuery;
    if (prevRoute === 'Home') {
      const updatedSearchParams = {
        ...searchParameters,
        query: evalGenre,
        page: 1,
      };
      setSearchParameters(updatedSearchParams);
    } else {
      const updatedSearchParams = {
        ...librarySearchParameters,
        query: evalGenre,
        page: 1,
      };
      setLibrarySearchParameters(updatedSearchParams);
    }
  };

  const sortState = {
    sort: searchParameters.sort,
    order: searchParameters.order,
  };

  const handleSort = (newSortState: typeof sortState) => {
    const updatedSearchParams = {...searchParameters, ...newSortState, page: 1};
    setSearchParameters(updatedSearchParams);
  };

  useEffect(() => {
    if (!searchParameters && !librarySearchParameters) {
      return;
    }

    const queryValue =
      prevRoute === 'Home'
        ? searchParameters?.query || ''
        : librarySearchParameters?.query || '';

    const isGenre = constants.genreList.some(item => item.value === queryValue);
    const updatedQuery = {
      genre: isGenre ? queryValue : '',
      keyword: isGenre ? '' : queryValue,
    };

    setQuery(updatedQuery);
  }, [librarySearchParameters, searchParameters, prevRoute]);

  return (
    <View style={styles.container}>
      <GenreList query={query.genre} handleChange={handleSearch} />
      <View style={styles.innerContainer}>
        <Search
          handleChange={handleSearch}
          setMessage={setErrorMessage}
          query={query.keyword}
        />
        {prevRoute === 'Home' ? (
          <Sort
            data={constants.sortList}
            sortState={sortState}
            handleChange={handleSort}
          />
        ) : null}
      </View>

      <Text style={{...commonStyles.text}}>{errorMessage}</Text>
    </View>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    gap: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
