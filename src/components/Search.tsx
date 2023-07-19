import React, {FC, Dispatch, SetStateAction, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
// import Input from './ui/Input';
import {SearchButton} from './ui';

import {Focused, Input} from './ui';

type SearchPropsType = {
  handleChange: (newQuery: string) => void;
  setMessage: Dispatch<SetStateAction<string>>;
  query: string;
};

const Search: FC<SearchPropsType> = ({
  handleChange,
  setMessage,
  query: initialQuery,
}) => {
  const [query, setQuery] = useState(initialQuery);

  const handleChangeInput = (newQuery: string) => {
    setQuery(newQuery.trim());

    if (newQuery.trim() === '') {
      handleChange('');
    } else {
      setMessage('');
    }
  };

  const handleSubmit = () => {
    if (query === '') {
      return setMessage('Enter the title in the search field.');
    }
    setMessage('');
    handleChange(query);
  };

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <Focused style={styles.container}>
      <Input
        placeholder={'Search movie...'}
        value={query}
        setValue={handleChangeInput}
      />
      <SearchButton onPress={handleSubmit} />
    </Focused>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '30%',
  },
});
