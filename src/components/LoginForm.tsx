import React, {useReducer, useEffect} from 'react';
import {shallow} from 'zustand/shallow';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TVFocusGuideView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../stores/store';
import {reducer, validateInputField} from '../utils';
import {palette} from '../styles';
import {AuthInput} from './ui';
import {AuthStackScreenProps} from '../navigation/types';

const initialState: reducer.State = {
  email: '',
  password: '',
  errors: {},
};

const LoginForm = () => {
  const navigation =
    useNavigation<AuthStackScreenProps<'Login'>['navigation']>();
  const [state, dispatch] = useReducer(reducer.reducer, initialState);

  const {loginUser, isLoading, error} = useStore(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    state => ({
      isLoading: state.loading,
      loginUser: state.loginUser,
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
    const {email, password} = state;

    const emailError = validateInputField('email', email);
    const passwordError = validateInputField('password', password);

    dispatch({
      type: 'SET_ERRORS',
      errors: {email: emailError, password: passwordError},
    });

    if (!emailError && !passwordError) {
      const credentials = {
        email,
        password,
      };
      loginUser(credentials);
    }
  };

  const {email, password, errors} = state;

  return (
    <TVFocusGuideView style={styles.container}>
      <Text style={styles.title}>Log In</Text>
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
          <Text style={styles.buttonText}>Log In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.containerLink}>
        <Text style={styles.text}>Want to create a new account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.7}>
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TVFocusGuideView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
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
    maxWidth: 450,
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
