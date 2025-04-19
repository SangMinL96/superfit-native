import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import { jsonParse } from '../../common/common';
import { useGlobalState } from '../../store/useGlobalState';
const URL = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';
function HomeScrenn() {
  const navigation = useNavigation();
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <WebView
        source={{
          uri: `${URL}/home/partner`,
        }}
        javaScriptEnabled
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onMessage={({ nativeEvent: state }) => {
          const data = jsonParse(state?.data);
          if (data?.type === 'gotoStack') {
            const params = { url: data.url, headerName: data.headerName };
            navigation.push('stack', params);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScrenn;
