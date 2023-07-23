import React, {useState, FC, useEffect} from 'react';
import {Text, StyleSheet, TVFocusGuideView} from 'react-native';
import {shallow} from 'zustand/shallow';
import {useStore} from '../stores/store';
import {CustomHeader, Focused, GenreList} from './ui';
import Search from './Search';
import {commonStyles, palette} from '../styles';
import Sort from './ui/Sort';
import {constants} from '../utils';
import {useNavigation} from '@react-navigation/native';
import {AppStackScreenProps} from '../navigation/types';
import Feather from 'react-native-vector-icons/Feather';

type ActionSectionProps = {};
const initialQuery = {
  keyword: '',
  genre: '',
};
export type InitialQueryType = typeof initialQuery;

const ActionSection: FC<ActionSectionProps> = () => {
  const navigation = useNavigation<AppStackScreenProps<'Home'>['navigation']>();
  const [query, setQuery] = useState(initialQuery);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const handleFilters = () => {
    setIsFilterOpen(prev => !prev);
  };

  const handleSearch = (searchQuery: string) => {
    const evalGenre = searchQuery === 'all genres' ? '' : searchQuery;
    if (prevRoute === 'Home') {
      const updatedSearchParams = {
        ...searchParameters,
        query: evalGenre,
        page: 1,
      };
      setSearchParameters(updatedSearchParams);
      handleFilters();
    } else {
      const updatedSearchParams = {
        ...librarySearchParameters,
        query: evalGenre,
        page: 1,
      };
      setLibrarySearchParameters(updatedSearchParams);
      handleFilters();
    }
  };

  const sortState = {
    sort: searchParameters.sort,
    order: searchParameters.order,
  };

  const handleSort = (newSortState: typeof sortState) => {
    const updatedSearchParams = {...searchParameters, ...newSortState, page: 1};
    setSearchParameters(updatedSearchParams);
    handleFilters();
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
    <TVFocusGuideView
      style={[!isFilterOpen ? styles.containerRow : styles.container]}
      autoFocus>
      <Focused
        handlePress={handleFilters}
        style={{...commonStyles.borderInit, ...styles.menu}}>
        <Feather
          name="menu"
          size={26}
          color={!isFilterOpen ? palette.accentColor : palette.whiteColor}
        />
      </Focused>

      {isFilterOpen ? (
        <>
          <TVFocusGuideView style={{width: '100%'}} autoFocus>
            <GenreList query={query.genre} handleChange={handleSearch} />
          </TVFocusGuideView>

          <TVFocusGuideView style={styles.innerContainer} autoFocus>
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
          </TVFocusGuideView>

          <Text style={{...commonStyles.text}}>{errorMessage}</Text>
        </>
      ) : (
        <CustomHeader />
      )}
    </TVFocusGuideView>
  );
};

export default ActionSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    gap: 10,
    width: '100%',
    // backgroundColor: 'blue',
  },
  containerRow: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'blue',
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menu: {
    padding: 10,
    width: 45,
    height: 45,
    alignContent: 'center',
  },
});
