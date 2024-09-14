import { Dimensions } from 'react-native';

export const useDimensions = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  return [windowWidth, windowHeight];
};
