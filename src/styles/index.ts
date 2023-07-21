import {Dimensions, StyleSheet} from 'react-native';

export const palette = {
  accentColor: '#5dadef',
  blackColor: '#000000',
  whiteColor: '#ffffff',
  warningText: '#ff001b',
  footerTextColor: '#545454',
  mainBgColor: '#303030',
  modalGreyText: '#8c8c8c',
  modalNumberGreyBg: '#f7f7f7',
  footerBgColor: '#f7f7f7',
  paginationArrowBg: '#f7f7f7',
};

export const commonStyles = StyleSheet.create({
  container: {
    backgroundColor: palette.mainBgColor,
    flex: 1,
    justifyContent: 'center',
  },

  text: {
    color: palette.whiteColor,
  },
  borderInit: {borderColor: 'transparent', borderWidth: 1, borderRadius: 5},
});

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;
