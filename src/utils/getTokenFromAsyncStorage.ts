import AsyncStorage from '@react-native-async-storage/async-storage';

export const getTokenFromAsyncStorage = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem('state');

    if (value !== null) {
      const state = JSON.parse(value);

      const token = state?.state?.authUser?.token || '';
      return token;
    }
    return '';
  } catch (error) {
    console.log(error);
    return '';
  }
};
