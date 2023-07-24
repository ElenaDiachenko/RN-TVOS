import React, {useState, FC, useRef} from 'react';
import {TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {palette} from '../../styles';

type InputProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  setInputFocused?: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
};
const AuthInput: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  setInputFocused,
  secureTextEntry = false,
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    setInputFocused?.(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setInputFocused?.(false);
  };

  return (
    <TouchableOpacity
      style={styles.inputBox}
      onPress={() => textInputRef?.current?.focus()}
      activeOpacity={1}
      onFocus={handleFocus}
      onBlur={handleBlur}>
      <TextInput
        ref={textInputRef}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={palette.footerTextColor}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            borderColor: !isFocused ? palette.whiteColor : palette.accentColor,
          },
        ]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </TouchableOpacity>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    maxWidth: 450,
  },
  input: {
    width: '100%',
    height: 40,
    alignSelf: 'center',
    backgroundColor: palette.whiteColor,
    color: palette.blackColor,
    padding: 5,
    fontWeight: '500',
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 5,
  },
  error: {
    color: palette.warningText,
    marginBottom: 8,
  },
});
