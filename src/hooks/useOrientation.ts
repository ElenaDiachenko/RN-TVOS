import {useWindowDimensions} from 'react-native';

export const useOrientation = () => {
  const dimensions = useWindowDimensions();

  return {
    ...dimensions,
    isPortrait: dimensions.width < dimensions.height,
  };
};
