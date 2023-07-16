import React, {FC, SetStateAction, Dispatch, useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {palette} from '../../styles';

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  setValue: Dispatch<SetStateAction<string>> | ((value: string) => void);
};

const Input: FC<InputProps> = ({
  placeholder,
  secureTextEntry = false,
  value,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextInput
      style={[
        styles.input,
        {
          borderBottomColor: !isFocused
            ? palette.whiteColor
            : palette.accentColor,
        },
      ]}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      placeholderTextColor={palette.footerTextColor}
      onChangeText={setValue}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    color: palette.whiteColor,
    fontWeight: '500',
    fontSize: 16,
    borderBottomWidth: 1,
  },
});
