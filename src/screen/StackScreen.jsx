import { Platform, SafeAreaView, View } from 'react-native';
import WebView from 'react-native-webview';
import { useDeviceBack, useNextDeviceBack } from '../hooks/useDeviceBack';
import theme from '../style/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../common/ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { jsonParse } from '../common/common';
const domain = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';
function StackScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { url, headerName } = route.params;
  const insets = useSafeAreaInsets();
  const { webviewRef, onPressHardwareBackButton, onStackBack } = useNextDeviceBack(url);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <Header title={headerName || ''} onBackClick={() => onPressHardwareBackButton()} />
      <WebView
        ref={webviewRef}
        source={{
          uri: `${domain}${url}`,
        }}
        javaScriptEnabled
        originWhitelist={['*']}
        style={{ flex: 1 }}
        allowsBackForwardNavigationGestures
        onMessage={({ nativeEvent: state }) => {
          onStackBack(state);
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

export default StackScreen;
