import React, {FC, Dispatch, SetStateAction, useState, useEffect} from 'react';
import {StyleSheet, Keyboard, View} from 'react-native';
import {AuthInput, SearchButton} from './ui';
// import {Focused, Input} from './ui';

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
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleChangeInput = (newQuery: string) => {
    setQuery(newQuery.trim());

    if (newQuery.trim() === '') {
      handleChange('');
    } else {
      setMessage('');
    }
  };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    setQuery(initialQuery);

    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [initialQuery]);

  useEffect(() => {
    if (!isKeyboardOpen && query !== initialQuery) {
      const handleSubmit = () => {
        if (query === '') {
          return setMessage('Enter the title in the search field.');
        }
        setMessage('');
        handleChange(query);
      };

      handleSubmit();
    }
  }, [handleChange, initialQuery, isKeyboardOpen, query, setMessage]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <AuthInput
          placeholder={'Search movie...'}
          value={query}
          onChangeText={handleChangeInput}
          setInputFocused={setIsFocused}
        />
        <SearchButton isFocused={isFocused} />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
  innerContainer: {
    position: 'relative',
    maxWidth: 450,
  },
});
