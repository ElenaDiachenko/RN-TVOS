import React, {useReducer, useEffect} from 'react';
import {shallow} from 'zustand/shallow';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  // KeyboardAvoidingView,
  // TouchableWithoutFeedback,
  // Platform,
  // Keyboard,
  Alert,
  TVFocusGuideView,
} from 'react-native';

import {AuthInput} from './ui';
import {useStore} from '../stores/store';

import {reducer, validateInputField} from '../utils';
import {palette} from '../styles';
import {useNavigation} from '@react-navigation/native';
import {AuthStackScreenProps} from '../navigation/types';

const initialState: reducer.State = {
  username: '',
  email: '',
  password: '',
  errors: {},
};

const RegisterForm = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'Register'>['navigation']>();
  const [state, dispatch] = useReducer(reducer.reducer, initialState);

  const {registerUser, isLoading, error} = useStore(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    state => ({
      isLoading: state.loading,
      registerUser: state.registerUser,
      error: state.error,
    }),
    shallow,
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Error: ', error);
    }
  }, [error]);

  const handleFieldChange = (name: string, value: string) => {
    const validateError = validateInputField(name, value);
    dispatch({type: 'SET_FIELD', field: name, value});
    dispatch({type: 'SET_ERRORS', errors: {[name]: validateError}});
  };

  const handleSubmit = () => {
    const {username, email, password} = state;

    const usernameError = validateInputField('username', username || '');
    const emailError = validateInputField('email', email);
    const passwordError = validateInputField('password', password);

    dispatch({
      type: 'SET_ERRORS',
      errors: {
        username: usernameError,
        email: emailError,
        password: passwordError,
      },
    });

    if (!usernameError && !emailError && !passwordError) {
      const credentials = {
        username: username || '',
        email,
        password,
      };
      registerUser(credentials);
    }
  };

  const {username = '', email, password, errors} = state;

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={styles.mainContainer}>
    //   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <TVFocusGuideView style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <AuthInput
        placeholder="Username"
        value={username}
        onChangeText={value => handleFieldChange('username', value)}
        error={errors.username}
      />
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={value => handleFieldChange('email', value)}
        error={errors.email}
      />
      <AuthInput
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={value => handleFieldChange('password', value)}
        error={errors.password}
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.7}
        style={styles.button}>
        {isLoading ? (
          <ActivityIndicator size={25} color={palette.whiteColor} />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <View style={styles.containerLink}>
        <Text style={styles.text}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </TVFocusGuideView>
    //   </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: palette.mainBgColor,
    gap: 10,
  },
  inputBox: {
    width: '90%',
    maxWidth: 500,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: palette.whiteColor,
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
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    color: palette.warningText,
    marginBottom: 8,
  },
  button: {
    width: '35%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: palette.accentColor,
  },
  buttonText: {
    color: palette.whiteColor,
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: 20,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  text: {
    marginRight: 8,
    fontSize: 16,
    color: palette.whiteColor,
  },
  linkText: {
    color: palette.accentColor,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
