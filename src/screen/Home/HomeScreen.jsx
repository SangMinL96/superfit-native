import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView, View } from 'react-native';
import WebView from 'react-native-webview';
import { shallow } from 'zustand/shallow';
import Header from '../../common/ui/Header';
import { useDeviceBack } from '../../hooks/useDeviceBack';
import { useGlobalState } from '../../store/useGlobalState';
import theme from '../../style/theme';
import { lazy } from 'react';
import { jsonParse } from '../../common/common';
const URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://127.0.0.1:3000';
function HomeScrenn() {
  const navigation = useNavigation();
  const [setIsLogined] = useGlobalState(state => [state.setIsLogined], shallow);
  const { webviewRef, script, onNavigationStateChange, androidState, onPressHardwareBackButton } = useDeviceBack();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        onNavigationStateChange={onNavigationStateChange}
        source={{
          uri: `${URL}/home/partner`,
        }}
        javaScriptEnabled
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        injectedJavaScript={script}
        onMessage={({ nativeEvent: state }) => {
          androidState(state);
          const data = jsonParse(state?.data);
          if (data?.type === 'gotoStack') {
            const params = { url: data.url, headerName: data.headerName };
            navigation.navigate('stack', params);
          }
        }}
      />
    </SafeAreaView>
  );
}

export default HomeScrenn;
