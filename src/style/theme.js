import { Platform, StatusBar, StyleSheet } from 'react-native';

const container = {
  flex: 1,
  backgroundColor: 'white',
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

const theme = {
  container,
};

export default theme;
