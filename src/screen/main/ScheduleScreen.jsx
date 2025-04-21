import { useNavigation } from '@react-navigation/native';
import { Platform, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { jsonParse } from '../../common/common';
import { useNextDeviceBack } from '../../hooks/useDeviceBack';
const domain = Platform.OS === 'android' ? 'http://192.168.25.61:3000' : 'http://127.0.0.1:3000';
function ScheduleScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { webviewRef, onStackBack } = useNextDeviceBack('/schedule');
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <WebView
        ref={webviewRef}
        source={{
          uri: `${domain}/schedule`,
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

export default ScheduleScreen;
