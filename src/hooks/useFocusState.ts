import {useState} from 'react';

type UseFocusStateResult = [boolean, (focused: boolean) => void];

export const useFocusState = (): UseFocusStateResult => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocusChange = (focused: boolean) => {
    setIsFocused(focused);
  };

  return [isFocused, handleFocusChange];
};
