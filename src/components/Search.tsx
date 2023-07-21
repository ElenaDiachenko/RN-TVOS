import React, {FC, Dispatch, SetStateAction, useState, useEffect} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {AuthInput} from './ui';
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

  const handleChangeInput = (newQuery: string) => {
    setQuery(newQuery.trim());

    if (newQuery.trim() === '') {
      handleChange('');
    } else {
      setMessage('');
    }
  };

  // const handleSubmit = () => {
  //   if (query === '') {
  //     return setMessage('Enter the title in the search field.');
  //   }
  //   setMessage('');
  //   handleChange(query);
  // };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    setQuery(initialQuery);

    // Add event listeners for keyboard show/hide events
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);

    // Clean up the event listeners when the component unmounts
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, [initialQuery]);

  useEffect(() => {
    // Check if the keyboard is hidden
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
    <>
      <AuthInput
        placeholder={'Search movie...'}
        value={query}
        onChangeText={handleChangeInput}
      />
      {/* Optionally, you can add the SearchButton here if you want it to be shown while the keyboard is open */}
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '30%',
  },
});
